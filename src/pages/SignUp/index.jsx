import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import { Form, Wrapper } from "./styled";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") return;

    try {
      setIsLoading(true);
      const create = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(create.user, {
        displayName: name,
      });
      navigate("/game1");
      console.log(create.user);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setError("ㅈㅅ 이미 사용중임");
      } else if (e.code === "auth/weak-password") {
        setError("ㅋㅋ 비번 6자이상 해야함");
      } else {
        setError("오류임 카톡넣고 ㄱㄷ리셈");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Form action="" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          name="name"
          placeholder="사용할 닉넴 ㄱ"
          required
        />
        <input
          onChange={onChange}
          type="email"
          name="email"
          placeholder="로그인때 사용할 이메일 ㄱ"
          required
        />
        <input
          onChange={onChange}
          type="password"
          name="password"
          placeholder="귀찮으니 비번은 1번만 입력하셈 참고로 못찾음"
          required
        />

        <input type="submit" value={isLoading ? "ㄱㄷ" : "회원가입"} />
      </Form>
      {error && (
        <p style={{ color: "#e92b2b", textAlign: "center" }}>{error}</p>
      )}{" "}
    </Wrapper>
  );
};

export default SignUp;
