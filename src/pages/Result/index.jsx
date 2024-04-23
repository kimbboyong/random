import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, onValue, set, push } from "firebase/database";

const Result = () => {
  const [result, setResult] = useState("");
  const [results, setResults] = useState([]);

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

  return (
    <div>
      <button onClick={handleClick}>윷 던지기</button>
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
