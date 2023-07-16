import { Link } from "react-router-dom";
import styles from "./MedicineMain.module.css";
import arrowIcon from "../../assets/arrow.png";

const MedicineMain = () => {
  return (
    <div className={styles.wrapper}>
      <Link to={"/medicine/mymedicine"}>
        Apteczka
        <img src={arrowIcon} />
      </Link>
      <Link to={"/medicine/find"}>
        Znajdź lek
        <img src={arrowIcon} />
      </Link>
    </div>
  );
};

export default MedicineMain;
