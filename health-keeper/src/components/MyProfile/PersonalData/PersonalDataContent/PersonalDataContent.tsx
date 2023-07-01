import React from 'react'
import styles from './PersonalDataContent.module.css'
import {Link} from 'react-router-dom'

type PersonalData = {
    header: string,
    data: string | number| undefined,
    routeParam: string,
}

const PersonalDataContent = ({header,data, routeParam}: PersonalData) => {
  return (
     <div className={styles.data_container}>
            <span className={styles.data_header}>{header}</span>
            <span className={styles.data_detail}>{data}</span>
            <Link to={`/myprofile/personaldata/${routeParam}`}/>
     </div>
  )
}

export default PersonalDataContent