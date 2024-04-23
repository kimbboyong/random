import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, onValue, set, push } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Remove from "../../components/Remove";

const Result = () => {
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
  }, [result]);

  const handleClick = async () => {
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
  function loginUser2() {
    const email = "test2@test.com";
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
    <div>
      <button onClick={handleClick}>윷 던지기</button>
      <Remove />
      <p>최신 결과: {result}</p>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.result}</li>
        ))}
      </ul>

      <button onClick={loginUser}>전원표</button>
      <button onClick={loginUser2}>김준혁</button>
      <button onClick={logoutUser}>로그아웃하기</button>
    </div>
  );
};

export default Result;
