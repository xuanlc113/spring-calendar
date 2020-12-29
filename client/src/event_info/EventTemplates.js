export const eventTemplate = {
  id: "",
  userId: "",
  title: "",
  description: "",
  attendees: [],
  start: null,
  end: null,
  duration: 60,
  isAllDay: false,
  isRecurring: false,
  rrule: "",
  exceptions: [],
};

export const rruleTemplate = {
  freq: -1,
  interval: 1,
  until: null,
  byweekday: [],
  bysetpos: [],
  bymonthday: 0,
  bymonth: 0,
  count: 0,
};

export function getDurationTemplate(datetime) {
  return {
    datetimeStart: datetime,
    durationMin: 60,
    allDayStart: datetime,
    durationDay: 0,
  };
}
