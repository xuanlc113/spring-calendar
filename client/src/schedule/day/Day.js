import styled from "styled-components";
import { Row, Col, Space } from "antd";
import Schedule from "../Schedule";
import Timeline from "../Timeline";
import Header from "../Header";
import AllDayEvent from "../AllDayArea";

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
  function getSchedules() {
    return props.calendars.map((i) => (
      <Col flex={1 / props.calendars.length}>
        <Schedule date={props.date} calendars={[i]} />
      </Col>
    ));
  }
  return (
    <Component>
      <HeaderContainer>
        <p>12 PM</p>
        <Space direction="vertical">
          <Header type="day" calendars={props.calendars} />
          <AllDayEvent
            type="day"
            calendars={props.calendars}
            dates={[props.date]}
          />
        </Space>
      </HeaderContainer>
      <Scroll>
        <Content>
          <Timeline />
          <Schedules justify="space-around">{getSchedules()}</Schedules>
        </Content>
      </Scroll>
    </Component>
  );
}

// user
// email: "sockpuppet113@gmail.com"
// email_verified: true
// family_name: "Puppy"
// given_name: "Sock"
// locale: "en-GB"
// name: "Sock Puppy"
// nickname: "sockpuppet113"
// picture: "https://lh3.googleusercontent.com/-0yG_PnyU0Gw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclJw-2cYUWx-wYhFGrSCCuZUUkyHg/s96-c/photo.jpg"
// sub: "google-oauth2|105217146160079939382"
// updated_at: "2020-12-20T07:17:53.236Z"
