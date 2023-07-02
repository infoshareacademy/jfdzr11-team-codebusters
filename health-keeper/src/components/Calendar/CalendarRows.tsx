import { useEffect, useState, useRef } from "react";
import styles from "./Calendar.module.css";
import CalendarDays from "./CalendarDays";

import { DocumentData } from "firebase/firestore";
import DayEventsSlideout from "./DayEventsSlideout";
import { createPortal } from "react-dom";


interface Props {
  selected: Date;
  changeSelected: (newDate: Date) => void;
}

const getAllDays = (selectedDay: Date) => {
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

const CalendarRows = ({ changeSelected, selected }: Props) => {
  const [rows, setRows] = useState<Date[][]>([]);
  const [slideoutContainer, setSlideoutContainer] = useState <HTMLElement | null>(null)
  
  const selectedDayInRow = (row: Date[]) => {
    return row.some((day) => day.toDateString() === selected.toDateString());
  };
  const slideoutRow = (row: Date[]) => {
    if (row.length === 0) return true;
    else false;
  };
  useEffect(() => {
    const days = getAllDays(selected);
    const _rows: Date[][] = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = i * 7; j < i * 7 + 7; j++) {
        row.push(days[j]);
      }
      _rows.push(row);
      if(selectedDayInRow(row)) _rows.push([]);
    }

    setRows(_rows);
    
    if(document.getElementById("slideout")){
      createPortal(<DayEventsSlideout selected={selected}/>, document.getElementById("slideout")as HTMLElement)
    }
    
  }, [selected]);

  return (
    <>
      <div className={styles["dayGrid-table"]}>
        {rows.map((row, index) => (
          <div
            id={slideoutRow(row) ? "slideout" : undefined}
            className={
              styles["row"] +
              " " +
              (selectedDayInRow(row) ? styles["selected-row"] : "")
            }
            key={index}
          >
            <CalendarDays
              rowArr={row}
              changeSelect={changeSelected}
              selected={selected}
              selectedMonth={selected.getMonth()}
             
            />
            
          </div>
         
        ))}
      </div>
      {}
    </>
  );
};

export default CalendarRows;
