import { useState } from "react";
import classes from "./Ranges.module.css";
import RangesCell from "./RangesCell";

const inithialRanges = new Array(168);
for (let i = 0; i < inithialRanges.length; i++) {
  inithialRanges[i] = {
    isHighlighted: false,
    isChecked: false,
    isGrowing: false,
    isShrinking: false,
    growFactor: null,
  };
}

const Ranges = ({ normalized, numToDay }) => {
  const [ranges, setRanges] = useState(inithialRanges);
  const [mouseIsActive, setMouseIsActive] = useState(false);
  const [selectionStart, setSelectionStart] = useState();

  const mouseDownRangesHandler = (e) => {
    const id = e.target.id;
    if (!id) return;
    const [x, y] = id.split("-");
    // if (normalized[x][y]) return;
    setSelectionStart({ x, y });
    setMouseIsActive(true);
  };

  const mouseMoveRangesHandler = (e) => {
    if (!mouseIsActive) return;
    const id = e.target.id;
    if (id) {
      const [x, y] = id.split("-");

      let x1 = parseInt(selectionStart.x);
      let y1 = parseInt(selectionStart.y);
      let x2 = parseInt(x);
      let y2 = parseInt(y);

      let point_1 = x1 * 24 + y1;
      let point_2 = x2 * 24 + y2;
      let start = Math.min(point_1, point_2);
      let end = Math.max(point_1, point_2);

      ranges.forEach((item) => {
        item.isHighlighted = false;
      });
      setRanges([...ranges]);

      for (let i = start; i <= end; i++) {
        ranges[i].isHighlighted = true;
      }
      setRanges([...ranges]);
    }
  };
  const mouseUpRangesHandler = (e) => {
    let count = 0;
    let rangeIsStarted = false;

    for (let i = 0; i < ranges.length; i++) {
      // console.log('i: ', i, ' count: ', count, ' started ', rangeIsStarted)
      
      if (ranges[i].isChecked) {
        ranges[i].isHighlighted = false;
      }
      if (rangeIsStarted) {
        count = count + 1;
        ranges[i].isShrinking = true;
      }
      if (
        (i % 24 === 0 || ranges[i - 1].isChecked || !ranges[i - 1].isHighlighted) &&
        ranges[i].isHighlighted
      ) {
        ranges[i].isGrowing = true;
        rangeIsStarted = true;
      }
      if (
        ((i + 1) % 24 === 0 || ranges[i + 1].isChecked || !ranges[i + 1].isHighlighted) &&
        ranges[i].isHighlighted
      ) {
        ranges[i - count].growFactor = count + 1;
        rangeIsStarted = false;
        count = 0;
      }
    }
    ranges.forEach((item) => {
      if(item.isHighlighted){
        item.isChecked = true;
      }
      item.isHighlighted = false;
    });
    setRanges([...ranges]);
    setMouseIsActive(false);
    setSelectionStart("");
    console.log(ranges);
  };

  let content = normalized.map((hours, dayIndex) => (
    <div className={classes.flex_row} key={dayIndex}>
      <div className={classes.day_column} key={numToDay[dayIndex]}>
        {numToDay[dayIndex].toUpperCase()}
      </div>

      {hours.map((val, hourIndex) => (
        <RangesCell
          key={`${dayIndex}-${hourIndex}`}
          id={`${dayIndex}-${hourIndex}`}
          ranges={ranges}
          setRanges={setRanges}
          cellIndex={dayIndex* 24 + hourIndex}
          isHighlighted={ranges[dayIndex * 24 + hourIndex].isHighlighted}
          isChecked={ranges[dayIndex * 24 + hourIndex].isChecked}
          isGrowing={ranges[dayIndex * 24 + hourIndex].isGrowing}
          isShrinking={ranges[dayIndex * 24 + hourIndex].isShrinking}
          growFactor={ranges[dayIndex * 24 + hourIndex].growFactor}
        />
      ))}
    </div>
  ));

  return (
    <div
      onMouseDown={mouseDownRangesHandler}
      onMouseMove={mouseMoveRangesHandler}
      onMouseUp={mouseUpRangesHandler}
    >
      {content}
    </div>
  );
};

export default Ranges;
