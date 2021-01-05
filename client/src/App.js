import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Login from "./login/Login";
import Home from "./layout/Home";
import { createContext } from "react";

const Container = styled.div`
  height: 100%;
  background-color: #f6f6f6;
`;

const UserContext = createContext(null);

function App() {
  const { user, isAuthenticated } = useAuth0();
  let userId = "";
  if (user) {
    userId = user.sub.split("|")[1];
  }

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
