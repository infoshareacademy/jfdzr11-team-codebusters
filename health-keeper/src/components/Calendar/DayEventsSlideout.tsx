import { Timestamp } from "firebase/firestore"
import { Reminder } from "./Calendar";
import styles from "./Calendar.module.css"

interface Props {
    dayReminders: Reminder[];
    selected: Date;
}




const DayEventsSlideout = ({ dayReminders, selected }: Props) => {
   return(
    <>
        {dayReminders.map((reminder, index) => {
            return(
                <div key={index} className={styles.reminder}>
                    <p>{(new Date(reminder.dateTime)).toDateString()} </p>
                    {reminder.message}
                </div>
            )
        })}
    </>
   )
}

export default DayEventsSlideout