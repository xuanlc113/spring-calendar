import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}px;
  z-index: ${(props) => props.z};
  background: ${(props) => props.color};
  outline: 1px solid white;
`;

export default function Event(props) {
  return <Container {...props.style}>itm</Container>;
}
