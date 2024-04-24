import { styled } from "styled-components";

export const Wrapper = styled.div`
  span {
    display: block;
    text-align: center;
    margin-top: 20px;
    a {
      color: #ff9900;
      font-weight: bold;
    }
  }
`;

export const Logo = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0 auto 100px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

export const Form = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  input {
    background: #ffffff50;
    border: none;
    padding: 15px;
    border-radius: 10px;
    color: #fff;
    &::placeholder {
      color: #ffffff80;
    }
  }

  input[type="submit"] {
    background: #ffffff90;
    color: #fff;
    cursor: pointer;
  }
`;
