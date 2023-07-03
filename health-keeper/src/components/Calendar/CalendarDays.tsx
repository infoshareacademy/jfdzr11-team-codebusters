import { DocumentData } from "firebase/firestore";
import styles from "./Calendar.module.css";
import { Reminder } from "./Calendar";
import RemindersIndicator from "./RemindersIndicator";

interface Props {
  rowArr: Date[];
  selected: Date;
  selectedMonth: number;
  changeSelect: (newDate: Date) => void;
  toggleSlideout: () => void;
  showSlideout: () => void;
  reminders:Reminder[]
}



const CalendarDays = ({
  rowArr,
  changeSelect,
  selected,
  selectedMonth,
  toggleSlideout,
  showSlideout,
  reminders
}: Props) => {

    const getRemindersForDay = (reminders: Reminder[], day: Date) => {
      const dayReminders: Reminder[] = reminders.filter((reminder) => reminder.dateTime.toDate().toDateString()===day.toDateString())
      //console.log(dayReminders);
      return dayReminders;
    }

    const handleClick = (day: Date) => {
        if (day.getMonth() === selectedMonth) changeSelect(day);
        if (isSelected(day)) toggleSlideout();
        else showSlideout()
        
    }
  
    const isInSelectedMonth = (day: Date) => {
    return day.getMonth() === selectedMonth ? true : false;
  };
  const isSelected = (day: Date) => {
    return day.toDateString() === selected.toDateString() ? true : false;
  };

  return (
    <>
      {rowArr.map((day, index) => {
        return (
            <div
              key={index}
              className={
                styles["day"] +
                " " + (isSelected(day) ? styles["selected"] : "") +
                " " + (isInSelectedMonth(day) ? styles["active"] : styles["disabled"])
              }
              onClick={() => handleClick(day)}
            >
              <div className={styles["notify"]}>
                <RemindersIndicator dayReminders={getRemindersForDay(reminders, day)}/>
              </div>
              <p className={styles.date}>{day.getDate()}</p>
            </div>
            
        );
      })}
      
    </>
  );
};

export default CalendarDays;
