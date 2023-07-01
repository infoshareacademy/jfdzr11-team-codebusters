import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { db } from '../../../api/firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import styles from './MeasurementsList.module.css';

const MeasurementList = () => {
  const { currentUser } = useContext(AuthContext);

  const [measurements, setMeasurements] = useState<string[]>([]);

  useEffect(() => {
    const fetchMeasurementNames = async () => {
      try {
        const id: string = currentUser?.uid;
        const data = await getDoc(doc(db, 'users', id));
        const measurements: string[] = data.data()?.measurements;
        const measurementNames: string[] = Object.keys(measurements);
        setMeasurements(measurementNames);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeasurementNames();
  }, []);

  return (
    <>
      <h2>Codzienne pomiary</h2>
      <ul className={styles.measurement_list}>
        {measurements.map(measurement => (
          <Link
            className={styles.measurement_item}
            key={crypto.randomUUID()}
            to={`/results-list/measurements/${measurement}/addEntry`}>
            {measurement.toUpperCase()}
          </Link>
        ))}
      </ul>
      <Link to="/results-list/measurements/addNew">Add +</Link>
    </>
  );
};

export default MeasurementList;
