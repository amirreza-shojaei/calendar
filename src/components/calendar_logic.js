// just calendar logic 
import { toGregorian } from 'jalaali-js';
//kabise year
export function isLeapJalali(jy) {
const kabisePattern = [1, 5, 9, 13, 17, 22, 26, 30];
return kabisePattern.includes(jy % 33);
};
//month days
export function getJalaliMonthDays(jy, jm) {
// jm: 0..11
if (jm <= 5) return 31;
if (jm <= 10) return 30;
return isLeapJalali(jy) ? 30 : 29;
};
//start of month weekday
export function getStartOfJalaliMonthWeekday(jy, jm) {
// return 0..6 where Saturday=0 ... Friday=6
const g = toGregorian(jy, jm + 1, 1);
const weekday = new Date(g.gy, g.gm - 1, g.gd).getDay();
// convert JS (Sun=0) to Jalali-style (Sat=0)
return (weekday + 1) % 7;
};