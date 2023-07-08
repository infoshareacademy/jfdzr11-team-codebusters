import type { Dispatch, SetStateAction } from "react";
import type { ReminderData, ReminderType } from "./types";

export const checkReminders = (
	reminderData: ReminderData,
	setCurrentReminder: Dispatch<SetStateAction<ReminderType | null>>,
	setShowReminder: Dispatch<SetStateAction<boolean>>
) => {
	const currentDateTime = new Date();
	const currentYear = currentDateTime.getFullYear();
	const currentMonth = currentDateTime.getMonth() + 1;
	const currentDay = currentDateTime.getDate();
	const currentHours = currentDateTime.getHours();
	const currentMinutes = currentDateTime.getMinutes();

	console.log("reminderData ", reminderData);

	const matchingReminder = reminderData.filter((reminder) => {
		console.log("reminder ", reminder);
		const { date, time } = reminder;
		const reminderDate = date?.toDate();
		const reminderYear = reminderDate.getFullYear();
		const reminderMonth = reminderDate.getMonth() + 1;
		const reminderDay = reminderDate.getDate();
		const [reminderHours, reminderMinutes] = time.split(":").map(Number);

		return (
			reminderYear === currentYear &&
			reminderMonth === currentMonth &&
			reminderDay === currentDay &&
			reminderHours === currentHours &&
			reminderMinutes === currentMinutes
		);
	});

	if (matchingReminder.length > 0) {
		setCurrentReminder(matchingReminder[0][1]);
		setShowReminder(true);
		console.log(matchingReminder);
	} else {
		setShowReminder(false);
	}
};

export default checkReminders;
