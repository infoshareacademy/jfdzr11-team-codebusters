import { AuthContext } from '../../../AuthContext/AuthContext';
import styles from '../AddNewMeasurement/AddNewMeasurement.module.css';
import { FormEvent, useContext, useRef } from 'react';
import { db } from '../../../api/firebase/firebase';
import { doc, updateDoc, getDoc, addDoc } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';

type AddMeasurementFormProps = {
  isNewMeasurement: boolean;
  param?: string;
};

const AddMeasurementForm = ({
  isNewMeasurement,
  param,
}: AddMeasurementFormProps) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const handleAddMeasurement = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // extract values from the form
    const measurementName: string = (
      e.currentTarget.elements.namedItem('measurementType') as HTMLInputElement
    )?.value;
    const measurementValue: number = parseFloat(
      (e.currentTarget.elements.namedItem('value') as HTMLInputElement).value
    );
    const date: Date = new Date(
      (e.currentTarget.elements.namedItem('date') as HTMLInputElement).value
    );

    const id = currentUser.uid;

    //  try catch block that will update the document in the database
    try {
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
      const existingMeasurements = docSnap.data()?.measurements;
      const measurementValues =docSnap.data()?.measurements[param as string];
      console.log(measurementValues)

      // check if the measurement with this name already exists
      if (docSnap.data()?.measurements?.[measurementName]) {
        formRef.current?.reset();
        console.log('Measurement already exists');
        return;
      }
      const updatedMeasurementData = isNewMeasurement
        ? {
            ...existingMeasurements,
            [measurementName]: {
              ...existingMeasurements?.measurement,
              [`entry${
                Object.keys(existingMeasurements?.measurement ?? {}).length + 1
              }`]: {
                date,
                measurementValue,
              },
            },
          }
        : {
            ...existingMeasurements,
            [param as string]: {
              ...measurementValues,
              [`entry${Object.keys(measurementValues ?? {}).length + 1}`]: {
                date,
                measurementValue,
              },
            },
          };
      console.log(updatedMeasurementData);

      await updateDoc(docRef, { measurements: updatedMeasurementData });
      console.log('Document updated with ID: ', docRef.id);
      navigate('/results-list/measurements');
    } catch (error) {
      console.log(error);
    }
    formRef.current?.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleAddMeasurement} ref={formRef}>
      {isNewMeasurement && (
        <>
          <label htmlFor="measurement_type">Dodaj pomiar</label>
          <input
            type="measurementType"
            name="measurementType"
            id="measurementType"
          />
        </>
      )}

      <label htmlFor="value">Wartość</label>
      <input type="number" name="value" id="value" />
      <label htmlFor="date">Data</label>
      <input type="date" name="date" id="date" />
      <button type="submit">Dodaj</button>
    </form>
  );
};
export default AddMeasurementForm;
