import { Row, Col } from "antd";

export default function WeekHeader() {
  return (
    <Row
      justify="space-around"
      style={{ textAlign: "center" }}
      className="week-header-row"
    >
      <Col flex={1 / 7}>sun</Col>
      <Col flex={1 / 7}>mon</Col>
      <Col flex={1 / 7}>tue</Col>
      <Col flex={1 / 7}>wed</Col>
      <Col flex={1 / 7}>thu</Col>
      <Col flex={1 / 7}>fri</Col>
      <Col flex={1 / 7}>sat</Col>
    </Row>
  );
}
