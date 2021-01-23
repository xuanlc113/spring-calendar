import styled from "styled-components";
import { Checkbox } from "antd";
import { Fragment } from "react";

const Scroll = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const Container = styled.div`
  margin: 1rem 0.5rem;
`;

const ColorCheckbox = styled(Checkbox)`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${(props) => props.color};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.color};
    border-color: ${(props) => props.color};
  }
`;

export default function Contact(props) {
  function truncateLabel(label) {
    if (label.length > 15) {
      return label.substring(0, 15) + "...";
    }
    return label;
  }

  return (
    <Scroll>
      <Container>
        {props.calendars.map((i) => (
          <Fragment key={i.id}>
            <ColorCheckbox
              checked={i.checked}
              onChange={() => props.updateCalendars(i.label)}
              color={i.color}
            >
              {truncateLabel(i.label)}
            </ColorCheckbox>
            <br />
          </Fragment>
        ))}
      </Container>
    </Scroll>
  );
}
