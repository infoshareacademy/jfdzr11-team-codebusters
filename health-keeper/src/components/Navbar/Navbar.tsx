import React from 'react'
import styles from './Navbar.module.css'
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom'

type NavbarProps = {
  backIcon: string,
  calendarIcon: string,
  notificationsIcon: string,
  avatarIcon: string,
}

const Navbar= ({backIcon, calendarIcon, notificationsIcon, avatarIcon}: NavbarProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar_container}>
            {/* <img src={backIcon} onClick={() => navigate(-1)}/>  */}
        <div className={styles.navbar_icon_container}>
            <Link to=""><img src={calendarIcon}/></Link>
            <Link to=""><img src={notificationsIcon}/></Link>
            <Link to=""><img src={avatarIcon}/></Link>
        </div>
    </div>
  )
}

export default Navbar