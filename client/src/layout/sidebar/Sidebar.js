import styled from "styled-components";
import Calendar from "react-calendar";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./ReactCalendar.css";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const CreateButton = styled(Button)`
  flex: 1;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 1.2em !important;
`;

const DateSelector = styled.div`
  flex: 4;
  background-color: white;
  padding: 0.75em 1em;
  border-radius: 5%;
`;

const ContactContainer = styled.div`
  flex: 10;
  background-color: white;
  border-radius: 5%;
  padding: 0.75em 1em;
  margin-top: 1rem;
`;

export default function Sidebar() {
  return (
    <Container>
      <CreateButton
        type="primary"
        size="large"
        shape="round"
        icon={<PlusOutlined />}
      >
        Create
      </CreateButton>
      <DateSelector>
        <Calendar />
      </DateSelector>
      <ContactContainer>
        <p>Calendars</p>
      </ContactContainer>
    </Container>
  );
}
