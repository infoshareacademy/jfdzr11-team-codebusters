import { useContext, useEffect, useState } from 'react';
import styles from './MyMedicine.module.css';
import { DataContext } from '../../../DataContext/DataContext';
import { MedData } from '../types';
const MyMedicine = () => {
  const { userData } = useContext(DataContext);
  const [medicineVisibility, setMedicineVisibility] = useState<boolean>(false);
  const [medicines, setMedicines] = useState<MedData>([]);
  
  
  console.log(medicines);

  useEffect(() => {
    setMedicines(userData.medicines);
  }, [userData]);

  const medicineVisibilityToggle = () => {
    setMedicineVisibility(!medicineVisibility);
  };
  return (
    <div className={styles.container}>
      <h1>Moje leki</h1>
      <ul>
        {medicines.length !== 0 &&
          medicines.map(medicine => (
            <div key={medicine.registryNumber} className={styles.medicine} onClick={medicineVisibilityToggle}>
              <h2>{medicine.name}</h2>
                {medicineVisibility && 
                <div className={styles.medicineSlideout}>
                  <p>{medicine.form}</p>
                  <p>{medicine.substance}</p>
                  <p>{medicine.power}</p>
                  <p>{medicine.pack}</p>
                  <p>{medicine.registryNumber}</p>
                </div>}
             
            </div>
          ))}
      </ul>
    </div>
  );
};

export default MyMedicine;
