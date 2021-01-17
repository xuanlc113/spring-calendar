import { useEffect, useRef, useState } from "react";
import randomColor from "randomcolor";
import axios from "axios";

export default function useCalendarSelector(userId) {
  const activeCalendars = useRef(null);
  const [calendars, setCalendars] = useState(getCalendars(userId));
  activeCalendars.current = calendars.filter((i) => i.checked);

  function getCalendars(userId) {
    return [
      { label: "My Calendar", id: userId, checked: true, color: "#3495eb" },
    ];
  }

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
      } catch (err) {
        console.log(err);
      }
    })();
    setCalendars(calendars);
    activeCalendars.current = calendars.filter((i) => i.checked);
  }, []);

  return { calendars, updateCalendars, activeCalendars };
}
