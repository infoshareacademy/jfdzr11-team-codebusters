import styles from './ReminderMessage.module.css'
import { ReminderType } from '../ReminderForm/ReminderForm';
type ReminderMessageProps = {
    reminderData: ReminderType;
}
const ReminderMessage: React.FC<ReminderMessageProps> = ({reminderData}) => {
    return (
        <div className={styles.reminder_wrapper}>
            <p>{reminderData.message}</p>
        </div>
    );
}

export default ReminderMessage;