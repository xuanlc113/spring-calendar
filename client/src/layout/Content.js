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
      let dates = getMonthDates();
      return (
        <Month
          dates={dates}
          setDate={props.setDate}
          setPeriod={props.setPeriod}
        />
      );
    } else if (props.period === "week") {
      let dates = getWeekDates();
      return <Week dates={dates} />;
    } else {
      return <Day date={props.date} />;
    }
  }

  function getMonthDates() {
    dayjs.extend(isSameOrBefore);
    let dates = [];
    let startDate = dayjs(props.date).startOf("month").startOf("week");
    let endDate = dayjs(props.date).endOf("month").endOf("week");
    while (startDate.isSameOrBefore(endDate)) {
      dates.push(startDate.toDate());
      startDate = startDate.add(1, "day");
    }
    return dates;
  }

  function getWeekDates() {
    let dates = [];
    let startDate = dayjs(props.date).startOf("week").toDate();
    for (let i = 0; i < 7; i++) {
      dates.push(startDate);
      startDate = dayjs(startDate).add(1, "day").toDate();
    }
    return dates;
  }

  return <Container>{display()}</Container>;
}
