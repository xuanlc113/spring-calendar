import styled from "styled-components";
import { Button, Space, Modal, Radio } from "antd";
import dayjs from "dayjs";
import {
  CalendarOutlined,
  AlignRightOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getStartTime, getEndTime } from "./EventHelpers";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import Popup, { usePopup } from "./Popup";

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

const AttendOptions = styled.div`
  margin-top: 0.5em;
  display: flex;
  justify-content: flex-end;
`;

export default function EventPopover(props) {
  const { isOwner, isCreator, isRecurring } = useEventEdit(props);
  const [deleteRecurringVisible, setDeleteRecurringVisible] = useState(false);
  const [option, setOption] = useState(1);
  const { isVisible, openPopup, closePopup, okPopup } = usePopup();

  function showDelete() {
    if (isRecurring()) {
      return deleteRecurringEvent();
    }
    return deleteEvent();
  }

  function deleteEvent() {
    Modal.confirm({
      title: "Delete Event",
      maskClosable: true,
    });
  }

  function deleteRecurringEvent() {
    setDeleteRecurringVisible(true);
  }

  return (
    <>
      <PopoverHeader>
        <h3>{props.canonicalEvent.title}</h3>
        <div>
          {isCreator() && isOwner() && (
            <Button
              type="text"
              shape="circle"
              icon={<EditOutlined />}
              onClick={openPopup}
            />
          )}
          <Button
            type="text"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => showDelete()}
          />
        </div>
      </PopoverHeader>
      <PopoverInfo>
        <CalendarOutlined />
        <p>
          {dayjs(props.datetime).format("ddd D MMMM")}{" "}
          {getStartTime(props.datetime)} –{" "}
          {getEndTime(props.datetime, props.canonicalEvent.duration)}
        </p>
      </PopoverInfo>
      <PopoverInfo>
        <AlignRightOutlined rotate={180} />
        <p>{props.canonicalEvent.description}</p>
      </PopoverInfo>
      {props.attendees.length > 0 && (
        <>
          <PopoverInfo>
            <UserOutlined />
            <p>Attendees</p>
          </PopoverInfo>
          <Attendees>
            {props.attendees.map((a) => (
              <p>
                {a.email} {a.status}
              </p>
            ))}
          </Attendees>
          {isOwner() && !isCreator() && (
            <AttendOptions>
              <Space>
                <Button type="default">Yes</Button>
                <Button type="default">No</Button>
                <Button type="default">Maybe</Button>
              </Space>
            </AttendOptions>
          )}
        </>
      )}
      <Modal
        visible={deleteRecurringVisible}
        onCancel={() => setDeleteRecurringVisible(false)}
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
      {isVisible && (
        <Popup
          okPopup={okPopup}
          closePopup={closePopup}
          title={"Edit Event"}
          date={dayjs(props.canonicalEvent.start)}
          event={props.canonicalEvent}
        />
      )}
    </>
  );
}

function useEventEdit(event) {
  const user = useContext(UserContext);
  // const userId = user.sub.split("|")[1];
  const userId = "001";

  function isOwner() {
    return userId === event.userId;
  }

  function isCreator() {
    return userId === event.canonicalEvent.userId;
  }

  function isRecurring() {
    return event.canonicalEvent.isRecurring;
  }

  return { isOwner, isCreator, isRecurring };
}