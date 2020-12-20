import styled from "styled-components";
import Calendar from "react-calendar";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./ReactCalendar.css";
import { useEffect } from "react";
import Contact from "./Contact";

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
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5%;
  padding: 0.75em 1em;
  margin-top: 1rem;
  min-height: 0;

  & > h3 {
    text-align: center;
    padding-bottom: 0.5em;
    margin: 0;
    border-bottom: 1px solid lightgrey;
  }
`;

export default function Sidebar(props) {
  useEffect(() => {}, [props.date]);

  return (
    <Container>
      <CreateButton
        type="primary"
        size="small"
        shape="round"
        icon={<PlusOutlined />}
      >
        Create
      </CreateButton>
      <DateSelector>
        <Calendar
          value={props.date}
          onChange={props.setDate}
          showFixedNumberOfWeeks={true}
          locale="en-US"
        />
      </DateSelector>
      <ContactContainer>
        <h3>Calendars</h3>
        <Contact
          calendars={props.calendars}
          updateCalendars={props.updateCalendars}
        />
      </ContactContainer>
    </Container>
  );
}
