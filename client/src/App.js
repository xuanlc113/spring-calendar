import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Login from "./login/Login";
import Home from "./layout/Home";
import { createContext } from "react";

const Container = styled.div`
  height: 100%;
  background-color: rgb(247, 247, 247);
`;

const UserContext = createContext(null);

function App() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Container>
      {!isAuthenticated ? (
        <UserContext.Provider value={user}>
          <Home user={user} />
        </UserContext.Provider>
      ) : (
        <Login />
      )}
    </Container>
  );
}

export { App, UserContext };
