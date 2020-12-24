import styled from "styled-components";
import { Modal, Space, Select, InputNumber, Radio, DatePicker } from "antd";
import { useState } from "react";

const { Option } = Select;

const PopupContainer = styled(Modal)`
  top: 50px;
  .ant-modal-content {
    border-radius: 10px !important;
    .ant-modal-header {
      border-radius: 10px !important;
    }
    .ant-modal-footer > button {
      border-radius: 5px !important;
    }
  }
`;

const WeekdayButton = styled.div`
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  border-radius: 1em;
`;

const BlockRadioButton = styled(Radio)`
  display: block;
  line-height: 3rem;
`;

export default function RepeatPopup(props) {
  const [period, setPeriod] = useState("day");
  const [weekdays, setWeekdays] = useState([]);

  function showPeriodOptions() {
    if (period === "day" || period === "year") {
      return;
    } else if (period === "week") {
      return weekOptions();
    } else if (period === "month") {
      return monthOptions();
    }
  }

  function weekOptions() {
    return (
      <div>
        <p>Repeat On</p>
        <Space direction="horizontal" size="small">
          <WeekdayButton>S</WeekdayButton>
          <WeekdayButton>M</WeekdayButton>
        </Space>
      </div>
    );
  }

  function monthOptions() {
    return (
      <Select>
        <Option>Monthly on date</Option>
        <Option>Monthly on number weekday</Option>
        <Option>Monthly on last? weekday</Option>
      </Select>
    );
  }

  return (
    <PopupContainer
      visible={true}
      onOk={props.closePopup}
      onCancel={props.closePopup}
      title="Custom"
    >
      <Space direction="vertical" size="middle">
        <Space direction="horizontal">
          Repeat Every
          <InputNumber min={1} defaultValue={1} />
          <Select defaultValue="day" onChange={(value) => setPeriod(value)}>
            <Option value="day">Day</Option>
            <Option value="week">Week</Option>
            <Option value="month">Month</Option>
            <Option value="year">Year</Option>
          </Select>
        </Space>
        {showPeriodOptions()}
        Ends
        <Radio.Group value={1}>
          <BlockRadioButton value={1}>Never</BlockRadioButton>
          <BlockRadioButton>
            On <DatePicker style={{ marginLeft: "1rem" }} />
          </BlockRadioButton>
          <BlockRadioButton>
            After <InputNumber style={{ margin: "0 1rem" }} /> Occurrences
          </BlockRadioButton>
        </Radio.Group>
      </Space>
    </PopupContainer>
  );
}
