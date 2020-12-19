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

export default function Month(props) {
  function getMonthTiles() {
    let rows = [];
    for (let i = 0; i < props.dates.length / 7; i++) {
      rows.push(<MonthGridRow>{getWeekTiles(i)}</MonthGridRow>);
    }
    return rows;
  }

  function getWeekTiles(row) {
    let tiles = [];
    for (let i = 0; i < 7; i++) {
      tiles.push(
        <Col flex={1 / 7}>
          <MonthTile
            date={props.dates[row * 7 + i]}
            setDate={props.setDate}
            setPeriod={props.setPeriod}
          />
        </Col>
      );
    }
    return tiles;
  }

  return (
    <Container>
      <Header type="month" />
      <MonthGrid>{getMonthTiles()}</MonthGrid>
    </Container>
  );
}
