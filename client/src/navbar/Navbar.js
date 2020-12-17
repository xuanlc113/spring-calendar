import { useAuth0 } from "@auth0/auth0-react";
import { Button, Badge, Select } from "antd";
import { UserOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./Navbar.css";

export default function Navbar() {
  const { Option } = Select;
  const { logout } = useAuth0();
  return (
    <div className="navbar">
      <div className="nav-date">
        <LeftOutlined />
        <h2>Day</h2>
        <RightOutlined />
      </div>
      <div className="nav-options">
        <div>
          <Select defaultValue="day">
            <Option value="day">Day</Option>
            <Option value="week">Week</Option>
            <Option value="month">Month</Option>
          </Select>
        </div>
        <div className="icon-friend">
          <Badge count={5} size="small">
            <UserOutlined
              className="icon"
              style={{
                fontSize: "1.3rem",
              }}
            />
          </Badge>
        </div>
        <Button
          type="primary"
          size="medium"
          shape="round"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
