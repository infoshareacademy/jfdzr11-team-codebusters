import styles from "./ReminderMessage.module.css";
import type { ReminderType } from "../types";
type ReminderMessageProps = {
	reminderData: ReminderType;
	onModalDisable?: () => void;
};
const ReminderMessage: React.FC<ReminderMessageProps> = ({ reminderData, onModalDisable }) => {
	return (
    <div className={styles.reminder_wrapper}>
      <button className={styles.close_button} onClick={onModalDisable}>
        X
      </button>
      <p>{reminderData.message}</p>
    </div>
  );
};

export default ReminderMessage;
