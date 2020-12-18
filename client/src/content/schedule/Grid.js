import "./Grid.css";

export default function Grid() {
  function gridBlock() {
    let blocks = [];
    for (let i = 0; i < 24; i++) {
      blocks.push(<span />);
    }
    return blocks;
  }
  return (
    <div className="grid-container">
      <div className="grid"></div>
      <div className="grid-marking">{gridBlock()}</div>
    </div>
  );
}
