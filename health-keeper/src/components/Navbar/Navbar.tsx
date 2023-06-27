import React from 'react'
import styles from './Navbar.module.css'
import {useNavigate, useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom'


const Navbar= () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={styles.navbar_container}>
            <button onClick={() => navigate(-1)}/> 
        <div className={styles.navbar_icon_container}>
            <Link to="" className={`${location.pathname === "/calendar" ? styles.active : null} ${styles.calendar}`} />
            <Link to="" className={`${location.pathname === "/notifications" ? styles.active : null} ${styles.notifications}`}/>
            <Link to="/myprofile" className={`${location.pathname === "/myprofile" ? styles.active : null} ${styles.avatar}`} />
        </div>
    </div>
  )
}

export default Navbar