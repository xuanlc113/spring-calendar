import styled from "styled-components";
import { Row, Col, Space } from "antd";
import Timeline from "../Timeline";
import Header from "../Header";
import Schedule from "../Schedule";
import AllDayArea from "../AllDayArea";

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

  & > .ant-space {
    flex: 1;
    & > .ant-space-item {
      margin-bottom: 0 !important;
    }
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
  return (
    <Container>
      <HeaderContainer>
        <p>12 PM</p>
        <Space direction="vertical">
          <Header type="week" />
          <AllDayArea
            type="week"
            calendars={props.calendars}
            dates={props.dates}
          />
        </Space>
      </HeaderContainer>
      <Scroll>
        <Content>
          <Timeline />
          <Schedules justify="space-around">
            {props.dates.map((date) => (
              <Col flex={1 / 7}>
                <Schedule date={date} calendars={props.calendars} />
              </Col>
            ))}
          </Schedules>
        </Content>
      </Scroll>
    </Container>
  );
}
