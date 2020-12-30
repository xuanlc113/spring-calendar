import { useContext, useState } from "react";
import { UserContext } from "../App";
import styled from "styled-components";
import Grid from "./Grid";
import Event from "./Event";
import dayjs from "dayjs";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Board = styled.div`
  position: relative;
  width: 95%;
`;

export default function Schedule(props) {
  const user = useContext(UserContext); //remove reminders
  const [events, setEvents] = useState(getEvents(props.date, props.calendars)); //not all day, within one day

  return (
    <Container>
      <Board>
        {events.map((e) => (
          <Event {...e} />
        ))}
      </Board>
      <Grid />
    </Container>
  );
}

function getEvents(date, users) {
  let events = [];
  for (let user of users) {
    events = events.concat(getUserEvents(date, user));
  }
  events.sort((a, b) => a.datetime - b.datetime);
  events = positionEvents(events);
  return events;
}

function getUserEvents(date, user) {
  //get user events, add color, add user
  return [
    {
      id: "",
      canonicalEventId: "",
      datetime: "2020-12-30 10:30",
      attendees: [
        { email: "attd2", status: 1 },
        { email: "attd2", status: 1 },
        { email: "attd2", status: 1 },
        { email: "attd2", status: 1 },
        { email: "attd2", status: 1 },
      ],
      canonicalEvent: {
        id: "",
        userId: "002",
        title: "run",
        description: "go for a run",
        attendees: [1000],
        start: "2020-12-21 10:30",
        end: "2021-1-09",
        duration: 45,
        isAllDay: false,
        isRecurring: true,
        rrule: "",
        exceptions: [],
      },
      style: { color: user.color },
      userId: "002",
    },
  ];
}

function positionEvents(events) {
  for (let i = 0; i < events.length; i++) {
    let start = dayjs(events[i].datetime).unix();
    let end = start + events[i].canonicalEvent.duration * 60;
    console.log(start);
    let top = ((start - dayjs().startOf("day").unix()) / 900) * 10;
    let height = ((end - start) / 900) * 10;
    let prev = 0;
    let next = 0;
    let j = i - 1;
    let k = i + 1;
    while (
      j >= 0 &&
      dayjs(events[j].datetime).unix() + events[j].canonicalEvent.duration >=
        start
    ) {
      prev++;
      j--;
    }
    while (k < events.length && dayjs(events[k].datetime).unix() <= end) {
      next++;
      k++;
    }
    let left = (100 / (prev + next + 1)) * prev;
    let width =
      next === 0
        ? prev === 0
          ? 100
          : 100 / (prev + 1)
        : (17 / 20) * (2 / (prev + next + 1)) * 100;
    events[i].style = {
      ...events[i].style,
      top,
      height,
      left,
      width,
      z: i + 5,
    };
  }
  return events;
}
