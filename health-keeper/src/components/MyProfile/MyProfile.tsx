import React from 'react'
import styles from './MyProfile.module.css'
import avatar from './../../assets/avatar.jpg'
import { useState } from 'react'
import {Link} from 'react-router-dom'


const MyProfile = () => {
    const [dropdownBox, setDropdownBox] =useState<boolean>(false);

  return (
    <div className={styles.myprofile_container}>
        <div className={styles.avatar_container}>
            <img src={avatar}/>
            <span>Kubuś Puchatek</span>
        </div>
        <button onClick={() => {dropdownBox === false ? setDropdownBox(true) : setDropdownBox(false)}}>Moje dane</button>
          {dropdownBox === true &&
          <div className={styles.container_dropdown}>
          <Link to="/myprofile/personaldata"><button>Dane personalne</button></Link>
          <button>Dane medyczne</button>
          <button>Moi lekarze</button>
          </div>
        }
        <button>Zarządzaj kontem</button>
        <button>Ustawienia</button>
        <button>Pomoc</button>


    </div>
  )
}

export default MyProfile