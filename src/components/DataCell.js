import React from "react";
import classes from "./DataCell.module.css";

const DataCell = ({ value, normalized, setNormalized, dayIndex, hourIndex, id }) => {
  const checkCellHandler = () => {
    normalized[dayIndex][hourIndex] = !value;
    setNormalized([...normalized])
  };

  let checked_class = value
    ? `${classes.hour__cell_checked}`
    : `${classes.hour__cell}`;

  return <div className={checked_class} id={id} onClick={checkCellHandler}></div>;
};

export default DataCell;
