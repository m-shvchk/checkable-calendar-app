import React, { Fragment } from "react";
import classes from "./App.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import DataCell from "./components/DataCell";

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
const normalized = [];

Object.entries(initialData).map(([day, value]) => {
  normalized[dayToNum[day]] = new Array(24).fill(false);
  value.map((val) => {
    const start = val.bt / 60;
    const end = (val.et + 1) / 60;
    normalized[dayToNum[day]].fill(true, start, end);
  });
});

const App = () => {
  const checkCellHandler = () => {};
  let content = normalized.map((hours, dayIndex) => (
    <div className={classes.flex_row} key={dayIndex}>
      <div
        className={classes.day_column}
        id={numToDay[dayIndex]}
        key={numToDay[dayIndex]}
      >
        {numToDay[dayIndex].toUpperCase()}
      </div>
      <div className={classes.all_day_column}>
        {hours.includes(false) ? (
          ""
        ) : (
          <div>
            <BsFillCheckCircleFill />
          </div>
        )}
      </div>
      {hours.map((val, hourIndex) => (
        <DataCell
          value={val}
          key={`${dayIndex}-${hourIndex}`}
          onClick={checkCellHandler}
        />
      ))}
    </div>
  ));

  return (
    <Fragment>
      <div className={classes.container}>
        <h2>SET SCHEDULE</h2>
        <div className={classes.header}>
          <div className={classes.day}></div>
          <div className={classes.all_day}>ALL DAY</div>
          <div className={classes.hour_marks}>00:00</div>
          <div className={classes.hour_marks}>03:00</div>
          <div className={classes.hour_marks}>06:00</div>
          <div className={classes.hour_marks}>09:00</div>
          <div className={classes.hour_marks}>12:00</div>
          <div className={classes.hour_marks}>15:00</div>
          <div className={classes.hour_marks}>18:00</div>
          <div className={classes.hour_marks}>21:00</div>
        </div>
        {content}

        <div className={classes.actions}>
          <button className={classes.btn}>CLEAR</button>
          <button className={classes.btn}>SAVE CHANGES</button>
        </div>
        
      </div>
    </Fragment>
  );
};

export default App;
