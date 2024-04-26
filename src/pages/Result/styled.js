import styled, { keyframes, css } from "styled-components";

export const Wrapper = styled.div`
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

export const Name = styled.span`
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

export const BtnWrap = styled.div`
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

export const glowAnimation = keyframes`
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
export const glowAnimation2 = keyframes`
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

export const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;
