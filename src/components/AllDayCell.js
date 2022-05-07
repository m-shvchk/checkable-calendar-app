import React from "react";
import classes from "./AllDayCell.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";

const AllDayCell = ({ onClick, hours }) => {

  return (
    <div className={classes.all_day_column} onClick={onClick}>
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
