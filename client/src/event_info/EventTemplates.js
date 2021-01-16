export const eventTemplate = {
  id: "",
  userId: "",
  title: "",
  description: "",
  attendees: [],
  datetimeStart: null,
  dateEnd: null,
  duration: 60,
  allDay: false,
  recurring: false,
  rrule: "",
};

export function getDurationTemplate(datetime) {
  return {
    datetimeStart: datetime,
    durationMin: 60,
    allDayStart: datetime,
    durationDay: 0,
  };
}
