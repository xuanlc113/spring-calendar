import styled from "styled-components";
import dayjs from "dayjs";
import EventPopover from "../event_info/EventPopover";
import { Popover } from "antd";

const Container = styled.div`
  position: relative;
  width: ${(props) =>
    props.end ? props.width : `calc(${props.width}% - 1rem)`}%;
  left: ${(props) => props.left}%;
  background: lightblue;
  border-top-left-radius: ${(props) => (props.start ? "5px" : 0)};
  border-bottom-left-radius: ${(props) => (props.start ? "5px" : 0)};
  border-top-right-radius: ${(props) => (props.end ? "5px" : 0)};
  border-bottom-right-radius: ${(props) => (props.end ? "5px" : 0)};
`;

export default function AllDayEvent(props) {
  let width, left, start, end, startDate;
  if (props.event.datetime.diff(dayjs(props.dates[0]), "day") < 0) {
    left = 0;
    start = false;
    startDate = dayjs(props.dates[0]);
  } else if (props.event.datetime.diff(dayjs(props.dates[0]), "day") === 0) {
    left = 0;
    start = true;
    startDate = props.event.datetime;
  } else {
    left = props.event.datetime.day() * (100 / 7);
    start = true;
    startDate = props.event.datetime;
  }

  let endDate = getEndDate(props.event);
  if (endDate.diff(dayjs(props.dates.slice(-1)[0]), "day") < 0) {
    width = (props.event.canonicalEvent.duration - 1) * (100 / 7);
    end = false;
  } else if (endDate.diff(dayjs(props.dates.slice(-1)[0]), "day") === 0) {
    width =
      (dayjs(props.dates.slice(-1)[0]).diff(startDate.startOf("day"), "day") +
        1) *
      (100 / 7);
    end = true;
  } else {
    width =
      (dayjs(props.dates.slice(-1)[0]).diff(startDate.startOf("day"), "day") +
        1) *
      (100 / 7);
    end = true;
  }

  return (
    <Popover
      placement="bottomLeft"
      trigger="click"
      content={<EventPopover />}
      zIndex={800}
    >
      <Container width={width} left={left} start={start} end={end}>
        asd
      </Container>
    </Popover>
  );
}

function getEndDate(event) {
  return event.datetime.add(event.canonicalEvent.duration, "day");
}
