import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Button, Badge, Select, Space, Popover } from "antd";
import { UserOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import ContactRequest from "../contact/ContactRequest";
import { useContext, useState } from "react";
import { UserContext } from "../App";

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

export default function Navbar(props) {
  const { Option } = Select;
  const { logout } = useAuth0();
  const { requests, acceptRequest, denyRequest } = useRequests();

  function displayDate() {
    if (props.period !== "day") {
      return props.date.format("MMMM");
    }
    return props.date.format("D MMMM");
  }

  function incrementDate() {
    props.setDate(props.date.add(1, props.period));
  }

  function decrementDate() {
    props.setDate(props.date.subtract(1, props.period));
  }

  return (
    <Container>
      <DateNav>
        <LeftOutlined onClick={decrementDate} />
        <h2>{displayDate()}</h2>
        <RightOutlined onClick={incrementDate} />
      </DateNav>
      <Space size={25} align="center">
        <Select
          defaultValue="day"
          value={props.period}
          onChange={props.setPeriod}
        >
          <Option value="day">Day</Option>
          <Option value="week">Week</Option>
          <Option value="month">Month</Option>
        </Select>
        <Popover
          trigger="click"
          content={
            <ContactRequest
              requests={requests}
              acceptRequest={acceptRequest}
              denyRequest={denyRequest}
            />
          }
        >
          <FriendIcon>
            <Badge count={getRequests().length} size="small">
              <UserOutlined
                className="icon"
                style={{
                  fontSize: "1.3rem",
                }}
              />
            </Badge>
          </FriendIcon>
        </Popover>
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

function useRequests() {
  const user = useContext(UserContext);
  const [requests, setRequests] = useState(getRequests(user));

  function acceptRequest(id) {
    //
    setRequests(getRequests(user));
  }

  function denyRequest(id) {
    //
    setRequests(getRequests(user));
  }

  return { requests, acceptRequest, denyRequest };
}

function getRequests(id) {
  return [
    { email: "user", id: "1000" },
    { email: "user2", id: "2000" },
  ];
}
