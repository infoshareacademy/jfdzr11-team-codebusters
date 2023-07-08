import { Timestamp } from "firebase/firestore";

export type ReminderType = {
	date: Timestamp;
	time: string;
	message: string;
	reminderId: string;
};

export type ReminderData = Array<ReminderType>;

export default ReminderType;
