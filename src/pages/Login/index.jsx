import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Form, Wrapper } from "../SignUp/styled";
import HowToUse from "../../components/HowToUse/HowToUse";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const SignUps = styled.span`
  margin-bottom: 20px;
  display: block;
  color: #fff;
  a {
    font-size: 18px;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/game1");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Form action="" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="email"
          name="email"
          placeholder="이메일 ㄱ"
          required
        />
        <input
          onChange={onChange}
          type="password"
          name="password"
          placeholder="비번 ㄱ "
          required
        />

        <input type="submit" value={isLoading ? "ㄱㄷ" : "로그인"} />
      </Form>

      <SignUps>
        아디없슴? 그럼 <Link to="/signup">회원가입</Link> 하셈
      </SignUps>

      <HowToUse />
    </Wrapper>
  );
};

export default SignUp;
