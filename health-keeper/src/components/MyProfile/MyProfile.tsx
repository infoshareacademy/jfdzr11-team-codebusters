import React from 'react'
import styles from './MyProfile.module.css'
import avatar from './../../assets/avatar.jpg'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signOut } from '@firebase/auth';
import { auth } from '../../api/firebase/firebase';


const MyProfile = () => {
    const [dropdownBox, setDropdownBox] =useState<boolean>(false);
    const navigate = useNavigate();

    
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.myprofile_container}>
        <div className={styles.avatar_container}>
            <img src={avatar}/>
            <span>Kubuś Puchatek</span>
        </div>
        <div className={styles.btn_container}>
        <button onClick={() => {dropdownBox === false ? setDropdownBox(true) : setDropdownBox(false)}}>Moje dane</button>
          {dropdownBox === true &&
          <div className={styles.dropdown_container}>
          <Link to="/myprofile/personaldata">Dane personalne</Link>
          <Link to="">Dane medyczne</Link>
          <Link to="">Moi lekarze</Link>
          </div>
        }
        <button>Zarządzaj kontem</button>
        <button>Ustawienia</button>
        <button>Pomoc</button>
        <button onClick={logoutHandler}>Wyloguj</button>
        </div>


    </div>
  )
}

export default MyProfile