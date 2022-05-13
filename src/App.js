import React, { Fragment, useState } from "react";
import classes from "./App.module.css";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Ranges from "./components/Ranges";

const App = () => {
  const [calendarRangesTogglee, setCalendarRangesTogglee] = useState(true);

  const calendarRangesHandler = () => {
    setCalendarRangesTogglee(!calendarRangesTogglee);
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.container_top}>
          {calendarRangesTogglee ? (
            <h2>SETTING SCHEDULE</h2>
          ) : (
            <h2>SETTING RANGES</h2>
          )}
          <button className={classes.btn} onClick={calendarRangesHandler}>
            {calendarRangesTogglee ? "SET RANGES" : "SET SCHEDULE"}
          </button>
        </div>

        <Header calendarRangesTogglee={calendarRangesTogglee} />

        {calendarRangesTogglee ? <Calendar /> : <Ranges />}
      </div>
    </Fragment>
  );
};

export default App;
