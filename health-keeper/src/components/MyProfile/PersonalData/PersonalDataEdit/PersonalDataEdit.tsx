import React, { useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { DataContext } from '../../../../DataContext/DataContext';
import {db} from './../../../../api/firebase/firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../../../../AuthContext/AuthContext';


const PersonalDataEdit = () => {
  const { editData } = useParams();
  const {userData, setUserData} = useContext(DataContext);
  const { currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const data= userData.personalData?.[editData]; 

  const headers = {
    name: "Imię",
    lastName: "Nazwisko",
    //birthday?: Timestamp;///////
    address: "Adres",
    tel: "Numer telefonu",
    PESEL: "PESEL",
    gender: "Płeć",
    email: "E-mail",
  }

  const header = headers[editData];
  console.log(header)


  const formEdit = (data) => {if(editData === "gender"){
      return (
        <>
        <input type="radio" id="man" name="man" value="man"/>
        <label htmlFor="man">mężczyzna</label>
        <input type="radio" id="woman" name="woman" value="woman"/>
        <label htmlFor="woman">kobieta</label>
        </>
        )
    }else if(editData === "birthday"){
      return <input type="date" name="editData" defaultValue={data}/>

    }else if(editData === "tel" || editData === "tel" || editData === "tel"){
      return <input type="number" name="editData" defaultValue={data}/>

    } else{
      return <input type="text" name="editData" defaultValue={data}/>
    }
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
   
  
    const formValue = {
      personalData: {
         ...userData.personalData,        
        [editData]: event.target.editData.value}
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
    <>
    <form onSubmit={handleSubmit}>
    <label >{header}</label><br/>
    {formEdit(data)}
    <button type='submit'>Zapisz</button>
    </form>
    </>
  )
}



export default PersonalDataEdit