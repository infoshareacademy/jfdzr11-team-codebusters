import { Reminder } from '../../components/index';
import { useState } from 'react';

const Dashboard = () => {
  const [reminderVisibility, setReminderVisibility] = useState<boolean>(false);

  const handleReminderVisibility = () => {
    setReminderVisibility(!reminderVisibility);
  };

  return (
    <div>
      Dashboard !!
      {reminderVisibility && (
        <Reminder isModalForm onModalDisable={handleReminderVisibility} />
      )}
      <button onClick={handleReminderVisibility}>Reminder form</button>
    </div>
  );
};

export default Dashboard;
