import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import dayjs from "dayjs";
import randomColor from "randomcolor";

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
  console.log(date, new Date());

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
      timer = setTimeout(() => {
        incrementTime();
      }, diff * 1000);
      first.current = false;
    } else {
      timer = setInterval(() => {
        incrementTime();
      }, 5 * 60 * 1000);
    }
    return () => clearInterval(timer);
  }, [date]);

  function incrementTime() {
    setDate(date.minute(date.minute() + 5));
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
    const colors = randomColor({ seed: 4744, luminosity: "dark", count: 5 });
    // get calendars { label: "My Calendar", id: userId, checked: true, color: blue }
    return [
      { label: "My Calendar", id: userId, checked: true, color: "#3495eb" },
      { label: "user", id: userId, checked: false, color: colors[0] },
      { label: "ben", id: userId, checked: false, color: colors[1] },
      { label: "tom", id: userId, checked: false, color: colors[2] },
    ];
  }

  function updateCalendars(label) {
    if (
      calendars.filter((i) => i.checked).length === 1 &&
      getCalendar(label).checked
    ) {
      return;
    }
    setCalendars(
      calendars.map((i) =>
        i.label === label ? { ...i, checked: !i.checked } : i
      )
    );
  }

  function getCalendar(label) {
    for (let i = 0; i < calendars.length; i++) {
      if (calendars[i].label === label) {
        return calendars[i];
      }
    }
    return {};
  }

  useEffect(() => {
    activeCalendars.current = calendars.filter((i) => i.checked);
  }, [calendars]);

  return { calendars, updateCalendars, activeCalendars };
}
