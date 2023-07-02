import { useState, useEffect } from "react";
import CalendarRows from "./CalendarRows";
import styles from "./Calendar.module.css";



const weekdays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Śierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const Calendar = () => {

  const [selectedDay, setSelectedDay] = useState(new Date());

  
  const handleSelect = (newDate: Date) => {
    setSelectedDay(newDate);
    
  }

  const onMonthChange = (selected: Date, option: "next" | "prev") => {
    option==="next" ? setSelectedDay(new Date(selected.getFullYear(), (selected.getMonth()+1), 1)) :
    setSelectedDay(new Date(selected.getFullYear(), (selected.getMonth()-1), 1))
  }

  return (
    <div className={styles.calendar}>
      {selectedDay.getFullYear()+" "+months[selectedDay.getMonth()]}
      <button onClick={() => onMonthChange(selectedDay, "prev")}>prev</button>
      <button onClick={() => onMonthChange(selectedDay, "next")}>next</button>
      <div className="calendar-body">
        <div className={styles["dayGrid-header"]}>
          {weekdays.map((weekday, index) => (
            <div key={index} className={styles.weekday}>
              <p>{weekday}</p>
            </div>
          ))}
        </div>
        <div className="dayGrid-body">
          <CalendarRows
            selected={selectedDay}
            changeSelected={handleSelect}
           
          />
        </div>
        
      </div>
    </div>
  );
};

export default Calendar;
