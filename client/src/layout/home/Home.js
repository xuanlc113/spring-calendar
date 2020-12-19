import styled from "styled-components";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Content from "../../content/Content";

const Container = styled.div`
  height: 100%;
  display: flex;
`;

const SubContainer = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  return (
    <Container>
      <Sidebar />
      <SubContainer>
        <Navbar />
        <Content />
      </SubContainer>
    </Container>
  );
}
