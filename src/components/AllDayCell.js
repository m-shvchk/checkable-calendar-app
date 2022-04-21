import React from "react";
import classes from "./AllDayCell.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";

const AllDayCell = ({ hours, dayIndex, normalized, setNormalized }) => {
  const checkAllDayHandler = () => {
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
