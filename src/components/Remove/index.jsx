import React from "react";
import { getDatabase, ref, remove, set } from "firebase/database";
import styled from "styled-components";
import { useSelector } from "react-redux";
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
  const userData = useSelector((state) => state.auth.currentUser);

  const handleReset = () => {
    const db = getDatabase();
    const userName = userData && userData.displayName;
    const safeDateTime = new Date().toISOString().replace(/[:.]/g, "-");
    const deletionLogRef = ref(db, `/deletionLog/${safeDateTime}`);

    const logData = {
      deletedBy: userName,
      deletedAt: new Date().toISOString(),
    };

    set(deletionLogRef, logData)
      .then(() => {
        const reference = ref(db, "/yutnoriResults");
        remove(reference)
          .then(() => {
            console.log("삭제댐");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error("오류", error);
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
