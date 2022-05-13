import { useState, useRef, Fragment } from "react";
import classes from "./Ranges.module.css";
import RangesCell from "./RangesCell";
import { numToDay, dayToNum } from "../constants/constants";

const initialData = {
  mo: [
    {bt: 0, et: 59}, 
    {bt: 60, et: 119}, 
    {bt: 180, et: 359}, 
    {bt: 360, et: 539}
  ],
  tu: [],
  we: [],
  th: [
    {
      bt: 240,
      et: 779,
    },
    {
      bt: 1140,
      et: 1319,
    },
  ],
  fr: [
    {
      bt: 660,
      et: 1019,
    },
  ],
  sa: [
    {
      bt: 0,
      et: 1439,
    },
  ],
  su: [],
};

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

let count = 1;
Object.entries(initialData).forEach(([day, value]) => {
  value.forEach((val) => {
    const start = dayToNum[day] * 24 + val.bt / 60;
    const end = dayToNum[day] * 24 + (val.et + 1) / 60;
    inithialRanges[start].isChecked = true;
    inithialRanges[start].isGrowing = true;
    inithialRanges[start].rangeNumber = count;
    count = count + 1;
    inithialRanges[start].growFactor = end - start;
    for (let i = start + 1; i < end; i++) {
      inithialRanges[i].isChecked = true;
      inithialRanges[i].isShrinking = true;
    }
  });
});

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
    ranges.forEach((item) => {
      if (item.isGrowing) {
        item.rangeNumber = countRef.current;
        countRef.current++;
      }
      console.log(countRef.current);
    });
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
      if (item.isGrowing) {
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

  const transformAndSendDataHandler = () => {
    const finalData = {};
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const dayRanges = (finalData[numToDay[dayIndex]] = []);
      for (let hourIndex = 0; hourIndex < 24; hourIndex++) {
        if (ranges[dayIndex * 24 + hourIndex].growFactor === 1) {
          dayRanges.push({ bt: hourIndex * 60, et: hourIndex * 60 + 59 });
        } else {
          if (ranges[dayIndex * 24 + hourIndex].isGrowing) {
            dayRanges.push({ bt: hourIndex * 60 });
          }
          if (
            (dayIndex * 24 + hourIndex + 1 === ranges.length ||
              !ranges[dayIndex * 24 + hourIndex + 1].isShrinking) &&
            ranges[dayIndex * 24 + hourIndex].isShrinking
          ) {
            dayRanges[dayRanges.length - 1].et = (hourIndex + 1) * 60 - 1;
          }
        }
      }
    }
    console.log(finalData);
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
        <button className={classes.btn} onClick={transformAndSendDataHandler}>
          SAVE CHANGES
        </button>
      </div>
    </Fragment>
  );
};

export default Ranges;
