import React, { Fragment } from "react";
import classes from './Header.module.css'

const Header = () => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Header;
