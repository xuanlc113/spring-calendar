import { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Event from "./Event";
import dayjs from "dayjs";
import axios from "axios";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Board = styled.div`
  position: relative;
  width: 95%;
`;

export default function Schedule(props) {
  const [events, setEvents] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    (async function () {
      setEvents(await getEvents(props.date, props.calendars));
    })();
  }, [props.calendars, update]);

  function refresh() {
    setUpdate(!update);
  }

  function openCursorPopup(event) {
    const height = event.target.offsetTop / 10;
    let date = props.date.startOf("day").add(height * 15, "minute");
    props.openPopup("Create Event", date, null);
  }

  return (
    <>
      <Container onClick={openCursorPopup}>
        <Board>
          {events.map((e) => (
            <Event {...e} openPopup={props.openPopup} refresh={refresh} />
          ))}
        </Board>
        <Grid date={props.date} />
      </Container>
    </>
  );
}

async function getEvents(date, users) {
  let events = [];
  for (let user of users) {
    events = events.concat(await getUserEvents(date, user));
  }
  events.sort((a, b) => a.datetime.diff(b.datetime));
  events = positionEvents(events);
  return events;
}

async function getUserEvents(date, user) {
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

function positionEvents(events) {
  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    let start = event.datetime.unix();
    let end = getEndUnix(event);
    let top = (getTimeInMinutes(event) / 15) * 10;
    let height = (event.canon.duration / 15) * 10;
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
  return event.canon.datetimeStart.unix() + event.canon.duration * 60;
}

function getTimeInMinutes(event) {
  const datetime = event.canon.datetimeStart;
  return (datetime.unix() - datetime.startOf("day").unix()) / 60;
}
