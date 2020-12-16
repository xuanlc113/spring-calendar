import Calendar from "react-calendar";
import "./Sidebar.css";
import "./ReactCalendar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="date-selector">
        <Calendar />
      </div>
    </div>
  );
}
