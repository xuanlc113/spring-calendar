import styled from "styled-components";
import Calendar from "react-calendar";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import Contact from "../contact/Contact";
import Popup, { usePopup } from "../event_info/EventEditor";
import AddContact, { useAddContact } from "../contact/AddContact";
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
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5%;
  padding: 0.75em 1em;
  margin-top: 1rem;
  min-height: 0;
`;
const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5em;
  border-bottom: 1px solid lightgrey;
  align-items: center;
  & > h3 {
    margin: 0;
    cursor: pointer;
  }

  & > .anticon {
    padding: 5px;
    border-radius: 1rem;
    &:hover {
      background: #e6e6e6;
    }
  }
`;

export default function Sidebar(props) {
  const { isVisible, openPopup, closePopup, okPopup } = usePopup();
  const {
    isAddContactVisible,
    openAddContact,
    closeAddContact,
  } = useAddContact();

  useEffect(() => {}, [props.date]);

  return (
    <Container>
      <CreateButton
        type="primary"
        size="small"
        shape="round"
        icon={<PlusOutlined />}
        onClick={() => props.openPopup("Create Event", props.date, null)}
      >
        Create
      </CreateButton>
      <DateSelector>
        <Calendar
          value={props.date.toDate()}
          onChange={(val) => props.setDateOnly(val)}
          showFixedNumberOfWeeks={true}
          locale="en-US"
        />
      </DateSelector>
      <ContactContainer>
        <ContactHeader>
          <h3>Calendars</h3>
          <PlusOutlined onClick={openAddContact} />
        </ContactHeader>

        <Contact
          calendars={props.calendars}
          updateCalendars={props.updateCalendars}
        />
      </ContactContainer>
      {isAddContactVisible && <AddContact close={closeAddContact} />}
    </Container>
  );
}
