import { Popover } from "antd";
import styled from "styled-components";
import EventPopover from "../../event_info/EventPopover";

const Container = styled.div`
  background: ${(props) => (props.empty ? "white" : props.color)};
  border-top-left-radius: ${(props) => (props.start ? "5px" : 0)};
  border-bottom-left-radius: ${(props) => (props.start ? "5px" : 0)};
  border-top-right-radius: ${(props) => (props.end ? "5px" : 0)};
  border-bottom-right-radius: ${(props) => (props.end ? "5px" : 0)};
  margin: 1px 0;
  z-index: 100;
  & > p {
    text-align: left;
    font-weight: 600;
    margin: 0 0.5em;
    cursor: pointer;
  }
`;

export default function MonthAllDayEvent(props) {
  return (
    <>
      {isEmpty(props.event, props.date) ? (
        <Container
          start={isEventStart(props.event, props.date)}
          end={isEnd(props.event, props.date)}
          empty={isEmpty(props.event, props.date)}
          color={props.event.style.color}
        >
          <p>{showTitle(props.event, props.date)}</p>
        </Container>
      ) : (
        <Popover
          placement="bottomLeft"
          trigger="click"
          content={
            <EventPopover
              {...props.event}
              openPopup={props.openPopup}
              refresh={props.refresh}
            />
          }
          zIndex={800}
        >
          <Container
            start={isEventStart(props.event, props.date)}
            end={isEnd(props.event, props.date)}
            empty={isEmpty(props.event, props.date)}
            color={props.event.style.color}
          >
            <p>{showTitle(props.event, props.date)}</p>
          </Container>
        </Popover>
      )}
    </>
  );
}

function showTitle(event, date) {
  if (isStart(event, date)) {
    return event.canon.title;
  }
  return "\u00A0";
}

function isEventStart(event, date) {
  const eventStart = event.datetime.startOf("day");
  return eventStart.diff(date, "day") === 0;
}

function isStart(event, date) {
  const eventStart = event.datetime.startOf("day");
  const isEventStart = eventStart.diff(date, "day") === 0;
  const isWeekStart = date.diff(date.startOf("week"), "day") === 0;
  const isEventStarted = date.startOf("week").diff(eventStart, "day") >= 0;
  const isWeekEventStart = isWeekStart && isEventStarted;
  return isEventStart || isWeekEventStart;
}

function isEnd(event, date) {
  const eventStart = event.datetime.startOf("day");
  const eventEnd = eventStart.add(event.canon.duration, "day");
  return date.diff(eventEnd, "day") === 0;
}

function isEmpty(event, date) {
  const eventStart = event.datetime.startOf("day");
  const eventEnd = eventStart.add(event.canon.duration + 1, "day");
  const isEventBefore = eventStart.diff(date, "day") > 0;
  const isEventAfter = date.diff(eventEnd, "day") >= 0;
  return isEventBefore || isEventAfter;
}
