import { DocumentData } from "firebase/firestore";
import styles from "./Calendar.module.css";

interface Props {
  rowArr: Date[];
  selected: Date;
  selectedMonth: number;
  changeSelect: (newDate: Date) => void;
}

const CalendarDays = ({
  rowArr,
  changeSelect,
  selected,
  selectedMonth,
}: Props) => {

    

    const handleClick = (day: Date) => {
        if (day.getMonth() === selectedMonth) changeSelect(day);
        
    }
  
    const isInSelectedMonth = (day: Date) => {
    return day.getMonth() === selectedMonth ? true : false;
  };
  const isSelected = (day: Date) => {
    return day.toDateString() === selected.toDateString() ? true : false;
  };

  return (
    <>
      {rowArr.map((day, index) => {
        return (
            <div
              key={index}
              className={
                styles["day"] +
                " " + (isSelected(day) ? styles["selected"] : "") +
                " " + (isInSelectedMonth(day) ? styles["active"] : styles["disabled"])
              }
              onClick={() => handleClick(day)}
            >
              <div className={styles["notify"]}></div>
              <p>{day.getDate()}</p>
            </div>
            
        );
      })}
      
    </>
  );
};

export default CalendarDays;
