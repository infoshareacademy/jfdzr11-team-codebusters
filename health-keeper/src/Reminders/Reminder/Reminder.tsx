import {
  Backdrop,
  ReminderForm,
  ReminderMessage,
} from '../../components/index';
import React from 'react';
import { ReminderType } from '../ReminderForm/ReminderForm';

type ReminderProps = {
  isModalForm: boolean;
  onModalDisable: () => void;
  reminderData?: ReminderType | null;
};
const Reminder: React.FC<ReminderProps> = ({
  isModalForm,
  onModalDisable,
  reminderData,
}) => {
  return (
    <>
      <Backdrop onModalDisable={onModalDisable} />
      {isModalForm ? (
        <ReminderForm />
      ) : (
        <ReminderMessage reminderData={reminderData} />
      )}
    </>
  );
};

export default Reminder;
