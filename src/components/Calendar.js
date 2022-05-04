import classes from "./Calendar.module.css";
import CalendarCell from "./CalendarCell";
import AllDayCell from "./AllDayCell";
import React, { useState } from "react";

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

const Calendar = () => {

  const [normalized, setNormalized] = useState(normalizedArr);
  const [highlighted, setHighlighted] = useState(initialEmptyArr);
  const [mouseIsActive, setMouseIsActive] = useState(false);
  const [selectionStart, setSelectionStart] = useState();


  const clearAllHandler = () => {
    normalized.forEach((val) => {
      val.fill(false);
    });
    setNormalized([...normalized]);
  };

  const mouseDownCalendarHandler = (e) => {
    const id = e.target.id;
    if (!id) return;
    const [x, y] = id.split("-");
    if (normalized[x][y]) return;
    setSelectionStart({ x, y });
    setMouseIsActive(true);
  };

  const mouseMoveCalendarHandler = (e) => {
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
  };

  const mouseUpCalendarHandler = (e) => {
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
      />

      {hours.map((val, hourIndex) => (
        <CalendarCell
          value={val}
          key={`${dayIndex}-${hourIndex}`}
          id={`${dayIndex}-${hourIndex}`}
          dayIndex={dayIndex}
          hourIndex={hourIndex}
          normalized={normalized}
          setNormalized={setNormalized}
          isHighlighted={highlighted[dayIndex][hourIndex]}
          onClick={() => {
            normalized[dayIndex][hourIndex] = !normalized[dayIndex][hourIndex];
            setNormalized([...normalized]);
          }}
        />
      ))}
    </div>
  ));
  

  return (
    <div
      onMouseDown={mouseDownCalendarHandler}
      onMouseMove={mouseMoveCalendarHandler}
      onMouseUp={mouseUpCalendarHandler}
    >
      {content}
    </div>
  );
};

export default Calendar;
