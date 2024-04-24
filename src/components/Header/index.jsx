import React from "react";
// import { useSelector } from "react-redux";

import styled from "styled-components";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

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
  // const user = useSelector((state) => state.auth.currentUser);

  const logOut = () => {
    auth.signOut();
    navigate("/");
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
