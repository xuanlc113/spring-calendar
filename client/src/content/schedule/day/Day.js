import styled from "styled-components";
import { Row, Col } from "antd";
import Schedule from "../Schedule";
import Timeline from "../Timeline";
import Header from "../Header";

const Component = styled.div`
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

export default function Day() {
  let users = [1, 3, 4];
  return (
    <Component>
      <HeaderContainer>
        <p>12 PM</p>
        <Header />
      </HeaderContainer>
      <Scroll>
        <Content>
          <Timeline />
          <Schedules justify="space-around">
            {users.map(() => (
              <Col flex={1 / users.length}>
                <Schedule />
              </Col>
            ))}
          </Schedules>
        </Content>
      </Scroll>
    </Component>
  );
}
