import React from 'react'
import styles from './PersonalData.module.css'
import { useState, useContext } from 'react'
import { DataContext } from '../../../DataContext/DataContext'
import PersonalDataContent from './PersonalDataContent/PersonalDataContent'

const PersonalData = () => {
    const {userData} = useContext(DataContext);
    const [label, setLabel] = useState<string>("personaldata")

    console.log(userData)

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
        <PersonalDataContent header="Data urodzenia" data={userData.personalData?.birthday } routeParam ="birthday"/>
        <PersonalDataContent header="PESEL" data={userData.personalData?.PESEL} routeParam ="PESEL"/>
         </>:
         <>
         <PersonalDataContent header="Telefon" data={userData.personalData?.tel} routeParam ="tel"/>
         <PersonalDataContent header="Address" data={userData.personalData?.address} routeParam ="address"/>
         <PersonalDataContent header="E-mail" data={userData.loginData?.email} routeParam ="email"/>
         </>
        }



    </div>
  )
}

export default PersonalData