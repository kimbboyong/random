import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, onValue, set, push } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
  }, []);

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

  function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 로그인 성공
        const user = userCredential.user;
        console.log("로그인 성공:", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("로그인 실패:", errorCode, errorMessage);
      });
  }
  loginUser("test@test.com", "12341234");
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
    </div>
  );
};

export default Result;
