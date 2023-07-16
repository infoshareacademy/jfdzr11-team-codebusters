import {
  Backdrop,
  ReminderForm,
  ReminderMessage,
} from "../../components/index";
import React from "react";
import { Reminder } from "../../DataContext/dataTypes";

type ReminderProps = {
  isModalForm: boolean;
  onModalDisable?: () => void;
  reminderData?: Array<Reminder> | null;
  onHideForm?: () => void;
  editForm: undefined | Reminder;
  medicineForm: boolean;
};
const ReminderComponent: React.FC<ReminderProps> = ({
  isModalForm,
  onModalDisable = () => {},
  reminderData,
  onHideForm = () => {},
  editForm,
  medicineForm,
}) => {
  return (
    <>
      <Backdrop onModalDisable={onModalDisable} onHideForm={onHideForm} />
      {isModalForm ? (
        <ReminderForm
          editForm={editForm}
          onHideForm={onHideForm}
          medicineForm={medicineForm}
        />
      ) : (
        <ReminderMessage
          reminderData={reminderData}
          onModalDisable={onModalDisable}
        />
      )}
    </>
  );
};

export default ReminderComponent;
