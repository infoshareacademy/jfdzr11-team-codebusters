import styles from "./ReminderMessage.module.css";
import type { ReminderType } from "../types";
type ReminderMessageProps = {
	reminderData: ReminderType;
	onHideForm?: () => void;
};
const ReminderMessage: React.FC<ReminderMessageProps> = ({ reminderData, onHideForm }) => {
	return (
    <div className={styles.reminder_wrapper}>
      <button className={styles.close_button} onClick={onHideForm}>
        X
      </button>
      <p>{reminderData.message}</p>
    </div>
  );
};

export default ReminderMessage;
