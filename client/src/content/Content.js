import styled from "styled-components";
import Month from "./schedule/month/Month";
import Week from "./schedule/week/Week";
import Day from "./schedule/day/Day";

const Container = styled.div`
  flex: 12;
  min-height: 0;
  margin: 0 1rem 1rem 1rem;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
`;

export default function Content() {
  return (
    <Container>
      <Month />
      {/* <Week /> */}
      {/* <Day /> */}
    </Container>
  );
}
