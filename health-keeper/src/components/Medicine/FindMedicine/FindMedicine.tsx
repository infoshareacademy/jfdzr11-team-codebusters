import { doc, getDoc, updateDoc } from 'firebase/firestore';
import styles from './FindMedicine.module.css';
import { useContext, useState } from 'react';
import { db } from '../../../api/firebase/firebase';
import { AuthContext } from '../../../AuthContext/AuthContext';
import type { MedType } from '../types';
import { ReminderComponent } from '../../index';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const FindMedicine = () => {
  const { currentUser } = useContext(AuthContext);
  const id = currentUser?.uid;
  let medPack: string;
  const [isActive, setActive] = useState<boolean>(false);
  const [reminderVisibility, setReminderVisibility] = useState<boolean>(false);
  const [foundMedicine, setMedicine] = useState({
    substance: '',
    power: '',
    name: '',
    form: '',
    registryNumber: '',
    pack: '',
  });
  const navigate = useNavigate();
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
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    const _currentAmount = Number(foundMedicine.pack.split(' ')[0]);

    const newMed: MedType = {
      name: foundMedicine.name,
      form: foundMedicine.form,
      pack: foundMedicine.pack,
      power: foundMedicine.power,
      registryNumber: foundMedicine.registryNumber,
      substance: foundMedicine.substance,
      currentAmount: _currentAmount,
    };

    const isNumberAlreadyInBase = userData.medicines.some(
      (medicine: MedType) => {
        return medicine.registryNumber === newMed.registryNumber;
      }
    );
    if (isNumberAlreadyInBase) {
      toast.error('Ten lek jest już w Twojej apteczce');
      return;
    }

    const updateMedicines = [...userData.medicines, newMed];
    await updateDoc(docRef, { medicines: updateMedicines });
    navigate('/medicine');
    toast.success('Lek został dodany do Twojej apteczki');
  };

  const handleReminderVisibility = () => {
    setReminderVisibility(!reminderVisibility);
  };

  return (
    <div className={styles.bigDiv}>
      {!isActive ? (
        <div className={styles.wrapper}>
          <h2>Znajdź lek</h2>
          <form className={styles.findDiv}>
            <label htmlFor="codeEAN">Wpisz kod leku z opakowania</label>
            <input
              name="codeEAN"
              id="codeEAN"
              placeholder="np. 5909990864546"
            />
            <button
              type="button"
              onClick={getMedicine}
              className={styles.medicine_button}>
              Wyszukaj lek
            </button>
          </form>
        </div>
      ) : null}
      {isActive ? (
        <div className={styles.resultDiv}>
          {reminderVisibility && (
            <ReminderComponent
              editForm={undefined}
              isModalForm
              onHideForm={handleReminderVisibility}
              medicineForm={true}
            />
          )}
          <ul>
            <li>
              <span>Nazwa leku:</span> {foundMedicine.name}
            </li>
            <li>
              <span>Forma leku:</span> {foundMedicine.form}
            </li>
            <li>
              <span>Nazwa substancji czynnej:</span> {foundMedicine.substance}
            </li>
            <li>
              <span>Ilość substancji czynnej:</span> {foundMedicine.power}
            </li>
            <li>
              <span>Opakowanie:</span> {foundMedicine.pack}
            </li>

            <li><span>Numer pozwolenia:</span> {foundMedicine.registryNumber}</li>
          </ul>
          <div className={styles.buttons_container}>
            <button
              type="button"
              onClick={addMedicine}
              className={styles.medicine_button}>
              Dodaj lek
            </button>
            <button
              onClick={handleReminderVisibility}
              className={styles.medicine_button}>
              Dodaj przypomnienie
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FindMedicine;
