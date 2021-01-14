import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Button, Badge, Select, Space, Popover } from "antd";
import { UserOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import ContactRequest from "../contact/ContactRequest";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";

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
    background-color: #e6e6e6;
    cursor: pointer;
  }
`;

const FriendIcon = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50%;
  padding: 5px;

  &:hover {
    background-color: #e6e6e6;
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
            <Badge count={requests.length} size="small">
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
  const userId = useContext(UserContext);
  const [requests, setRequests] = useState([]);

  async function acceptRequest(contactId) {
    try {
      await axios.put(`/contact/${contactId}`);
      await getRequests();
    } catch (err) {
      console.log(err);
    }
  }

  async function denyRequest(contactId) {
    try {
      await axios.delete(`/contact/${contactId}`);
      await getRequests();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(async () => {
    await getRequests();
  }, []);

  async function getRequests() {
    try {
      const { data: requests } = await axios.get(`/contact/requests/${userId}`);
      console.log(requests[0]);
      setRequests(requests);
    } catch (err) {
      console.log(err);
    }
  }

  return { requests, acceptRequest, denyRequest };
}
