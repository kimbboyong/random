import React from "react";
// import { useSelector } from "react-redux";

import styled from "styled-components";
import { auth, db } from "../../firebaseConfig";
import { ref, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  padding: 20px 0 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  h2 {
    color: #fff;
  }
  figure {
    position: absolute;
    left: 0;
    max-width: 25px;
    cursor: pointer;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.currentUser);

  const logOut = () => {
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, `users/${userId}`);
      remove(userRef)
        .then(() => {
          console.log("사용자 정보 삭제 성공");
          auth.signOut();
          navigate("/");
        })
        .catch((error) => {
          console.error("사용자 정보 삭제 실패:", error);
        });
    }
  };

  return (
    <Wrapper>
      <h2>251</h2>
      <figure onClick={logOut}>
        <img src="/images/logout.png" alt="" />
      </figure>
    </Wrapper>
  );
};

export default Header;
