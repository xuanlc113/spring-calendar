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
import { useEvent, getUsers, getDuration } from "./EventInfoHooks";

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
    dispatchInfo,
    duration,
    setDuration,
    options,
    setOptions,
  } = useEvent(props.date);

  function blur() {
    select.current.blur();
  }

  function setRepeat(value) {
    if (value === "custom") {
      setShowRepeat(true);
    }
  }

  function swapDuration() {
    if (info.isAllDay) {
      dispatchInfo({ type: "start", value: duration.datetimeStart });
      dispatchInfo({ type: "duration", value: duration.durationMin });
    } else {
      dispatchInfo({ type: "start", value: duration.allDayStart });
      dispatchInfo({ type: "duration", value: duration.durationDay });
    }
  }

  return (
    <>
      <PopupContainer
        visible={true}
        onOk={props.closePopup}
        onCancel={props.closePopup}
        title={props.title}
      >
        <FullSpace direction="vertical" size="middle">
          <Input
            placeholder="Add Title"
            value={info.title}
            onChange={(e) =>
              dispatchInfo({ type: "title", value: e.target.value })
            }
          />
          <TextArea
            rows={2}
            placeholder="Add Description"
            value={info.description}
            onChange={(e) =>
              dispatchInfo({ type: "description", value: e.target.value })
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
              dispatchInfo({ type: "participants", value: val });
              blur();
            }}
          />
          <DateContainer>
            {info.isAllDay ? (
              <DateRangePicker
                allowClear={false}
                value={getDates(duration.allDayStart, duration.durationDay)}
                onChange={(val) => {
                  const durationDay = getDuration(val, "day");
                  dispatchInfo({ type: "start", value: val[0] });
                  dispatchInfo({
                    type: "duration",
                    value: durationDay,
                  });
                  setDuration({
                    ...duration,
                    allDayStart: val[0],
                    durationDay,
                  });
                }}
              />
            ) : (
              <>
                <DatePicker
                  allowClear={false}
                  value={duration.datetimeStart}
                  onChange={(val) => {
                    dispatchInfo({ type: "start", value: val });
                    setDuration({ ...duration, datetimeStart: val });
                  }}
                />
                <TimeRangePicker
                  allowClear={false}
                  value={getTime(duration.datetimeStart, duration.durationMin)}
                  minuteStep={15}
                  format="h:mm a"
                  onChange={(val) => {
                    const durationMin = getDuration(val, "minute");
                    dispatchInfo({
                      type: "duration",
                      value: durationMin,
                    });

                    const hour = val[0].hour();
                    const min = val[0].minute();
                    const datetimeStart = duration.datetimeStart
                      .hour(hour)
                      .minute(min);
                    setDuration({ ...duration, datetimeStart, durationMin });
                  }}
                />
              </>
            )}
          </DateContainer>
          <Space direction="horizontal" size="middle">
            <Select defaultValue="none" onChange={(value) => setRepeat(value)}>
              <Option value="none">No Repeat</Option>
              <Option value="daily">Daily</Option>
              {/* <Option value="weekly">
                Weekly on {weekdays[info.datetime.day()]}
              </Option>
              <Option value="monthly">
                Monthly on {Math.ceil(info.datetime.date() / 7)}{" "}
                {weekdays[info.datetime.day()]}
              </Option> */}
              <Option value="annual">Annually</Option>
              <Option value="custom">Custom</Option>
            </Select>
            <Checkbox
              checked={info.isAllDay}
              onChange={(e) => {
                swapDuration();
                dispatchInfo({ type: "allDay", value: e.target.checked });
              }}
            >
              All Day
            </Checkbox>
          </Space>
        </FullSpace>
      </PopupContainer>
      {showRepeat && <RepeatPopup closePopup={() => setShowRepeat(false)} />}
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

  return { isVisible, openPopup, closePopup };
}
