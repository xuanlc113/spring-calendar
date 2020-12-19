import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Login from "./login/Login";
import Home from "./layout/home/Home";

const Canvas = styled.div`
  height: 100%;
  background-color: rgb(247, 247, 247);
`;

function App() {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);
  return <Canvas>{!isAuthenticated ? <Home /> : <Login />}</Canvas>;
}

export default App;
