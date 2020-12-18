import { Row, Col } from "antd";
import "./Header.css";

export default function CompareHeader() {
  let comparisons = ["com.ser", "email.esdf", "sdf@sfe"];
  return (
    <Row
      justify="space-around"
      style={{ textAlign: "center" }}
      className="header-row"
    >
      {comparisons.map((i) => (
        <Col flex={1 / comparisons.length}>{i}</Col>
      ))}
    </Row>
  );
}
