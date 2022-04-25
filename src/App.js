import React, { Fragment, useState } from "react";
import classes from "./App.module.css";
import DataCell from "./components/DataCell";
import AllDayCell from "./components/AllDayCell";
import Header from "./components/Header";

const initialData = {
  mo: [
    {
      bt: 240,
      et: 779,
    },
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

const dayToNum = { mo: 0, tu: 1, we: 2, th: 3, fr: 4, sa: 5, su: 6 };
const numToDay = ["mo", "tu", "we", "th", "fr", "sa", "su"];
const normalizedArr = [];

Object.entries(initialData).forEach(([day, value]) => {
  normalizedArr[dayToNum[day]] = new Array(24).fill(false);
  value.forEach((val) => {
    const start = val.bt / 60;
    const end = (val.et + 1) / 60;
    normalizedArr[dayToNum[day]].fill(true, start, end);
  });
});

const initialEmptyArr = new Array(7);
for (let i = 0; i < initialEmptyArr.length; i++) {
  initialEmptyArr[i] = new Array(24).fill(false);
}

const inithialRanges = new Array(168);
for (let i = 0; i < inithialRanges.length; i++) {
  inithialRanges[i] = {
    isHighlighting: false,
    isGrowing: false,
    isShrinking: false,
    growFactor: null,
  };
}

const App = () => {
  const [normalized, setNormalized] = useState(normalizedArr);
  const [highlighted, setHighlighted] = useState(initialEmptyArr);

  const [mouseIsActive, setMouseIsActive] = useState(false);
  const [selectionStart, setSelectionStart] = useState();

  const [isSettingRange, setIsSettingRange] = useState(false);
  const [ranges, setRanges] = useState(inithialRanges);

  const clearAllHandler = () => {
    normalized.forEach((val) => {
      val.fill(false);
    });
    setNormalized([...normalized]);
  };

  const setRangesHandler = () => {
    setIsSettingRange(!isSettingRange);
  };

  const mouseDownHandler = (e) => {
    const id = e.target.id;
    if (!id) return;
    const [x, y] = id.split("-");
    if (normalized[x][y]) return;
    setSelectionStart({ x, y });
    setMouseIsActive(true);
  };

  const mouseMoveHandler = (e) => {
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

      if (!isSettingRange) {
        highlighted.forEach((hours, dayIndex) => {
          hours.forEach((hour, hourIndex) => {
            highlighted[dayIndex][hourIndex] = false;
          });
        });
        setHighlighted([...highlighted]);

        for (let i = start; i <= end; i++) {
          highlighted[Math.floor(i / 24)][i % 24] = true;
        }
        setHighlighted([...highlighted]);
      }
      if (isSettingRange) {
        ranges.forEach((item) => {
          item.isHighlighting = false;
        });
        setRanges([...ranges]);

        for (let i = start; i <= end; i++) {
          ranges[i].isHighlighting = true;
        }
        setRanges([...ranges]);
      }
    }
  };

  const mouseUpHandler = (e) => {
    if (!isSettingRange) {
      highlighted.forEach((hours, dayIndex) => {
        hours.forEach((hour, hourIndex) => {
          if (hour) {
            normalized[dayIndex][hourIndex] = true;
          }
        });
      });
      setNormalized([...normalized]);

      highlighted.forEach((hours, dayIndex) => {
        hours.forEach((hour, hourIndex) => {
          highlighted[dayIndex][hourIndex] = false;
        });
      });
      setHighlighted([...highlighted]);
    }

    if (isSettingRange) {
      let count = 0;
      let rangeIsStarted = false;
      for (let i = 0; i < ranges.length; i++) {
        if (rangeIsStarted) {
          count = count + 1;
          ranges[i].isShrinking = true;
        }

        if (
          (i % 24 === 0 || !ranges[i - 1].isHighlighting) &&
          ranges[i].isHighlighting
        ) {
          ranges[i].isGrowing = true;
          rangeIsStarted = true;
        }

        if (
          ((i + 1) % 24 === 0 || !ranges[i + 1].isHighlighting) &&
          ranges[i].isHighlighting
        ) {
          ranges[i - count].growFactor = count + 1;
          rangeIsStarted = false;
          count = 0;
        }
      }
      ranges.forEach((item) => {
        item.isHighlighting = false;
      });
      setRanges([...ranges]);
    }
    console.log(ranges);
    setMouseIsActive(false);
    setSelectionStart("");
  };

  let content = normalized.map((hours, dayIndex) => (
    <div className={classes.flex_row} key={dayIndex}>
      <div className={classes.day_column} key={numToDay[dayIndex]}>
        {numToDay[dayIndex].toUpperCase()}
      </div>

      <AllDayCell
        hours={hours}
        dayIndex={dayIndex}
        normalized={normalized}
        setNormalized={setNormalized}
        isSettingRange={isSettingRange}
      />

      {hours.map((val, hourIndex) => (
        <DataCell
          value={val}
          key={`${dayIndex}-${hourIndex}`}
          id={`${dayIndex}-${hourIndex}`}
          dayIndex={dayIndex}
          hourIndex={hourIndex}
          normalized={normalized}
          setNormalized={setNormalized}
          isHighlighted={highlighted[dayIndex][hourIndex]}
          isSettingRange={isSettingRange}
          ranges={ranges}
          setRanges={setRanges}
        />
      ))}
    </div>
  ));

  return (
    <Fragment>
      <div
        className={classes.container}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
      >
        <h2>SET SCHEDULE</h2>
        <Header />
        {content}

        <div className={classes.actions}>
          <button className={classes.btn} onClick={setRangesHandler}>
            {isSettingRange ? "CLEAR RANGES" : "SET RANGES"}
          </button>
          <button className={classes.btn} onClick={clearAllHandler}>
            CLEAR HIGHLIGHTED
          </button>
          <button className={classes.btn}>SAVE CHANGES</button>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
