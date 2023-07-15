import { Link } from 'react-router-dom';
import styles from './ResultsList.module.css';
import arrowIcon from './../../../assets/arrow.png';
const ResultsList = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Wyniki</h2>
      <ul className={styles.results_list}>
        <li>
          BADANIA
          <img src={arrowIcon} />
        </li>
        <li>
          ZAŚWIADCZENIA
          <img src={arrowIcon} />
        </li>
        <li>
          SZCZEPIENIA
          <img src={arrowIcon} />
        </li>
        <li>
          SKIEROWANIA
          <img src={arrowIcon} />
        </li>
        <li>
          RECEPTY
          <img src={arrowIcon} />
        </li>
        <li>
          <Link to="/results-list/measurements">
            CODZIENNE POMIARY
            <img src={arrowIcon} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ResultsList;
