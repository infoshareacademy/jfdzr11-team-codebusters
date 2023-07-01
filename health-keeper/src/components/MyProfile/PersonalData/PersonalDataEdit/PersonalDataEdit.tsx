import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { DataContext } from '../../../../DataContext/DataContext';
import {db} from './../../../../api/firebase/firebase'
import { doc, updateDoc, getDoc, Timestamp } from 'firebase/firestore';
import { AuthContext } from '../../../../AuthContext/AuthContext';
import styles from './PersonalDataEdit.module.css'


const PersonalDataEdit = () => {
  const {editData} = useParams();
  const {userData, setUserData} = useContext(DataContext);
  const { currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const [convertedBirthday, setConvertedBirthday] = useState("")
  
  useEffect(() => {
  if(userData.personalData?.birthday){
  const date = new Date(userData.personalData?.birthday.seconds * 1000 + userData.personalData?.birthday.nanoseconds/1000000);
	let mm: number | string = Number(date.getMonth())+1;
	let dd: number | string = Number(date.getDate());
	const yyyy= date.getFullYear();

  if(mm<10){mm='0'+ mm}
  if(dd<10){dd='0'+ dd}

	setConvertedBirthday( yyyy + '-' + mm + '-' + dd);
  }
	
}, [userData])


const data = editData ? (userData.personalData as any)?.[editData] : undefined; 

  const headers = {
    name: "Imię",
    lastName: "Nazwisko",
    birthday: "Data urodzenia",
    address: "Adres",
    tel: "Numer telefonu",
    PESEL: "PESEL",
    gender: "Płeć",
    email: "E-mail",
  }

  const header = headers[editData];
  console.log(header)


  const formEdit = (data) => {
    if(editData === "gender"){
      return(
        data == "mężczyzna" ?
        <>
        <input type="radio" id="man" name="editData" value="mężczyzna" defaultChecked/>
        <label htmlFor="man">mężczyzna</label>
        <input type="radio" id="woman" name="editData" value="kobieta"/>
        <label htmlFor="woman">kobieta</label>
        </>: 
         <>
        <input type="radio" id="man" name="editData" value="mężczyzna"/>
        <label htmlFor="man">mężczyzna</label>
        <input type="radio" id="woman" name="editData" value="kobieta" defaultChecked/>
        <label htmlFor="woman">kobieta</label>
        </>
      )
    }else if(editData === "birthday"){
      return <input type="date" name="editData" defaultValue={convertedBirthday}/>

    }else if(editData === "tel" || editData === "PESEL"){
      return <input type="number" name="editData" defaultValue={data} />
    

    }else{
      return <input type="text" name="editData" defaultValue={data}/>
    }
  }
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

    const form=event.target.editData;

    let data;

    if (form instanceof NodeList){
       data = form.value;
    }else if(form.getAttribute('type') === "date"){
       data =Timestamp.fromDate(new Date(form.value));
    }else if (form.getAttribute('number') === "date"){
      data = Number(form.value);    
    }else{
       data = form.value;}
  
    const formValue = {
      personalData: {
         ...userData.personalData,        
        [editData]: data }
    }
   
    try{
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, formValue);
      const userData = await getDoc(userRef).then(snapshot => 
                  snapshot.data()
      )
      setUserData(userData);
    }catch(error){
      console.log(error);
    }

    navigate('/myprofile/personaldata');
    }

  return (
    
    <div className={styles.dataedit_container}>
      <form onSubmit={handleSubmit}>
      <label >{header}</label><br/>
       {formEdit(data)}
      <button type='submit'>Zapisz</button>
       </form>
    </div>
  )
}

export default PersonalDataEdit