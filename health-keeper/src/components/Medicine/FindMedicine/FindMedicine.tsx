import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import styles from './FindMedicine.module.css';
import { useContext, useState } from 'react';
import { db } from '../../../api/firebase/firebase';
import { AuthContext } from '../../../AuthContext/AuthContext';
import type { MedType } from '../types';

const FindMedicine = () => {
  const { currentUser } = useContext(AuthContext);
  const id = currentUser?.uid;
  let medPack: string;
  const [isActive, setActive] = useState<boolean>(false);
  const [foundMedicine, setMedicine] = useState({
    substance: '',
    power: '',
    name: '',
    form: '',
    registryNumber: '',
    pack: '',
  });
  const getMedicine = async () => {
    const searchCode = (document.getElementById('codeEAN') as HTMLInputElement)
      .value;

    const response = await fetch(
      `https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/search/public?eanGtin=${searchCode}`,
      {
        method: 'GET',
      }
    );

    const data = await response.json();
    const medicineData = data.content[0];
    const gtin = medicineData.gtin;
    const gtinArr = gtin.split('\\n');

    const packIndx = gtinArr.indexOf(`0${searchCode}`);
    const packs = medicineData.packaging;
    const packsArr = packs.split('\\n');
    medPack = packsArr[packIndx];

    setMedicine({
      pack: medPack,
      substance: medicineData.activeSubstanceName,
      power: medicineData.medicinalProductPower,
      name: medicineData.medicinalProductName,
      form: medicineData.pharmaceuticalFormName,
      registryNumber: medicineData.registryNumber,
    });

    setActive(!isActive);
  };

  const addMedicine = async () => {
    console.log(
      foundMedicine.form,
      foundMedicine.name,
      foundMedicine.pack,
      foundMedicine.power,
      foundMedicine.registryNumber,
      foundMedicine.substance
    );

    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    const newMed: MedType = {
      name: foundMedicine.name,
      form: foundMedicine.form,
      pack: foundMedicine.pack,
      power: foundMedicine.power,
      registryNumber: foundMedicine.registryNumber,
      substance: foundMedicine.substance,
    };

    const updateMedicines = [...userData.medicines, newMed];
    await updateDoc(docRef, { medicines: updateMedicines });
    console.log('Dodano lek');
  };

  return (
    <div className={styles.bigDiv}>
      {!isActive ? (
        <div className={styles.findDiv}>
          <label htmlFor='codeEAN'>Znajdź lek</label>
          <input name='codeEAN' id='codeEAN' placeholder='Podaj kod EAN leku' />
          <button type='button' onClick={getMedicine}>
            Wyszukaj lek
          </button>
        </div>
      ) : null}
      {isActive ? (
        <div className={styles.resultDiv}>
          <ul>
            <li>Nazwa leku: {foundMedicine.name}</li>
            <li>Forma leku: {foundMedicine.form}</li>
            <li>Nazwa substancji czynnej: {foundMedicine.substance}</li>
            <li>Ilość substancji czynnej: {foundMedicine.power}</li>
            <li>Opakowanie: {foundMedicine.pack}</li>

            <li>Numer pozwolenia: {foundMedicine.registryNumber}</li>
          </ul>
          <button type='button' onClick={addMedicine}>
            Dodaj lek
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default FindMedicine;
