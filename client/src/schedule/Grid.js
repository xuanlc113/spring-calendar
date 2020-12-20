import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const GridLine = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(24, 40px);

  & > span:not(:last-child) {
    border-bottom: 1px solid lightgrey;
  }

  & > span {
    border-left: 1px solid lightgrey;
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
      <GridLine>{gridBlock()}</GridLine>
    </Container>
  );
}
