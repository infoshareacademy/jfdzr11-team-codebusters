import { Link, useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';
import { signOut } from '@firebase/auth';
import { auth } from '../../api/firebase/firebase';

const Footer = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.foot}>
      <Link to={'/home'}>Home</Link>
      <Link to={'/visits'}>Wizyty</Link>
      <Link to={'/data'}>Wyniki</Link>
      <Link to={'/medicine'}>Leki</Link>
      <Link to={'/prevention'}>Profilaktyka</Link>
      <button onClick={logoutHandler}>Wyloguj</button>
    </div>
  );
};

export default Footer;
