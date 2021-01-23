import { useEffect, useState } from "react";
import randomColor from "randomcolor";
import axios from "axios";

export default function useCalendarSelector(userId) {
  const [calendars, setCalendars] = useState([]);
  const [activeCalendars, setActiveCalendars] = useState([]);

  function updateCalendars(label) {
    if (
      calendars.filter((i) => i.checked).length === 1 &&
      getCalendar(label).checked
    ) {
      return;
    }
    setCalendars(
      calendars.map((i) =>
        i.label === label ? { ...i, checked: !i.checked } : i
      )
    );
  }

  function getCalendar(label) {
    for (let i = 0; i < calendars.length; i++) {
      if (calendars[i].label === label) {
        return calendars[i];
      }
    }
    return {};
  }

  useEffect(() => {
    const colors = randomColor({ seed: 4744, luminosity: "dark", count: 5 });
    let calendars = [
      { label: "My Calendar", id: userId, checked: true, color: "#3495eb" },
    ];
    (async function () {
      try {
        const { data: contacts } = await axios.get(
          `/contact/authorized/${userId}`
        );
        calendars = calendars.concat(
          contacts.map((contact, i) => ({
            label: contact.receiver.email,
            id: contact.receiver.id,
            checked: false,
            color: colors[i],
          }))
        );
        setCalendars(calendars);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userId]);

  useEffect(() => {
    setActiveCalendars(calendars.filter((i) => i.checked));
  }, [JSON.stringify(calendars)]);

  return { calendars, updateCalendars, activeCalendars };
}
