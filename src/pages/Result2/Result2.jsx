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

const Over21Indicator = styled.div`
  color: red;
  font-weight: bold;
`;

const Result2 = () => {
  const [players, setPlayers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOver21, setIsOver21] = useState(false);

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
    if (isOver21) return;

    const randomNumber = Math.floor(Math.random() * 13) + 1;
    const randomNumberRef = push(ref(db, `users/${id}/randomNumbers`));
    set(randomNumberRef, randomNumber).then(() => checkIfOver21(id));
  };

  const sumNumbers = (numbers) => {
    return numbers.reduce((acc, current) => acc + current, 0);
  };

  const checkIfOver21 = (userId) => {
    const user = players.find((p) => p.id === userId);
    if (user && user.randomNumbers) {
      const numbers = Object.values(user.randomNumbers);
      const sum = sumNumbers(numbers);
      if (sum > 21) {
        setIsOver21(true);
      }
    }
  };

  useEffect(() => {
    const currentUserData = players.find((p) => p.id === currentUser?.uid);
    if (currentUserData && currentUserData.randomNumbers) {
      const numbers = Object.values(currentUserData.randomNumbers);
      const sum = sumNumbers(numbers);
      setIsOver21(sum > 21);
    }
  }, [players, currentUser]);

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
        <button
          onClick={() => generateRandomNumber(currentUser?.uid)}
          disabled={isOver21}
        >
          뽑기
        </button>
        {isOver21 && <Over21Indicator>X</Over21Indicator>}
      </div>
    </Wrapper>
  );
};

export default Result2;
