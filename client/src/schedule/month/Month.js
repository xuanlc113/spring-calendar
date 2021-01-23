import styled from "styled-components";
import { Row, Col } from "antd";
import Header from "../Header";
import MonthTile from "./MonthTile";
import { useState } from "react";

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
  const [update, setUpdate] = useState(false);

  function refresh() {
    setUpdate(!update);
  }

  function getMonthTiles() {
    let rows = [];
    for (let i = 0; i < props.dates.length / 7; i++) {
      rows.push(
        <MonthGridRow key={props.dates[i].toJSON()}>
          {getWeekTiles(i)}
        </MonthGridRow>
      );
    }
    return rows;
  }

  function getWeekTiles(row) {
    let tiles = [];
    for (let i = 0; i < 7; i++) {
      tiles.push(
        <Col flex={1 / 7} key={props.dates[row * 7 + i].toJSON()}>
          <MonthTile
            currentDate={props.currentDate}
            date={props.dates[row * 7 + i]}
            setDateOnly={props.setDateOnly}
            setPeriod={props.setPeriod}
            calendars={props.calendars}
            weekStart={props.dates[row * 7]}
            weekEnd={props.dates[row * 7 + 6]}
            openPopup={props.openPopup}
            update={update}
            refresh={refresh}
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
