import { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import dayjs from "dayjs";
import AllDayEvent from "./AllDayEvent";

const Grid = styled.div`
  background-image: linear-gradient(to right, lightgrey 0.5px, transparent 1px);
  background-size: ${(props) =>
    props.type === "week"
      ? `${100 / 7}% auto`
      : `${100 / props.calendars}% auto`};
`;

export default function AllDayArea(props) {
  const { events } = useAllDay(props.type, props.calendars, props.dates);

  function displayAllDayEvents() {
    if (props.type === "day") {
      return DayEvents();
    }
    return WeekEvents();
  }

  function DayEvents() {
    const position = [];
    for (let i = 0; i < events.length; i++) {
      position.push(
        <Col flex={1 / events.length}>
          {events[i].map((event) => (
            <AllDayEvent type="day" event={event} dateRange={props.dates} />
          ))}
        </Col>
      );
    }
    return <Row justify="space-around">{position}</Row>;
  }

  function WeekEvents() {
    events.sort((a, b) => a.datetime.diff(b.datetime));
    return events.map((event) => (
      <AllDayEvent type="week" event={event} dateRange={props.dates} />
    ));
  }

  return (
    <div style={{ overflowY: "scroll" }}>
      <Grid type={props.type} calendars={props.calendars.length}>
        {displayAllDayEvents()}
      </Grid>
    </div>
  );
}

function useAllDay(period, calendars, dates) {
  const [events, setEvents] = useState(
    getAllDayEvents(period, calendars, dates)
  );

  useEffect(() => {
    setEvents(getAllDayEvents(period, calendars, dates));
  }, [calendars]);

  return { events };
}

function getAllDayEvents(period, calendars, dates) {
  let events = [];
  for (let i = 0; i < calendars.length; i++) {
    if (period === "day") {
      let calendarEvents = getCalendarAllDayEvents(calendars[i], dates);
      events.push(calendarEvents);
    } else {
      events = events.concat(getCalendarAllDayEvents(calendars[i], dates));
    }
  }

  return events;
}

function getCalendarAllDayEvents(calendar, dates) {
  // get events(id, dates[0], dates[-1]) get array of events, add color
  return [
    {
      id: "",
      canonicalEventId: "",
      datetime: dayjs("2020-12-31 10:30"),
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
        duration: 2,
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
