import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db, auth } from "../../firebaseConfig";
import { ref, set, push, onValue, remove } from "firebase/database";

const Wrapper = styled.div`
  background: #fff;
`;

const PlayerList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 50px;
  & > li {
    padding: 15px;
    border: 1px solid #000;
  }
`;

const Over21Indicator = styled.div`
  color: red;
  font-weight: bold;
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  button {
    border: none;
    padding: 10px 20px;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
  }
  .add {
    background: skyblue;
  }

  .remove {
    background: tomato;
  }
`;

const Result2 = () => {
  const [players, setPlayers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    const playersRef = ref(db, "users");
    const unsubscribeDB = onValue(playersRef, (snapshot) => {
      const playersData = snapshot.val();
      const loadedPlayers = [];
      for (const key in playersData) {
        const player = playersData[key];
        const numbers = player.randomNumbers
          ? Object.values(player.randomNumbers)
          : [];
        const totalSum = numbers.reduce((acc, current) => acc + current, 0);
        const isOver21 = totalSum > 21;
        loadedPlayers.push({
          id: key,
          ...player,
          totalSum,
          isOver21,
        });
      }
      setPlayers(loadedPlayers);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDB();
    };
  }, []);

  const generateRandomNumber = (id) => {
    const player = players.find((p) => p.id === id);
    if (player && player.isOver21) return;

    const randomNumber = Math.floor(Math.random() * 13) + 1;
    const randomNumberRef = push(ref(db, `users/${id}/randomNumbers`));
    set(randomNumberRef, randomNumber);
  };

  const resetNumbers = (userId) => {
    const randomNumberRef = ref(db, `users/${userId}/randomNumbers`);
    remove(randomNumberRef);
  };

  return (
    <Wrapper>
      <PlayerList>
        {players.map((player) => (
          <li key={player.id}>
            {player.displayName}
            <div>총합: {player.totalSum}</div>
            {player.isOver21 && <Over21Indicator>죽음 ㅅㄱ</Over21Indicator>}
            <ul>
              {player.randomNumbers &&
                Object.values(player.randomNumbers).map((number, index) => (
                  <li key={index}>{number}</li>
                ))}
            </ul>
          </li>
        ))}
      </PlayerList>
      <div>
        <BtnWrap>
          <button
            className="add"
            onClick={() => generateRandomNumber(currentUser?.uid)}
          >
            추가
          </button>
          <button
            className="remove"
            onClick={() => resetNumbers(currentUser?.uid)}
          >
            리셋
          </button>
        </BtnWrap>
        {/* <strong>{currentUser?.displayName}</strong>
        <ul>
          {players.find((p) => p.id === currentUser?.uid)?.randomNumbers &&
            Object.values(
              players.find((p) => p.id === currentUser?.uid)?.randomNumbers
            ).map((number, index) => <li key={index}>{number}</li>)}
        </ul> */}
      </div>
    </Wrapper>
  );
};

export default Result2;
