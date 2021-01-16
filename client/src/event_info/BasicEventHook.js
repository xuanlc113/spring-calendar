import dayjs from "dayjs";
import { useState, useReducer, useEffect, useContext } from "react";
import RRule, { rrulestr } from "rrule";
import { UserContext } from "../App";
import { getDurationTemplate, getEventTemplate } from "./EventTemplates";

export function useBasicEvent(datetime, event) {
  const userId = useContext(UserContext);
  const [info, infoDispatch] = useReducer(
    infoReducer,
    getEventInfo(datetime, event, userId)
  );
  const [duration, setDuration] = useState(getEventDuration(datetime, event));
  const [repeatLabel, setRepeatLabel] = useState(getRepeatValue(info.rrule));

  function toggleAllDay(e) {
    if (info.isAllDay) {
      infoDispatch({ type: "start", value: duration.datetimeStart });
      infoDispatch({ type: "duration", value: duration.durationMin });
    } else {
      infoDispatch({ type: "start", value: duration.allDayStart });
      infoDispatch({ type: "duration", value: duration.durationDay });
    }
    infoDispatch({ type: "allDay", value: e.target.checked });
  }

  function setDateRange(dateRange) {
    const durationDay = getDuration(dateRange, "day");
    infoDispatch({ type: "start", value: dateRange[0] });
    infoDispatch({ type: "duration", value: durationDay });
    setDuration({ ...duration, allDayStart: dateRange[0], durationDay });
  }

  function setSingleDate(date) {
    infoDispatch({ type: "start", value: date });
    setDuration({ ...duration, datetimeStart: date });
  }

  function setTimeRange(timeRange) {
    const durationMin = getDuration(timeRange, "minute");
    infoDispatch({ type: "duration", value: durationMin });
    const hour = timeRange[0].hour();
    const min = timeRange[0].minute();
    const datetimeStart = duration.datetimeStart.hour(hour).minute(min);
    setDuration({ ...duration, datetimeStart, durationMin });
    infoDispatch({ type: "start", value: datetimeStart });
  }

  useEffect(() => {
    setRepeatLabel(getRepeatValue(info.rrule));
  }, [info.rrule]);

  return {
    info,
    infoDispatch,
    duration,
    toggleAllDay,
    setDateRange,
    setSingleDate,
    setTimeRange,
    repeatLabel,
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
      return { ...state, allDay: action.value };
    case "start":
      return { ...state, datetimeStart: action.value };
    case "end":
      return { ...state, dateEnd: action.value };
    case "duration":
      return { ...state, duration: action.value };
    case "recurring":
      return { ...state, recurring: action.value };
    case "rrule":
      return { ...state, rrule: action.value };
  }
}

function getEventInfo(datetime, event, userId) {
  if (event) {
    return event;
  }

  const round = Math.ceil(datetime.minute() / 15);
  const template = getEventTemplate(userId);
  template.datetimeStart = datetime.minute(round * 15);

  return template;
}

function getEventDuration(datetime, event) {
  let template = getDurationTemplate(datetime);
  if (event) {
    if (event.allDay) {
      template.durationDay = event.duration;
    } else {
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

export function getRepeatValue(rrule) {
  if (rrule === "") {
    return "none";
  }
  let text = rrulestr(rrule).toText();
  text = text
    .replace("every day ", "Daily ")
    .replace("every week ", "Weekly ")
    .replace("every month ", "Monthly ")
    .replace("every year ", "Annually ")
    .replace("every", "Every");

  let options = RRule.parseString(rrule);
  if (options.bysetpos) {
    text = text.replace("on ", `on the ${getPosition(options.bysetpos)} `);
  }

  if (text.length > 50) {
    return text.substr(0, 50) + "...";
  }

  return text;
}

function getPosition(i) {
  switch (i) {
    case -1:
      return "Last";
    case 1:
      return "First";
    case 2:
      return "Second";
    case 3:
      return "Third";
    case 4:
      return "Fourth";
  }
}
