import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import dayjs from "dayjs";

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
  const { date, setDate, setDateOnly } = useDate();
  const { calendars, updateCalendars, activeCalendars } = useCalendarSelector(
    props.userId
  );

  return (
    <Container>
      <Sidebar
        date={date}
        setDateOnly={setDateOnly}
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
          setDateOnly={setDateOnly}
          period={period}
          setPeriod={setPeriod}
          calendars={activeCalendars.current}
        />
      </SubContainer>
    </Container>
  );
}

function useDate() {
  const [date, setDate] = useState(roundDate());
  const first = useRef(true);

  function roundDate() {
    let date = dayjs();
    const time = Math.floor(date.minute() / 5);
    date = date.minute(5 * time).second(0);
    return date;
  }

  useEffect(() => {
    let timer;
    if (first.current) {
      const diff = date.add(5, "minute").diff(dayjs(), "second");
      setTimeout(() => {
        timer = incrementTime();
      }, diff * 1000);
      first.current = false;
    } else {
      timer = incrementTime();
    }
    return () => clearInterval(timer);
  }, [date]);

  function incrementTime() {
    const timer = setInterval(() => {
      setDate(date.minute(date.minute() + 5));
    }, 5 * 60 * 1000);
    return timer;
  }

  function setDateOnly(dateObj) {
    setDate(
      date
        .year(dateObj.getFullYear())
        .month(dateObj.getMonth())
        .date(dateObj.getDate())
    );
  }

  return { date, setDate, setDateOnly };
}

function useCalendarSelector(userId) {
  const [calendars, setCalendars] = useState(getCalendars(userId));
  const activeCalendars = useRef(null);
  activeCalendars.current = calendars.filter((i) => i.checked);

  function getCalendars(userId) {
    // get calendars { label: "My Calendar", id: userId, checked: true, color: blue }
    return [
      { label: "My Calendar", id: userId, checked: true, color: "red" },
      { label: "user", id: userId, checked: false, color: "green" },
      { label: "ben", id: userId, checked: false, color: "blue" },
      { label: "tom", id: userId, checked: false, color: "purple" },
    ];
  }

  function updateCalendars(label) {
    setCalendars(
      calendars.map((i) =>
        i.label === label ? { ...i, checked: !i.checked } : i
      )
    );
  }

  useEffect(() => {
    activeCalendars.current = calendars.filter((i) => i.checked);
  }, [calendars]);

  return { calendars, updateCalendars, activeCalendars };
}
