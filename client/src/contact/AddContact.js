import styled from "styled-components";
import { Modal, Input } from "antd";
import { useContext, useState } from "react";
import { UserContext } from "../App";

const { Search } = Input;

const SearchBar = styled(Search)`
  width: 100%;
`;

const Error = styled.p`
  color: red;
`;

export default function AddContact(props) {
  const { message, search, changeSearch, addCalendar } = useSearch();

  return (
    <Modal
      visible={true}
      onCancel={props.close}
      footer={null}
      title="Get Calendar Permission"
    >
      <SearchBar
        placeholder="Add Calendar..."
        allowClear
        enterButton="Get Permission"
        size="large"
        value={search}
        onChange={(e) => changeSearch(e.target.value)}
        onSearch={addCalendar}
      />
      {message === 1 && <p>Calendar Access Request Sent!</p>}
      {message === 2 && <Error>Calendar not found</Error>}
    </Modal>
  );
}

export function useAddContact() {
  const [isAddContactVisible, setAddContactVisible] = useState(false);

  function openAddContact() {
    setAddContactVisible(true);
  }

  function closeAddContact() {
    setAddContactVisible(false);
  }

  return { isAddContactVisible, openAddContact, closeAddContact };
}

function useSearch() {
  const userId = useContext(UserContext);
  const [message, setMessage] = useState(0);
  const [search, setSearch] = useState("");

  function addCalendar() {
    setSearch("");
    if (sendRequest(search)) {
      setMessage(1);
      return;
    }

    setMessage(2);
  }

  function changeSearch(val) {
    setSearch(val);
    setMessage(0);
  }

  function sendRequest(user) {
    return true;
  }

  return { message, search, changeSearch, addCalendar };
}
