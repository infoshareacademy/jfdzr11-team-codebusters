import React from 'react'
import styles from './PersonalDataContent.module.css'
import arrowIcon from './../../../../assets/arrow.png'
import {Link} from 'react-router-dom'

type PersonalData = {
    header: string,
    data: string | number,
    routeParam: string,
}

const PersonalDataContent = ({header,data, routeParam}: PersonalData) => {
  console.log(data);
  return (
     <div className={styles.data_container}>
            <span className={styles.data_header}>{header}</span>
            <span className={styles.data_detail}>{data}</span>
            <Link to={`/myprofile/personaldata/${routeParam}`}/>
     </div>
  )
}

export default PersonalDataContent