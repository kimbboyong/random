import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, onValue, set, push } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import Remove from "../../components/Remove";

const Result = () => {
  const [result, setResult] = useState("");
  const [results, setResults] = useState([]);

  const auth = getAuth();

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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // 사용자가 로그인한 상태
      console.log("로그인 상태:", user);
    } else {
      // 사용자가 로그아웃한 상태
      console.log("로그아웃 상태");
    }
  });

  const saveUserInfo = (user) => {
    set(ref(db, "users/" + user.uid), {
      username: user.displayName,
      email: user.email,
      profile_picture: user.photoURL,
    });
  };

  // 로그인 함수 내에서 GoogleAuthProvider 인스턴스를 생성합니다.
  const googleLogin = () => {
    const provider = new GoogleAuthProvider(); // GoogleAuthProvider 인스턴스 생성
    signInWithPopup(auth, provider)
      .then((result) => {
        var user = result.user;
        // 사용자 정보 저장
        saveUserInfo(user);
      })
      .catch((error) => {
        // 오류 처리
      });
  };

  function logoutUser() {
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
      <button onClick={googleLogin}>구글로 로그인하기</button>
      <button onClick={logoutUser}>로그아웃하기</button>
    </div>
  );
};

export default Result;
