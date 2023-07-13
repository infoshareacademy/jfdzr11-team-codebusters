import styles from "./DayEventsSlideout.module.css";
import { useEffect, useState } from "react";
import { ReminderComponent }  from "./../index" ;
import  { Reminder }  from "../../DataContext/dataTypes" ;
import editIcon from "./../../assets/edit_note.svg"

const parseTime = (seconds: number) => {
  const date = new Date(seconds);
  let dateHours = date.getHours().toString();
  let dateMinutes = date.getMinutes().toString();
  if (Number(dateHours)<10) dateHours = "0"+dateHours
  if (Number(dateMinutes)<10) dateMinutes = "0"+dateMinutes

  return dateHours+":"+dateMinutes;
}

interface Props {
  dayReminders: Reminder[];
  selected: Date;
  visibility: string;
}

const DayEventsSlideout = ({ dayReminders, selected, visibility}: Props) => {   
    const [slideoutVisible, setSlideoutVisible] = useState(visibility);
    const [reminderVisibility, setReminderVisibility] = useState<boolean>(false);
    const [reminderToEdit, setReminderToEdit] = useState<Reminder>()

  const handleReminderVisibility = () => {
    setReminderVisibility(!reminderVisibility);

  };
  const handleReminderClick = (reminder: Reminder) => {
    setReminderToEdit(reminder)
    setReminderVisibility(true);
  }
  

    useEffect(() => {
        if(visibility!==slideoutVisible) setSlideoutVisible(visibility);
    }, [visibility])


  return (
    <>
      <div className={styles.slideout + " " + styles[`slideout-${slideoutVisible}`]}>
        {dayReminders.map((reminder, index) => {
          return (
            <div key={index} className={styles.reminder + " "+ styles[`reminder-${reminder.reminderType}`]} >
              <p>{parseTime(reminder.dateTime)+" - "+reminder.message} </p>
              
                <button className={styles.reminderEditBtn} onClick={() => handleReminderClick(reminder)}><img className={styles.editIcon} src={editIcon} alt="edit" /></button>
               
            </div>
          );
        })}
        {reminderVisibility && (
        <ReminderComponent editForm={reminderToEdit} isModalForm onHideForm={handleReminderVisibility} />
      )}
      </div>
    </>
  );
};

export default DayEventsSlideout;
