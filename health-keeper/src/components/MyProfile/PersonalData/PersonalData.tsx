import React from 'react';
import styles from './PersonalData.module.css';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../DataContext/DataContext';
import { db } from './../../../api/firebase/firebase';
import { doc, updateDoc, getDoc, Timestamp } from 'firebase/firestore';
import { AuthContext } from '../../../AuthContext/AuthContext';
import dateConvert from '../../../utils/DateConverter';


const PersonalData = () => {
  const { userData, setUserData } = useContext(DataContext);
  const [label, setLabel] = useState('personaldata');

  const [convertedBirthday, setConvertedBirthday] = useState('');
  const [convertedBirthdayReverse, setConvertedBirthdayReverse] = useState('');
  const { currentUser } = useContext(AuthContext);

  const [editForm, setEditForm] = useState<boolean>(false);
  const [editFormType, setEditFormType] = useState('');
  const [key, setKey] = useState<string>('');

  const [fullname, setFullname] = useState<string>('');

  useEffect(() => {
    if (userData.personalData?.birthday) {
      setConvertedBirthday(
        dateConvert(userData.personalData?.birthday, 'normal')
      );
      setConvertedBirthdayReverse(
        dateConvert(userData.personalData?.birthday, 'reverse')
      );
    }
    setFullname(
      `${userData.personalData?.name} ${userData.personalData?.lastName}`
    );
  }, [userData]);

  const formEdit = (label: string, key: string) => {
    setEditForm(true);
    setEditFormType(label);
    setKey(key);
  };

  const renderForm = () => {
    if (editFormType === 'Imię i nazwisko') {
      return (
        <>
          <input
            type="text"
            name="name"
            defaultValue={userData.personalData?.name}
          />
          <br />
          <input
            type="text"
            name="lastName"
            defaultValue={userData.personalData?.lastName}
          />
        </>
      );
    } else if (editFormType === 'Płeć') {
      return userData.personalData?.gender == 'mężczyzna' ? (
        <div className={styles.radio_container}>
          <div>
            <input
              type="radio"
              id="man"
              name="editData"
              value="mężczyzna"
              defaultChecked
            />
            <label htmlFor="man">mężczyzna</label>
          </div>
          <div>
            <input type="radio" id="woman" name="editData" value="kobieta" />
            <label htmlFor="woman">kobieta</label>
          </div>
        </div>
      ) : (
        <div className={styles.radio_container}>
          <div>
            <input type="radio" id="man" name="editData" value="mężczyzna" />
            <label htmlFor="man">mężczyzna</label>
          </div>
          <div>
            <input
              type="radio"
              id="woman"
              name="editData"
              value="kobieta"
              defaultChecked
            />
            <label htmlFor="woman">kobieta</label>
          </div>
        </div>
      );
    } else if (editFormType === 'Data urodzenia') {
      return (
        <input
          type="date"
          name="editData"
          defaultValue={convertedBirthdayReverse}
        />
      );
    } else if (editFormType === 'PESEL') {
      return (
        <input
          type="text"
          name="editData"
          defaultValue={userData.personalData?.PESEL}
          size={11}
        />
      );
    } else if (editFormType === 'Telefon') {
      return (
        <input
          type="text"
          name="editData"
          defaultValue={userData.personalData?.tel}
          size={9}
        />
      );
    } else if (editFormType === 'Adres') {
      return (
        <input
          type="text"
          name="editData"
          defaultValue={userData.personalData?.address}
        />
      );
    } else if (editFormType === 'Adres e-mail') {
      return (
        <input
          type="text"
          name="editData"
          defaultValue={userData.personalData?.email}
        />
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    console.log(event);
    event.preventDefault();

    let formValue;

    if (key === 'fullname') {
      formValue = {
        personalData: {
          ...userData.personalData,
          name: (event.target as any).name.value,
          lastName: (event.target as any).lastName.value,
        },
      };
    } else {
      const form = (event.target as any).editData;
      let data;

      if (key === 'birthday') {
        data = Timestamp.fromDate(new Date(form.value));
      } else if (key === 'PESEL' || key === 'tel') {
        data = Number(form.value);
      } else {
        data = form.value;
      }

      formValue = {
        personalData: {
          ...userData.personalData,
          [key]: data,
        },
      };
    }

    try {
      const userRef = doc(db, 'users', currentUser?.uid);
      await updateDoc(userRef, formValue);
      const userData = await getDoc(userRef).then(snapshot => snapshot.data());
      if (userData) {
        setUserData(userData as UserData);
      }
    } catch (error) {
      console.log(error);
    }
    setEditForm(false);
  };

  return (
    <>
      {editForm == false ? (
        <div className={styles.personaldata_container}>
          <span className={styles.personaldata_header}>Dane personalne</span>
          <button
            className={
              label === 'personaldata'
                ? styles.personaldata_label_active
                : styles.personaldata_label
            }
            onClick={() => setLabel('personaldata')}>
            Dane osobowe
          </button>
          <button
            className={
              label === 'contactdata'
                ? styles.personaldata_label_active
                : styles.personaldata_label
            }
            onClick={() => setLabel('contactdata')}>
            Dane kontaktowe
          </button>
          {label == 'personaldata' ? (
            <>
              <div className={styles.data_container}>
                <span className={styles.data_header}>Imię i nazwisko</span>
                <span className={styles.data_detail}>{fullname}</span>
                <button
                  onClick={() =>
                    formEdit('Imię i nazwisko', 'fullname')
                  }></button>
              </div>
              <div className={styles.data_container}>
                <span className={styles.data_header}>Płeć</span>
                <span className={styles.data_detail}>
                  {userData.personalData?.gender}
                </span>
                <button onClick={() => formEdit('Płeć', 'gender')}></button>
              </div>
              <div className={styles.data_container}>
                <span className={styles.data_header}>Data urodzenia</span>
                <span className={styles.data_detail}>{convertedBirthday}</span>
                <button
                  onClick={() =>
                    formEdit('Data urodzenia', 'birthday')
                  }></button>
              </div>
              <div className={styles.data_container}>
                <span className={styles.data_header}>PESEL</span>
                <span className={styles.data_detail}>
                  {userData.personalData?.PESEL}
                </span>
                <button onClick={() => formEdit('PESEL', 'PESEL')}></button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.data_container}>
                <span className={styles.data_header}>Telefon</span>
                <span className={styles.data_detail}>
                  {userData.personalData?.tel
                    ? `+48 ${userData.personalData?.tel}`
                    : ''}
                </span>
                <button onClick={() => formEdit('Telefon', 'tel')}></button>
              </div>
              <div className={styles.data_container}>
                <span className={styles.data_header}>Adres</span>
                <span className={styles.data_detail}>
                  {userData.personalData?.address}
                </span>
                <button onClick={() => formEdit('Adres', 'address')}></button>
              </div>
              <div className={styles.data_container}>
                <span className={styles.data_header}>Adres e-mail</span>
                <span className={styles.data_detail}>
                  {userData.personalData?.email}
                </span>
                <button
                  onClick={() => formEdit('Adres e-mail', 'email')}></button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.dataedit_container}>
          <form onSubmit={handleSubmit}>
            <label>{editFormType}</label>
            <br />
            {renderForm()}
            <button type="submit">Zapisz</button>
          </form>
        </div>
      )}
    </>
  );
};

export default PersonalData;
