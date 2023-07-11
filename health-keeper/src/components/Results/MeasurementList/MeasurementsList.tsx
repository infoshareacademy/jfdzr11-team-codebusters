import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { db } from '../../../api/firebase/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import styles from './MeasurementsList.module.css';
import { set } from 'date-fns';

const MeasurementList = () => {
  const { currentUser } = useContext(AuthContext);

  const [measurementsNames, setMeasurementsNames] = useState<string[]>([]);
  const [hoveredName, setHoveredName] = useState<string>('');

  useEffect(() => {
    const fetchMeasurementNames = async () => {
      try {
        const id = currentUser?.uid;
        const data = await getDoc(doc(db, 'users', id));
        const measurements: string[] = data.data()?.measurements;
        const measurementNames: string[] = Object.keys(measurements);
        setMeasurementsNames(measurementNames);
        console.log(measurementNames);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeasurementNames();
  }, []);

  const handleHover = (hoveredName: string) => {
    setHoveredName(hoveredName);
  };

  const handleMouseLeave = () => {
    setHoveredName('');
  };

  // const handleDelete = async (measurementName: string) => {
  //   try {
  //     const filteredMeasurements = measurementsNames.filter(
  //       measurementNames => measurementNames !== measurementName
  //     );
  //     const id = currentUser?.uid;
  //     const docRef = doc(db, 'users', id);

  //     await updateDoc(docRef, { measurements: filteredMeasurements });
  //     setMeasurementsNames(filteredMeasurements)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <h2 className={styles.header}>Codzienne pomiary</h2>
      <ul className={styles.measurement_list}>
        {measurementsNames.map(measurement => (
          <li
            key={crypto.randomUUID()}
            className={styles.measurement_item}
            onMouseOver={() => handleHover(measurement)}
            onMouseOut={handleMouseLeave}>
            {hoveredName === measurement && (
              <button
              // onClick={() => handleDelete(measurement)}
              >
                x
              </button>
            )}
            <Link to={`/results-list/measurements/${measurement}/addEntry`}>
              {measurement.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/results-list/measurements/addNew" className={styles.add}>
        Dodaj +
      </Link>
    </>
  );
};

export default MeasurementList;
