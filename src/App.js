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

Object.entries(initialData).map(([day, value]) => {
  normalizedArr[dayToNum[day]] = new Array(24).fill(false);
  value.map((val) => {
    const start = val.bt / 60;
    const end = (val.et + 1) / 60;
    normalizedArr[dayToNum[day]].fill(true, start, end);
  });
});

const App = () => {
  const [normalized, setNormalized] = useState(normalizedArr);

  const clearAllHandler = () => {
    normalized.map((val) => {
      val.fill(false);
    });
    setNormalized([...normalized]);
  };

  let content = normalized.map((hours, dayIndex) => (
    <div className={classes.flex_row} key={dayIndex}>
      <div
        className={classes.day_column}
        id={numToDay[dayIndex]}
        key={numToDay[dayIndex]}
      >
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
      <div className={classes.container}>
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
