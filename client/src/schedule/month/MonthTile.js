import { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import MonthAllDayEvent from "./MonthAllDayEvent";
import MonthDayEvent from "./MonthDayEvent";
import axios from "axios";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  & > p {
    margin: 0;
    color: ${(props) => (props.isSameMonth ? "black" : "#cbcbcb")};
  }
`;

const Ellipsis = styled.div`
  position: relative;
  top: -5px;
  height: 1em;
`;

dayjs.extend(isBetween);

export default function MonthTile(props) {
  const { allDayEvents } = useAllDay(
    props.calendars,
    props.weekStart,
    props.weekEnd,
    props.update
  );

  const { dayEvents } = useDayEvents(props.calendars, props.date, props.update);

  function isSameMonth() {
    return props.date.month() === props.currentDate.month();
  }

  function viewDay() {
    props.setDateOnly(props.date.toDate());
    props.setPeriod("day");
  }

  function getAllDayEvents() {
    const events = [];
    for (let i = 0; i < allDayEvents.length && i < 2; i++) {
      events.push(
        <MonthAllDayEvent
          event={allDayEvents[i]}
          date={props.date}
          openPopup={props.openPopup}
          refresh={props.refresh}
        />
      );
    }
    return events;
  }

  function getDayEvents(num = 2) {
    let events = [];
    for (let i = 0; i < dayEvents.length && i < num; i++) {
      events.push(
        <MonthDayEvent
          event={dayEvents[i]}
          openPopup={props.openPopup}
          refresh={props.refresh}
        />
      );
    }
    return events;
  }

  function getTotalEvents() {
    let total = 0;
    for (let event of allDayEvents) {
      if (
        props.date.isBetween(
          event.datetime,
          event.datetime.add(event.canon.duration, "d"),
          "d",
          "[]"
        )
      ) {
        total++;
      }
    }
    total += dayEvents.length;
    return total;
  }

  function showEvents() {
    const total = getTotalEvents();
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
    <Container isSameMonth={isSameMonth()}>
      <p onClick={viewDay}>{props.date.date()}</p>
      {showEvents()}
    </Container>
  );
}

function useAllDay(calendars, start, end, update) {
  const [allDayEvents, setAllDayEvents] = useState([]);

  useEffect(() => {
    (async function () {
      setAllDayEvents(await getAllDayEvents(calendars, start, end));
    })();
  }, [calendars, update]);

  return { allDayEvents };
}

async function getAllDayEvents(calendars, start, end) {
  let events = [];
  for (let i = 0; i < calendars.length; i++) {
    events = events.concat(
      await getCalendarAllDayEvents(calendars[i], start, end)
    );
  }

  return events;
}

async function getCalendarAllDayEvents(calendar, start, end) {
  try {
    const timezoneOffset = new Date().getTimezoneOffset();
    start = start.startOf("d").subtract(timezoneOffset, "m").toJSON();
    end = end.startOf("d").subtract(timezoneOffset, "m").toJSON();
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
      item.owner = calendar.id;
    }
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function useDayEvents(calendars, date, update) {
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    (async function () {
      setDayEvents(await getDayEvents(calendars, date));
    })();
  }, [calendars, update]);

  return { dayEvents };
}

async function getDayEvents(calendars, date) {
  let events = [];
  for (let calendar of calendars) {
    events = events.concat(await getEvents(calendar, date));
  }
  events.sort((a, b) => a.datetime.diff(b.datetime));
  return events;
}

async function getEvents(user, date) {
  try {
    const timezoneOffset = new Date().getTimezoneOffset();
    const timestamp = date.startOf("d").subtract(timezoneOffset, "m").toJSON();
    const { data } = await axios.get(
      `/event/${user.id}?start=${timestamp}&end=${timestamp}`
    );
    const style = { color: user.color, left: 0, z: 5 };
    for (let item of data) {
      item.style = style;
      item.datetime = dayjs(item.datetime).add(timezoneOffset, "m");
      item.canon.datetimeStart = dayjs(item.canon.datetimeStart).add(
        timezoneOffset,
        "m"
      );
      item.canon.dateEnd = dayjs(item.canon.dateEnd).add(timezoneOffset, "m");
      item.owner = user.id;
    }
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
