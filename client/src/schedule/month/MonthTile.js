import { useState, useEffect } from "react";
import dayjs from "dayjs";
import MonthAllDayEvent from "./MonthAllDayEvent";

export default function MonthTile(props) {
  const { allDayEvents } = useAllDay(
    props.calendars,
    props.weekStart,
    props.weekEnd
  );

  function viewDay() {
    props.setDateOnly(props.date.toDate());
    props.setPeriod("day");
  }

  function getAllDayEvents() {
    return allDayEvents.map((event) => (
      <MonthAllDayEvent event={event} date={props.date} />
    ));
  }

  return (
    <div className="month-tile">
      <p onClick={viewDay} style={{ margin: 0 }}>
        {props.date.date()}
      </p>
      {getAllDayEvents()}
    </div>
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
