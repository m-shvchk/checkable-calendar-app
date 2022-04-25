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
  isSettingRange,
  ranges,
  setRanges,
}) => {
  const cellIndex = dayIndex * 24 + hourIndex;

  const checkCellHandler = () => {
    if (!isSettingRange) {
      normalized[dayIndex][hourIndex] = !value;
      setNormalized([...normalized]);
    }
    if (isSettingRange) {
      if (ranges[cellIndex].isGrowing) {
        ranges[cellIndex].isGrowing = false;
        for (let i = cellIndex + 1; i < (cellIndex + ranges[cellIndex].growFactor); i++) {
          console.log(i)
          ranges[i].isShrinking = false;
        }
        ranges[cellIndex].growFactor = null;
        setRanges([...ranges]);
      }
    }
  };

  let checked_class = value
    ? `${classes.hour__cell_checked}`
    : `${classes.hour__cell}`;

  let highlighted_class = isHighlighted
    ? `${classes.hour__cell_highlighted}`
    : "";

  const rangesStyle = {
    boxShadow: ranges[cellIndex].isHighlighting
      ? "0.01vw 0 0 0 #4f4f46, 0 0.01vw 0 0 #4f4f46, 0.01vw 0.01vw 0 0 #4f4f46, 0.01vw 0 0 0 #4f4f46 inset, 0 0.01vw 0 0 #4f4f46 inset"
      : "",
    background:
      ranges[cellIndex].isHighlighting || ranges[cellIndex].isGrowing
        ? "#8f8f7e1a"
        : "",
    flexBasis: ranges[cellIndex].isGrowing
      ? `calc((100% - 6rem) / 24 * ${ranges[cellIndex].growFactor - 1})`
      : "",
      display: ranges[cellIndex].isShrinking
      ? "none"
      : ""
  };

  return (
    <div
      style={rangesStyle}
      className={`${checked_class} ${highlighted_class}`}
      id={id}
      onClick={checkCellHandler}
    ></div>
  );
};

export default DataCell;
