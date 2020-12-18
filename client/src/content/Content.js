import Month from "./schedule/month/Month";
import Week from "./schedule/week/Week";
import "./Content.css";

export default function Content() {
  return (
    <div className="content">
      {/* <Month /> */}
      <Week />
    </div>
  );
}
