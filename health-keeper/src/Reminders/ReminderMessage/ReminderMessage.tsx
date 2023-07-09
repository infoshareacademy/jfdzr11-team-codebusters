import styles from "./ReminderMessage.module.css";
import type { ReminderType } from "../types";
type ReminderMessageProps = {
	reminderData: ReminderType;
};
const ReminderMessage: React.FC<ReminderMessageProps> = ({ reminderData }) => {
	return (
		<div className={styles.reminder_wrapper}>
			<p>{reminderData.message}</p>
		</div>
	);
};

export default ReminderMessage;
