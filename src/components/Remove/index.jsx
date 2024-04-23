import React from "react";
import { getDatabase, ref, remove } from "firebase/database";
import styled from "styled-components";
const Btn = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  margin-bottom: 10px;
  background: #fe6565;
  font-size: 20px;
  font-weight: bold;
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
  return <Btn onClick={handleReset}>Reset</Btn>;
};

export default Remove;
