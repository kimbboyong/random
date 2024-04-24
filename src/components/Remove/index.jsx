import React from "react";
import { getDatabase, ref, remove } from "firebase/database";
import styled from "styled-components";
const Btn = styled.button`
  width: 100%;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  figure {
    max-width: 50px;
  }
  span {
    font-size: 15px;
    color: #7c7c7c;
  }
`;

const Remove = () => {
  const handleReset = () => {
    const db = getDatabase();

    const reference = ref(db, "/yutnoriResults");

    remove(reference)
      .then(() => {
        console.log("Data removed successfully");
      })
      .catch((error) => {
        console.error("Failed to remove data", error);
      });
  };
  return (
    <Btn onClick={handleReset}>
      <figure>
        <img src="/images/reset.png" alt="" />
      </figure>
      <span>리셋</span>
    </Btn>
  );
};

export default Remove;
