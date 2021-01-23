import styled from "styled-components";
import { Popover } from "antd";
import { getStartTime, getEndTime } from "../event_info/EventHelpers";
import EventPopover from "../event_info/EventPopover";

const Container = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}%;
  width: calc(${(props) => props.width}% + 1px);
  height: calc(${(props) => props.height}px + 1px);
  z-index: ${(props) => props.z};
  background: ${(props) => props.color};
  color: white;
  font-size: 0.8em;
  min-height: 0px;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid white;
  cursor: pointer;
`;

const Info = styled.div`
  margin: 0 1em;
  padding: 0;
  line-height: 1.2em;
  & > p {
    margin: 0;
    padding: 0;
  }
`;

export default function Event(props) {
  return (
    <Popover
      placement="topLeft"
      trigger="click"
      content={
        <EventPopover
          {...props}
          openPopup={props.openPopup}
          refresh={props.refresh}
        />
      }
      zIndex={800}
    >
      <Container {...props.style} onClick={(e) => e.stopPropagation()}>
        <Info>
          {props.style.height >= 30 ? (
            <>
              <p>{props.canon.title}</p>
              <p>
                {getStartTime(props.canon.datetimeStart)} –{" "}
                {getEndTime(props.canon.datetimeStart, props.canon.duration)}
              </p>
            </>
          ) : (
            <p>
              {props.canon.title} {getStartTime(props.datetime)}
            </p>
          )}
        </Info>
      </Container>
    </Popover>
  );
}
