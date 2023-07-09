import styles from './ReminderForm.module.css';
import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import { db } from '../../api/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import type { ReminderType } from '../types';

type ReminderFormProps = {
  onHideForm: () => void;
};

const ReminderForm: React.FC = ({ onHideForm }) => {
  const { currentUser } = useContext(AuthContext);

  const id = currentUser?.uid;

  const formRef = useRef<HTMLFormElement>(null);

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
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      const reminderId = crypto.randomUUID();

      const newReminder: ReminderType = {
        dateTime,
        message: reminderText,
        reminderId,
        reminderType,
      };
      const updatedReminders = [...userData.reminders, newReminder];
      // update the document in the database
      await updateDoc(docRef, { reminders: updatedReminders });
      console.log('Reminder successfully added');
      onHideForm();
    } catch (error) {
      console.log(error);
    }
    formRef.current?.reset();
    console.log('form submitted');
  };

  return (
    <>
      <form
        className={styles.form_wrapper}
        onSubmit={handleAddReminder}
        ref={formRef}>
        <label htmlFor="date">Data przypomnienia</label>
        <input type="date" name="date" id="date" />
        <label htmlFor="time">Czas przypomnienia</label>
        <input type="time" name="time" id="time" />
        <label htmlFor="">Podaj treść przypomnienia</label>
        <textarea name="reminderText" id="reminderText" />
        <fieldset>
          <legend>Typ przypomnienia:</legend>
          <label htmlFor="general">Ogólny</label>
          <input
            type="radio"
            id="general"
            name="reminderType"
            value="general"
            defaultChecked
          />
          <label htmlFor="medicine">Lek</label>
          <input
            type="radio"
            id="medicine"
            name="reminderType"
            value="medicine"
          />
        </fieldset>
        <button type="submit">OK</button>
      </form>
    </>
  );
};

export default ReminderForm;
