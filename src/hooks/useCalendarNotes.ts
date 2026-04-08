"use client";

import { useState, useEffect, useCallback } from "react";

interface SelectedDate {
  year: number;
  month: number;
  day: number;
}

type NotesStore = Record<string, string>;

function makeKey(
  start: SelectedDate | null,
  end: SelectedDate | null,
  curYear: number,
  curMonth: number
): string {
  if (start && end) {
    return `range_${start.year}-${start.month}-${start.day}_${end.year}-${end.month}-${end.day}`;
  }
  if (start) {
    return `day_${start.year}-${start.month}-${start.day}`;
  }
  return `month_${curYear}_${curMonth}`;
}

export function useCalendarNotes(
  start: SelectedDate | null,
  end: SelectedDate | null,
  curYear: number,
  curMonth: number
) {
  const [notes, setNotes] = useState<NotesStore>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wallcal_notes");
      if (stored) setNotes(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  const saveNotes = useCallback(
    (value: string) => {
      const key = makeKey(start, end, curYear, curMonth);
      setNotes((prev) => {
        const next = { ...prev, [key]: value };
        try {
          localStorage.setItem("wallcal_notes", JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [start, end, curYear, curMonth]
  );

  const currentNote = loaded
    ? notes[makeKey(start, end, curYear, curMonth)] ?? ""
    : "";

  return { currentNote, saveNotes };
}
