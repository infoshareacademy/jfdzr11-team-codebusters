import styles from "./Calendar.module.css";
import { Reminder } from "../../DataContext/dataTypes";
import RemindersIndicator from "./RemindersIndicator";

interface Props {
  rowArr: Date[];
  selected: Date;
  selectedMonth: number;
  changeSelect: (newDate: Date) => void;
  toggleSlideout: () => void;
  showSlideout: () => void;
  hideSlideout: () => void;
  reminders: Reminder[];
}

const CalendarDays = ({
  rowArr,
  changeSelect,
  selected,
  selectedMonth,
  toggleSlideout,
  showSlideout,
  hideSlideout,
  reminders,
}: Props) => {
  

  const getRemindersForDay = (reminders: Reminder[], day: Date) => {
    let dayReminders: Reminder[] = [];
    if (reminders.length > 0) {
      dayReminders = reminders.filter(
        (reminder) =>
          new Date(reminder.dateTime).toDateString() === day.toDateString()
      );
      
    }
    return dayReminders.sort((a, b) => a.dateTime - b.dateTime);
  };



  const handleClick = (day: Date) => {
    if (day.getMonth() === selectedMonth) changeSelect(day);
    if (isSelected(day)) toggleSlideout();
    else if (!isInSelectedMonth(day)) hideSlideout();
    else showSlideout();
  };

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
              " " +
              (isSelected(day) ? styles["selected"] : "") +
              " " +
              (isInSelectedMonth(day) ? styles["active"] : styles["disabled"])
            }
            onClick={() => handleClick(day)}
          >
            {getRemindersForDay(reminders, day).length > 0 ? (
              <RemindersIndicator
                dayReminders={getRemindersForDay(reminders, day)}
              />
            ) : (
              <div></div>
            )}

            <div className={styles.date}>{day.getDate()}</div>
            <div></div>
          </div>
        );
      })}
    </>
  );
};

export default CalendarDays;
