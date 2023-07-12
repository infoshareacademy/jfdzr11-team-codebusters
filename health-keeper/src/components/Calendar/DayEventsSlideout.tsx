import { Timestamp } from "firebase/firestore";

import styles from "./DayEventsSlideout.module.css";
import { useEffect, useState } from "react";
import { Reminder } from "../../DataContext/dataTypes";

interface Props {
  dayReminders: Reminder[];
  selected: Date;
  visibility: string;
}

const DayEventsSlideout = ({ dayReminders, selected, visibility}: Props) => {
    
    const parseTime = (seconds: number) => {
        const date = new Date(seconds);
        let dateHours = date.getHours().toString();
        let dateMinutes = date.getMinutes().toString();
        if (Number(dateHours)<10) dateHours = "0"+dateHours
        if (Number(dateMinutes)<10) dateMinutes = "0"+dateMinutes

        return dateHours+":"+dateMinutes;
    }
    
    const [slideoutVisible, setSlideoutVisible] = useState(visibility);

    useEffect(() => {
        if(visibility!==slideoutVisible) setSlideoutVisible(visibility);
    }, [visibility])


  return (
    <>
      <div className={styles.slideout + " " + styles[`slideout-${slideoutVisible}`]}>
        {dayReminders.map((reminder, index) => {
          return (
            <div key={index} className={styles.reminder + " "+ styles[`reminder-${reminder.reminderType}`]}>
              <p>{parseTime(reminder.dateTime)+" - "+reminder.message} </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DayEventsSlideout;
