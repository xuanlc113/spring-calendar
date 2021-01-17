import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

export default function useDatetime() {
  const [date, setDate] = useState(roundDate());
  const first = useRef(true);

  function roundDate() {
    let date = dayjs();
    const time = Math.floor(date.minute() / 5);
    date = date.minute(5 * time).second(0);
    return date;
  }

  useEffect(() => {
    let timer;
    if (first.current) {
      const diff = date.add(5, "minute").diff(dayjs(), "second");
      timer = setTimeout(() => {
        incrementTime();
      }, diff * 1000);
      first.current = false;
    } else {
      timer = setInterval(() => {
        incrementTime();
      }, 5 * 60 * 1000);
    }
    return () => clearInterval(timer);
  }, [date]);

  function incrementTime() {
    setDate(date.minute(date.minute() + 5));
  }

  function setDateOnly(dateObj) {
    setDate(
      date
        .year(dateObj.getFullYear())
        .month(dateObj.getMonth())
        .date(dateObj.getDate())
    );
  }

  return { date, setDate, setDateOnly };
}
