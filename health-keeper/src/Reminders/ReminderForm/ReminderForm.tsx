import styles from './ReminderForm.module.css'
const ReminderForm = () => {
    return (
      <form className={styles.form_wrapper}>
        <label htmlFor="dateTime">Data i czas przypomnienia</label>
        <input type="datetime-local" name="dateTime" id="dateTime" />
        <label htmlFor="">Podaj treść przypomnienia</label>
        <textarea name="reminderText" id="reminderText" />
      </form>
    );
}

export default ReminderForm;