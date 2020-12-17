import { Row, Col } from "antd";
import WeekHeader from "../WeekHeader";
import "./Month.css";
import MonthTile from "./MonthTile";

export default function Month() {
  const days = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    9,
    9,
    10,
    11,
    12,
    133,
    143,
    152,
    162,
    171,
    183,
    193,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    1,
    2,
  ];

  function generate() {
    let rows = [];
    for (let i = 0; i < days.length / 7; i++) {
      rows.push(
        <Row
          style={{ textAlign: "center", height: "100%" }}
          className="month-grid-rows"
        >
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 1]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 2]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 3]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 4]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 5]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 6]} />
          </Col>
        </Row>
      );
    }
    return rows;
  }
  return (
    <div className="month" style={{ height: "100%" }}>
      <div className="month-week-header">
        <WeekHeader />
      </div>
      <div className="month-grid">{generate()}</div>
    </div>
  );
}
