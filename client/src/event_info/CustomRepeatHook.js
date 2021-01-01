import { useState, useReducer } from "react";
import RRule from "rrule";

export default function useCustomRepeat(rrule, date) {
  const [options, optionsDispatch] = useReducer(
    optionsReducer,
    parseRRule(rrule, date)
  );
  const [count, setCount] = useState(5);
  const [until, setUntil] = useState(date);

  function changePeriod(period, date) {
    optionsDispatch({
      type: "custom",
      value: getDefaultPeriodOptions(period, date),
    });
  }

  function isWeekdaySelected(weekday) {
    return options.byweekday.includes(weekday);
  }

  function toggleWeekday(weekday) {
    if (options.byweekday.includes(weekday)) {
      if (options.byweekday.length > 1) {
        const weekdays = options.byweekday.filter((i) => i != weekday);
        optionsDispatch({ type: "byweekday", value: weekdays });
      }
    } else {
      let weekdays = options.byweekday;
      weekdays.push(weekday);
      weekdays.sort();
      optionsDispatch({ type: "byweekday", value: options.byweekday });
    }
  }

  function changeMonthRepeat(type, date) {
    optionsDispatch({
      type: "custom",
      value: getMonthRepeatOptions(type, date),
    });
  }

  function getMonthValue() {
    if (options.bymonthday) {
      return "monthly-date";
    }
    if (options.bysetpos === -1) {
      return "monthly-last";
    }
    return "monthly";
  }

  function getEnd() {
    if (options.count) {
      return 3;
    }
    if (options.until) {
      return 2;
    }
    return 1;
  }

  function setEnd(value) {
    switch (value) {
      case 1:
        setRepeatForever();
        break;
      case 2:
        setRepeatUntil();
        break;
      case 3:
        setRepeatCount();
        break;
    }
  }

  function setRepeatForever() {
    optionsDispatch({ type: "count", value: 0 });
    optionsDispatch({ type: "until", value: null });
  }

  function setRepeatUntil() {
    optionsDispatch({ type: "count", value: 0 });
    optionsDispatch({ type: "until", value: until.toDate() });
  }

  function setRepeatCount() {
    optionsDispatch({ type: "until", value: null });
    optionsDispatch({ type: "count", value: count });
  }

  function changeCount(num) {
    setCount(num);
    optionsDispatch({ type: "count", value: num });
  }

  function changeUntil(date) {
    setUntil(date);
    optionsDispatch({ type: "until", value: date.toDate() });
  }

  return {
    options,
    optionsDispatch,
    changePeriod,
    isWeekdaySelected,
    toggleWeekday,
    changeMonthRepeat,
    getMonthValue,
    getEnd,
    setEnd,
    count,
    changeCount,
    until,
    changeUntil,
  };
}

function optionsReducer(state, action) {
  switch (action.type) {
    case "interval":
      return { ...state, interval: action.value };
    case "until": {
      if (action.value) {
        return { ...state, until: action.value };
      }
      const { until, ...newState } = state;
      return newState;
    }
    case "count": {
      if (action.value) {
        return { ...state, count: action.value };
      }
      const { count, ...newState } = state;
      return newState;
    }
    case "byweekday":
      return { ...state, byweekday: action.value };
    case "custom": {
      const { dtstart, count, until } = state;
      const newState = { ...action.value, dtstart, until, count };
      Object.keys(newState).forEach((key) =>
        newState[key] === undefined ? delete newState[key] : {}
      );
      return newState;
    }
  }
}

function parseRRule(rrule, date) {
  if (rrule) {
    const options = RRule.parseString(rrule);
    if (options.byweekday) {
      options.byweekday = options.byweekday.map((i) => i.weekday);
    }
    return options;
  }
  return { freq: 3, interval: 1, dtstart: date.toDate() };
}

function getDefaultPeriodOptions(val, date) {
  switch (val) {
    case 0:
      return {
        freq: 0,
        interval: 1,
        bymonth: date.month() + 1,
        bymonthday: date.date(),
      };
    case 1:
      return {
        freq: 1,
        interval: 1,
        bymonthday: date.date(),
      };
    case 2:
      let day = date.day() === 0 ? 6 : date.day() - 1;
      return {
        freq: 2,
        interval: 1,
        byweekday: [day],
      };
    case 3:
      return {
        freq: 3,
        interval: 1,
      };
  }
}

function getMonthRepeatOptions(type, date) {
  let day = date.day() === 0 ? 6 : date.day() - 1;
  switch (type) {
    case "monthly-date":
      return {
        freq: 1,
        interval: 1,
        bymonthday: date.date(),
      };
    case "monthly-last":
      return {
        freq: 1,
        interval: 1,
        byweekday: [day],
        bysetpos: -1,
      };
    case "monthly":
      return {
        freq: 1,
        interval: 1,
        byweekday: [day],
        bysetpos: Math.ceil(date.date() / 7),
      };
  }
}
