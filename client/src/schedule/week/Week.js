import styled from "styled-components";
import { Row, Col, Space } from "antd";
import Timeline from "../Timeline";
import Header from "../Header";
import Schedule from "../Schedule";
import AllDayArea from "../AllDayArea";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";

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
  const scroll = useRef(null);

  useEffect(() => {
    const time = dayjs().diff(dayjs().startOf("day"), "minute");
    scroll.current.scrollBy({ top: (time / 15) * 10 - 150 });
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <p>12 PM</p>
        <Space direction="vertical">
          <Header type="dates" dates={props.dates} />
          <Header type="week" />
          <AllDayArea
            type="week"
            calendars={props.calendars}
            dates={props.dates}
            openPopup={props.openPopup}
            reload={props.reload}
          />
        </Space>
      </HeaderContainer>
      <Scroll ref={scroll}>
        <Content>
          <Timeline />
          <Schedules justify="space-around">
            {props.dates.map((date) => (
              <Col flex={1 / 7} key={date.toJSON()}>
                <Schedule
                  date={date}
                  calendars={props.calendars}
                  openPopup={props.openPopup}
                  reload={props.reload}
                />
              </Col>
            ))}
          </Schedules>
        </Content>
      </Scroll>
    </Container>
  );
}
