import styles from "./ReminderForm.module.css";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { db } from "../../api/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import type { ReminderType } from "../types";
import { parseEditDate, parseEditTime } from "../utils";
import { DataContext } from "../../DataContext/DataContext";
import MedType from "../../components/Medicine/types";

type ReminderFormProps = {
  onHideForm: () => void;
  editForm: undefined | ReminderType;
  medicineForm: undefined | MedType;
};

const ReminderForm: React.FC<ReminderFormProps> = ({
  editForm,
  onHideForm,
  medicineForm,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(DataContext);

  const [timesDay, setTimesDay] = useState(0);

  const id = currentUser?.uid;

  const formRef = useRef<HTMLFormElement>(null);
  const docRef = doc(db, "users", id);

  const handleAddReminder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reminderText: string = (
      e.currentTarget.elements.namedItem("reminderText") as HTMLInputElement
    ).value;
    const date: Date = new Date(
      (e.currentTarget.elements.namedItem("date") as HTMLInputElement).value,
    );
    console.log("date", date);
    const reminderTime: string = (
      e.currentTarget.elements.namedItem("time") as HTMLInputElement
    ).value;
    const [hours, minutes] = reminderTime.split(":");
    const dateTime = date.setHours(Number(hours), Number(minutes));

    try {
      // function that will update the document in the firebase database

      const _userData = userData;
      const reminderId = crypto.randomUUID();

      const newReminder: ReminderType = {
        dateTime,
        message: reminderText,
        reminderId,
        reminderType: medicineForm ? "medicine" : "general",
      };

      if (editForm) {
        const editId = editForm.reminderId;
        const updatedReminders = _userData.reminders.filter(
          (reminder) => reminder.reminderId !== editId,
        );
        newReminder.reminderType = editForm.reminderType;
        updatedReminders.push(newReminder);
        await updateDoc(docRef, { reminders: updatedReminders });
        console.log("reminder edited");

        onHideForm();
      } else {
        const updatedReminders = [..._userData.reminders, newReminder];
        // update the document in the database
        await updateDoc(docRef, { reminders: updatedReminders });
        console.log("Reminder successfully added");
        onHideForm();
      }
    } catch (error) {
      console.log(error);
    }
    formRef.current?.reset();
    console.log("form submitted");
  };

  const handleAddMedicineReminder = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const medReminders: ReminderType[] = [];

    const startDate = new Date(
      (
        e.currentTarget.elements.namedItem("startDate") as HTMLInputElement
      ).value,
    );
    const message = (
      e.currentTarget.elements.namedItem("message") as HTMLInputElement
    ).value;
    const daysNumber = Number(
      (e.currentTarget.elements.namedItem("daysNumber") as HTMLInputElement)
        .value,
    );

    try {
      for (let i = 0; i < daysNumber; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        for (let j = 0; j < timesDay; j++) {
          const time = (
            e.currentTarget.elements.namedItem(`time${j}`) as HTMLInputElement
          ).value;

          const [hours, minutes] = time.split(":");
          const dateTime = date.setHours(Number(hours), Number(minutes));
          const reminderId = crypto.randomUUID();
          const newReminder: ReminderType = {
            dateTime,
            message: message,
            reminderId,
            reminderType: "medicine",
          };
          medReminders.push(newReminder);
        }
      }
      const updatedReminders = [...userData.reminders, ...medReminders];
      // update the document in the database

      await updateDoc(docRef, { reminders: updatedReminders });
      console.log("Reminders successfully added");
      onHideForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReminder = async () => {
    try {
      if (editForm) {
        const deleteId = editForm.reminderId;
        const _userData = userData;
        console.log("przed usunięciem", _userData.reminders);
        console.log("deleteID", deleteId);

        const updatedReminders = _userData.reminders.filter((reminder) => {
          return reminder.reminderId !== deleteId;
        });
        console.log("po usunięciu", updatedReminders);
        await updateDoc(docRef, { reminders: updatedReminders });
        onHideForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTimesDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimesDay(Number(e.target.value));
  };

  return medicineForm ? (
    <div className={styles.form_wrapper}>
      <button className={styles.close_button} onClick={onHideForm}>
        X
      </button>
      <form onSubmit={handleAddMedicineReminder} className={styles.form}>
        <h2>Dawkowanie</h2>
        <label htmlFor="timesDay">Ile razy w ciągu dnia?</label>
        <input
          type="number"
          name="timesDay"
          id="timesDay"
          onChange={handleTimesDayChange}
        />
        {Array(timesDay)
          .fill(0)
          .map((timeDay, i) => {
            return (
              <div key={i}>
                <label htmlFor={`time${i}`}>Czas {i + 1} dawki</label>
                <input type="time" name={`time${i}`} id={`time${i}`} />
              </div>
            );
          })}
        <label htmlFor="message">Wiadomość przypomnienia(dawka)</label>
        <input type="text" name="message" id="message" />

        <label htmlFor="daysNumber">Liczba dni przyjmowania leku</label>
        <input type="number" name="daysNumber" id="daysNumber" />

        <label htmlFor="startDate">Data rozpoczęcia przyjmowania leku</label>
        <input type="date" name="startDate" id="startDate" />
        <button type="submit">Zapisz</button>
      </form>
    </div>
  ) : (
    <div className={styles.form_wrapper}>
      <button className={styles.close_button} onClick={onHideForm}>
        X
      </button>
      <form onSubmit={handleAddReminder} ref={formRef} className={styles.form}>
        <label htmlFor="date">Data przypomnienia</label>
        <input
          defaultValue={editForm ? parseEditDate(editForm.dateTime) : ""}
          type="date"
          name="date"
          id="date"
        />
        <label htmlFor="time">Czas przypomnienia</label>
        <input
          defaultValue={editForm ? parseEditTime(editForm.dateTime) : ""}
          type="time"
          name="time"
          id="time"
        />
        <label htmlFor="">Podaj treść przypomnienia</label>
        <textarea
          defaultValue={editForm ? editForm.message : ""}
          name="reminderText"
          id="reminderText"
        />
        <button type="submit">OK</button>
      </form>
      {editForm && (
        <div className={styles.delete_btn_wrapper}>
          <button className={styles.delete} onClick={handleDeleteReminder}>
            Usuń przypomnienie
          </button>
        </div>
      )}
    </div>
  );
};

export default ReminderForm;
