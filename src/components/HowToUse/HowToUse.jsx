import React from "react";
import styled from "styled-components";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;

  li {
    color: #fff;
    word-break: keep-all;
    line-height: 1.2;
  }
`;

const HowToUse = () => {
  return (
    <List>
      <li style={{ fontWeight: "bold" }}>사용법</li>
      <li>1. URL복사 후 크롬으로 켠다. </li>
      <li>2. 설정창을 켠 후 데스크톱 버전으로 보기를 누른다. </li>
      <li>3. 로그인을 한다.</li>
      <li style={{ color: "red" }}>
        본 페이지는 상업적 용도가 아닌 재미용으로 만들어진 페이지임
      </li>
    </List>
  );
};

export default HowToUse;
