export type ReminderType = {
	dateTime: number
	message: string;
	reminderId: string;
	reminderType: string;
};

export type ReminderData = Array<ReminderType>;

export default ReminderType;
