import { Reminder } from "./Calendar";
import styles from "./Calendar.module.css";

interface Props {
  dayReminders: Reminder[];
}

const RemindersIndicator = ({ dayReminders }: Props) => {
  const reminderTypes: string[] = [];
  dayReminders?.map((reminder) => {
    if (!reminderTypes.includes(reminder.type))
      reminderTypes.push(reminder.type);
  });

  return (
    <div className={styles.indicators}>
      {reminderTypes?.map((type, index) => {
        return <div className={styles[`indicator-${type}`]} key={index}></div>;
      })}
    </div>
  );
};

export default RemindersIndicator;
