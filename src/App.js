import styled from "styled-components";
import "./App.css";
import Result from "./pages/Result/Result";
import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebaseConfig";
import { clearUser, setUser } from "./redux/auth/authSlice";
import Protected from "./pages/Protected/Protected";

const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 0 15px;
  background: #000;
  height: 100vh;
  position: relative;
`;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/game1" element={<Result />} />
          <Route path="/protec" element={<Protected />} />
        </Route>
      </Routes>
    </Wrapper>
  );
}

export default App;
