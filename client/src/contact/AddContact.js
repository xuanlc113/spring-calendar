import styled from "styled-components";
import { Modal, Input } from "antd";
import { useEffect, useState } from "react";

const { Search } = Input;

const SearchBar = styled(Search)`
  width: 100%;
`;

const Error = styled.p`
  color: red;
`;

export default function AddContact(props) {
  const { message, search, setSearch, addCalendar } = useSearch();

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
        onChange={(e) => setSearch(e.target.value)}
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
  const [message, setMessage] = useState(0);
  const [search, setSearch] = useState("");

  function addCalendar() {
    setSearch("");
    if (search === "as") {
      setMessage(1);
    }

    setMessage(2);
  }

  return { message, search, setSearch, addCalendar };
}
