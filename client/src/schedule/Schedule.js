import { useContext } from "react";
import { UserContext } from "../App";
import styled from "styled-components";
import Grid from "./Grid";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Board = styled.div`
  position: relative;
  width: 95%;
`;

export default function Schedule(props) {
  const user = useContext(UserContext);

  return (
    <Container>
      <Board>
        {/* <div className="divv" />
        <div />// events go here */}
      </Board>
      <Grid />
    </Container>
  );
}
