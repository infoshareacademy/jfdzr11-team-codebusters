import React from 'react'
import styles from './PersonalData.module.css'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../../DataContext/DataContext'
import PersonalDataContent from './PersonalDataContent/PersonalDataContent'

const PersonalData = () => {
    const {userData} = useContext(DataContext);
    const [label, setLabel] = useState("personaldata")
    const [convertedBirthday, setConvertedBirthday] = useState("")

  
  useEffect(() => {
  if(userData.personalData?.birthday){ 
  const date = new Date(userData.personalData?.birthday.seconds * 1000 + userData.personalData?.birthday.nanoseconds/1000000);
	let mm: number | string = Number(date.getMonth())+1;
	let dd: number | string = Number(date.getDate());
	const yyyy= date.getFullYear();

  if(mm<10){mm='0'+ mm}
  if(dd<10){dd='0'+ dd}

	setConvertedBirthday( dd + '-' + mm + '-' + yyyy );
  }
	
}, [userData])
  
  return (
    <div className={styles.personaldata_container}>
        <span className={styles.personaldata_header}>Dane personalne</span>
        <button className={ label == "personaldata" ? styles.personaldata_label_active : styles.personaldata_label} onClick={() => setLabel("personaldata")} >Dane osobowe</button>
        <button className={ label == "contactdata" ? styles.contactdata_label_active : styles.contactdata_label} onClick={() => setLabel("contactdata")} >Dane kontaktowe</button>
        {label == "personaldata" ?
        <>
        <PersonalDataContent header="Imię" data={userData.personalData?.name} routeParam ="name"/>
        <PersonalDataContent header="Nazwisko" data={userData.personalData?.lastName} routeParam ="lastName"/>
        <PersonalDataContent header="Płeć" data={userData.personalData?.gender} routeParam ="gender"/>
        <PersonalDataContent header="Data urodzenia" data={convertedBirthday} routeParam ="birthday"/>
        <PersonalDataContent header="PESEL" data={userData.personalData?.PESEL} routeParam ="PESEL"/>
         </>:
         <>
         <PersonalDataContent header="Telefon" data={userData.personalData?.tel ? `+48 ${userData.personalData?.tel}` : ""} routeParam ="tel"/>
         <PersonalDataContent header="Address" data={userData.personalData?.address} routeParam ="address"/>
         <PersonalDataContent header="E-mail" data={userData.personalData?.email} routeParam ="email"/>
         </>
        }



    </div>
  )
}

export default PersonalData