import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, doc, onSnapshot, setDoc, query } from "firebase/firestore";

const Result = () => {
  const [result, setResult] = useState(""); // 최신 결과 저장
  const [results, setResults] = useState([]); // 모든 결과 저장

  useEffect(() => {
    // 'yutnoriResults' 컬렉션의 모든 문서를 실시간으로 불러오기
    const q = query(collection(db, "yutnoriResults"));
    const unsubscribeResults = onSnapshot(q, (querySnapshot) => {
      const resultsArray = [];
      querySnapshot.forEach((doc) => {
        resultsArray.push({ ...doc.data(), id: doc.id });
      });
      setResults(resultsArray);
    });

    // 'latestResult' 문서의 실시간 업데이트 구독
    const unsubscribeLatest = onSnapshot(
      doc(db, "yutnori", "latestResult"),
      (doc) => {
        setResult(doc.data()?.result);
      }
    );

    // 컴포넌트 언마운트 시 두 구독 해제
    return () => {
      unsubscribeResults();
      unsubscribeLatest();
    };
  }, []);

  const handleClick = async () => {
    const results = ["도", "개", "걸", "윷", "모", "백도"];
    const randomResult = results[Math.floor(Math.random() * results.length)];

    // 'latestResult' 문서에 최신 결과 저장
    await setDoc(doc(db, "yutnori", "latestResult"), {
      result: randomResult,
    });
  };

  return (
    <div>
      <button onClick={handleClick}>윷 던지기</button>
      <p>최근 결과: {result}</p>
      <h3>모든 결과:</h3>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
