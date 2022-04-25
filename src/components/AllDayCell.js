import React from "react";
import classes from "./AllDayCell.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";

const AllDayCell = ({ hours, dayIndex, normalized, setNormalized, isSettingRange }) => {
  const checkAllDayHandler = () => {
    if(isSettingRange) return;
    normalized[dayIndex].includes(false)
      ? normalized[dayIndex].fill(true)
      : normalized[dayIndex].fill(false);
    setNormalized([...normalized]);
  };

  return (
    <div className={classes.all_day_column} onClick={checkAllDayHandler}>
      {hours.includes(false) ? (
        ""
      ) : (
        <div>
          <BsFillCheckCircleFill />
        </div>
      )}
    </div>
  );
};

export default AllDayCell;
