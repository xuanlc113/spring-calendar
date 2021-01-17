import { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import dayjs from "dayjs";
import AllDayEvent from "./AllDayEvent";
import axios from "axios";

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
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async function () {
      setEvents(await getAllDayEvents(period, calendars, dates));
    })();
  }, [calendars]);

  return { events };
}

async function getAllDayEvents(period, calendars, dates) {
  let events = [];
  for (let i = 0; i < calendars.length; i++) {
    if (period === "day") {
      let calendarEvents = await getCalendarAllDayEvents(calendars[i], dates);
      events.push(calendarEvents);
    } else {
      events = events.concat(
        await getCalendarAllDayEvents(calendars[i], dates)
      );
    }
  }

  return events;
}

async function getCalendarAllDayEvents(calendar, dates) {
  try {
    const timezoneOffset = new Date().getTimezoneOffset();
    const start = dates[0].subtract(timezoneOffset, "m").toDate().toJSON();
    const end = dates
      .slice(-1)[0]
      .subtract(timezoneOffset, "m")
      .toDate()
      .toJSON();
    const { data } = await axios.get(
      `/event/allday/${calendar.id}?start=${start}&end=${end}`
    );
    const style = { color: calendar.color };
    for (let item of data) {
      item.style = style;
      item.datetime = dayjs(item.datetime).add(timezoneOffset, "m");
      item.canon.datetimeStart = dayjs(item.canon.datetimeStart).add(
        timezoneOffset,
        "m"
      );
      item.canon.dateEnd = dayjs(item.canon.dateEnd).add(timezoneOffset, "m");
    }
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
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
