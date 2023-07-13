import { useContext, useEffect, useState } from 'react';
import styles from './MyMedicine.module.css';
import { DataContext } from '../../../DataContext/DataContext';
import { MedData } from '../types';
const MyMedicine = () => {
  const { userData } = useContext(DataContext);

  const [medicines, setMedicines] = useState<MedData>([]);
  console.log(medicines);

  useEffect(() => {
    setMedicines(userData.medicines);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Moje leki</h1>
      <ul>
        {medicines.map((medicine) => (
          <>
            <h2>{medicine.name}</h2>
            <p>{medicine.form}</p>
            <p>{medicine.substance}</p>
            <p>{medicine.power}</p>
            <p>{medicine.pack}</p>
            <p>{medicine.registryNumber}</p>
          </>
        ))}
      </ul>
    </div>
  );
};

export default MyMedicine;
