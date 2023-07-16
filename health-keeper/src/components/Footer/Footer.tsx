import { Link, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();

  return (
    <div className={styles.foot}>
      <Link to={"/"}>
        <div
          className={`${location.pathname === "/" ? styles.active : null} ${
            styles.home
          }`}
        />
        <span className={`${location.pathname === "/" ? styles.active : null}`}>
          Home
        </span>
      </Link>
      <Link to={""}>
        <div
          className={`${
            location.pathname === "/visits" ? styles.active : null
          } ${styles.visits}`}
        />
        <span
          className={`${
            location.pathname === "/visits" ? styles.active : null
          }`}
        >
          Wizyty
        </span>
      </Link>
      <Link to={"/results-list"}>
        <div
          className={`${
            location.pathname === "/results-list" ? styles.active : null
          } ${styles.data}`}
        />
        <span
          className={`${
            location.pathname === "/results-list" ? styles.active : null
          }`}
        >
          Wyniki
        </span>
      </Link>
      <Link to={"/medicine"}>
        <div
          className={`${
            location.pathname === "/medicine" ? styles.active : null
          } ${styles.medicine}`}
        />
        <span
          className={`${
            location.pathname === "/medicine" ? styles.active : null
          }`}
        >
          Leki
        </span>
      </Link>
      <Link to={""}>
        <div
          className={`${
            location.pathname === "/prevention" ? styles.active : null
          } ${styles.prevention}`}
        />
        <span
          className={`${
            location.pathname === "/prevention" ? styles.active : null
          }`}
        >
          Profilaktyka
        </span>
      </Link>
    </div>
  );
};

export default Footer;
