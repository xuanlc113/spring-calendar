import { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Event from "./Event";
import dayjs from "dayjs";
import Popup, { usePopup } from "../event_info/Popup";
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
  const { isVisible, openPopup, closePopup, okPopup } = usePopup();
  const [cursorDate, setCursorDate] = useState();

  useEffect(async () => {
    setEvents(await getEvents(props.date, props.calendars));
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
          <Event {...e.instance} />
        ))}
      </Board>
      <Grid date={props.date} />
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

async function getEvents(date, users) {
  let events = [];
  for (let user of users) {
    events = events.concat(await getUserEvents(date, user));
  }
  events.sort((a, b) => a.instance.datetime.diff(b.instance.datetime));
  events = positionEvents(events);
  return events;
}

async function getUserEvents(date, user) {
  try {
    const timezoneOffset = new Date().getTimezoneOffset();
    const timestamp = date.subtract(timezoneOffset, "m").toDate().toJSON();
    const { data } = await axios.get(
      `/event/${user.id}?start=${timestamp}&end=${timestamp}`
    );
    const style = { color: user.color, left: 0, z: 5 };
    for (let item of data) {
      let instance = item.instance;
      instance.style = style;
      instance.datetime = dayjs(instance.datetime);
      instance.canon.datetimeStart = dayjs(instance.canon.datetimeStart);
      instance.canon.dateEnd = dayjs(instance.canon.dateEnd);
    }
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
  //get user events, add color, add user
  // return [
  //   {
  //     id: "",
  //     canonicalEventId: "",
  //     datetime: dayjs("2021-1-1 10:30"),
  //     attendees: [
  //       { email: "attd2", status: 1 },
  //       { email: "attd3", status: 1 },
  //     ],
  //     canonicalEvent: {
  //       id: "",
  //       userId: "001",
  //       title: "run",
  //       description: "go for a run",
  //       attendees: [1000],
  //       start: "2020-12-21 10:30",
  //       end: "2021-1-09",
  //       duration: 45,
  //       isAllDay: false,
  //       isRecurring: false,
  //       rrule: "",
  //       exceptions: [],
  //     },
  //     style: { color: user.color, left: 0, z: 5 },
  //     userId: "001",
  //   },
  //   {
  //     id: "",
  //     canonicalEventId: "",
  //     datetime: dayjs("2021-1-1 11:00"),
  //     attendees: [
  //       { email: "attd2", status: 1 },
  //       { email: "attd3", status: 1 },
  //     ],
  //     canonicalEvent: {
  //       id: "",
  //       userId: "001",
  //       title: "run",
  //       description: "go for a run",
  //       attendees: [1000],
  //       start: "2020-12-21 10:30",
  //       end: "2021-1-09",
  //       duration: 45,
  //       isAllDay: false,
  //       isRecurring: false,
  //       rrule: "",
  //       exceptions: [],
  //     },
  //     style: { color: user.color, left: 0, z: 5 },
  //     userId: "001",
  //   },
  // ];

  //   [
  //     {
  //         "id": 7,
  //         "instance": {
  //             "id": 6,
  //             "canon": {
  //                 "id": 1,
  //                 "user": {
  //                     "id": "3f46d3de-2441-4750-ae01-19253e632db9",
  //                     "email": "test3"
  //                 },
  //                 "title": "event3",
  //                 "description": "desc",
  //                 "attendees": [],
  //                 "datetimeStart": "2021-01-10T16:30:00Z",
  //                 "dateEnd": "2021-01-29T00:00:00Z",
  //                 "duration": 45,
  //                 "rrule": "FREQ=WEEKLY;BYDAY=SU,TU;INTERVAL=1",
  //                 "recurring": true,
  //                 "allDay": false
  //             },
  //             "datetime": "2021-01-17T00:00:00Z"
  //         },
  //         "user": {
  //             "id": "3f46d3de-2441-4750-ae01-19253e632db9",
  //             "email": "test3"
  //         },
  //         "status": "ACCEPTED",
  //         "deleted": false
  //     },
  //     {
  //         "id": 9,
  //         "instance": {
  //             "id": 8,
  //             "canon": {
  //                 "id": 1,
  //                 "user": {
  //                     "id": "3f46d3de-2441-4750-ae01-19253e632db9",
  //                     "email": "test3"
  //                 },
  //                 "title": "event3",
  //                 "description": "desc",
  //                 "attendees": [],
  //                 "datetimeStart": "2021-01-10T16:30:00Z",
  //                 "dateEnd": "2021-01-29T00:00:00Z",
  //                 "duration": 45,
  //                 "rrule": "FREQ=WEEKLY;BYDAY=SU,TU;INTERVAL=1",
  //                 "recurring": true,
  //                 "allDay": false
  //             },
  //             "datetime": "2021-01-19T00:00:00Z"
  //         },
  //         "user": {
  //             "id": "3f46d3de-2441-4750-ae01-19253e632db9",
  //             "email": "test3"
  //         },
  //         "status": "ACCEPTED",
  //         "deleted": false
  //     },
  //   {
  //     "id": 22,
  //     "instance": {
  //         "id": 21,
  //         "canon": {
  //             "id": 14,
  //             "user": {
  //                 "id": "3f46d3de-2441-4750-ae01-19253e632db9",
  //                 "email": "test3"
  //             },
  //             "title": "event3",
  //             "description": "desc",
  //             "attendees": [
  //                 {
  //                     "id": "ebd6ae48-c3d0-4884-8b2c-b470908db7a9",
  //                     "email": "test2"
  //                 }
  //             ],
  //             "datetimeStart": "2021-01-10T16:30:00Z",
  //             "dateEnd": "2021-01-29T00:00:00Z",
  //             "duration": 45,
  //             "rrule": "FREQ=WEEKLY;BYDAY=SU,TU;INTERVAL=1",
  //             "recurring": true,
  //             "allDay": false
  //         },
  //         "datetime": "2021-01-17T00:00:00Z"
  //     },
  //     "user": {
  //         "id": "3f46d3de-2441-4750-ae01-19253e632db9",
  //         "email": "test3"
  //     },
  //     "status": "ACCEPTED",
  //     "deleted": false
  // },
  // {
  //     "id": 25,
  //     "instance": {
  //         "id": 24,
  //         "canon": {
  //             "id": 14,
  //             "user": {
  //                 "id": "3f46d3de-2441-4750-ae01-19253e632db9",
  //                 "email": "test3"
  //             },
  //             "title": "event3",
  //             "description": "desc",
  //             "attendees": [
  //                 {
  //                     "id": "ebd6ae48-c3d0-4884-8b2c-b470908db7a9",
  //                     "email": "test2"
  //                 }
  //             ],
  //             "datetimeStart": "2021-01-10T16:30:00Z",
  //             "dateEnd": "2021-01-29T00:00:00Z",
  //             "duration": 45,
  //             "rrule": "FREQ=WEEKLY;BYDAY=SU,TU;INTERVAL=1",
  //             "recurring": true,
  //             "allDay": false
  //         },
  //         "datetime": "2021-01-19T00:00:00Z"
  //     },
  //     "user": {
  //         "id": "3f46d3de-2441-4750-ae01-19253e632db9",
  //         "email": "test3"
  //     },
  //     "status": "ACCEPTED",
  //     "deleted": false
  // },
  // ]
}

function positionEvents(events) {
  for (let i = 0; i < events.length; i++) {
    let event = events[i].instance;
    let start = event.datetime.unix();
    let end = getEndUnix(event);
    let top = (getTimeInMinutes(event) / 15) * 10;
    let height = (event.canon.duration / 15) * 10;
    let prev = 0;
    let next = 0;
    let j = i - 1;
    let k = i + 1;
    while (j >= 0 && getEndUnix(events[j].instance) > start) {
      prev++;
      j--;
    }
    while (k < events.length && events[k].instance.datetime.unix() < end) {
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
  return event.datetime.unix() + event.canon.duration * 60;
}

function getTimeInMinutes(event) {
  return (event.datetime.unix() - event.datetime.startOf("day").unix()) / 60;
}
