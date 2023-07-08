import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Navbar, Footer, Reminder } from "../index";
import styles from "./Layout.module.css";
import { deleteField, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../api/firebase/firebase";
import { checkReminders } from "../../Reminders/utils";
import type { ReminderData, ReminderType } from "../../Reminders/types";

const Layout = () => {
	const { currentUser } = useContext(AuthContext);

	const [showReminder, setShowReminder] = useState(false);
	const [reminderData, setReminderData] = useState(null);
	const [currentReminder, setCurrentReminder] = useState<ReminderType | null>(
		null
	);

	// get the reminders from the database
	useEffect(() => {
		if (!currentUser) {
			setShowReminder(false);
			return;
		}
		const docRef = doc(db, "users", currentUser?.uid);
		const unsubscribe = onSnapshot(docRef, (docSnap) => {
			const userReminders = docSnap.data()?.reminders;
			setReminderData(userReminders);
		});

		return unsubscribe;
	}, [currentUser]);

	// check if there is a reminder to show

	useEffect(() => {
		if (reminderData) {
			checkReminders(reminderData, setCurrentReminder, setShowReminder);
			// check reminder every 20 seconds
			const intervalId = setInterval(checkReminders, 20000);

			return () => {
				clearInterval(intervalId); // Clean up the interval when the component unmounts
			};
		}
	}, [reminderData, currentReminder]);

	const handleReminderVisibility = async () => {
		const docRef = doc(db, "users", currentUser?.uid);
		setShowReminder(!showReminder);
		try {
			if (currentReminder) {
				const reminderId = currentReminder.reminderId;
				const reminderPath = `reminders.${reminderId}`;
				await updateDoc(docRef, {
					[reminderPath]: deleteField(),
				});
				console.log("reminder deleted");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.app}>
			{/* reminder */}
			{showReminder && (
				<Reminder
					isModalForm={false}
					onModalDisable={handleReminderVisibility}
					reminderData={currentReminder}
				/>
			)}
			{/* navbar */}
			<div>
				{currentUser?.email ? (
					<div className={styles.navbar}>
						<Navbar />
					</div>
				) : null}
			</div>
			{/* page content */}
			<div className={styles.page_content}>
				<Outlet />
			</div>
			{/* footer */}
			<div>
				{currentUser?.email ? (
					<div className={styles.footer}>
						<Footer />
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Layout;
