import styles from "./Navbar.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import backIcon from "./../../assets/navbar/back.png";
import { useState } from "react";
import { ReminderComponent } from "../index";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reminderVisibility, setReminderVisibility] = useState<boolean>(false);

  const handleReminderVisibility = () => {
    setReminderVisibility(!reminderVisibility);
  };

  return (
    <div>
      {reminderVisibility && (
        <ReminderComponent
          editForm={undefined}
          isModalForm
          onHideForm={handleReminderVisibility}
          medicineForm={false}
        />
      )}
      <div className={styles.navbar_container}>
        {location.pathname !== "/" ? (
          <button
            className={styles.navigate_back_btn}
            onClick={() => navigate(-1)}
          >
            <img src={backIcon} />
            <span>Wróć</span>
          </button>
        ) : (
          <div></div>
        )}
        <div className={styles.navbar_icon_container}>
          <Link
            to="/"
            className={`${location.pathname === "/" ? styles.active : null} ${
              styles.calendar
            }`}
          />
          <button
            onClick={handleReminderVisibility}
            className={styles.notifications_button}
          ></button>
          <Link
            to="/myprofile"
            className={`${
              location.pathname === "/myprofile" ? styles.active : null
            } ${styles.avatar}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
