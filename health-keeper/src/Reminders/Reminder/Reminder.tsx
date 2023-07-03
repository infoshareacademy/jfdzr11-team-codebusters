import {Backdrop,ReminderForm, ReminderMessage} from '../../components/index'
import React from 'react';

type ReminderProps = {
    isModalForm: boolean;
    onModalDisable: () => void;
}
const Reminder: React.FC<ReminderProps> = ({isModalForm, onModalDisable}) => {
    return (
        <>
        <Backdrop onModalDisable={onModalDisable}/>
        {isModalForm && <ReminderForm/>}
        {!isModalForm && <ReminderMessage/>}

        </>
    );
}

export default Reminder;