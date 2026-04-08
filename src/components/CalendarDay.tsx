import styles from "./WallCalendar.module.css";
import { getHoliday } from "./constants";

interface SelectedDate {
  year: number;
  month: number;
  day: number;
}

interface Props {
  day: number;
  month: number;
  year: number;
  isOtherMonth: boolean;
  isSunday: boolean;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  rangeStartEdge: boolean;
  rangeEndEdge: boolean;
  onClick: () => void;
}

export default function CalendarDay({
  day, month, year, isOtherMonth, isSunday, isToday,
  isStart, isEnd, isInRange, rangeStartEdge, rangeEndEdge, onClick,
}: Props) {
  const holiday = !isOtherMonth ? getHoliday(month, day) : undefined;

  const classes = [
    styles.day,
    isOtherMonth ? styles.otherMonth : "",
    isSunday && !isStart && !isEnd ? styles.sunday : "",
    isToday ? styles.today : "",
    isStart ? styles.selectedStart : "",
    isEnd ? styles.selectedEnd : "",
    isInRange ? styles.inRange : "",
    rangeStartEdge ? styles.rangeStartEdge : "",
    rangeEndEdge ? styles.rangeEndEdge : "",
    isOtherMonth ? styles.noClick : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      onClick={isOtherMonth ? undefined : onClick}
      title={holiday}
      role={isOtherMonth ? undefined : "button"}
      tabIndex={isOtherMonth ? undefined : 0}
      onKeyDown={(e) => {
        if (!isOtherMonth && (e.key === "Enter" || e.key === " ")) onClick();
      }}
      aria-label={`${day} ${holiday ? `- ${holiday}` : ""}`}
      aria-pressed={isStart || isEnd}
    >
      {day}
      {holiday && !isOtherMonth && <span className={styles.holidayDot} aria-hidden="true" />}
    </div>
  );
}
