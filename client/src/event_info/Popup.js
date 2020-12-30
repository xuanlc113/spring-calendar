import styled from "styled-components";
import { useState, useRef } from "react";
import {
  Modal,
  Space,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Checkbox,
} from "antd";
import dayjs from "dayjs";
import RepeatPopup from "./RepeatPopup";
import { useEvent, getUsers, getRepeatValue } from "./EventHooks";
import { getDefaultRRules, getMonthOptions, getWeekday } from "./EventHelpers";
import RRule from "rrule";

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

const FullSpace = styled(Space)`
  width: 100%;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const { TextArea } = Input;
const { RangePicker: DateRangePicker } = DatePicker;
const { RangePicker: TimeRangePicker } = TimePicker;
const { Option } = Select;

export default function Popup(props) {
  const select = useRef(null);
  const [showRepeat, setShowRepeat] = useState(false);
  const {
    info,
    infoDispatch,
    duration,
    toggleAllDay,
    setDateRange,
    setSingleDate,
    setTimeRange,
    options,
    optionsDispatch,
  } = useEvent(props.date, props.event);
  const [selectLabel, setSelectLabel] = useState(getRepeatValue(options));

  function blur() {
    select.current.blur();
  }

  function setRepeat(value) {
    if (value === "custom") {
      setShowRepeat(true);
    } else if (value === "none") {
      infoDispatch({ type: "recurring", value: false });
      infoDispatch({ type: "rrule", value: "" });
      setSelectLabel(value);
    } else {
      let rrule = getDefaultRRules(dayjs(info.start), value);
      infoDispatch({ type: "recurring", value: true });
      infoDispatch({ type: "rrule", value: rrule });
      setSelectLabel(value);
    }
  }

  return (
    <>
      <PopupContainer
        visible={true}
        onOk={props.okPopup}
        onCancel={props.closePopup}
        title={props.title}
      >
        <FullSpace direction="vertical" size="middle">
          <Input
            placeholder="Add Title"
            value={info.title}
            onChange={(e) =>
              infoDispatch({ type: "title", value: e.target.value })
            }
          />
          <TextArea
            rows={2}
            placeholder="Add Description"
            value={info.description}
            onChange={(e) =>
              infoDispatch({ type: "description", value: e.target.value })
            }
          />
          <Select
            mode="multiple"
            placeholder="Add Participants"
            style={{ width: "100%" }}
            options={getUsers()}
            ref={select}
            allowClear
            value={info.participants}
            onChange={(val) => {
              infoDispatch({ type: "attendees", value: val });
              blur();
            }}
          />
          <DateContainer>
            {info.isAllDay ? (
              <DateRangePicker
                allowClear={false}
                value={getDates(duration.allDayStart, duration.durationDay)}
                onChange={(val) => setDateRange(val)}
              />
            ) : (
              <>
                <DatePicker
                  allowClear={false}
                  value={duration.datetimeStart}
                  onChange={(val) => setSingleDate(val)}
                />
                <TimeRangePicker
                  allowClear={false}
                  value={getTime(duration.datetimeStart, duration.durationMin)}
                  minuteStep={15}
                  format="h:mm a"
                  onChange={(val) => setTimeRange(val)}
                />
              </>
            )}
          </DateContainer>
          <Space direction="horizontal" size="middle">
            <Select
              value={selectLabel}
              onChange={(value) => setRepeat(value)}
              dropdownStyle={{ minWidth: "25%" }}
              style={{ width: "100%" }}
            >
              <Option value="none">No Repeat</Option>
              <Option value="daily">Daily</Option>
              <Option value="weekly">
                Weekly on {getWeekday(dayjs(info.start))}
              </Option>
              {getMonthOptions(dayjs(info.start))}
              <Option value="annually">Annually</Option>
              <Option value="custom">Custom</Option>
            </Select>
            <Checkbox checked={info.isAllDay} onChange={(e) => toggleAllDay(e)}>
              All Day
            </Checkbox>
          </Space>
        </FullSpace>
      </PopupContainer>
      {showRepeat && (
        <RepeatPopup
          cancelPopup={() => {
            setShowRepeat(false);
            optionsDispatch({ type: "reset", value: props.event });
            infoDispatch({ type: "end", value: null });
          }}
          okPopup={() => {
            setShowRepeat(false);
            infoDispatch({ type: "recurring", value: true });
            infoDispatch({
              type: "rrule",
              value: new RRule(options).toString(),
            });
            setSelectLabel(getRepeatValue(options));
          }}
          infoDispatch={infoDispatch}
          options={options}
          optionsDispatch={optionsDispatch}
          date={dayjs(info.start)}
        />
      )}
    </>
  );
}

function getTime(datetime, duration) {
  return [datetime, datetime.add(duration, "minute")];
}

function getDates(datetime, duration) {
  return [datetime, datetime.add(duration, "day")];
}

export function usePopup() {
  const [isVisible, setIsVisible] = useState(false);

  function openPopup() {
    setIsVisible(true);
  }

  function closePopup() {
    setIsVisible(false);
  }

  function okPopup() {
    setIsVisible(false);
    // only create/update, check if id present
  }

  return { isVisible, openPopup, closePopup, okPopup };
}
