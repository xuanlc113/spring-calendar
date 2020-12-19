import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const TimeGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(96, minmax(10px, 1fr));
`;

const GridLine = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(24, 1fr);
  border-left: 1px solid lightgrey;

  & > span:not(:last-child) {
    border-bottom: 1px solid lightgrey;
  }
`;

export default function Grid() {
  function gridBlock() {
    let blocks = [];
    for (let i = 0; i < 24; i++) {
      blocks.push(<span />);
    }
    return blocks;
  }
  return (
    <Container>
      <TimeGrid />
      <GridLine>{gridBlock()}</GridLine>
    </Container>
  );
}
