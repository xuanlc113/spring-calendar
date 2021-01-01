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

export function getDurationTemplate(datetime) {
  return {
    datetimeStart: datetime,
    durationMin: 60,
    allDayStart: datetime,
    durationDay: 0,
  };
}
