import { Link } from "react-router-dom";
const ResultsList= () => {
    return (
      <ul>
        <li>Badania</li>
        <li>Zaświadczenia</li>
        <li>Szczepienia</li>
        <li>Skierowania</li>
        <li>Recepty</li>
        <li>
          <Link to="/results-list/measurements">Codzienne pomiary</Link>
        </li>
      </ul>
    );
}

export default ResultsList;