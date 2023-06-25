import React from 'react'
import styles from './PersonalData.module.css'
import {db} from './../../../api/firebase/firebase'
import {doc, getDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import arrowIcon from './../../assets/arrow.png'


interface Patient{
    name?: string,
    lastname?: string,
    // birthday?: Timestamp;///////
    address?: string;
    tel?: number;
    PESEL?: number;
    gender?: string;
    email?: string;
}

const PersonalData = () => {
    const [patient, setPatient] = useState<Patient>({})
    const [label, setLabel] = useState<string>("personaldata")

    const getPatient = async () => {
        try{
            const patientRef = doc(db, "patients", "K2tzK5ySUdPQ2PYgM5Al");
            const patient = await getDoc(patientRef).then(snapshot => 
                  snapshot.data()
            )
            setPatient(patient);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(()=> {
        getPatient();
    },[])
    console.log(patient)



  return (
    <div className={styles.personaldata_container}>
        <span className={styles.personaldata_header}>Dane personalne</span>
        <button className={ label == "personaldata" ? styles.personaldata_label_active : styles.personaldata_label} onClick={() => setLabel("personaldata")} >Dane osobowe</button>
        <button className={ label == "contactdata" ? styles.contactdata_label_active : styles.contactdata_label} onClick={() => setLabel("contactdata")} >Dane kontaktowe</button>
        {label == "personaldata" ?
        <>
        <div className={styles.data_container}>
            <span className={styles.data_header}>Imiona</span>
            <span className={styles.data_detail}>{patient?.name}</span>
            <img src={arrowIcon}/>
        </div>
        <div className={styles.data_container}>
            <span className={styles.data_header}>Nazwisko</span>
            <span className={styles.data_detail}>{patient?.lastname}</span>
            <img src={arrowIcon}/>
        </div>
        <div className={styles.data_container}>
            <span className={styles.data_header}>Płeć</span>
            <span className={styles.data_detail}>{patient?.gender}</span>
            <img src={arrowIcon}/>
        </div>
        <div className={styles.data_container}>
            <span className={styles.data_header}>Data urodzenia</span>
            <span className={styles.data_detail}></span>
            <img src={arrowIcon}/>
        </div>
        <div className={styles.data_container}>
            <span className={styles.data_header}>PESEL</span>
            <span className={styles.data_detail}>{patient?.PESEL}</span>
            <img src={arrowIcon}/>
        </div> </>:
         <>
         <div className={styles.data_container}>
            <span className={styles.data_header}>Telefon kontaktowy</span>
            <span className={styles.data_detail}>{patient?.tel}</span>
            <img src={arrowIcon}/>
        </div>
        <div className={styles.data_container}>
            <span className={styles.data_header}>Adres</span>
            <span className={styles.data_detail}>{patient?.address}</span>
            <img src={arrowIcon}/>
        </div>
        <div className={styles.data_container}>
            <span className={styles.data_header}>Adres e-mail</span>
            <span className={styles.data_detail}>{patient?.email}</span>
            <img src={arrowIcon}/>
        </div>
         </>

        }



    </div>
  )
}

export default PersonalData