import styled from "styled-components";
import { Modal, Space, Select, InputNumber, Radio, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { getMonthOptions } from "./EventHelpers";

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
  background-color: ${(props) => (props.selected ? "#1890ff" : "#bae7ff")};
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
  const [count, setCount] = useState(5);
  const [untilDate, setUntilDate] = useState(props.date);

  useEffect(() => {
    if (props.options.freq === -1) {
      props.optionsDispatch({ type: "freq", value: 3 });
    }
  });

  function changePeriod(val) {
    switch (val) {
      case 0:
        props.optionsDispatch({ type: "byweekday", value: [] });
        props.optionsDispatch({ type: "bysetpos", value: [] });
        props.optionsDispatch({ type: "bymonthday", value: props.date.date() });
        props.optionsDispatch({
          type: "bymonth",
          value: props.date.month() + 1,
        });
        break;
      case 1:
        props.optionsDispatch({ type: "byweekday", value: [] });
        props.optionsDispatch({ type: "bysetpos", value: [] });
        props.optionsDispatch({ type: "bymonth", value: 0 });
        props.optionsDispatch({ type: "bymonthday", value: props.date.date() });
        break;
      case 2:
        let day = props.date.day() === 0 ? 6 : props.date.day() - 1;
        props.optionsDispatch({
          type: "byweekday",
          value: [day],
        });
        props.optionsDispatch({ type: "bysetpos", value: [] });
        props.optionsDispatch({ type: "bymonth", value: 0 });
        props.optionsDispatch({ type: "bymonthday", value: 0 });
        break;
      case 3:
        props.optionsDispatch({ type: "byweekday", value: [] });
        props.optionsDispatch({ type: "bysetpos", value: [] });
        props.optionsDispatch({ type: "bymonthday", value: 0 });
        props.optionsDispatch({ type: "bymonth", value: 0 });
        break;
    }
    props.optionsDispatch({ type: "freq", value: val });
  }

  function showPeriodOptions() {
    const freq = props.options.freq;
    if (freq === 3 || freq === 0) {
      return;
    } else if (freq === 2) {
      return weekOptions();
    } else if (freq === 1) {
      return monthOptions(props.date);
    }
  }

  function toggleDay(val) {
    let weekdays = props.options.byweekday;
    if (weekdays.includes(val)) {
      weekdays = weekdays.filter((i) => i != val);
    } else {
      weekdays.push(val);
    }
    weekdays.sort();
    props.optionsDispatch({ type: "byweekday", value: weekdays });
  }

  function selected(val) {
    let weekdays = props.options.byweekday;
    return weekdays.includes(val);
  }

  function weekOptions() {
    return (
      <div>
        <p>Repeat On</p>
        <Space direction="horizontal" size="small">
          <WeekdayButton selected={selected(6)} onClick={() => toggleDay(6)}>
            S
          </WeekdayButton>
          <WeekdayButton selected={selected(0)} onClick={() => toggleDay(0)}>
            M
          </WeekdayButton>
          <WeekdayButton selected={selected(1)} onClick={() => toggleDay(1)}>
            T
          </WeekdayButton>
          <WeekdayButton selected={selected(2)} onClick={() => toggleDay(2)}>
            W
          </WeekdayButton>
          <WeekdayButton selected={selected(3)} onClick={() => toggleDay(3)}>
            T
          </WeekdayButton>
          <WeekdayButton selected={selected(4)} onClick={() => toggleDay(4)}>
            F
          </WeekdayButton>
          <WeekdayButton selected={selected(5)} onClick={() => toggleDay(5)}>
            S
          </WeekdayButton>
        </Space>
      </div>
    );
  }

  function monthOptions(date) {
    return (
      <Select
        style={{ minWidth: "100%" }}
        value={getMonthlyValue()}
        onChange={(val) => changeMonthlyValue(val)}
      >
        <Option value="monthly-date">Monthly on {date.date()}</Option>
        {getMonthOptions(date)}
      </Select>
    );
  }

  function getMonthlyValue() {
    if (props.options.bymonthday) {
      return "monthly-date";
    }
    if (props.options.bysetpos === -1) {
      return "monthly-last";
    }
    return "monthly";
  }

  function getEndType() {
    if (props.options.count > 0) {
      return 3;
    }
    if (!props.options.until) {
      return 1;
    }
    return 2;
  }

  function changeMonthlyValue(val) {
    let day = props.date.day() === 0 ? 6 : props.date.day() - 1;
    switch (val) {
      case "monthly-date":
        props.optionsDispatch({ type: "bysetpos", value: [] });
        props.optionsDispatch({ type: "byweekday", value: [] });
        props.optionsDispatch({ type: "bymonthday", value: props.date.date() });
        break;
      case "monthly-last":
        props.optionsDispatch({ type: "bysetpos", value: -1 });
        props.optionsDispatch({ type: "bymonthday", value: 0 });
        props.optionsDispatch({ type: "byweekday", value: [day] });
        break;
      case "monthly":
        props.optionsDispatch({
          type: "bysetpos",
          value: Math.ceil(props.date.date() / 7),
        });
        props.optionsDispatch({ type: "bymonthday", value: 0 });
        props.optionsDispatch({ type: "byweekday", value: [day] });
        break;
    }
  }

  function setUntil(e) {
    switch (e.target.value) {
      case 1:
        props.optionsDispatch({ type: "count", value: 0 });
        props.optionsDispatch({ type: "until", value: null });
        props.infoDispatch({ type: "end", value: null });
        break;
      case 2:
        props.optionsDispatch({ type: "count", value: 0 });
        props.optionsDispatch({ type: "until", value: untilDate.toDate() });
        props.infoDispatch({ type: "end", value: untilDate.toDate() });
        break;
      case 3:
        props.optionsDispatch({ type: "until", value: null });
        props.optionsDispatch({ type: "count", value: count });
        props.infoDispatch({ type: "end", value: null });
        break;
    }
  }

  return (
    <PopupContainer
      visible={true}
      onOk={props.okPopup}
      onCancel={props.cancelPopup}
      title="Custom"
    >
      <Space direction="vertical" size="middle">
        <Space direction="horizontal">
          Repeat Every
          <InputNumber
            min={1}
            value={props.options.interval}
            onChange={(val) =>
              props.optionsDispatch({ type: "interval", value: val })
            }
          />
          <Select
            value={props.options.freq}
            onChange={(val) => changePeriod(val)}
          >
            <Option value={3}>Day</Option>
            <Option value={2}>Week</Option>
            <Option value={1}>Month</Option>
            <Option value={0}>Year</Option>
          </Select>
        </Space>
        {showPeriodOptions()}
        Ends
        <Radio.Group value={getEndType()} onChange={(e) => setUntil(e)}>
          <BlockRadioButton value={1}>Never</BlockRadioButton>
          <BlockRadioButton value={2}>
            On{" "}
            <DatePicker
              disabled={getEndType() !== 2}
              value={untilDate}
              onChange={(val) => {
                setUntilDate(val);
                props.infoDispatch({ type: "end", value: val.toDate() });
                props.optionsDispatch({ type: "until", value: val.toDate() });
              }}
              style={{ marginLeft: "1rem" }}
            />
          </BlockRadioButton>
          <BlockRadioButton value={3}>
            After{" "}
            <InputNumber
              disabled={getEndType() !== 3}
              min={1}
              value={count}
              onChange={(val) => {
                setCount(val);
                props.optionsDispatch({ type: "count", value: val });
              }}
              style={{ margin: "0 1rem" }}
            />{" "}
            Occurrences
          </BlockRadioButton>
        </Radio.Group>
      </Space>
    </PopupContainer>
  );
}
