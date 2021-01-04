import styled from "styled-components";
import { Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const Container = styled.div`
  & > div:not(:last-child) {
    margin-bottom: 1em;
  }
`;

const Request = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    margin: 0;
  }
  & > div {
    margin-left: 1rem;
    & > .ant-btn {
      margin: 0 5px;
    }
  }
`;

export default function ContactRequest(props) {
  return (
    <Container>
      {props.requests.map((request) => (
        <Request>
          <p>{request.email}</p>
          <div>
            <Button
              shape="circle"
              icon={<CheckOutlined />}
              onClick={() => props.acceptRequest(request.id)}
            />
            <Button
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => props.denyRequest(request.id)}
            />
          </div>
        </Request>
      ))}
    </Container>
  );
}
