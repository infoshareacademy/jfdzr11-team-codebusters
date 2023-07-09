
import { Reminder } from "./Calendar";
import styles from "./Calendar.module.css";

interface Props {
  dayReminders: Reminder[];
}

const RemindersIndicator = ({ dayReminders }: Props) => {
  console.log(dayReminders);
  

  const tempArr = dayReminders?.map((reminder) => reminder.reminderType);
  const reminderTypes = [...new Set(tempArr)]

  
  
  return (
    <>
    {dayReminders.length>0 && <div className={styles.indicators}>
    {reminderTypes.map((type, index) => {

      return <div className={`${styles[`indicator-${type}`]} ${styles.indicator} `} key={index}></div>;
    })}
  </div>}
  </>
  );
};

export default RemindersIndicator;
