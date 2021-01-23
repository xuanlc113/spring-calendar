import styled from "styled-components";
import { Row, Col } from "antd";

const Container = styled(Row)`
  overflow-y: ${(props) => (props.type === "month" ? "none" : "scroll")};
  text-align: center;

  & > .ant-col {
    padding-bottom: 0.5rem;
    flex-basis: 0 !important;
    font-size: ${(props) => (props.type === "dates" ? "1.5em" : "0.8em")};
    text-transform: uppercase;
    font-weight: 600;
    color: gray;
  }

  ${(props) =>
    props.type === "month"
      ? `& > .ant-col:not(:first-child) {
    border-left: 1px solid lightgrey;
  }`
      : `& > .ant-col {
    border-left: 1px solid lightgrey;
  }`}
`;

export default function Header(props) {
  function getHeaders() {
    let headers;
    if (props.type === "day") {
      headers = props.calendars.map((i) => i.label);
    } else if (props.type === "dates") {
      headers = props.dates.map((date) => date.date());
    } else {
      headers = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    }
    return headers.map((i) => (
      <Col flex={1 / headers.length} key={i}>
        {i}
      </Col>
    ));
  }

  return (
    <Container justify="space-around" type={props.type}>
      {getHeaders()}
    </Container>
  );
}
