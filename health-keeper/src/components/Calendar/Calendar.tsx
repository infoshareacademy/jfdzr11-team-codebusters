import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import CalendarRows from "./CalendarRows";
import styles from "./Calendar.module.css";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../api/firebase/firebase";
import { Reminder, UserData } from "../../DataContext/dataTypes";
import { DataContext } from "../../DataContext/DataContext";

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
  const { currentUser } = useContext(AuthContext);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const { userData, setUserData } = useContext(DataContext);

  // const [reminders, setReminders] = useState<Reminder[]>([]);

  // useEffect(() => {
  //   setReminders(userData.reminders);
  // }, [userData.reminders]);
  
  const handleSelect = (newDate: Date) => {
    setSelectedDay(newDate);
  }

  const onMonthChange = (selected: Date, option: "next" | "prev") => {
    if(option==="next") setSelectedDay(new Date(selected.getFullYear(), (selected.getMonth()+1), selected.getDate()));
    if(option==="prev")setSelectedDay(new Date(selected.getFullYear(), (selected.getMonth()-1), selected.getDate()));
  }
  
  
  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <h1 className={styles[`header-monthYear`]}>{selectedDay.getFullYear()+" "+months[selectedDay.getMonth()]}</h1>
        <section className={styles[`header-nav`]}>
          <button className={styles[`header-btn`]} onClick={() => onMonthChange(selectedDay, "prev")}>{"<"}</button>
          <button onClick={() => onMonthChange(selectedDay, "next")}>{">"}</button>
        </section>
          
      </div>
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
            reminders={userData.reminders}
          />
        </div>
        
      </div>
    </div>
  );
};

export default Calendar;
