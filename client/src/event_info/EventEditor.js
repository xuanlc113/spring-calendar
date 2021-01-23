import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  Modal,
  Space,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Checkbox,
  Button,
} from "antd";
import { useEventEditor } from "../hooks/useEventEditor";
import { getDefaultRRules, getMonthOptions, getWeekday } from "./EventHelpers";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import EventRepeat, { useCustomRepeatPopup } from "./EventRepeat";
import dayjs from "dayjs";

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

const AttendeeList = styled.div`
  margin: 0 1rem;
  max-height: 6rem;
  overflow-y: auto;
`;

const AttendeeTag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    margin: 0;
  }
`;

const { TextArea, Search } = Input;
const { RangePicker: DateRangePicker } = DatePicker;
const { RangePicker: TimeRangePicker } = TimePicker;
const { Option } = Select;

export default function EventEditor(props) {
  const {
    info,
    infoDispatch,
    duration,
    toggleAllDay,
    setDateRange,
    setSingleDate,
    setTimeRange,
    repeatLabel,
  } = useEventEditor(props.date, props.event);
  const { isVisible, openPopup, closePopup, okPopup } = useCustomRepeatPopup(
    info.start,
    infoDispatch
  );
  const {
    attendees,
    input,
    error,
    setInput,
    addAttendee,
    removeAttendee,
  } = useAttendees(info, infoDispatch);

  function setRepeat(value) {
    if (value === "custom") {
      openPopup();
    } else if (value === "none") {
      infoDispatch({ type: "recurring", value: false });
      infoDispatch({ type: "rrule", value: "" });
    } else {
      let rrule = getDefaultRRules(info.datetimeStart, value);
      infoDispatch({ type: "recurring", value: true });
      infoDispatch({ type: "rrule", value: rrule });
    }
  }

  return (
    <>
      <PopupContainer
        visible={props.visible}
        onOk={() => props.okPopup(info)}
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
            autoSize={{ minRows: 1, maxRows: 2 }}
            placeholder="Add Description"
            value={info.description}
            onChange={(e) =>
              infoDispatch({ type: "description", value: e.target.value })
            }
          />
          <Search
            placeholder="Add Participants..."
            allowClear
            enterButton={<PlusOutlined />}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSearch={addAttendee}
          />
          {error && <p style={{ color: "red" }}>Cannot find calender</p>}
          {attendees.length > 0 && (
            <AttendeeList>
              {attendees.map((a) => (
                <AttendeeTag key={a.id}>
                  <p>{a.email}</p>
                  <Button
                    type="text"
                    icon={<CloseOutlined style={{ fontSize: "0.8em" }} />}
                    onClick={() => removeAttendee(a.email)}
                  />
                </AttendeeTag>
              ))}
            </AttendeeList>
          )}
          <DateContainer>
            {info.allDay ? (
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
              <Option value="weekly">
                Weekly on {getWeekday(info.datetimeStart)}
              </Option>
              {getMonthOptions(info.datetimeStart)}
              <Option value="annually">Annually</Option>
              <Option value="custom">Custom</Option>
            </Select>
            <Checkbox checked={info.allDay} onChange={toggleAllDay}>
              All Day
            </Checkbox>
          </Space>
        </FullSpace>
      </PopupContainer>
      {isVisible && (
        <EventRepeat
          cancelPopup={closePopup}
          okPopup={okPopup}
          rrule={info.rrule}
          infoDispatch={infoDispatch}
          date={info.datetimeStart}
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
  const [eventInfo, setEventInfo] = useState({
    title: "",
    date: dayjs(),
    event: null,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (eventInfo.title !== "") {
      setIsVisible(true);
    }
  }, [open, eventInfo.title]);

  function openPopup(title, infoDate, infoEvent) {
    setEventInfo({ title, date: infoDate, event: infoEvent });
    setOpen(!open);
  }

  function closePopup(e) {
    e.stopPropagation();
    setIsVisible(false);
  }

  async function okPopup(info) {
    let payload = parseInfo({ ...info });
    const canonId = payload.id;
    delete payload.id;
    console.log(payload);
    console.log(info);
    try {
      if (canonId) {
        await axios.put(`/event/${canonId}`, payload);
      } else {
        await axios.post(`/event`, payload);
      }
    } catch (err) {
      console.log(err);
    }
    setIsVisible(false);
  }

  function parseInfo(info) {
    const timezoneOffset = new Date().getTimezoneOffset();
    if (info.user) {
      info.userId = info.user.id;
      delete info.user;
    }
    info.title = info.title === "" ? "no title" : info.title;
    info.attendees = info.attendees.map((a) => a.id);
    info.datetimeStart = info.datetimeStart
      .subtract(timezoneOffset, "m")
      .millisecond(0)
      .toJSON();
    info.dateEnd =
      info.dateEnd === null
        ? null
        : info.dateEnd.subtract(timezoneOffset, "m").millisecond(0).toJSON();
    return info;
  }

  return { isVisible, eventInfo, openPopup, closePopup, okPopup };
}

function useAttendees(info, infoDispatch) {
  const [attendees, setAttendees] = useState(info.attendees);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  async function addAttendee() {
    if (attendees.some((attendee) => attendee.email === input)) {
      setError(true);
      return;
    }
    try {
      const { data } = await axios.get(`/user/email/${input}`);
      console.log(data);
      setError(false);
      const updatedAttendees = [...attendees, data];
      setAttendees(updatedAttendees);
      infoDispatch({ type: "attendees", value: updatedAttendees });
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setInput("");
    }
  }

  function removeAttendee(email) {
    let filtered = attendees.filter((attendee) => attendee.email !== email);
    setAttendees(filtered);
    infoDispatch({ type: "attendees", value: filtered });
  }

  return { attendees, input, error, setInput, addAttendee, removeAttendee };
}
