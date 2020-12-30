import styled from "styled-components";
import { Button, Space } from "antd";
import dayjs from "dayjs";
import {
  CalendarOutlined,
  AlignRightOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getStartTime, getEndTime } from "./EventHelpers";
import { useContext } from "react";
import { UserContext } from "../App";

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
  const { isOwner, isCreator } = useEventEdit(props);

  return (
    <>
      <PopoverHeader>
        <h3>{props.canonicalEvent.title}</h3>
        <div>
          {isCreator() && isOwner() && (
            <Button type="text" shape="circle" icon={<EditOutlined />} />
          )}
          <Button type="text" shape="circle" icon={<DeleteOutlined />} />
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

  return { isOwner, isCreator };
}
