import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext';
import { Navbar, Footer, Reminder } from '../index';
import styles from './Layout.module.css';
import { ReminderType } from '../../Reminders/ReminderForm/ReminderForm';
import { deleteField, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../api/firebase/firebase';
import { set } from 'date-fns';

const Layout = () => {
  const { currentUser } = useContext(AuthContext);

  const [showReminder, setShowReminder] = useState<boolean>(false);
  const [reminderData, setReminderData] = useState<ReminderType | object>({});
  const [currentReminder, setCurrentReminder] = useState<ReminderType | object>(
    {}
  );
  const docRef = doc(db, 'users', currentUser?.uid);
  console.log(reminderData);
  console.log(currentReminder);

  // check if there is a reminder to show

  useEffect(() => {
    if (reminderData) {
      const checkReminders = () => {
        console.log('checking reminders');
        const currentDateTime = new Date();
        const currentYear = currentDateTime.getFullYear();
        const currentMonth = currentDateTime.getMonth() + 1;
        const currentDay = currentDateTime.getDate();
        const currentHours = currentDateTime.getHours();
        const currentMinutes = currentDateTime.getMinutes();

        const matchingReminder = Object.entries(reminderData).filter(
          ([_, reminder]) => {
            const { date, time } = reminder;
            const reminderDate = date.toDate();
            const reminderYear = reminderDate.getFullYear();
            const reminderMonth = reminderDate.getMonth() + 1;
            const reminderDay = reminderDate.getDate();
            const [reminderHours, reminderMinutes] = time
              .split(':')
              .map(Number);

            return (
              reminderYear === currentYear &&
              reminderMonth === currentMonth &&
              reminderDay === currentDay &&
              reminderHours === currentHours &&
              reminderMinutes === currentMinutes
            );
          }
        );

        if (matchingReminder.length > 0) {
          setCurrentReminder(matchingReminder[0][1]);
          setShowReminder(true);
          console.log(matchingReminder);
        } else {
          setShowReminder(false);
        }
      };
      // check reminder every 20 seconds
      const intervalId = setInterval(checkReminders, 20000);

      return () => {
        clearInterval(intervalId); // Clean up the interval when the component unmounts
      };
    }
  }, [reminderData, currentReminder]);

  // get the reminders from the database
  useEffect(() => {
    if (!currentUser) {
      setReminderData({});
      setShowReminder(false);
      return;
    }

    const unsubscribe = onSnapshot(docRef, docSnap => {
      const userReminders = docSnap.data()?.reminders;
      setReminderData(userReminders);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  const handleReminderVisibility = async () => {
    setShowReminder(!showReminder);
    try {
      if (currentReminder) {
        const reminderId = currentReminder.reminderId;
        const reminderPath = `reminders.${reminderId}`;
        await updateDoc(docRef, {
          [reminderPath]: deleteField(),
        });
        console.log('reminder deleted');
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
