import { DocumentData, Timestamp } from "firebase/firestore"

interface Props {
   // reminders: DocumentData;
    selected: Date;
}
enum ReminderType {
    appointment = 1,
    medicine,
    examination
}

interface Reminder {
    type: ReminderType;
    title: string;
    dateTime: Timestamp;
}

const DayEventsSlideout = ({ reminders }: Props) => {
   return(
    <div>
        EVENTS
    </div>
   )
}

export default DayEventsSlideout