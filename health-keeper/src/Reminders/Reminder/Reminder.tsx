import {
  Backdrop,
  ReminderForm,
  ReminderMessage,
} from '../../components/index';
import React from 'react';
import {ReminderType} from '../types'

type ReminderProps = {
  isModalForm: boolean;
  onModalDisable?: () => void;
  reminderData?: Array<ReminderType>;
  onHideForm?: () => void;
};
const Reminder: React.FC<ReminderProps> = ({
  isModalForm,
  onModalDisable = () => {},
  reminderData,
  onHideForm= () => {},
}) => {
  return (
    <>
      <Backdrop onModalDisable={onModalDisable} onHideForm={onHideForm} />
      {isModalForm ? (
        <ReminderForm onHideForm={onHideForm} />
      ) : (
        <ReminderMessage reminderData={reminderData} onModalDisable={onModalDisable}  />
      )}
    </>
  );
};

export default Reminder;
