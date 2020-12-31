import styled from "styled-components";
import { Modal, Space, Select, InputNumber, Radio, DatePicker } from "antd";
import { useState } from "react";
import { getMonthOptions } from "./EventHelpers";
import useCustomRepeat from "./CustomRepeatHook";

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
  const {
    options,
    optionsDispatch,
    changePeriod,
    isWeekdaySelected,
    toggleWeekday,
    changeMonthRepeat,
    getMonthValue,
    getEnd,
    setEnd,
    count,
    until,
  } = useCustomRepeat(props.event, props.date);

  function showPeriodOptions() {
    const freq = options.freq;
    if (freq === 3 || freq === 0) {
      return;
    } else if (freq === 2) {
      return weekOptions();
    } else if (freq === 1) {
      return monthOptions(props.date);
    }
  }

  function weekOptions() {
    const dayNumber = [6, 0, 1, 2, 3, 4, 5];
    const dayLabel = ["S", "M", "T", "W", "T", "F", "S"];
    return (
      <div>
        <p>Repeat On</p>
        <Space direction="horizontal" size="small">
          {[...Array(7).keys()].map((i) => (
            <WeekdayButton
              selected={isWeekdaySelected(dayNumber[i])}
              onClick={() => toggleWeekday(dayNumber[i])}
            >
              {dayLabel[i]}
            </WeekdayButton>
          ))}
        </Space>
      </div>
    );
  }

  function monthOptions(date) {
    return (
      <Select
        style={{ minWidth: "100%" }}
        value={getMonthValue()}
        onChange={(val) => changeMonthRepeat(val, props.date)}
      >
        <Option value="monthly-date">Monthly on {date.date()}</Option>
        {getMonthOptions(date)}
      </Select>
    );
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
            value={options.interval}
            onChange={(val) =>
              optionsDispatch({ type: "interval", value: val })
            }
          />
          <Select
            value={options.freq}
            onChange={(val) => changePeriod(val, props.date)}
          >
            <Option value={3}>Day</Option>
            <Option value={2}>Week</Option>
            <Option value={1}>Month</Option>
            <Option value={0}>Year</Option>
          </Select>
        </Space>
        {showPeriodOptions()}
        Ends
        <Radio.Group value={getEnd()} onChange={(e) => setEnd(e.target.value)}>
          <BlockRadioButton value={1}>Never</BlockRadioButton>
          <BlockRadioButton value={2}>
            On{" "}
            <DatePicker
              disabled={getEnd() !== 2}
              value={until}
              onChange={setEnd}
              style={{ marginLeft: "1rem" }}
            />
          </BlockRadioButton>
          <BlockRadioButton value={3}>
            After{" "}
            <InputNumber
              disabled={getEnd() !== 3}
              min={1}
              value={count}
              onChange={setEnd}
              style={{ margin: "0 1rem" }}
            />{" "}
            Occurrences
          </BlockRadioButton>
        </Radio.Group>
      </Space>
    </PopupContainer>
  );
}

export function useCustomRepeatPopup() {
  const [isVisible, setIsVisible] = useState(false);

  function openPopup() {
    setIsVisible(true);
  }

  function closePopup() {
    setIsVisible(false);
    // optionsDispatch({ type: "reset", value: props.event });
    // infoDispatch({ type: "end", value: null });
  }

  function okPopup() {
    closePopup();
    // setShowRepeat(false);
    // infoDispatch({ type: "recurring", value: true });
    // infoDispatch({
    //   type: "rrule",
    //   value: new RRule(options).toString(),
    // });
    // setSelectLabel(getRepeatValue(options));
  }

  return { isVisible, openPopup, closePopup, okPopup };
}
