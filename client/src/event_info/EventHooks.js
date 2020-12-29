import { useState, useReducer } from "react";
import RRule from "rrule";
import {
  eventTemplate,
  rruleTemplate,
  getDurationTemplate,
} from "./EventTemplates";

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

  function toggleAllDay(e) {
    if (info.isAllDay) {
      infoDispatch({ type: "start", value: duration.datetimeStart.toDate() });
      infoDispatch({ type: "duration", value: duration.durationMin });
    } else {
      infoDispatch({ type: "start", value: duration.allDayStart.toDate() });
      infoDispatch({ type: "duration", value: duration.durationDay });
    }
    infoDispatch({ type: "allDay", value: e.target.checked });
  }

  function setDateRange(dateRange) {
    const durationDay = getDuration(dateRange, "day");
    infoDispatch({ type: "start", value: dateRange[0].toDate() });
    infoDispatch({ type: "duration", value: durationDay });
    setDuration({ ...duration, allDayStart: dateRange[0], durationDay });
  }

  function setSingleDate(date) {
    infoDispatch({ type: "start", value: date.toDate() });
    setDuration({ ...duration, datetimeStart: date });
  }

  function setTimeRange(timeRange) {
    const durationMin = getDuration(timeRange, "minute");
    infoDispatch({
      type: "duration",
      value: durationMin,
    });

    const hour = timeRange[0].hour();
    const min = timeRange[0].minute();
    const datetimeStart = duration.datetimeStart.hour(hour).minute(min);
    setDuration({ ...duration, datetimeStart, durationMin });
  }

  return {
    info,
    infoDispatch,
    duration,
    toggleAllDay,
    setDateRange,
    setSingleDate,
    setTimeRange,
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
    case "attendees":
      return { ...state, attendees: action.value };
    case "allDay":
      return { ...state, isAllDay: action.value };
    case "start":
      return { ...state, start: action.value };
    case "end":
      return { ...state, end: action.value };
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
    case "bysetpos":
      return { ...state, bysetpos: action.value };
    case "bymonthday":
      return { ...state, bymonthday: action.value };
    case "bymonth":
      return { ...state, bymonth: action.value };
    case "reset":
      return parseRRule(action.value);
  }
}

function getEventInfo(datetime, event) {
  if (event) {
    // modify date in controller?
    return event;
  }

  const round = Math.ceil(datetime.minute() / 15);
  eventTemplate.start = datetime.minute(round * 15).toDate();

  return eventTemplate;
}

function getEventDuration(datetime, event) {
  let template = getDurationTemplate(datetime);
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
  if (event) {
    let options = RRule.parseString(event.rrule);
    return { ...rruleTemplate, ...options };
  }

  console.log(
    RRule.fromString(
      "RRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=4FR;BYSETPOS=4"
    ).toText()
  );

  return rruleTemplate;
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

  if (options.bysetpos && !Array.isArray(options.bysetpos)) {
    text = text.replace("on ", `on the ${getPosition(options.bysetpos)} `);
  }
  return text;
}

function getPosition(i) {
  switch (i) {
    case -1:
      return "Last";
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    default:
      return `${i}th`;
  }
}
