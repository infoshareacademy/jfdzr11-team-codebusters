import { Link } from 'react-router-dom';
import styles from './MedicineMain.module.css';

const MedicineMain = () => {
  return (
    <div className={styles.container}>
      <Link to={'/medicine/mymedicine'}>Apteczka</Link>
      <Link to={'/medicine/find'}>Znajdź lek</Link>
    </div>
  );
};

export default MedicineMain;
