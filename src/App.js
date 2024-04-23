import styled from "styled-components";
import "./App.css";
import Result from "./pages/Result";

const Wrapper = styled.div`
  background: url(/images/bg.jpeg) no-repeat center;
  background-size: cover;
  height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <Result />
    </Wrapper>
  );
}

export default App;
