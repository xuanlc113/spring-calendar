import styled from "styled-components";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Month from "../schedule/month/Month";
import Week from "../schedule/week/Week";
import Day from "../schedule/day/Day";

const Container = styled.div`
  flex: 19;
  min-height: 0;
  margin: 0 1rem 1rem 1rem;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
`;

export default function Content(props) {
  function display() {
    if (props.period === "month") {
      let dates = getMonthDates(props.date);
      return (
        <Month
          dates={dates}
          currentDate={props.date}
          setDateOnly={props.setDateOnly}
          setPeriod={props.setPeriod}
          calendars={props.calendars}
          openPopup={props.openPopup}
          reload={props.reload}
        />
      );
    } else if (props.period === "week") {
      let dates = getWeekDates(props.date);
      return (
        <Week
          dates={dates}
          calendars={props.calendars}
          openPopup={props.openPopup}
          reload={props.reload}
        />
      );
    } else {
      return (
        <Day
          date={props.date}
          calendars={props.calendars}
          openPopup={props.openPopup}
          reload={props.reload}
        />
      );
    }
  }

  return <Container>{display()}</Container>;
}

function getMonthDates(date) {
  dayjs.extend(isSameOrBefore);
  let dates = [];
  let startDate = date.startOf("month").startOf("week");
  let endDate = date.endOf("month").endOf("week");
  while (startDate.isSameOrBefore(endDate)) {
    dates.push(startDate);
    startDate = startDate.add(1, "day");
  }
  return dates;
}

function getWeekDates(date) {
  let dates = [];
  let startDate = date.startOf("week");
  for (let i = 0; i < 7; i++) {
    dates.push(startDate);
    startDate = startDate.add(1, "day");
  }
  return dates;
}
