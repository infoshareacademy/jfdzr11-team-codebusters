import React from 'react'
import styles from './MyProfile.module.css'
import { useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signOut } from '@firebase/auth';
import { auth } from '../../api/firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage} from '../../api/firebase/firebase'
import { DataContext } from './../../DataContext/DataContext'
import { doc, updateDoc, getDoc} from 'firebase/firestore';
import { AuthContext } from './../../AuthContext/AuthContext'
import {db} from './../../api/firebase/firebase'
import {UserData} from './../../DataContext/DataContext'
import arrowIcon from './../../assets/arrow.png'
import avatarDefault from './../../assets/avatar.jpg'

const MyProfile = () => {
    const [dropdownBox, setDropdownBox] =useState<boolean>();
    const navigate = useNavigate();
    const [avatarForm, setAvatarForm] = useState<boolean>();

    const {userData, setUserData} = useContext(DataContext);
     const { currentUser} = useContext(AuthContext);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const avatarHandler = async (event: React.FormEvent) => {
      event.preventDefault()

      const file = event.target[0].files[0]
      console.log(file)
      if (!file) return 

      const storageRef = ref(storage, `avatars/${file.name}-${currentUser.uid}`);
      
      try{
      const snapshot = await uploadBytes(storageRef, file)
      const avatarURL = await getDownloadURL(snapshot.ref)

      console.log(avatarURL)

      const avatar = {
        avatar: avatarURL,
      }
      
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, avatar);
      const userData= await getDoc(userRef).then(snapshot => 
                  snapshot.data()
      )
      if(userData){
        setUserData(userData as UserData)
      }

    }catch(error){
      console.log(error);
    }
    setAvatarForm(false);
    }
    

  return (  
    <>

       <div className={styles.myprofile_container}>
        <span className={styles.myprofile_header}>Mój profil</span>
        <div className={styles.avatar_container}>
           <div>
            <img src={userData.avatar ? userData.avatar : avatarDefault}/>
            <button onClick={() => setAvatarForm(true)}>Dodaj zdjęcie</button>
           </div>
            <span>{userData.personalData?.name}</span>
        </div>
        <div className={styles.btn_container}>
        <button onClick={() => {dropdownBox === false ? setDropdownBox(true) : setDropdownBox(false)}}><span>Moje dane</span><img src={arrowIcon}/></button>
          {dropdownBox === true &&
          <div className={styles.dropdown_container}>
          <Link to="/myprofile/personaldata">Dane personalne</Link>
          <Link to="">Dane medyczne</Link>
          <Link to="">Moi lekarze</Link>
          </div>
        }
        <button><span>Zarządzaj kontem</span><img src={arrowIcon}/></button>
        <button><span>Ustawienia</span><img src={arrowIcon}/></button>
        <button><span>Pomoc</span><img src={arrowIcon}/></button>
        <button onClick={logoutHandler}><span>Wyloguj</span><img src={arrowIcon}/></button>
        </div>
        </div>
        {avatarForm  ?  
        <div className={styles.avatarform_container}>
          <div className={styles.avatarform_modal}>
            <button onClick={()=> setAvatarForm(false)} className={styles.btn_close}>x</button>
         <form onSubmit={avatarHandler}>
            <input accept="image/*" type='file' />
            <button type='submit'>Ustaw wybrane zdjęcie</button>
         </form>
         </div>
        </div>
        : null}
        </>
  )
}

export default MyProfile