import { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import MonthAllDayEvent from "./MonthAllDayEvent";
import MonthDayEvent from "./MonthDayEvent";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Ellipsis = styled.div`
  position: relative;
  top: -5px;
  height: 1em;
`;

export default function MonthTile(props) {
  const { allDayEvents } = useAllDay(
    props.calendars,
    props.weekStart,
    props.weekEnd
  );

  const { dayEvents } = useDayEvents(props.calendars, props.date);

  function viewDay() {
    props.setDateOnly(props.date.toDate());
    props.setPeriod("day");
  }

  function getAllDayEvents() {
    const events = [];
    for (let i = 0; i < allDayEvents.length && i < 2; i++) {
      events.push(
        <MonthAllDayEvent event={allDayEvents[i]} date={props.date} />
      );
    }
    return events;
  }

  function getDayEvents(num = 2) {
    let events = [];
    for (let i = 0; i < dayEvents.length && i < num; i++) {
      events.push(<MonthDayEvent event={dayEvents[i]} />);
    }
    return events;
  }

  function showEvents() {
    const total = allDayEvents.length + dayEvents.length;
    if (total > 2) {
      if (allDayEvents.length >= 2) {
        return (
          <>
            {getAllDayEvents()}
            <Ellipsis>{total - 2} more</Ellipsis>
          </>
        );
      } else {
        return (
          <>
            {getAllDayEvents()}
            {getDayEvents(2 - allDayEvents.length)}
            <Ellipsis>{total - 2} more</Ellipsis>
          </>
        );
      }
    }
    return (
      <>
        {getAllDayEvents()}
        {getDayEvents()}
      </>
    );
  }

  return (
    <Container>
      <p onClick={viewDay} style={{ margin: 0 }}>
        {props.date.date()}
      </p>
      {showEvents()}
    </Container>
  );
}

function useAllDay(calendars, start, end) {
  const [allDayEvents, setAllDayEvents] = useState(
    getAllDayEvents(calendars, start, end)
  );

  useEffect(() => {
    setAllDayEvents(getAllDayEvents(calendars, start, end));
  }, [calendars]);

  return { allDayEvents };
}

function getAllDayEvents(calendars, start, end) {
  let events = [];
  for (let i = 0; i < calendars.length; i++) {
    events = events.concat(getCalendarAllDayEvents(calendars[i], start, end));
  }

  return events;
}

function getCalendarAllDayEvents(calendar, start, end) {
  // get events(id, dates[0], dates[-1]) get array of events, add color
  return [
    {
      id: "",
      canonicalEventId: "",
      datetime: dayjs("2021-01-05 10:30"),
      attendees: [
        { email: "attd2", status: 1 },
        { email: "attd3", status: 1 },
      ],
      canonicalEvent: {
        id: "",
        userId: "001",
        title: "Run",
        description: "go for a run",
        attendees: [1000],
        start: "2020-12-21 10:30",
        end: "2021-1-09",
        duration: 8,
        isAllDay: true,
        isRecurring: false,
        rrule: "",
        exceptions: [],
      },
      style: { color: calendar.color },
      userId: "001",
    },
  ];
}

function useDayEvents(calendars, date) {
  const [dayEvents, setDayEvents] = useState(getDayEvents(calendars, date));

  useEffect(() => {
    setDayEvents(getDayEvents(calendars, date));
  }, [calendars]);

  return { dayEvents };
}

function getDayEvents(calendars, date) {
  let events = [];
  for (let calendar of calendars) {
    events = events.concat(getEvents(calendar, date));
  }
  events.sort((a, b) => a.datetime.diff(b.datetime));
  return events;
}

function getEvents(calendar, date) {
  //
  return [
    {
      id: "",
      canonicalEventId: "",
      datetime: dayjs("2021-01-05 10:30"),
      attendees: [
        { email: "attd2", status: 1 },
        { email: "attd3", status: 1 },
      ],
      canonicalEvent: {
        id: "",
        userId: "001",
        title: "Run",
        description: "go for a run",
        attendees: [1000],
        start: "2020-12-21 10:30",
        end: "2021-1-09",
        duration: 8,
        isAllDay: true,
        isRecurring: false,
        rrule: "",
        exceptions: [],
      },
      style: { color: calendar.color },
      userId: "001",
    },
    {
      id: "",
      canonicalEventId: "",
      datetime: dayjs("2021-01-05 10:30"),
      attendees: [
        { email: "attd2", status: 1 },
        { email: "attd3", status: 1 },
      ],
      canonicalEvent: {
        id: "",
        userId: "001",
        title: "Run",
        description: "go for a run",
        attendees: [1000],
        start: "2020-12-21 10:30",
        end: "2021-1-09",
        duration: 8,
        isAllDay: true,
        isRecurring: false,
        rrule: "",
        exceptions: [],
      },
      style: { color: calendar.color },
      userId: "001",
    },
  ];
}
