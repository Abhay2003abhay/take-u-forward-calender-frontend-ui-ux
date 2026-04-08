"use client";

import { useState, useCallback } from "react";
import styles from "./WallCalendar.module.css";
import CalendarDay from "./CalendarDay";
import MountainIllustration from "./MountainIllustration";
import { MONTHS, DOW } from "./constants";
import { useCalendarNotes } from "@/hooks/useCalendarNotes";

interface SelectedDate {
  year: number;
  month: number;
  day: number;
}

function toDate(d: SelectedDate) {
  return new Date(d.year, d.month, d.day);
}

function sameDay(a: SelectedDate, b: SelectedDate) {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

function formatRange(start: SelectedDate | null, end: SelectedDate | null): string {
  if (!start) return "";
  const s = toDate(start);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  if (!end) return fmt(s);
  const diff =
    Math.round((toDate(end).getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return `${fmt(s)} – ${fmt(toDate(end))} (${diff} day${diff > 1 ? "s" : ""})`;
}

export default function WallCalendar() {
  const today = new Date();
  const [curYear, setCurYear] = useState(today.getFullYear());
  const [curMonth, setCurMonth] = useState(today.getMonth());
  const [selStart, setSelStart] = useState<SelectedDate | null>(null);
  const [selEnd, setSelEnd] = useState<SelectedDate | null>(null);
  const [picking, setPicking] = useState(false);

  const { currentNote, saveNotes } = useCalendarNotes(
    selStart,
    selEnd,
    curYear,
    curMonth
  );

  const prevMonth = useCallback(() => {
    setCurMonth((m) => {
      if (m === 0) { setCurYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setCurMonth((m) => {
      if (m === 11) { setCurYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const handleDayClick = useCallback(
    (year: number, month: number, day: number) => {
      if (!picking || !selStart) {
        setSelStart({ year, month, day });
        setSelEnd(null);
        setPicking(true);
      } else {
        const clicked = new Date(year, month, day);
        const start = toDate(selStart);
        if (clicked < start) {
          setSelEnd(selStart);
          setSelStart({ year, month, day });
        } else if (clicked.getTime() === start.getTime()) {
          // clicking same day deselects
          setSelStart(null);
          setSelEnd(null);
          setPicking(false);
          return;
        } else {
          setSelEnd({ year, month, day });
        }
        setPicking(false);
      }
    },
    [picking, selStart]
  );

  const clearSelection = useCallback(() => {
    setSelStart(null);
    setSelEnd(null);
    setPicking(false);
  }, []);

  // Build calendar cells
  const firstDow = new Date(curYear, curMonth, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
  const prevMonthDays = new Date(curYear, curMonth, 0).getDate();
  const totalCells = Math.ceil((firstDow + daysInMonth) / 7) * 7;

  const cells = Array.from({ length: totalCells }, (_, i) => {
    let day: number;
    let month: number;
    let year: number;
    let isOther = false;

    if (i < firstDow) {
      day = prevMonthDays - firstDow + i + 1;
      month = curMonth - 1;
      year = curYear;
      if (month < 0) { month = 11; year = curYear - 1; }
      isOther = true;
    } else if (i >= firstDow + daysInMonth) {
      day = i - firstDow - daysInMonth + 1;
      month = curMonth + 1;
      year = curYear;
      if (month > 11) { month = 0; year = curYear + 1; }
      isOther = true;
    } else {
      day = i - firstDow + 1;
      month = curMonth;
      year = curYear;
    }

    return { day, month, year, isOther, dow: i % 7 };
  });

  const rangeText = formatRange(selStart, selEnd);

  const notePlaceholder =
    selStart && selEnd
      ? `Notes for ${rangeText}…`
      : selStart
      ? `Notes for ${selStart.day} ${MONTHS[selStart.month].slice(0, 3)}…`
      : `Notes for ${MONTHS[curMonth]}…`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Spiral binding */}
        <div className={styles.spirals} aria-hidden="true">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className={styles.spiral} />
          ))}
        </div>

        <div className={styles.panels}>
          {/* ── Left: Image panel ── */}
          <div className={styles.imgPanel}>
            <div className={styles.heroArt}>
              <MountainIllustration />
            </div>

            <div className={styles.imgOverlay}>
              <div className={styles.monthLabel}>{MONTHS[curMonth]}</div>
              <div className={styles.yearLabel}>{curYear}</div>
            </div>

            <div className={styles.navBtns}>
              <button
                className={styles.navBtn}
                onClick={prevMonth}
                aria-label="Previous month"
              >
                ‹
              </button>
              <button
                className={styles.navBtn}
                onClick={nextMonth}
                aria-label="Next month"
              >
                ›
              </button>
            </div>
          </div>

          {/* ── Right: Calendar panel ── */}
          <div className={styles.calPanel}>
            {/* Day-of-week headers */}
            <div className={styles.dowRow} role="row">
              {DOW.map((d) => (
                <div key={d} className={styles.dow} role="columnheader">
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div
              className={styles.daysGrid}
              role="grid"
              aria-label={`${MONTHS[curMonth]} ${curYear}`}
            >
              {cells.map(({ day, month, year, isOther, dow }, idx) => {
                const cellDate: SelectedDate = { year, month, day };
                const dt = toDate(cellDate);
                const s = selStart ? toDate(selStart) : null;
                const e = selEnd ? toDate(selEnd) : null;

                const isStart = !!selStart && !isOther && sameDay(cellDate, selStart);
                const isEnd = !!selEnd && !isOther && sameDay(cellDate, selEnd);
                const isInRange = !!s && !!e && dt > s && dt < e && !isOther;
                const isToday =
                  !isOther &&
                  day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear();

                const rangeStartEdge = isInRange && (dow === 0 || day === 1);
                const rangeEndEdge =
                  isInRange && (dow === 6 || day === daysInMonth);

                return (
                  <CalendarDay
                    key={idx}
                    day={day}
                    month={month}
                    year={year}
                    isOtherMonth={isOther}
                    isSunday={dow === 0}
                    isToday={isToday}
                    isStart={isStart}
                    isEnd={isEnd}
                    isInRange={isInRange}
                    rangeStartEdge={rangeStartEdge}
                    rangeEndEdge={rangeEndEdge}
                    onClick={() => handleDayClick(year, month, day)}
                  />
                );
              })}
            </div>

            {/* Notes section */}
            <div className={styles.notesSection}>
              <div className={styles.notesHeader}>
                <span className={styles.notesTitle}>Notes</span>
                {rangeText && (
                  <span className={styles.rangeBadge}>{rangeText}</span>
                )}
              </div>
              <textarea
                className={styles.notesTextarea}
                rows={3}
                value={currentNote}
                onChange={(e) => saveNotes(e.target.value)}
                placeholder={notePlaceholder}
                aria-label="Calendar notes"
              />
            </div>

            {/* Bottom legend + clear */}
            <div className={styles.bottomBar}>
              <span className={styles.legend}>
                <span
                  className={styles.legendDot}
                  style={{ background: "var(--rust)" }}
                />
                Selected
              </span>
              <span className={styles.legend}>
                <span
                  className={styles.legendDot}
                  style={{
                    background: "var(--range-bg)",
                    border: "1px solid var(--range-border)",
                  }}
                />
                Range
              </span>
              <span className={styles.legend}>
                <span
                  className={styles.legendDot}
                  style={{ background: "var(--gold)" }}
                />
                Holiday
              </span>
              <button className={styles.clearBtn} onClick={clearSelection}>
                Clear selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
