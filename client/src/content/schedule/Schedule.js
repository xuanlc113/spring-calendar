import styled from "styled-components";
import Grid from "./Grid";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export default function Schedule() {
  return (
    <Container>
      <Grid />
    </Container>
  );
}
