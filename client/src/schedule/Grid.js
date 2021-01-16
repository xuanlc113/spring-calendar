import dayjs from "dayjs";
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

const TimeMarker = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background: red;
  top: ${(props) => props.top * 10}px;
  z-index: 100;
`;

export default function Grid(props) {
  function gridBlock() {
    let blocks = [];
    for (let i = 0; i < 24; i++) {
      blocks.push(<span />);
    }
    return blocks;
  }
  return (
    <Container>
      {isToday(props.date) && <TimeMarker top={getTime()} />}
      <GridLine>{gridBlock()}</GridLine>
    </Container>
  );
}

function isToday(date) {
  return dayjs().isSame(date, "day");
}

function getTime() {
  const time = dayjs().diff(dayjs().startOf("day"), "minute");
  return time / 15;
}
