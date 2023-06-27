import { Link } from "react-router-dom";
const MeasurementList = () => {
    return (
      <>
        <h2>Codzienne pomiary</h2>
        {/* <ul>
          <li><Link to='/results-list/measurements/add-weight'>Waga</Link></li>
          <li></li>
          <li></li>
          <li></li>
        </ul> */}
        <Link to="/results-list/measurements/add">Add +</Link>
      </>
    );
}

export default MeasurementList;