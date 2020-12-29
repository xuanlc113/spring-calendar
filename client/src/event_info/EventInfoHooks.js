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
  const [info, infoDispatch] = useReducer(
    infoReducer,
    getEventInfo(datetime, event)
  );
  const [duration, setDuration] = useState(getEventDuration(datetime, event));
  const [options, optionsDispatch] = useReducer(
    optionsReducer,
    parseRRule(event)
  );

  return {
    info,
    infoDispatch,
    duration,
    setDuration,
    options,
    optionsDispatch,
  };
}

function infoReducer(state, action) {
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
    case "recurring":
      return { ...state, isRecurring: action.value };
    case "rrule":
      return { ...state, rrule: action.value };
  }
}

function optionsReducer(state, action) {
  switch (action.type) {
    case "freq":
      return { ...state, freq: action.value };
    case "interval":
      return { ...state, interval: action.value };
    case "until":
      return { ...state, until: action.value };
    case "count":
      return { ...state, count: action.value };
    case "byweekday":
      return { ...state, byweekday: action.value };
    case "byweekno":
      return { ...state, byweekno: action.value };
    case "bymonthday":
      return { ...state, bymonthday: action.value };
    case "bymonth":
      return { ...state, bymonth: action.value };
    case "reset":
      return {
        freq: -1,
        interval: 1,
        until: null,
        byweekday: [],
        byweekno: 0,
        bymonthday: 0,
        bymonth: 0,
        count: 0,
      };
  }
}

function getEventInfo(datetime, event) {
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

function parseRRule(event) {
  let template = {
    freq: -1,
    interval: 1,
    until: null,
    byweekday: [],
    byweekno: 0,
    bymonthday: 0,
    bymonth: 0,
    count: 0,
  };

  if (event) {
    let options = RRule.parseString(event.rrule);
    template = { ...template, ...options };
  }

  return template;
}

export function getRepeatValue(options) {
  if (options.freq === -1) {
    return "none";
  }
  let text = new RRule(options).toText();
  text = text
    .replace("every 1 days", "Daily")
    .replace("every 1 weeks", "Weekly")
    .replace("every 1 months", "Monthly")
    .replace("every 1 years", "Annually")
    .replace("every", "Every");

  return text;
}
