import { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";

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
  const [date, setDate] = useState(new Date());
  const [period, setPeriod] = useState("week");

  return (
    <Container>
      <Sidebar date={date} setDate={setDate} />
      <SubContainer>
        <Navbar
          date={date}
          setDate={setDate}
          period={period}
          setPeriod={setPeriod}
        />
        <Content
          date={date}
          setDate={setDate}
          period={period}
          setPeriod={setPeriod}
        />
      </SubContainer>
    </Container>
  );
}
