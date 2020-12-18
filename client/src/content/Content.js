import Month from "./schedule/month/Month";
import Week from "./schedule/week/Week";
import "./Content.css";
import Day from "./schedule/day/Day";

export default function Content() {
  return (
    <div className="content">
      {/* <Month /> */}
      {/* <Week /> */}
      <Day />
    </div>
  );
}
