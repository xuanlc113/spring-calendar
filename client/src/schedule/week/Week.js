import styled from "styled-components";
import { Row, Col } from "antd";
import Timeline from "../Timeline";
import Header from "../Header";
import Schedule from "../Schedule";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const HeaderContainer = styled.div`
  display: flex;
  border-bottom: 2px solid lightgrey;

  & > p {
    color: transparent;
    font-size: 0.8em;
    cursor: default;
    margin-right: 1rem;
    padding-right: 2px;
  }

  & > .ant-row {
    flex: 1;
  }
`;

const Scroll = styled.div`
  overflow: auto;
`;

const Content = styled.div`
  display: flex;
`;

const Schedules = styled(Row)`
  height: 100%;
  width: 100%;
`;

export default function Week(props) {
  const schedules = [1, 2, 3, 4, 5, 6, 7];
  return (
    <Container>
      <HeaderContainer>
        <p>12 PM</p>
        <Header type="week" />
      </HeaderContainer>
      <Scroll>
        <Content>
          <Timeline />
          <Schedules justify="space-around">
            {props.dates.map(() => (
              <Col flex={1 / 7}>
                <Schedule />
              </Col>
            ))}
          </Schedules>
        </Content>
      </Scroll>
    </Container>
  );
}
