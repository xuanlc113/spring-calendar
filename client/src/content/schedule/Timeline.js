import "./Timeline.css";

export default function Timeline() {
  function getTimestamp() {
    let timestamp = [];
    timestamp.push(<p></p>);
    for (let i = 1; i < 12; i++) {
      timestamp.push(<p>{i} AM</p>);
    }
    timestamp.push(<p>12 PM</p>);
    for (let i = 1; i < 12; i++) {
      timestamp.push(<p>{i} PM</p>);
    }
    return timestamp;
  }
  function gridBlock() {
    let blocks = [];
    for (let i = 0; i < 24; i++) {
      blocks.push(<span />);
    }
    return blocks;
  }
  return (
    <div className="timeline">
      <div className="timestamps">{getTimestamp()}</div>
      <div className="time-separator">{gridBlock()}</div>
    </div>
  );
}
