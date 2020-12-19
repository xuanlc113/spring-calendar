import styled from "styled-components";
import { Row, Col } from "antd";

const Container = styled(Row)`
  overflow-y: ${(props) => (props.type === "month" ? "none" : "scroll")};
  text-align: center;

  & > .ant-col {
    padding-bottom: 0.5rem;
    flex-basis: 0 !important;
    font-size: 0.8em;
    text-transform: uppercase;
    font-weight: 600;
    color: gray;
  }

  & > .ant-col:not(:first-child) {
    border-left: 1px solid lightgrey;
  }
`;

export default function Header(props) {
  const headers = props.type
    ? ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    : ["asdadwa", "reter", "sdfd"];
  return (
    <Container justify="space-around" type={props.type}>
      {headers.map((i) => (
        <Col flex={1 / headers.length}>{i}</Col>
      ))}
    </Container>
  );
}
