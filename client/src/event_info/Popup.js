import styled from "styled-components";
import { useEffect, useReducer, useRef, useState } from "react";
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
import RRule, { RRuleSet, rrulestr } from "rrule";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
const { RangePicker } = TimePicker;
const { Option } = Select;

export default function Popup(props) {
  const select = useRef(null);
  const [showRepeat, setShowRepeat] = useState(false);
  const { info, dispatchInfo, options, setOptions } = useEvent(props.date);
  const [allDay, setAllDay] = useState(false);

  function blur() {
    select.current.blur();
  }

  function setRepeat(value) {
    if (value === "custom") {
      setShowRepeat(true);
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
            {allDay ? (
              <DateRangePicker
                allowClear={false}
                value={getDates(info.datetime, info.duration)}
                onChange={(val) =>
                  dispatchInfo({ type: "dateRange", value: val })
                }
              />
            ) : (
              <>
                <DatePicker
                  allowClear={false}
                  value={info.datetime}
                  onChange={(val) => dispatchInfo({ type: "date", value: val })}
                />
                <RangePicker
                  allowClear={false}
                  value={getTime(info.datetime, info.duration)}
                  minuteStep={15}
                  format="h:mm a"
                  onChange={(val) => {
                    dispatchInfo({ type: "timeRange", value: val });
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
                setAllDay((prev) => !prev);
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
  const round = Math.ceil(datetime.minute() / 15);
  console.log(datetime.minute(round * 15));
  if (duration === 0) {
    return [datetime.minute(round * 15), datetime.minute(round * 15 + 60)];
  }
  return [datetime.minute(round * 15), datetime.minute(round * 15 + duration)];
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

function getUsers() {
  return [
    { label: "sersd", value: "asdf" },
    { label: "aesd", value: "ghjk" },
    { label: "zxcsd", value: "zxcv" },
  ];
}

function reducer(state, action) {
  switch (action.type) {
    case "title":
      return { ...state, title: action.value };
    case "description":
      return { ...state, description: action.value };
    case "participants":
      return { ...state, participants: action.value };
    case "allDay":
      return { ...state, isAllDay: action.value };
    case "date":
      const date = state.datetime
        .year(action.value.year())
        .month(action.value.month())
        .date(action.value.date());
      return { ...state, datetime: date };
    case "timeRange":
      let [start, end] = action.value;
      const hour = start.hour();
      const min = start.minute();
      const time = state.datetime.hour(hour).minute(min);
      return { ...state, datetime: time, duration: end.diff(start, "minute") };
    case "dateRange":
      return {
        ...state,
        datetime: action.value[0],
        duration: action.value[1].diff(action.value[0], "day"),
      };
  }
}

function useEvent(datetime, event) {
  const [info, dispatchInfo] = useReducer(
    reducer,
    getEventInfo(datetime, event)
  );
  const [options, setOptions] = useState(parseRRule());

  return { info, dispatchInfo, options, setOptions };
}

function getEventInfo(datetime, event = 0) {
  if (event) {
    // modify date in controller?
    return event;
  }

  const round = Math.ceil(datetime.minute() / 15);

  const eventTemplate = {
    userId: "",
    title: "",
    description: "",
    datetime: datetime.minute(round * 15),
    participants: [],
    duration: 0,
    isAllDay: false,
    isRepeating: false,
    rrule: "",
    repeatUntil: null,
  };

  return eventTemplate;
}

function parseRRule() {
  // let rrule = RRule.parseString("RRULE:FREQ=MONTHLY;BYDAY=-1TH,3TH");
  // console.log(rrule);
  // rrule > toText > parseText > options
  const options = {
    freq: "",
    interval: 0,
    wkst: "",
    until: null,
    byweekno: [],
    byweekDay: [],
    bymonthDay: 0,
  };
  return options;
}
