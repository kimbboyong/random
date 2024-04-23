import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 함수
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 로그인 성공
        const user = userCredential.user;
        console.log("로그인 성공:", user);
      })
      .catch((error) => {
        // 로그인 실패
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("로그인 실패:", errorCode, errorMessage);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    loginUser(email, password); // 로그인 시도
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
