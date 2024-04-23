import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const Result = () => {
  const [result, setResult] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "yutnori", "latestResult"), (doc) => {
      setResult(doc.data()?.result);
    });

    return () => unsub();
  }, []);

  const handleClick = async () => {
    const results = ["도", "개", "걸", "윷", "모", "백도"];
    const randomResult = results[Math.floor(Math.random() * results.length)];

    await setDoc(doc(db, "yutnori", "latestResult"), {
      result: randomResult,
    });
  };

  return (
    <div>
      <button onClick={handleClick}>윷 던지기</button>
      <p>결과: {result}</p>
    </div>
  );
};

export default Result;
