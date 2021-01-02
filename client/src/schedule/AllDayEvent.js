import styled from "styled-components";
import EventPopover from "../event_info/EventPopover";
import { Popover } from "antd";

const Container = styled.div`
  position: relative;
  width: ${(props) => props.width}%;
  left: ${(props) => props.left}%;
`;

const Flag = styled.div`
  width: calc(100% - 4px);
  margin: 2px;
  background: lightblue;
  border-top-left-radius: ${(props) => (props.start ? "5px" : 0)};
  border-bottom-left-radius: ${(props) => (props.start ? "5px" : 0)};
  border-top-right-radius: ${(props) => (props.end ? "5px" : 0)};
  border-bottom-right-radius: ${(props) => (props.end ? "5px" : 0)};

  & > p {
    margin-bottom: 0;
    margin-left: 5px;
    font-weight: 600;
  }
`;

export default function AllDayEvent(props) {
  return (
    <Popover
      placement="bottomLeft"
      trigger="click"
      content={<EventPopover {...props.event} />}
      zIndex={800}
    >
      <Container
        width={
          props.type === "week" ? getWidth(props.event, props.dateRange) : 100
        }
        left={props.type === "week" ? getLeft(props.event, props.dateRange) : 0}
      >
        <Flag
          start={hasStart(props.event, props.dateRange)}
          end={hasEnd(props.event, props.dateRange)}
        >
          <p>{props.event.canonicalEvent.title}</p>
        </Flag>
      </Container>
    </Popover>
  );
}

function getEndDate(event) {
  let eventStart = event.datetime.startOf("day");
  return eventStart.add(event.canonicalEvent.duration, "day");
}

function getLeft(event, dateRange) {
  let rangeStart = dateRange[0];
  if (event.datetime.diff(rangeStart, "day") > 0) {
    return event.datetime.day() * (100 / 7);
  }
  return 0;
}

function hasStart(event, dateRange) {
  let eventStart = event.datetime.startOf("day");
  let rangeStart = dateRange[0];
  return eventStart.diff(rangeStart, "day") >= 0;
}

function hasEnd(event, dateRange) {
  let rangeEnd = dateRange.slice(-1)[0];
  let eventEnd = getEndDate(event);
  return rangeEnd.diff(eventEnd) >= 0;
}

function getWidth(event, dateRange) {
  let eventStart = event.datetime.startOf("day");
  let eventEnd = getEndDate(event);
  let rangeStart = dateRange[0];

  const startDiff = eventStart.diff(rangeStart, "day");
  const endDiff = eventEnd.diff(rangeStart, "day");
  let colStart = startDiff >= 0 ? startDiff : 0;
  let duration = endDiff - colStart;

  let colLeft = 7 - colStart;
  return (Math.min(colLeft, duration) * 100) / 7;
}
