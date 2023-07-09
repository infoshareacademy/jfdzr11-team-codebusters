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
    const dayReminders: Reminder[] = reminders.filter(
      (reminder) => new Date(reminder.dateTime).toDateString() === day.toDateString()
    );
    if (dayReminders === undefined) return [];
    else return dayReminders;
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
