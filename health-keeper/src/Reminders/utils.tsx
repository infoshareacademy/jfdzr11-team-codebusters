import type { Dispatch, SetStateAction } from "react";
import type { ReminderData, ReminderType } from "./types";

export const parseEditTime = (seconds: number) => {
  const date = new Date(seconds);
  let dateHours = date.getHours().toString();
  let dateMinutes = date.getMinutes().toString();
  if (Number(dateHours) < 10) dateHours = "0" + dateHours;
  if (Number(dateMinutes) < 10) dateMinutes = "0" + dateMinutes;

  return dateHours + ":" + dateMinutes;
};

export const parseEditDate = (seconds: number) => {
  const date: Date = new Date(seconds);
  const year: string = date.getFullYear().toString();
  let month: string;
  if (date.getMonth() < 9) month = "0" + (date.getMonth() + 1).toString();
  else month = (date.getMonth() + 1).toString();
  let day: string;
  if (date.getDate() < 10) day = "0" + date.getDate().toString();
  else day = date.getDate().toString();

  return `${year}-${month}-${day}`;
};

export const checkReminders = (
  reminderData: ReminderData,
  setCurrentReminder: Dispatch<SetStateAction<ReminderType | null>>,
  setShowReminder: Dispatch<SetStateAction<boolean>>,
) => {
  const currentDateTime = new Date();

  const dateTimestamp = currentDateTime.getTime();

  const matchingReminder = reminderData.filter((reminder) => {
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
