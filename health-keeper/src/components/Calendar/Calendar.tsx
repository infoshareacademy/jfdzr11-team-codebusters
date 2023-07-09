import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import CalendarRows from "./CalendarRows";
import styles from "./Calendar.module.css";
import { getDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../../api/firebase/firebase";


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

export interface Reminder {
  dateTime: number;
  message: string;
  reminderId: number;
  type: "general" | "medicine";
}

const Calendar = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedDay, setSelectedDay] = useState(new Date());

  

  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const id: string = currentUser?.uid;
        const data = await getDoc(doc(db, 'users', id));
        const reminders: Reminder[] = data.data()?.reminders;
        setReminders(reminders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReminders();
    
  }, []);
  
  const handleSelect = (newDate: Date) => {
    setSelectedDay(newDate);
    
  }

  

  const onMonthChange = (selected: Date, option: "next" | "prev") => {
    if(option==="next") setSelectedDay(new Date(selected.getFullYear(), (selected.getMonth()+1), selected.getDate()));
    if(option==="prev")setSelectedDay(new Date(selected.getFullYear(), (selected.getMonth()-1), selected.getDate()));
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
            reminders={reminders}
          />
        </div>
        
      </div>
    </div>
  );
};

export default Calendar;
