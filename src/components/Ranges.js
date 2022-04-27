import { useState } from "react";
import classes from "./Ranges.module.css";
import RangesCell from "./RangesCell";

const inithialRanges = new Array(168);
for (let i = 0; i < inithialRanges.length; i++) {
  inithialRanges[i] = {
    isHighligted: false,
    isGrowing: false,
    isShrinking: false,
    growFactor: null,
  };
}

// const empty2DArr = new Array(7);
// for (let i = 0; i < empty2DArr.length; i++) {
//     empty2DArr[i] = new Array(24).fill(false);
// }

const Ranges = ({
  normalized,
  numToDay,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}) => {

  // const [ranges, setRanges] = useState(inithialRanges);
  console.log(normalized)

  let content = normalized.map((hours, dayIndex) => (
    <div className={classes.flex_row} key={dayIndex}>
      <div className={classes.day_column} key={numToDay[dayIndex]}>
        {numToDay[dayIndex].toUpperCase()}
      </div>

      {hours.map((val, hourIndex) => (
        <RangesCell
          value={val}
          key={`${dayIndex}-${hourIndex}`}
          id={`${dayIndex}-${hourIndex}`}
          dayIndex={dayIndex}
          hourIndex={hourIndex}
          normalized={normalized}
        />
      ))}
    </div>
  ));

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {content}
    </div>
  );
};

export default Ranges;
