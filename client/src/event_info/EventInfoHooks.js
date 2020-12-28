import { useState, useReducer } from "react";
import RRule, { RRuleSet, rrulestr } from "rrule";
import dayjs from "dayjs";

export function getUsers() {
  return [
    { label: "sersd", value: "asdf" },
    { label: "aesd", value: "ghjk" },
    { label: "zxcsd", value: "zxcv" },
  ];
}

export function useEvent(datetime, event) {
  const [info, dispatchInfo] = useReducer(
    reducer,
    getEventInfo(datetime, event)
  );
  const [duration, setDuration] = useState(getEventDuration(datetime, event));
  const [options, setOptions] = useState(parseRRule());

  return { info, dispatchInfo, duration, setDuration, options, setOptions };
}

function reducer(state, action) {
  switch (action.type) {
    case "title":
      return { ...state, title: action.value };
    case "description":
      return { ...state, description: action.value };
    case "participants":
      return { ...state, participants: action.value };
    case "allDay":
      return { ...state, isAllDay: action.value };
    case "start":
      return { ...state, start: action.value.toDate() };
    case "duration":
      return { ...state, duration: action.value };
  }
}

function getEventInfo(datetime, event = 0) {
  if (event) {
    // modify date in controller?
    return event;
  }

  const round = Math.ceil(datetime.minute() / 15);

  const eventTemplate = {
    id: "",
    userId: "",
    title: "",
    description: "",
    attendees: [], //id number
    start: datetime.minute(round * 15).toDate(),
    end: null,
    duration: 60,
    isAllDay: false,
    isRecurring: false,
    rrule: "",
    exceptions: [],
  };

  return eventTemplate;
}

function getEventDuration(datetime, event) {
  let template = {
    datetimeStart: datetime,
    durationMin: 60,
    allDayStart: datetime,
    durationDay: 0,
  };

  if (event) {
    if (event.isAllDay) {
      template.allDayStart = event.start;
      template.durationDay = event.duration;
    } else {
      template.datetimeStart = event.start;
      template.durationMin = event.duration;
    }

    return template;
  }

  const round = Math.ceil(datetime.minute() / 15);
  template.datetimeStart = datetime.minute(round * 15);
  return template;
}

export function getDuration(dates, type) {
  return dates[1].diff(dates[0], type);
}

export function parseRRule() {
  // let rrule = RRule.parseString("RRULE:FREQ=MONTHLY;BYDAY=-1TH,3TH");
  // console.log(rrule);
  // rrule > toText > parseText > options
  const options = {
    freq: "",
    interval: 0,
    wkst: "",
    until: null,
    byweekno: [],
    byweekDay: [],
    bymonthDay: 0,
  };
  return options;
}

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
