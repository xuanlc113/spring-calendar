import styled from "styled-components";
import { Button, Space, Modal, Radio } from "antd";
import {
  CalendarOutlined,
  AlignRightOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  MinusCircleTwoTone,
} from "@ant-design/icons";
import { getStartTime, getEndTime } from "./EventHelpers";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";

const PopoverHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > h3 {
    margin: 0;
    cursor: default;
  }
`;

const PopoverInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
  & > .anticon {
    margin-right: 0.5em;
  }
  & > p {
    margin: 0;
    cursor: default;
  }
`;

const Attendees = styled.div`
  margin-left: 1.5em;
  max-height: 5rem;
  overflow: auto;
`;

const AttendeeStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  & > p {
    margin-bottom: 0;
  }
`;

const AttendOptions = styled.div`
  margin-top: 0.5em;
  display: flex;
  justify-content: flex-end;
`;

export default function EventPopover(props) {
  const userId = useContext(UserContext);
  const { isOwner, isCreator, isRecurring } = useEventEdit(props);
  const [deleteRecurringVisible, setDeleteRecurringVisible] = useState(false);
  const [option, setOption] = useState(1);

  function showDelete() {
    if (isRecurring()) {
      return deleteRecurringEvent();
    }
    return deleteSingleEvent();
  }

  function deleteSingleEvent() {
    Modal.confirm({
      title: "Delete Event",
      maskClosable: true,
      onOk: () => deleteEvent(),
    });
  }

  function deleteRecurringEvent() {
    setDeleteRecurringVisible(true);
  }

  async function deleteEvent() {
    const [attendee] = props.attendees.filter((a) => a.user.id === userId);
    const attendeeId = attendee.id;
    const instanceId = props.id;
    if (isCreator()) {
      if (option === 1) {
        await axios.delete(`/event/instance/${instanceId}`);
      } else {
        await axios.delete(`/event/instance/after/${instanceId}`);
      }
    } else {
      if (option === 1) {
        await axios.delete(`/event/attendee/${attendeeId}`);
      } else {
        await axios.delete(`/event/attendee/after/${attendeeId}`);
      }
    }
    props.refresh();
  }

  async function updateAttendee(status) {
    const [attendee] = props.attendees.filter((a) => a.user.id === userId);
    const attendeeId = attendee.id;
    await axios.put(`/event/attendee/${attendeeId}`, status, {
      headers: { "Content-Type": "application/json" },
    });
    props.refresh();
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <PopoverHeader>
        <h3>{props.canon.title}</h3>
        <div>
          {isCreator() && isOwner() && (
            <>
              <Button
                type="text"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() =>
                  props.openPopup(
                    "Edit Event",
                    props.canon.datetimeStart,
                    props.canon
                  )
                }
              />
              <Button
                type="text"
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => showDelete()}
              />
            </>
          )}
        </div>
      </PopoverHeader>
      <PopoverInfo>
        <CalendarOutlined />
        <p>
          {props.datetime.format("ddd D MMMM")}
          {props.canon.allDay
            ? ` - ${props.datetime
                .add(props.canon.duration, "day")
                .format("ddd D MMMM")}`
            : ` ${getStartTime(props.canon.datetimeStart)} -
            ${getEndTime(props.canon.datetimeStart, props.canon.duration)}`}
        </p>
      </PopoverInfo>

      {props.canon.description && (
        <PopoverInfo>
          <AlignRightOutlined rotate={180} />
          <p>{props.canon.description}</p>
        </PopoverInfo>
      )}
      {props.attendees.length > 1 && (
        <>
          <PopoverInfo>
            <UserOutlined />
            <p>Attendees</p>
          </PopoverInfo>
          <Attendees>
            {props.attendees.map((a) => (
              <AttendeeStatus>
                <p>{a.user.email}</p>
                {a.status === "ACCEPTED" && (
                  <CheckCircleTwoTone twoToneColor="#06d6a0" />
                )}
                {a.status === "DECLINED" && (
                  <CloseCircleTwoTone twoToneColor="#ef476f" />
                )}
                {a.status === "PENDING" && (
                  <MinusCircleTwoTone twoToneColor="#ffd166" />
                )}
              </AttendeeStatus>
            ))}
          </Attendees>
          {isOwner() && !isCreator() && (
            <AttendOptions>
              <Space>
                <Button type="default" onClick={() => updateAttendee(1)}>
                  Yes
                </Button>
                <Button type="default" onClick={() => updateAttendee(2)}>
                  No
                </Button>
                <Button type="default" onClick={() => updateAttendee(3)}>
                  Maybe
                </Button>
              </Space>
            </AttendOptions>
          )}
        </>
      )}
      <Modal
        visible={deleteRecurringVisible}
        onCancel={() => setDeleteRecurringVisible(false)}
        onOk={deleteEvent}
        title="Delete Recurring"
      >
        <Radio.Group value={option} onChange={(e) => setOption(e.target.value)}>
          <Radio value={1} style={{ display: "block" }}>
            This event
          </Radio>
          <Radio value={2} style={{ display: "block" }}>
            This and following events
          </Radio>
        </Radio.Group>
      </Modal>
    </div>
  );
}

function useEventEdit(event) {
  const userId = useContext(UserContext);
  function isOwner() {
    return userId === event.owner;
  }

  function isCreator() {
    return userId === event.canon.user.id;
  }

  function isRecurring() {
    return event.canon.recurring;
  }

  return { isOwner, isCreator, isRecurring };
}
