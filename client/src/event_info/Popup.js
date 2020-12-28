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
import {
  useEvent,
  getUsers,
  getDuration,
  getRepeatValue,
} from "./EventInfoHooks";

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
  } = useEvent(props.date, props.event);
  const [prevSelect, setPrevSelect] = useState(getRepeatValue(options));

  function blur() {
    select.current.blur();
  }

  function setRepeat(value) {
    if (value === "custom") {
      setShowRepeat(true);
    } else if (value === "none") {
      dispatchInfo({ type: "recurring", value: false });
      dispatchInfo({ type: "rrule", value: "" });
      setPrevSelect(value);
    } else {
      setPrevSelect(value);
      let rrule;
      switch (value) {
        case "none":
          rrule = "";
          break;
        case "daily":
          rrule = "FREQ=DAILY;INTERVAL=1";
          break;
        case "weekly": {
          const day = dayAbbr[dayjs(info.start).day()];
          rrule = `FREQ=WEEKLY;BYDAY=${day};INTERVAL=1`;
          break;
        }
        case "monthly": {
          const day = dayAbbr[dayjs(info.start).day()];
          const week = Math.ceil(dayjs(info.start).date() / 7);
          rrule = `FREQ=MONTHLY;BYSETPOS=${week};BYDAY=${day};INTERVAL=1`;
          break;
        }
        case "monthly-last": {
          const day = dayAbbr[dayjs(info.start).day()];
          rrule = `FREQ=MONTHLY;BYSETPOS=-1;BYDAY=${day};INTERVAL=1`;
          break;
        }
        case "annually": {
          const date = dayjs(info.start).date();
          const month = dayjs(info.start).month() + 1;
          rrule = `FREQ=YEARLY;BYMONTH=${month};BYMONTHDAY=${date}`;
          break;
        }
      }
      dispatchInfo({ type: "recurring", value: true });
      dispatchInfo({ type: "rrule", value: rrule });
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

  function monthOptions(date) {
    const week = Math.ceil(date.date() / 7);
    const last = Math.ceil(date.endOf("month").date() / 7);
    if (week === last) {
      if (week === 4) {
        return (
          <>
            <Option value="monthly">
              Monthly on Fourth {weekdays[date.day()]}
            </Option>
            <Option value="monthly-last">
              Monthly on Last {weekdays[date.day()]}
            </Option>
          </>
        );
      } else if (week === 5) {
        return (
          <Option value="monthly-last">
            Monthly on Last {weekdays[date.day()]}
          </Option>
        );
      }
    }
    return (
      <Option value="monthly">
        Monthly on {weekNumber[week - 1]} {weekdays[date.day()]}
      </Option>
    );
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
            <Select
              value={prevSelect}
              onChange={(value) => setRepeat(value)}
              dropdownStyle={{ minWidth: "25%" }}
            >
              <Option value="none">No Repeat</Option>
              <Option value="daily">Daily</Option>
              <Option value="weekly">
                Weekly on {weekdays[dayjs(info.start).day()]}
              </Option>
              {monthOptions(dayjs(info.start))}
              <Option value="annually">Annually</Option>
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

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const weekNumber = ["First", "Second", "Third", "Fourth", "Last"];

const dayAbbr = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
