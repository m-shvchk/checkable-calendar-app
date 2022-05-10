import React from "react";
import classes from "./RangesCell.module.css";

const RangesCell = ({
  isHighlighted,
  isGrowing,
  rangeNumber,
  isShrinking,
  growFactor,
  id,
  onClick,
}) => {

  const rangesStyle = {
    boxShadow: isGrowing
      ? "0.1vw 0 0 0 black, 0 0.1vw 0 0 black, 0.1vw 0.1vw 0 0 black, 0.1vw 0 0 0 black inset, 0 0.1vw 0 0 black inset"
      : "",
    background: isGrowing ? "#8f8f7e1a" : "",
    flexBasis: isGrowing ? `calc((100% - 3rem) / 24 * ${growFactor - 1})` : "",
    display: isShrinking ? "none" : "",
  };

  let highlighted_class = isHighlighted
    ? `${classes.hour__cell_highlighted}`
    : "";

  return (
    <div
      className={`${classes.hour__cell} ${highlighted_class}`}
      style={rangesStyle}
      id={id}
      onClick={onClick}
    >
      {rangeNumber && <p>{rangeNumber}</p>}
    </div>
  );
};

export default RangesCell;
