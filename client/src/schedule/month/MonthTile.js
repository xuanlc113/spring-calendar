import dayjs from "dayjs";
import { useContext } from "react";
import { UserContext } from "../../App";

export default function MonthTile(props) {
  const user = useContext(UserContext);

  function viewDay() {
    props.setDateOnly(props.date);
    props.setPeriod("day");
  }

  return (
    <div className="month-tile" onClick={viewDay}>
      {props.date.getDate()}
    </div>
  );
}
