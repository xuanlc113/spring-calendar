import { Row, Col } from "antd";
import CompareHeader from "../CompareHeader";
import Schedule from "../Schedule";
import Timeline from "../Timeline";
import "./Day.css";

export default function Day() {
  let users = [1, 3, 4];
  return (
    <div className="day">
      <div className="day-header">
        <p>12 PM</p>
        <CompareHeader />
      </div>
      <div className="scroller">
        <div className="day-content">
          <Timeline />
          <Row justify="space-around" className="day-schedules">
            {users.map(() => (
              <Col flex={1 / users.length}>
                <Schedule />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
