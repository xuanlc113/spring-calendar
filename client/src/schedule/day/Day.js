import styled from "styled-components";
import { Row, Col, Space } from "antd";
import Schedule from "../Schedule";
import Timeline from "../Timeline";
import Header from "../Header";
import AllDayArea from "../AllDayArea";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";

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
    padding-right: 1px;
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

export default function Day(props) {
  const scroll = useRef(null);

  function getSchedules() {
    return props.calendars.map((i) => (
      <Col flex={1 / props.calendars.length} key={i.id}>
        <Schedule
          date={props.date}
          calendars={[i]}
          openPopup={props.openPopup}
        />
      </Col>
    ));
  }

  useEffect(() => {
    const time = dayjs().diff(dayjs().startOf("day"), "minute");
    scroll.current.scrollBy({ top: (time / 15) * 10 - 150 });
  }, []);

  return (
    <Component>
      <HeaderContainer>
        <p>12 PM</p>
        <Space direction="vertical">
          <Header type="day" calendars={props.calendars} />
          <AllDayArea
            type="day"
            calendars={props.calendars}
            dates={[props.date]}
            openPopup={props.openPopup}
          />
        </Space>
      </HeaderContainer>
      <Scroll ref={scroll}>
        <Content>
          <Timeline />
          <Schedules justify="space-around">{getSchedules()}</Schedules>
        </Content>
      </Scroll>
    </Component>
  );
}
