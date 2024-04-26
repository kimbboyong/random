import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db, auth } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";

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

  return (
    <Wrapper>
      <PlayerList>
        {players.map((player) =>
          player.displayName !== currentUser?.displayName ? (
            <li key={player.id}>{player.displayName}</li>
          ) : null
        )}
      </PlayerList>
      <div>나 : {currentUser?.displayName}</div>
    </Wrapper>
  );
};

export default Result2;
