import React from "react";
import classes from "./CalendarCell.module.css";

const CalendarCell = ({
  value,
  id,
  isHighlighted,
  onClick,
}) => {
  // const checkCellHandler = () => {
  //   normalized[dayIndex][hourIndex] = !value;
  //   setNormalized([...normalized]);
  // };

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
      onClick={onClick}
    ></div>
  );
};

export default CalendarCell;
