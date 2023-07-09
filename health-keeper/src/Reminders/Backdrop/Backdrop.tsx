import styles from './Backdrop.module.css';

type BackdropProps = {
  onModalDisable: () => void;
  onHideForm?: () => void;
};
const Backdrop: React.FC<BackdropProps> = ({ onModalDisable, onHideForm }) => {
  const handleClick = () => {
    if (onHideForm) {
      onHideForm();
    } else {
      onModalDisable();
    }
  };
  return <div onClick={handleClick} className={styles.backdrop}></div>;
};

export default Backdrop;
