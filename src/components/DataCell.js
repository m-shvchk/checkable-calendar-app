import React from "react";
import classes from "./DataCell.module.css";

const DataCell = ({
  value,
  normalized,
  setNormalized,
  dayIndex,
  hourIndex,
  id,
  isHighlighted,
}) => {
  const checkCellHandler = () => {
    normalized[dayIndex][hourIndex] = !value;
    setNormalized([...normalized]);
  };

  let checked_class = value
    ? `${classes.hour__cell_checked}`
    : `${classes.hour__cell}`;

  let highlighted_class = isHighlighted
    ? `${classes.hour__cell_highlighted}`
    : "";

  return (
    <div
      className={`${checked_class} ${highlighted_class}`}
      id={id}
      onClick={checkCellHandler}
    ></div>
  );
};

export default DataCell;
