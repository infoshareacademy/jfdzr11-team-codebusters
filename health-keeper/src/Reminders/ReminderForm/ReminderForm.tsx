import styles from './ReminderForm.module.css';
import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import { db } from '../../api/firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import type { ReminderType } from '../types';
import { parseEditDate, parseEditTime } from '../utils';
import { DataContext } from '../../DataContext/DataContext';

type ReminderFormProps = {
  onHideForm: () => void;
  editForm: undefined | ReminderType;
};

const ReminderForm: React.FC<ReminderFormProps> = ({
  editForm,
  onHideForm,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(DataContext);

  const id = currentUser?.uid;

  const formRef = useRef<HTMLFormElement>(null);
  const docRef = doc(db, 'users', id);


  const handleAddReminder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reminderText: string = (
      e.currentTarget.elements.namedItem('reminderText') as HTMLInputElement
    ).value;
    const date: Date = new Date(
      (e.currentTarget.elements.namedItem('date') as HTMLInputElement).value
    );
    console.log('date', date);
    const reminderTime: string = (
      e.currentTarget.elements.namedItem('time') as HTMLInputElement
    ).value;
    const [hours, minutes] = reminderTime.split(':');
    const dateTime = date.setHours(Number(hours), Number(minutes));
    const reminderType = (
      e.currentTarget.elements.namedItem('reminderType') as HTMLInputElement
    ).value;
    console.log('reminderType:', reminderType);
    try {
      // function that will update the document in the firebase database

      const _userData = userData;
      const reminderId = crypto.randomUUID();

      const newReminder: ReminderType = {
        dateTime,
        message: reminderText,
        reminderId,
        reminderType,
      };

      if (editForm) {
        const editId = editForm.reminderId;
        const updatedReminders = _userData.reminders.filter(
          reminder => reminder.reminderId !== editId
        );
        updatedReminders.push(newReminder);
        await updateDoc(docRef, { reminders: updatedReminders });
        console.log('reminder edited');

        onHideForm();
      } else {
        const updatedReminders = [..._userData.reminders, newReminder];
        // update the document in the database

        await updateDoc(docRef, { reminders: updatedReminders });
        console.log('Reminder successfully added');
        onHideForm();
      }
    } catch (error) {
      console.log(error);
    }
    formRef.current?.reset();
    console.log('form submitted');
  };

  // const handleDeleteReminder = async () => {
  //   try {
  //     if(editForm){
  //     const deleteId = editForm.reminderId;
  //     const _userData = userData;
  //     console.log("przed usunięciem", _userData.reminders);
  //     console.log("deleteID", deleteId);

  //     const updatedReminders = _userData.reminders.filter((reminder) => {
  //     reminder.reminderId !== deleteId;}
  //     )
  //     console.log("po usunięciu", updatedReminders);
  //     await updateDoc(docRef, { reminders: updatedReminders });
  //     onHideForm();

  //   }
  // }
  //   catch(error){
  //     console.log(error);
  //   }
  // };

  return (
    <div className={styles.form_wrapper}>
      <button className={styles.close_button} onClick={onHideForm}>X</button>
      <form onSubmit={handleAddReminder} ref={formRef} className={styles.form}>
        <label htmlFor="date">Data przypomnienia</label>
        <input
          defaultValue={editForm ? parseEditDate(editForm.dateTime) : ''}
          type="date"
          name="date"
          id="date"
        />
        <label htmlFor="time">Czas przypomnienia</label>
        <input
          defaultValue={editForm ? parseEditTime(editForm.dateTime) : ''}
          type="time"
          name="time"
          id="time"
        />
        <label htmlFor="">Podaj treść przypomnienia</label>
        <textarea
          defaultValue={editForm ? editForm.message : ''}
          name="reminderText"
          id="reminderText"
        />
        <fieldset className={styles.medicine_type_wrapper}>
          <legend>Typ przypomnienia:</legend>
          <label htmlFor="general">Ogólny</label>
          <input
            type="radio"
            id="general"
            name="reminderType"
            value="general"
            defaultChecked={editForm && editForm.reminderType === 'general'}
          />
          <label htmlFor="medicine">Lek:</label>
          <input
            type="radio"
            id="medicine"
            name="reminderType"
            value="medicine"
            defaultChecked={editForm && editForm.reminderType === 'medicine'}
          />
        </fieldset>
        <button type="submit">OK</button>
      </form>
      {/* {editForm && <button className={styles.delete} onClick={handleDeleteReminder}>Usuń</button>} */}
    </div>
  );
};

export default ReminderForm;
