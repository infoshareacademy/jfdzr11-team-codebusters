import styles from './Backdrop.module.css';

type BackdropProps = {
  onModalDisable: () => void;
  onReminderDelete?: () => void;
};
const Backdrop: React.FC<BackdropProps> = ({
  onModalDisable,
}) => {
  return (
    <div
      onClick={onModalDisable}
      className={styles.backdrop}></div>
  );
};

export default Backdrop;
