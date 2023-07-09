import { Link } from "react-router-dom";
import styles from './ResultsList.module.css'
const ResultsList= () => {
    return (
      <div className={styles.container}>
      <h2 className={styles.header}>Wyniki</h2>
        <ul className={styles.results_list}>
          <li>BADANIA</li>
          <li>ZAŚWIADCZENIA</li>
          <li>SZCZEPIENIA</li>
          <li>SKIEROWANIA</li>
          <li>RECEPTY</li>
          <li>
            <Link to="/results-list/measurements">CODZIENNE POMIARY</Link>
          </li>
        </ul>
      </div>
    );
}

export default ResultsList;