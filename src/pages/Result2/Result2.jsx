import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db, auth } from "../../firebaseConfig";
import { ref, set, push, onValue } from "firebase/database";

const Wrapper = styled.div`
  background: #fff;
`;

const PlayerList = styled.ul`
  margin-bottom: 50px;
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
        loadedPlayers.push({
          id: key,
          ...playersData[key],
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
    const randomNumber = Math.floor(Math.random() * 13) + 1;
    // Firebase에 랜덤 숫자 저장
    const randomNumberRef = push(ref(db, `users/${id}/randomNumbers`));
    set(randomNumberRef, randomNumber);
  };

  return (
    <Wrapper>
      <PlayerList>
        {players.map((player) =>
          player.displayName !== currentUser?.displayName ? (
            <li key={player.id}>
              {player.displayName}
              <ul>
                {player.randomNumbers &&
                  Object.values(player.randomNumbers).map((number, index) => (
                    <li key={index}>{number}</li>
                  ))}
              </ul>
            </li>
          ) : null
        )}
      </PlayerList>
      <div>
        나 : {currentUser?.displayName}
        <ul>
          {players.find((p) => p.id === currentUser?.uid)?.randomNumbers &&
            Object.values(
              players.find((p) => p.id === currentUser?.uid)?.randomNumbers
            ).map((number, index) => <li key={index}>{number}</li>)}
        </ul>
        <button onClick={() => generateRandomNumber(currentUser?.uid)}>
          뽑기
        </button>
      </div>
    </Wrapper>
  );
};

export default Result2;
