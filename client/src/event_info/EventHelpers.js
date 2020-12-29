import { Select } from "antd";

const { Option } = Select;

export function getDefaultRRules(date, option) {
  switch (option) {
    case "daily":
      return "FREQ=DAILY;INTERVAL=1";
    case "weekly":
      return `FREQ=WEEKLY;BYDAY=${getWeekAbbr(date)};INTERVAL=1`;
    case "monthly":
      return `FREQ=MONTHLY;BYSETPOS=${Math.ceil(
        date.date() / 7
      )};BYDAY=${getWeekAbbr(date)};INTERVAL=1`;

    case "monthly-last":
      return `FREQ=MONTHLY;BYSETPOS=-1;BYDAY=${getWeekAbbr(date)};INTERVAL=1`;

    case "annually":
      return `FREQ=YEARLY;BYMONTH=${
        date.month() + 1
      };BYMONTHDAY=${date.date()}`;
  }
}

export function getMonthOptions(date) {
  const week = Math.ceil(date.date() / 7);
  const lastdate = date.endOf("month").date();
  while (lastdate - 7 >= date.date()) {
    date = date.add(7, "day");
  }
  const last = Math.ceil(date.date() / 7);
  if (week === last) {
    if (week === 4) {
      return (
        <>
          <Option value="monthly">
            Monthly on the Fourth {getWeekday(date)}
          </Option>
          <Option value="monthly-last">
            Monthly on the Last {getWeekday(date)}
          </Option>
        </>
      );
    } else if (week === 5) {
      return (
        <Option value="monthly-last">
          Monthly on the Last {getWeekday(date)}
        </Option>
      );
    }
  }
  return (
    <Option value="monthly">
      Monthly on the {weekNumber[week - 1]} {getWeekday(date)}
    </Option>
  );
}

export function getWeekday(date) {
  return weekdays[date.day()];
}

function getWeekAbbr(date) {
  return weekdayAbbr[date.day()];
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

const weekNumber = ["First", "Second", "Third", "Fourth", "Last"];

const weekdayAbbr = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
