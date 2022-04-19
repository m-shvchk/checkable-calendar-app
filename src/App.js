import React, { Fragment } from "react";
import classes from "./App.module.css";

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

const App = () => {
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
        <div className={classes.flex_row}>
          <div className={classes.day_column}>MO</div>
          <div className={classes.all_day_column}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
          <div className={classes.hour_cell}></div>
        </div>
        <div className={classes.actions}>
          <button className={classes.btn}>CLEAR</button>
          <button className={classes.btn}>SAVE CHANGES</button>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
