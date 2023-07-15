import { useContext, useEffect, useState } from 'react';
import styles from './MyMedicine.module.css';
import { DataContext } from '../../../DataContext/DataContext';
import { MedData } from '../types';
import Medicine from '../MedicineContent/Medicine';
const MyMedicine = () => {
  const { userData } = useContext(DataContext);

  const [medicines, setMedicines] = useState<MedData>([]);

  useEffect(() => {
    setMedicines(userData.medicines);
  }, []);

  
  return (
    <div className={styles.container}>
      <h1>Moje leki</h1>
      <ul>
        {medicines.length !== 0 &&
          medicines.map(medicine => ( < Medicine medicine={medicine} key={medicine.registryNumber}/>
           
          ))}
      </ul>
    </div>
  );
};

export default MyMedicine;
