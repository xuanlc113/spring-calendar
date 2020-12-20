import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";

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
  const [date, setDate] = useState(new Date());
  const [period, setPeriod] = useState("week");
  const { calendars, updateCalendars } = useCalendarSelector(props.userId);

  return (
    <Container>
      <Sidebar
        date={date}
        setDate={setDate}
        calendars={calendars}
        updateCalendars={updateCalendars}
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
          setDate={setDate}
          period={period}
          setPeriod={setPeriod}
          calendars={calendars}
        />
      </SubContainer>
    </Container>
  );
}

function useCalendarSelector(userId) {
  const [calendars, setCalendars] = useState(getCalendars(userId));
  console.log(calendars);

  function getCalendars(userId) {
    // get calendars { label: "My Calendar", id: userId, checked: true, color: blue }
    return [
      { label: "My Calendar", id: userId, checked: true, color: "red" },
      { label: "My Calendar", id: userId, checked: true, color: "green" },
      { label: "My Calendar", id: userId, checked: true, color: "blue" },
      { label: "My Calendar", id: userId, checked: true, color: "purple" },
      { label: "My Calendar", id: userId, checked: true, color: "green" },
      { label: "My Calendar", id: userId, checked: true, color: "blue" },
      { label: "My Calendar", id: userId, checked: true, color: "purple" },
      { label: "My Calendar", id: userId, checked: true, color: "green" },
      { label: "My Calendar", id: userId, checked: true, color: "blue" },
      { label: "My Calendar", id: userId, checked: true, color: "purple" },
    ];
  }

  function updateCalendars(label) {
    setCalendars(
      calendars.map((i) =>
        i.label === label ? { ...i, checked: !i.checked } : i
      )
    );
  }

  return { calendars, updateCalendars };
}
