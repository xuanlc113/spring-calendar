import styled from "styled-components";
import { Modal, Input } from "antd";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";

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

  async function addCalendar() {
    try {
      const { data } = await axios.get(`/user/email/${search}`);
      const receiverId = data.id;
      await axios.post("/contact", {
        sender: userId,
        receiver: receiverId,
      });
      setMessage(1);
    } catch (err) {
      console.log(err);
      setMessage(2);
    }

    setSearch("");
  }

  function changeSearch(val) {
    setSearch(val);
    setMessage(0);
  }

  return { message, search, changeSearch, addCalendar };
}
