import { useContext, useState } from 'react';
import styles from './Medicine.module.css';
import MedType from '../types';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { db } from '../../../api/firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { DataContext } from '../../../DataContext/DataContext';

interface MedicineProps {
  medicine: MedType;
}

const Medicine = ({ medicine }: MedicineProps) => {
  const [medicineVisibility, setMedicineVisibility] = useState(false);
  const [currentAmountMedicine, setCurrentAmountMedicine] = useState(
    medicine.currentAmount
  );

  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(DataContext);

  const id = currentUser?.uid;

  const docRef = doc(db, 'users', id);
  const medicineVisibilityToggle = () => {
    setMedicineVisibility(!medicineVisibility);
  };

  const handleAddMedicine = () => {
     setCurrentAmountMedicine((prev) => prev+1);
  };

  const handleRemoveMedicine = () => {
    setCurrentAmountMedicine((prev) => prev-1);
  };

  const handleMedicineAmountChange = async () => {
    
    medicine.currentAmount = currentAmountMedicine;

    const updatedMedicines: MedType[] = userData.medicines.filter((element: MedType) => {
        element.registryNumber !== medicine.registryNumber;
    })
    updatedMedicines.push(medicine);
    try {
      await updateDoc(docRef, { medicines: updatedMedicines });
      console.log('Document updated successfully!')
    } catch (error) {
      console.log(error);
    }
    };

  return (
    <div className={styles.medicine}>
      <div className={styles.medicine_label}>
        <h2 onClick={medicineVisibilityToggle}>{medicine.name}</h2>
        <span>
          {currentAmountMedicine} / {medicine.pack}
        </span>
        <div className={styles.buttons_container}>
          <button onClick={handleRemoveMedicine}>-</button>
          <button onClick={handleAddMedicine}>+</button>
          <button
            disabled={medicine.currentAmount === currentAmountMedicine}
            onClick={handleMedicineAmountChange}>
            Zapisz
          </button>
        </div>
      </div>
      {medicineVisibility && (
        <ul className={styles.medicineSlideout}>
          <li>{medicine.form}</li>
          <li>{medicine.substance}</li>
          <li>{medicine.power}</li>
          <li>
            {currentAmountMedicine} / {medicine.pack}
          </li>
          <li>{medicine.registryNumber}</li>
        </ul>
      )}
    </div>
  );
};

export default Medicine;
