import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Login from "./login/Login";
import Home from "./layout/Home";

const Container = styled.div`
  height: 100%;
  background-color: rgb(247, 247, 247);
`;

function App() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Container>{!isAuthenticated ? <Home user={user} /> : <Login />}</Container>
  );
}

export default App;
