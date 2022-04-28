import classes from "./Calendar.module.css";
import CalendarCell from "./CalendarCell";
import AllDayCell from "./AllDayCell";

const Calendar = ({
  normalized,
  setNormalized,
  highlighted,
  numToDay,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}) => {

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
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {content}
    </div>
  );
};

export default Calendar;
