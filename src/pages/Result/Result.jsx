import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import Remove from "../../components/Remove";
import PlayBtn from "./PlayBtn/PlayBtn";
import { useSelector } from "react-redux";
import styled, { keyframes, css } from "styled-components";
const Wrapper = styled.div`
  .btn {
    width: 100%;
    border: none;
    border-radius: 10px;
    color: #333;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }
  ul {
    padding: 0 10px;
    height: auto;
    max-height: 80vh;
    padding-bottom: 35px;
    overflow-y: auto;
  }

  li {
    list-style: none;
    padding: 10px 0;
    text-align: center;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #4f4f4f;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      font-size: 15px;
    }
    .num span,
    .start span {
      color: #fff;
    }
    .num p,
    .start p {
      color: #e6446b;
    }

    .code span {
      color: #5db06c;
    }
    /* .name span {
      color: #e5cb50;
      width: 60px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: box;
      overflow: hidden;
      vertical-align: top;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    } */
    .result {
      span {
        color: #77b5cb;
      }
      strong {
        color: #fff;
      }
    }
  }
`;

const Name = styled.span`
  color: ${(props) => {
    if (props.displayName === "표땅이") return "#000";
    else if (props.displayName === "배영진") return "transparent";
    else if (props.displayName === "김뽀용") return "#fff;";
    else return "#e5cb50";
  }};
  text-shadow: ${(props) => {
    if (props.displayName === "표땅이")
      return "-1px 0 red, 0 1px red, 1px 0 red, 0 -1px red;";
    else if (props.displayName === "김뽀용")
      return `0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
  0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;`;
    else return "none";
  }};
  background-image: ${(props) =>
    props.displayName === "배영진"
      ? "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)"
      : "none"};
  animation: ${(props) => {
    if (props.displayName === "김뽀용")
      return css`
        ${glowAnimation} 2s ease-in-out infinite
      `;
    else if (props.displayName === "배영진") {
      return css`
        ${floatAnimation} 1s ease-in-out infinite
      `;
    } else if (props.displayName === "표땅이") {
      return css`
        ${glowAnimation2} 2s ease-in-out infinite
      `;
    }
  }};
  font-weight: bold;
  width: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: box;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  -webkit-background-clip: text;
`;

const BtnWrap = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0 15px;
  background: #000;
`;

const glowAnimation = keyframes`
  0% {
    text-shadow: 0 0 7px #f00, 0 0 10px #f00, 0 0 21px #f00;
  }
  50% {
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
  }
  100% {
    text-shadow: 0 0 7px #f00, 0 0 10px #f00, 0 0 21px #f00;
  }
`;
const glowAnimation2 = keyframes`
  0% {
    text-shadow:-1px 0 red, 0 1px red, 1px 0 red, 0 -1px red;
  }
  50% {
    text-shadow: 0 0 7px red, 0 0 10px red, 0 0 21px #f7d2d2, 0 0 42px #f7d2d2, 0 0 82px #000, 0 0 92px #000, 0 0 102px #000, 0 0 151px #000;
    color: #000;
  }
  100% {
    text-shadow: -1px 0 red, 0 1px red, 1px 0 red, 0 -1px red;
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const Result = () => {
  const userData = useSelector((state) => state.auth.currentUser);

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
              {/* <span>{result.displayName}</span> */}
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
