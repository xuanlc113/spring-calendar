import styled from "styled-components";

const Container = styled.div`
  display: list-item;
  list-style: inside;
  text-align: left;
  padding: 0 0.5em;
  border-radius: 5px;
  color: ${(props) => props.color};
`;

export default function MonthDayEvent(props) {
  return (
    <Container color={props.event.style.color}>
      {props.event.canonicalEvent.title}
    </Container>
  );
}
