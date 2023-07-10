import { useEffect, useState, useRef } from "react";
import styles from "./Calendar.module.css";
import CalendarDays from "./CalendarDays";

import DayEventsSlideout from "./DayEventsSlideout";
import { Reminder } from "../../DataContext/dataTypes";

interface Props {
  selected: Date;
  changeSelected: (newDate: Date) => void;
  reminders: Reminder[];
}

const getRemindersForSelectedDay = (reminders: Reminder[], day: Date) => {
  let dayReminders: Reminder[];
  if (reminders === undefined) return [];
  else {
    dayReminders = reminders.filter(
      (reminder) =>
        new Date(reminder.dateTime).toDateString() === day.toDateString()
      );
    return dayReminders.sort((a, b) => a.dateTime - b.dateTime);
  }
};

const getAllDays = (selectedDay: Date) => {
  //takes selectedDay and populates a table that will be rendered later in the component/s
  const firstDayOfSelectedMonth = new Date(
    selectedDay.getFullYear(),
    selectedDay.getMonth(),
    1,
    12
  );

  const firstDayWeekday = firstDayOfSelectedMonth.getDay();
  const currentlyHandledDay = new Date(firstDayOfSelectedMonth);
  const _days: Date[] = [];
  for (let day = 0; day < 42; day++) {
    if (day === 0) {
      switch (firstDayWeekday) {
        case 0:
          _days.push(new Date(currentlyHandledDay.setDate(-5)));
          break;
        case 1:
          _days.push(currentlyHandledDay);
          break;
        case 2:
          _days.push(new Date(currentlyHandledDay.setDate(0)));
          break;
        case 3:
          _days.push(new Date(currentlyHandledDay.setDate(-1)));
          break;
        case 4:
          _days.push(new Date(currentlyHandledDay.setDate(-2)));
          break;
        case 5:
          _days.push(new Date(currentlyHandledDay.setDate(-3)));
          break;
        case 6:
          _days.push(new Date(currentlyHandledDay.setDate(-4)));
          break;
      }
    } else {
      _days.push(
        new Date(currentlyHandledDay.setDate(currentlyHandledDay.getDate() + 1))
      );
    }
  }
  return _days;
};

const CalendarRows = ({ changeSelected, selected, reminders }: Props) => {
  const [rows, setRows] = useState<Date[][]>([]);
  const [slideoutVisible, setSlideoutVisible] = useState<string>("hidden");

  const toggleSlideoutVisibility = () => {
    if (slideoutVisible === "show") setSlideoutVisible("hidden");
    if (slideoutVisible === "hidden") setSlideoutVisible("show");
  };
  const sliedoutShow = () => {
    setSlideoutVisible("show");
  };
  const slideoutHide = () => {
    setSlideoutVisible("hidden");
  };

  const selectedDayInRow = (row: Date[]) => {
    return row.some((day) => day.toDateString() === selected.toDateString());
  };

  const slideoutRow = (row: Date[]) => {
    if (row.length === 0) {
      return true;
    }
    if (row.length > 0) {
      return false;
    }
  };
  useEffect(() => {
    //dividing days into 6 rows and placing them in rows table for later render
    const days = getAllDays(selected);
    const _rows: Date[][] = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = i * 7; j < i * 7 + 7; j++) {
        row.push(days[j]);
      }
      _rows.push(row);
      if (selectedDayInRow(row)) _rows.push([]);
    }

    setRows(_rows);
  }, [selected]);

  return (
    <>
      <div className={styles["dayGrid-table"]}>
        {rows.map((row, index) => (
          <div
            className={
              styles["row"] +
              " " +
              (selectedDayInRow(row) ? styles["selected-row"] : "")
            }
            key={index}
          >
            {slideoutRow(row) &&
            getRemindersForSelectedDay(reminders, selected).length > 0 ? (
              <DayEventsSlideout
                selected={selected}
                dayReminders={getRemindersForSelectedDay(reminders, selected)}
                visibility={slideoutVisible}
              />
            ) : (
              <CalendarDays
                rowArr={row}
                changeSelect={changeSelected}
                selected={selected}
                selectedMonth={selected.getMonth()}
                toggleSlideout={toggleSlideoutVisibility}
                showSlideout={sliedoutShow}
                hideSlideout={slideoutHide}
                reminders={reminders}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CalendarRows;
