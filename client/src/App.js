import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Login from "./login/Login";
import Home from "./layout/Home";
import axios from "axios";
import { createContext, useEffect } from "react";
import { v5 as uuidv5 } from "uuid";

const Container = styled.div`
  height: 100%;
  background-color: #f6f6f6;
`;

const UserContext = createContext(null);

function App() {
  const { user, isAuthenticated } = useAuth0();
  let userId;
  if (isAuthenticated) {
    let providerId = user.sub.split("|")[1];
    userId = uuidv5(providerId, process.env.REACT_APP_UUID_NAMESPACE);
  }

  useEffect(() => {
    (async function () {
      if (isAuthenticated) {
        try {
          await axios.get(`/user/${userId}`);
        } catch (err) {
          if (err.response.status === 500) {
            await axios.post(`/user`, {
              id: userId,
              email: user.email,
            });
          }
        }
      }
    })();
  }, [user]);

  return (
    <Container>
      {isAuthenticated ? (
        <UserContext.Provider value={userId}>
          <Home userId={userId} />
        </UserContext.Provider>
      ) : (
        <Login />
      )}
    </Container>
  );
}

export { App, UserContext };
