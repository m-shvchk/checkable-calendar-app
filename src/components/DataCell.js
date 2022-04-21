import React from "react";
import classes from "./DataCell.module.css";

const DataCell = ({ value, normalized, setNormalized, dayIndex, hourIndex }) => {
  const checkCellHandler = () => {
    normalized[dayIndex][hourIndex] = !value;
    setNormalized([...normalized])
  };

  let checked_class = value
    ? `${classes.hour__cell_checked}`
    : `${classes.hour__cell}`;

  return <div className={checked_class} onClick={checkCellHandler}></div>;
};

export default DataCell;
