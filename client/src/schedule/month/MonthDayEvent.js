import { Popover } from "antd";
import styled from "styled-components";
import EventPopover from "../../event_info/EventPopover";

const Container = styled.div`
  display: list-item;
  list-style: inside;
  text-align: left;
  padding: 0 0.5em;
  border-radius: 5px;
  color: ${(props) => props.color};

  cursor: pointer;
`;

export default function MonthDayEvent(props) {
  return (
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
      <Container color={props.event.style.color}>
        {props.event.canon.title}
      </Container>
    </Popover>
  );
}
