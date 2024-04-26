import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import Remove from "../../components/Remove";
import PlayBtn from "./PlayBtn/PlayBtn";
// import { useSelector } from "react-redux";
import { BtnWrap, Name, Wrapper } from "./styled";

const Result = () => {
  // const userData = useSelector((state) => state.auth.currentUser);

  const [results, setResults] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log("로그인 댐");
  } else {
    console.log("로그인 안댐");
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

  return (
    <Wrapper>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <div className="num">
              <span>0810</span>
              <p>0809</p>
            </div>
            <div className="code">
              <span>KE441</span>
            </div>
            <div className="name">
              <Name displayName={result.displayName}>{result.displayName}</Name>
            </div>
            <div className="result">
              <span>제2여객터미널</span>
              <strong>{result.result}</strong>
            </div>
            <div className="start">
              <span>251</span>
              <p>출발</p>
            </div>
          </li>
        ))}
      </ul>

      <BtnWrap>
        <Remove />
        <PlayBtn />
      </BtnWrap>
    </Wrapper>
  );
};

export default Result;
