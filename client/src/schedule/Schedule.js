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
  events.sort((a, b) => a.event.start - b.event.start);
  events = positionEvents(events);
  return events;
}

function getUserEvents(date, user) {
  //get user events, add color
  return [
    {
      event: {
        userId: "userid1234",
        title: "run",
        description: "go for a run",
        datetime: "2020-12-21 10:23", // '2004-10-19 10:23:54' need?
        duration: 45 * 60,
        participants: [{ name: "sdf" }],
      },
      style: { color: user.color },
    },
  ];
}

function positionEvents(events) {
  for (let i = 0; i < events.length; i++) {
    let start = dayjs(events[i].event.datetime).unix();
    let end = start + events[i].event.duration;
    console.log(start);
    let top = ((start - dayjs().startOf("day").unix()) / 900) * 10;
    let height = ((end - start) / 900) * 10;
    let prev = 0;
    let next = 0;
    let j = i - 1;
    let k = i + 1;
    while (
      j >= 0 &&
      dayjs(events[j].event.datetime).unix() + events[j].event.duration >= start
    ) {
      prev++;
      j--;
    }
    while (k < events.length && dayjs(events[k].event.datetime).unix() <= end) {
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
