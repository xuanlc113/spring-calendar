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
import RepeatPopup, { useCustomRepeatPopup } from "./RepeatPopup";
import { useBasicEvent, getUsers, getRepeatValue } from "./BasicEventHook";
import { getDefaultRRules, getMonthOptions, getWeekday } from "./EventHelpers";

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
  const {
    info,
    infoDispatch,
    duration,
    toggleAllDay,
    setDateRange,
    setSingleDate,
    setTimeRange,
    repeatLabel,
  } = useBasicEvent(props.date, props.event);
  const { isVisible, openPopup, closePopup, okPopup } = useCustomRepeatPopup(
    info.start,
    infoDispatch
  );

  function blur() {
    select.current.blur();
  }

  function setRepeat(value) {
    if (value === "custom") {
      openPopup();
    } else if (value === "none") {
      infoDispatch({ type: "recurring", value: false });
      infoDispatch({ type: "rrule", value: "" });
    } else {
      let rrule = getDefaultRRules(info.start, value);
      infoDispatch({ type: "recurring", value: true });
      infoDispatch({ type: "rrule", value: rrule });
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
                onChange={setDateRange}
              />
            ) : (
              <>
                <DatePicker
                  allowClear={false}
                  value={duration.datetimeStart}
                  onChange={setSingleDate}
                />
                <TimeRangePicker
                  allowClear={false}
                  value={getTime(duration.datetimeStart, duration.durationMin)}
                  minuteStep={15}
                  format="h:mm a"
                  onChange={setTimeRange}
                />
              </>
            )}
          </DateContainer>
          <Space direction="horizontal" size="middle">
            <Select
              value={repeatLabel}
              onChange={setRepeat}
              dropdownStyle={{ minWidth: "25%" }}
              style={{ width: "100%" }}
            >
              <Option value="none">No Repeat</Option>
              <Option value="daily">Daily</Option>
              <Option value="weekly">Weekly on {getWeekday(info.start)}</Option>
              {getMonthOptions(info.start)}
              <Option value="annually">Annually</Option>
              <Option value="custom">Custom</Option>
            </Select>
            <Checkbox checked={info.isAllDay} onChange={toggleAllDay}>
              All Day
            </Checkbox>
          </Space>
        </FullSpace>
      </PopupContainer>
      {isVisible && (
        <RepeatPopup
          cancelPopup={closePopup}
          okPopup={okPopup}
          rrule={info.rrule}
          infoDispatch={infoDispatch}
          date={info.start}
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
