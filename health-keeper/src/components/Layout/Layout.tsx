import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext';
import { Navbar, Footer, Reminder } from '../index';
import styles from './Layout.module.css';
import { ReminderType } from '../../Reminders/ReminderForm/ReminderForm';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../api/firebase/firebase';

const Layout = () => {
  const { currentUser } = useContext(AuthContext);

  const [showReminder, setShowReminder] = useState<boolean>(false);
  const [reminderData, setReminderData] = useState<ReminderType | object>({});
  const [currentReminder, setCurrentReminder] = useState<ReminderType | object>({});

  console.log(reminderData);
  console.log(currentReminder);

  // check if there is a reminder to show
  useEffect(() => {
    if (reminderData) {
      const checkReminders = () => {
        const currentDateTime = new Date();
        const currentYear = currentDateTime.getFullYear();
        const currentMonth = currentDateTime.getMonth() + 1;
        const currentDay = currentDateTime.getDate();
        const currentHours = currentDateTime.getHours();
        const currentMinutes = currentDateTime.getMinutes();

        const matchingReminders = Object.entries(reminderData).filter(
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

        if (matchingReminders.length > 0) {
          setCurrentReminder(matchingReminders[0][1]);
          setShowReminder(true);
          console.log(matchingReminders)
        } else {
          setShowReminder(false);
        }
      };
      checkReminders();
    }

  }, [reminderData,currentReminder]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     checkReminders();
  //   }, 1000); 

  //   return () => {
  //     clearInterval(interval); /
  //   };
  // }, [reminderData]);

  // const checkReminders = () => {
  //   if (reminderData) {
  //     const currentDateTime = new Date();
  //     const currentYear = currentDateTime.getFullYear();
  //     const currentMonth = currentDateTime.getMonth() + 1;
  //     const currentDay = currentDateTime.getDate();
  //     const currentHours = currentDateTime.getHours();
  //     const currentMinutes = currentDateTime.getMinutes();
      
  //     const matchingReminders = Object.entries(reminderData).filter(
  //       ([_, reminder]) => {
  //         const { date, time } = reminder;
  //         const reminderDate = date.toDate();
  //         const reminderYear = reminderDate.getFullYear();
  //         const reminderMonth = reminderDate.getMonth() + 1;
  //         const reminderDay = reminderDate.getDate();
  //         const [reminderHours, reminderMinutes] = time.split(':').map(Number);

  //         return (
  //           reminderYear === currentYear &&
  //           reminderMonth === currentMonth &&
  //           reminderDay === currentDay &&
  //           reminderHours === currentHours &&
  //           reminderMinutes === currentMinutes
  //         );
  //       }
  //     );

  //     if (matchingReminders.length > 0) {
  //       setCurrentReminder(matchingReminders[0][1]);
  //       setShowReminder(true);
  //     }
  //   }
  // };
  
  // fetch reminders from database
  useEffect(() => {
    const fetchReminders = async () => {
      const docRef = doc(db, 'users', currentUser?.uid);
      const docSnap = await getDoc(docRef);
      const userReminders = docSnap.data()?.reminders;
      setReminderData(userReminders);
    };
    fetchReminders();
  }, []);



  const handleReminderVisibility = () => {
    setShowReminder(!showReminder);
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
