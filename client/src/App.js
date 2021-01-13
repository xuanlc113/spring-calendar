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
    if (isAuthenticated) {
      axios.get(`/user/` + userId).catch((err) => {
        if (err.response) {
          console.log(err);
          console.log(userId);
          if (err.response.status === 500) {
            axios.post(`/user`, {
              id: userId,
              email: user.email,
            });
          }
        }
      });
    }
  }, [user]);

  return (
    <Container>
      {isAuthenticated ? (
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

// user
// email: "sockpuppet113@gmail.com"
// email_verified: true
// family_name: "Puppy"
// given_name: "Sock"
// locale: "en-GB"
// name: "Sock Puppy"
// nickname: "sockpuppet113"
// picture: "https://lh3.googleusercontent.com/-0yG_PnyU0Gw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclJw-2cYUWx-wYhFGrSCCuZUUkyHg/s96-c/photo.jpg"
// sub: "google-oauth2|105217146160079939382"
// updated_at: "2020-12-20T07:17:53.236Z"
