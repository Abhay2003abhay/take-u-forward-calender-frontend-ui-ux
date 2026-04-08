export const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Key format: "month-day" (1-indexed month)
export const HOLIDAYS: Record<string, string> = {
  "1-1": "New Year's Day",
  "1-26": "Republic Day",
  "3-25": "Holi",
  "4-14": "Ambedkar Jayanti",
  "4-18": "Good Friday",
  "5-1": "Labour Day",
  "8-15": "Independence Day",
  "10-2": "Gandhi Jayanti",
  "10-20": "Diwali",
  "11-5": "Guru Nanak Jayanti",
  "12-25": "Christmas Day",
};

export function getHoliday(month: number, day: number): string | undefined {
  return HOLIDAYS[`${month + 1}-${day}`];
}
