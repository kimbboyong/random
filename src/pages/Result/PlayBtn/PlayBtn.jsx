import { db } from "../../../firebaseConfig";
import { ref, onValue, set, push } from "firebase/database";
import React from "react";
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
  const handleClick = async () => {
    const results = ["도", "개", "걸", "윷", "모", "백도"];
    const randomResult = results[Math.floor(Math.random() * results.length)];

    const newResultRef = push(ref(db, "yutnoriResults"));
    await set(newResultRef, {
      result: randomResult,
    });

    const latestResultRef = ref(db, "yutnori/latestResult");
    await set(latestResultRef, {
      result: randomResult,
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
