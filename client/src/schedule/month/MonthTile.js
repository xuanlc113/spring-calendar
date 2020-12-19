export default function MonthTile(props) {
  function viewDay() {
    props.setDate(props.date);
    props.setPeriod("day");
  }

  return (
    <div className="month-tile" onClick={viewDay}>
      {props.date.getDate()}
    </div>
  );
}
