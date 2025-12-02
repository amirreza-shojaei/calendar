// just calendar logic 
import { toGregorian } from '../library/jalali.js';
//kabise year
export function is_Leap_Jalali(jy) {
const kabisePattern = [1, 5, 9, 13, 17, 22, 26, 30];
return kabisePattern.includes(jy % 33);
};
//month days
export function get_Jalali_Month_Days(jy, jm) {
// jm: 0..11
if (jm <= 5) return 31;
if (jm <= 10) return 30;
return is_Leap_Jalali(jy) ? 30 : 29;
};
//start of month weekday
export function get_Start_Of_Jalali_Month_Weekday(jy, jm) {
// return 0..6 where Saturday=0 ... Friday=6
const g = toGregorian(jy, jm + 1, 1);
const weekday = new Date(g.gy, g.gm - 1, g.gd).getDay();
// convert JS (Sun=0) to Jalali-style (Sat=0)
return (weekday + 1) % 7;
};