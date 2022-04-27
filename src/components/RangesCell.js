import React from "react";
import classes from "./RangesCell.module.css";

const RangesCell = () => {
  const checkCellHandler = () => {};


  return (
    <div
      className={classes.hour__cell}
      onClick={checkCellHandler}
    ></div>
  );
};

export default RangesCell;
