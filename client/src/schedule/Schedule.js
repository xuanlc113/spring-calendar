import { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Event from "./Event";
import dayjs from "dayjs";
import Popup, { usePopup } from "../event_info/Popup";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Board = styled.div`
  position: relative;
  width: 95%;
`;

export default function Schedule(props) {
  const [events, setEvents] = useState(getEvents(props.date, props.calendars)); //not all day, within one day
  const { isVisible, openPopup, closePopup, okPopup } = usePopup();
  const [cursorDate, setCursorDate] = useState();

  useEffect(() => {
    setEvents(getEvents(props.date, props.calendars));
  }, [props.calendars]);

  function openCursorPopup(event) {
    const height = event.target.offsetTop / 10;
    let date = props.date.startOf("day").add(height * 15, "minute");
    setCursorDate(date);
    openPopup();
  }

  return (
    <Container onClick={openCursorPopup}>
      <Board>
        {events.map((e) => (
          <Event {...e} />
        ))}
      </Board>
      <Grid />
      {isVisible && (
        <Popup
          okPopup={okPopup}
          closePopup={closePopup}
          title={"Create Event"}
          date={cursorDate}
        />
      )}
    </Container>
  );
}

function getEvents(date, users) {
  let events = [];
  for (let user of users) {
    events = events.concat(getUserEvents(date, user));
  }
  events.sort((a, b) => a.datetime.diff(b.datetime));
  events = positionEvents(events);
  return events;
}

function getUserEvents(date, user) {
  //get user events, add color, add user
  return [
    {
      id: "",
      canonicalEventId: "",
      datetime: dayjs("2021-1-1 10:30"),
      attendees: [
        { email: "attd2", status: 1 },
        { email: "attd3", status: 1 },
      ],
      canonicalEvent: {
        id: "",
        userId: "001",
        title: "run",
        description: "go for a run",
        attendees: [1000],
        start: "2020-12-21 10:30",
        end: "2021-1-09",
        duration: 45,
        isAllDay: false,
        isRecurring: false,
        rrule: "",
        exceptions: [],
      },
      style: { color: user.color, left: 0, z: 5 },
      userId: "001",
    },
    {
      id: "",
      canonicalEventId: "",
      datetime: dayjs("2021-1-1 11:00"),
      attendees: [
        { email: "attd2", status: 1 },
        { email: "attd3", status: 1 },
      ],
      canonicalEvent: {
        id: "",
        userId: "001",
        title: "run",
        description: "go for a run",
        attendees: [1000],
        start: "2020-12-21 10:30",
        end: "2021-1-09",
        duration: 45,
        isAllDay: false,
        isRecurring: false,
        rrule: "",
        exceptions: [],
      },
      style: { color: user.color, left: 0, z: 5 },
      userId: "001",
    },
  ];
}

function positionEvents(events) {
  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    let start = event.datetime.unix();
    let end = getEndUnix(event);
    let top = (getTimeInMinutes(event) / 15) * 10;
    let height = (event.canonicalEvent.duration / 15) * 10;
    let prev = 0;
    let next = 0;
    let j = i - 1;
    let k = i + 1;
    while (j >= 0 && getEndUnix(events[j]) > start) {
      prev++;
      j--;
    }
    while (k < events.length && events[k].datetime.unix() < end) {
      next++;
      k++;
    }
    let left =
      prev > 0
        ? events[j + 1].style.left > 0
          ? 0
          : (100 / (prev + next + 1)) * prev
        : 0;
    if (prev > 0) {
      if (events[j + 1].style.left > 0) {
        prev = 0;
      }
    }
    let width =
      next === 0
        ? prev === 0
          ? 100
          : 100 / (prev + 1)
        : (17 / 20) * (2 / (prev + next + 1)) * 100;

    let z = prev === 0 ? 5 : events[j + 1].style.z + 1;
    event.style = {
      ...event.style,
      top,
      height,
      left,
      width,
      z,
    };
  }
  return events;
}

function getEndUnix(event) {
  return event.datetime.unix() + event.canonicalEvent.duration * 60;
}

function getTimeInMinutes(event) {
  return (event.datetime.unix() - event.datetime.startOf("day").unix()) / 60;
}
