import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.foot}>
      <Link to={'/home'}>Home</Link>
      <Link to={'/visits'}>Wizyty</Link>
      <Link to={'/data'}>Wyniki</Link>
      <Link to={'/medicine'}>Leki</Link>
      <Link to={'/prevention'}>Profilaktyka</Link>
    </div>
  );
};

export default Footer;
