import { useState, useRef, Fragment } from "react";
import classes from "./Ranges.module.css";
import RangesCell from "./RangesCell";

// const dayToNum = { mo: 0, tu: 1, we: 2, th: 3, fr: 4, sa: 5, su: 6 };
const numToDay = ["mo", "tu", "we", "th", "fr", "sa", "su"];

const normalized = new Array(7);
for (let i = 0; i < normalized.length; i++) {
  normalized[i] = new Array(24).fill(false);
}

const inithialRanges = new Array(168);
for (let i = 0; i < inithialRanges.length; i++) {
  inithialRanges[i] = {
    isHighlighted: false,
    isChecked: false,
    isGrowing: false,
    rangeNumber: null,
    isShrinking: false,
    growFactor: null,
  };
}

const Ranges = () => {
  const [ranges, setRanges] = useState(inithialRanges);
  const [mouseIsActive, setMouseIsActive] = useState(false);
  const [selectionStart, setSelectionStart] = useState();

  const countRef = useRef(1);

  const clearAllHandler = () => {
    ranges.forEach((item) => {
      item.isHighlighted = false;
      item.isChecked = false;
      item.isGrowing = false;
      item.rangeNumber = null;
      item.isShrinking = false;
      item.growFactor = null;
    });
    setRanges([...ranges]);
    countRef.current = 1;
  };

  const checkCellHandler = (dayIndex, hourIndex) => {
    let cellIndex = dayIndex * 24 + hourIndex;
    if (ranges[cellIndex].isGrowing) {
      for (
        let i = cellIndex + 1;
        i < cellIndex + ranges[cellIndex].growFactor;
        i++
      ) {
        ranges[i].isShrinking = false;
        ranges[i].isChecked = false;
      }
      ranges[cellIndex].isGrowing = false;
      ranges[cellIndex].isChecked = false;
      ranges[cellIndex].growFactor = null;
      ranges[cellIndex].rangeNumber = null;
    } else {
      ranges[cellIndex].isChecked = true;
      ranges[cellIndex].isGrowing = true;
      ranges[cellIndex].growFactor = 1;
    }
    ranges.forEach(item => {
      if(item.isGrowing){
        item.rangeNumber = countRef.current;
        countRef.current++;
      }
      console.log(countRef.current)
    })
    countRef.current = 1;
    setRanges([...ranges]);
  };

  const mouseDownRangesHandler = (e) => {
    const id = e.target.id;
    if (!id) return;
    const [x, y] = id.split("-");
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
    const id = e.target.id;
    const [x, y] = id.split("-");
    if (selectionStart.x !== x || selectionStart.y !== y) {
      let count = 0;
      let rangeIsStarted = false;

      for (let i = 0; i < ranges.length; i++) {

        if (ranges[i].isChecked) {
          ranges[i].isHighlighted = false;
        }
        if (rangeIsStarted) {
          count = count + 1;
          ranges[i].isShrinking = true;
        }
        if (
          (i % 24 === 0 ||
            ranges[i - 1].isChecked ||
            !ranges[i - 1].isHighlighted) &&
          ranges[i].isHighlighted
        ) {
          ranges[i].isGrowing = true;
          rangeIsStarted = true;
          // console.log(ranges[i].isGrowing);
          // if(ranges[i].isGrowing) debugger
        }
        if (
          ((i + 1) % 24 === 0 ||
            ranges[i + 1].isChecked ||
            !ranges[i + 1].isHighlighted) &&
          ranges[i].isHighlighted
        ) {
          ranges[i - count].growFactor = count + 1;
          rangeIsStarted = false;
          count = 0;
        }
      }
    }
    ranges.forEach((item) => {
      if (item.isHighlighted) {
        item.isChecked = true;
      }
      if(item.isGrowing){
        item.rangeNumber = countRef.current;
        countRef.current++;
      }
      item.isHighlighted = false;
    });

    countRef.current = 1;
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
          isHighlighted={ranges[dayIndex * 24 + hourIndex].isHighlighted}
          isGrowing={ranges[dayIndex * 24 + hourIndex].isGrowing}
          rangeNumber={ranges[dayIndex * 24 + hourIndex].rangeNumber}
          isShrinking={ranges[dayIndex * 24 + hourIndex].isShrinking}
          growFactor={ranges[dayIndex * 24 + hourIndex].growFactor}
          onClick={() => checkCellHandler(dayIndex, hourIndex)}
        />
      ))}
    </div>
  ));

  return (
    <Fragment>
      <div
        onMouseDown={mouseDownRangesHandler}
        onMouseMove={mouseMoveRangesHandler}
        onMouseUp={mouseUpRangesHandler}
      >
        {content}
      </div>
      <div className={classes.actions}>
        <button className={classes.btn} onClick={clearAllHandler}>
          CLEAR
        </button>
        <button className={classes.btn}>SAVE CHANGES</button>
      </div>
    </Fragment>
  );
};

export default Ranges;
