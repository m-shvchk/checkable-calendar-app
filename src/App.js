import React, { Fragment, useEffect, useState } from "react";
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

Object.entries(initialData).map(([day, value]) => {
  normalizedArr[dayToNum[day]] = new Array(24).fill(false);
  value.map((val) => {
    const start = val.bt / 60;
    const end = (val.et + 1) / 60;
    normalizedArr[dayToNum[day]].fill(true, start, end);
  });
});

const initialEmptyArr = new Array(7);
for (let i = 0; i < initialEmptyArr.length; i++) {
  initialEmptyArr[i] = new Array(24).fill(false);
}

const App = () => {
  const [normalized, setNormalized] = useState(normalizedArr);
  const [highlighted, setHighlighted] = useState(initialEmptyArr);

  const [mouseIsActive, setMouseIsActive] = useState(false);
  const [selectionStart, setSelectionStart] = useState();
  const [selectionEnd, setSelectionEnd] = useState();

  const clearAllHandler = () => {
    normalized.map((val) => {
      val.fill(false);
    });
    setNormalized([...normalized]);
  };

  const mouseDownHandler = (e) => {
    const id = e.target.id;
    if (!id) return;
    const [x, y] = id.split("-");
    if (normalized[x][y]) return;
    setSelectionStart({ x, y });
    setMouseIsActive(true);
  };

  // uncheck whole highlighted array whenever selectionEnd changes
  useEffect(() => {
    const unHighlightAll = new Array(7);
    for (let i = 0; i < unHighlightAll.length; i++) {
      unHighlightAll[i] = new Array(24).fill(false);
    }
    setHighlighted([...unHighlightAll]);
  }, [selectionEnd]);

  const mouseMoveHandler = (e) => {
    if (!mouseIsActive) return;
    const id = e.target.id;
    if (id) {
      const [x, y] = id.split("-");
      setSelectionEnd({ x, y });

      let x1 = parseInt(selectionStart.x);
      let y1 = parseInt(selectionStart.y);
      let x2 = parseInt(selectionEnd.x);
      let y2 = parseInt(selectionEnd.y);
      // console.log(x1, y1, x2, y2)

      let point_1 = x1 * 24 + y1;
      let point_2 = x2 * 24 + y2;
      let start = Math.min(point_1, point_2);
      let end = Math.max(point_1, point_2);

      for (let i = start; i <= end; i++) {
        highlighted[Math.floor(i / 24)][i % 24] = true;
      }
      setHighlighted([...highlighted]);
      console.log(highlighted);
    }
  };

  const mouseUpHandler = (e) => {
    setMouseIsActive(false);
    setSelectionStart("");
    setSelectionEnd("");
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
          <button className={classes.btn} onClick={clearAllHandler}>
            CLEAR
          </button>
          <button className={classes.btn}>SAVE CHANGES</button>
        </div>
      </div>
    </Fragment>
  );
};

export default App;

// let x1 = Math.min(selectionStart.x, selectionEnd.x);
// let x2 = Math.max(selectionStart.x, selectionEnd.x);
// let y1 = Math.min(selectionStart.y, selectionEnd.y);
// let y2 = Math.max(selectionStart.y, selectionEnd.y);
