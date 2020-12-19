import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Button, Badge, Select, Space } from "antd";
import { UserOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

const Container = styled.div`
  flex: 1;
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateNav = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 1rem;
  & > h2 {
    margin: 0;
    padding: 0;
    cursor: default;
  }

  & > .anticon {
    margin: 0 1rem;
    padding: 5px;
    border-radius: 50%;
  }

  & > span:hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`;

const FriendIcon = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50%;
  padding: 5px;

  &:hover {
    background-color: rgb(156, 174, 185);
    cursor: pointer;
  }
`;

export default function Navbar() {
  const { Option } = Select;
  const { logout } = useAuth0();
  return (
    <Container>
      <DateNav>
        <LeftOutlined />
        <h2>Day</h2>
        <RightOutlined />
      </DateNav>
      <Space size={25} align="center">
        <Select defaultValue="day">
          <Option value="day">Day</Option>
          <Option value="week">Week</Option>
          <Option value="month">Month</Option>
        </Select>
        <FriendIcon>
          <Badge count={5} size="small">
            <UserOutlined
              className="icon"
              style={{
                fontSize: "1.3rem",
              }}
            />
          </Badge>
        </FriendIcon>
        <Button
          type="primary"
          size="medium"
          shape="round"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </Button>
      </Space>
    </Container>
  );
}
