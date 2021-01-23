import { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import EventEditor, { usePopup } from "../event_info/EventEditor";
import useDatetime from "../hooks/useDatetime";
import useCalendarSelector from "../hooks/useCalendarSelector";

const Container = styled.div`
  height: 100%;
  display: flex;
`;

const SubContainer = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
`;

export default function Home(props) {
  const [period, setPeriod] = useState("week");
  const { date, setDate, setDateOnly } = useDatetime();
  const { calendars, updateCalendars, activeCalendars } = useCalendarSelector(
    props.userId
  );
  const { isVisible, eventInfo, openPopup, closePopup, okPopup } = usePopup();
  return (
    <Container>
      <Sidebar
        date={date}
        setDateOnly={setDateOnly}
        calendars={calendars}
        updateCalendars={updateCalendars}
        openPopup={openPopup}
      />
      <SubContainer>
        <Navbar
          date={date}
          setDate={setDate}
          period={period}
          setPeriod={setPeriod}
        />
        <Content
          date={date}
          setDateOnly={setDateOnly}
          period={period}
          setPeriod={setPeriod}
          calendars={activeCalendars}
          openPopup={openPopup}
        />
      </SubContainer>
      <EventEditor
        visible={isVisible}
        okPopup={okPopup}
        closePopup={closePopup}
        title={eventInfo.title}
        date={eventInfo.date}
        event={eventInfo.event}
      />
    </Container>
  );
}
