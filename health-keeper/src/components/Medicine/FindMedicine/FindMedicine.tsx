import { addDoc, collection } from 'firebase/firestore';
import styles from './FindMedicine.module.css';
import { useState } from 'react';
import { db } from '../../../api/firebase/firebase';

const FindMedicine = () => {
  let medPack: string;
  const [isActive, setActive] = useState<boolean>(false);
  const [foundMedicine, setMedicine] = useState({
    medSbstncName: '',
    medPower: '',
    medName: '',
    medFormName: '',
    medRegstrNum: '',
    medPack: '',
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
      medPack: medPack,
      medSbstncName: medicineData.medicinalProductName,
      medPower: medicineData.medicinalProductPower,
      medName: medicineData.commonName,
      medFormName: medicineData.pharmaceuticalFormName,
      medRegstrNum: medicineData.registryNumber,
    });

    setActive(!isActive);
  };

  const addMedicine = () => {
    addDoc(collection(db, 'medicines'), {
      form: foundMedicine.medFormName,
      name: foundMedicine.medName,
      pack: foundMedicine.medPack,
      power: foundMedicine.medPower,
      registryNumber: foundMedicine.medRegstrNum,
      substance: foundMedicine.medSbstncName,
    });
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
            <li>Nazwa leku: {foundMedicine.medSbstncName}</li>
            <li>Forma leku: {foundMedicine.medFormName}</li>
            <li>Nazwa substancji czynnej: {foundMedicine.medName}</li>
            <li>Ilość substancji czynnej:{foundMedicine.medPower}</li>
            <li>Opakowanie: {foundMedicine.medPack}</li>

            <li>Numer pozwolenia: {foundMedicine.medRegstrNum}</li>
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
