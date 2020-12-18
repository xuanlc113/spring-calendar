import Calendar from "react-calendar";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./Sidebar.css";
import "./ReactCalendar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Button
        type="primary"
        size="large"
        shape="round"
        className="button-create"
        icon={<PlusOutlined />}
        style={{ fontSize: "1.2rem" }}
      >
        Create
      </Button>
      <div className="date-selector">
        <Calendar />
      </div>
      <div className="contact">
        <p>Calendars</p>
      </div>
    </div>
  );
}
