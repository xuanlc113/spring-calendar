import { useAuth0 } from "@auth0/auth0-react";
import { Button, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Navbar() {
  const { logout } = useAuth0();
  return (
    <div className="navbar">
      <div
        className="icon-friend"
        style={{ margin: "0 1.5rem", padding: "0.5rem", borderRadius: "50%" }}
      >
        <Badge count={5}>
          <UserOutlined
            className="icon"
            style={{
              fontSize: "1.5rem",
            }}
          />
        </Badge>
      </div>
      <Button
        type="primary"
        size={"medium"}
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </Button>
    </div>
  );
}
