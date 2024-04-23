import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, onValue, set, push } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Remove from "../../components/Remove";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .btn {
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
    background: #fff;
    color: #333;
    font-weight: bold;
    font-size: 20px;
    box-shadow: 3px 2px 1px rgba(0, 0, 0, 0.2);
  }
  ul {
    padding: 0;
    height: 100%;
    max-height: 250px;
    padding-bottom: 40px;
    overflow-y: auto;
  }

  li {
    list-style: none;
    background: #ffffff60;
    padding: 20px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }
`;

const GoBtn = styled.button``;

const Result = () => {
  const audioRef = useRef(null);

  const [result, setResult] = useState("");
  const [results, setResults] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log("사용자가 로그인되었습니다.", user);
  } else {
    console.log("사용자가 로그인되지 않았습니다.");
  }

  useEffect(() => {
    const resultsRef = ref(db, "yutnoriResults");
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      const data = snapshot.val();
      const resultsArray = data
        ? Object.keys(data).map((key) => ({
            ...data[key],
            id: key,
          }))
        : [];
      setResults(resultsArray);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = async () => {
    audioRef.current.play();
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

  function loginUser() {
    const email = "test@test.com";
    const password = "12341234";
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 로그인 성공
        alert("OK");
      })
      .catch((error) => {
        // 로그인 실패
        alert("NOT");
      });
  }

  function logoutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // 로그아웃 성공
        alert("로그아웃 되었습니다.");
      })
      .catch((error) => {
        // 로그아웃 실패
        console.error("로그아웃 실패:", error);
      });
  }
  return (
    <Wrapper>
      <GoBtn className="btn" onClick={handleClick}>
        윷 던지기
      </GoBtn>
      <Remove />
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.result}</li>
        ))}
      </ul>

      <button className="btn" onClick={loginUser}>
        로그인하기
      </button>
      <button className="btn" onClick={logoutUser}>
        로그아웃하기
      </button>

      <audio ref={audioRef} src="/music/bgm.mp3" />
    </Wrapper>
  );
};

export default Result;
