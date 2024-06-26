import { db } from "../../../firebaseConfig";
import { ref, onValue, set, push } from "firebase/database";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const GoBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  figure {
    max-width: 50px;
  }
  span {
    font-size: 15px;
    color: #0885ff;
  }
`;

const PlayBtn = () => {
  const userData = useSelector((state) => state.auth.currentUser);

  const handleClick = async () => {
    const results = ["도", "도", "개", "개", "걸", "걸", "윷", "모", "백도"];
    const randomResult = results[Math.floor(Math.random() * results.length)];

    const newResultRef = push(ref(db, "yutnoriResults"));
    await set(newResultRef, {
      result: randomResult,
      displayName: userData && userData.displayName,
    });

    const latestResultRef = ref(db, "yutnori/latestResult");
    await set(latestResultRef, {
      result: randomResult,
      displayName: userData && userData.displayName,
    });
  };

  return (
    <GoBtn className="btn" onClick={handleClick}>
      <figure>
        <img src="/images/play.png" alt="" />
      </figure>
      <span>던지기</span>
    </GoBtn>
  );
};

export default PlayBtn;
