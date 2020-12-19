import styled from "styled-components";
import { Row, Col } from "antd";
import Header from "../Header";
import MonthTile from "./MonthTile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MonthGrid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const MonthGridRow = styled(Row)`
  text-align: center;
  height: 100%;

  & > .ant-col {
    flex-basis: 0 !important;
  }

  & > .ant-col:not(:first-child) {
    border-top: 1px solid lightgrey;
    border-left: 1px solid lightgrey;
  }

  & > .ant-col:first-child {
    border-top: 1px solid lightgrey;
  }
`;

export default function Month() {
  const days = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    9,
    9,
    10,
    11,
    12,
    133,
    143,
    152,
    162,
    171,
    183,
    193,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    1,
    2,
  ];

  function generate() {
    let rows = [];
    for (let i = 0; i < days.length / 7; i++) {
      rows.push(
        <MonthGridRow>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 1]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 2]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 3]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 4]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 5]} />
          </Col>
          <Col flex={1 / 7}>
            <MonthTile date={days[i * 7 + 6]} />
          </Col>
        </MonthGridRow>
      );
    }
    return rows;
  }
  return (
    <Container>
      <Header type="month" />
      <MonthGrid>{generate()}</MonthGrid>
    </Container>
  );
}
