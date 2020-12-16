import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import "./Login.css";

export default function Login() {
  const { isLoading, loginWithRedirect } = useAuth0();

  return (
    <div className="login-page">
      {isLoading ? (
        <Button type="primary" size={"large"} loading>
          Log In
        </Button> //loading
      ) : (
        <Button
          type="primary"
          size={"large"}
          onClick={() => loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </div>
  );
}
