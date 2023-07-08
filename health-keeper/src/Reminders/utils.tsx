import type { Dispatch, SetStateAction } from 'react';
import type { ReminderData, ReminderType } from './types';

export const checkReminders = (
  reminderData: ReminderData,
  setCurrentReminder: Dispatch<SetStateAction<ReminderType | null>>,
  setShowReminder: Dispatch<SetStateAction<boolean>>
) => {
  const currentDateTime = new Date();
 
  const dateTimestamp = currentDateTime.getTime();

  const matchingReminder = reminderData.filter(reminder => {
   
    const { dateTime } = reminder;
    return dateTimestamp >= dateTime;
  });

  if (matchingReminder.length > 0) {
    setCurrentReminder(matchingReminder[0]);
    setShowReminder(true);
    console.log(matchingReminder);
    return;
  }
  return;
};

export default checkReminders;
