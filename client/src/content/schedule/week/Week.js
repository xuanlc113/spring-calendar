import { Row, Col } from "antd";
import Timeline from "../Timeline";
import Header from "../Header";
import "./Week.css";
import Schedule from "../Schedule";

export default function Week() {
  const schedules = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="week">
      <div className="week-header">
        <p>12 PM</p>
        <Header />
      </div>
      <div className="scroller">
        <div className="week-content">
          <Timeline />
          <Row justify="space-around" className="week-schedules">
            {schedules.map(() => (
              <Col flex={1 / 7}>
                <Schedule />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
