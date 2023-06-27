import { AuthContext } from '../../../AuthContext/AuthContext';
import styles from './AddNewMEasurement.module.css';
import { FormEvent, useContext } from 'react';
import { db } from '../../../api/firebase/firebase';
import { doc, updateDoc, getDoc } from '@firebase/firestore';
import { useRef } from 'react';

const AddNewMeasurement = () => {
  const { currentUser } = useContext(AuthContext);

  const formRef = useRef<HTMLFormElement>(null);

  const handleAddMeasurement = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const measurementName: string = (
      e.currentTarget.elements.namedItem('measurement-type') as HTMLInputElement
    ).value;
    const measurementValue: number = parseFloat(
      (e.currentTarget.elements.namedItem('value') as HTMLInputElement).value
    );
    const date: Date = new Date(
      (e.currentTarget.elements.namedItem('date') as HTMLInputElement).value
    );

    const id = currentUser.uid;

    //  try catch block taht will update the document in the database
    try {
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
      const existingMeasurements = docSnap.data()?.measurements;

      const updatedMeasurementData = {
        ...existingMeasurements,
        [measurementName]: {
          measurementValue,
          date,
        },
      };

      // check if the measurement with this name already exists
      if (docSnap.data()?.measurements?.[measurementName]) {
        formRef.current?.reset();
        console.log('Measurement already exists');
        return;
        // update with spreading existing measurements and adding new one
      } else {
        await updateDoc(docRef, { measurements: updatedMeasurementData });
        console.log('Document updated with ID: ', docRef.id);
      }
    } catch (error) {
      console.log(error);
    }
    formRef.current?.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleAddMeasurement} ref={formRef}>
      <label htmlFor="measurement-type">Dodaj pomiar</label>
      <input
        type="measurement-type"
        name="measurement-type"
        id="measurement-type"
      />
      <label htmlFor="value">Wartość</label>
      <input type="number" name="value" id="value" />
      <label htmlFor="date">Data</label>
      <input type="date" name="date" id="date" />
      <button type="submit">Dodaj</button>
    </form>
  );
};

export default AddNewMeasurement;
