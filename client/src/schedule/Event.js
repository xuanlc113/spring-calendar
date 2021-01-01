import styled from "styled-components";
import { Popover } from "antd";
import { getStartTime, getEndTime } from "../event_info/EventHelpers";
import EventPopover from "../event_info/EventPopover";

const Container = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  z-index: ${(props) => props.z};
  background: ${(props) => props.color};
  outline: 1px solid white;
  color: white;
  font-size: 0.8em;
  min-height: 0px;
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
      content={<EventPopover {...props} />}
      zIndex={800}
    >
      <Container {...props.style} onClick={(e) => e.stopPropagation()}>
        <Info>
          {props.style.height >= 30 ? (
            <>
              <p>{props.canonicalEvent.title}</p>
              <p>
                {getStartTime(props.datetime)} –{" "}
                {getEndTime(props.datetime, props.canonicalEvent.duration)}
              </p>
            </>
          ) : (
            <p>
              {props.canonicalEvent.title} {getStartTime(props.datetime)}
            </p>
          )}
        </Info>
      </Container>
    </Popover>
  );
}
