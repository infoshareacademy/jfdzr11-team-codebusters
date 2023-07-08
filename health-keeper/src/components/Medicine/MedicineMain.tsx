import { Link } from 'react-router-dom';

const MedicineMain = () => {
  return (
    <div>
      <Link to={'/medicine/mymedicine'}>Apteczka</Link>
      <Link to={'/medicine/find'}>Znajdź lek</Link>
    </div>
  );
};

export default MedicineMain;
