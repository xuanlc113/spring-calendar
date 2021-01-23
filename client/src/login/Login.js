import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Button } from "antd";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Login() {
  const { isLoading, loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <h1>Calendar</h1>
      {isLoading ? (
        <Button type="primary" size={"large"} loading>
          Log In
        </Button>
      ) : (
        <Button type="primary" size={"large"} onClick={loginWithRedirect}>
          Log In
        </Button>
      )}
    </Wrapper>
  );
}
