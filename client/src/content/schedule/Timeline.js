import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Timestamps = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: repeat(24, 1fr);

  & > p {
    text-align: right;
    font-size: 0.8em;
    color: grey;
    position: relative;
    top: -10px;
    white-space: nowrap;
  }
`;

const Gap = styled.div`
  width: 0.5rem;
  margin-left: 0.5rem;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(24, 1fr);

  & > span:not(:last-child) {
    border-bottom: 1px solid lightgrey;
  }
`;

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
    <Container>
      <Timestamps>{getTimestamp()}</Timestamps>
      <Gap>{gridBlock()}</Gap>
    </Container>
  );
}
