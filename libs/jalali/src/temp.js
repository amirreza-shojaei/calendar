/**
 * Jalali Date Utility Library
 * Accurate algorithmic conversion based on Borkowski/Jalaali algorithms.
 */

// -----------------------------------------------------------------------------
// Core Conversion Logic (Internal Helpers)
// -----------------------------------------------------------------------------
function div(a, b) {
  return ~~(a / b);
}

function mod(a, b) {
  return a - ~~(a / b) * b;
}

/**
 * Calculates Gregorian and Julian calendar data from Jalali year
 */
function jalaliCal(jy) {
 var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111,
    1181, 1210, 1635, 2060, 2097, 2192, 2262,
    2324, 2394, 2456, 3178];

  var bl = breaks.length,
      gy = jy + 621,
      leapJ = -14,
      jp = breaks[0],
      jm, jump, n, i;

  if (jy < jp || jy >= breaks[bl - 1]) throw new Error("Invalid Jalaali year");

  for (i = 1; i < bl; i++) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ += div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }

  n = jy - jp;
  leapJ += div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  var leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  var march = 20 + leapJ - leapG;

  return { gy: gy, march: march };
}

/**
 * Converts Jalali date to Julian Day Number (JDN)
 */
function jalaliToJdn(jy, jm, jd) {
  const r = jalaliCal(jy);
  return (
    gregorianToJdn(r.gy, 3, r.march) +
    (jm - 1) * 31 -
    div(jm, 7) * (jm - 7) +
    jd -
    1
  );
}

/**
 * Converts Julian Day Number (JDN) to Jalali date
 */
function jdnToJalali(jdn) {
  const gy = jdnToGregorian(jdn).gy;
  let jy = gy - 621;
  let r = jalaliCal(jy);
  let jdn1f = gregorianToJdn(r.gy, 3, r.march);
  let k = jdn - jdn1f;

  if (k >= 0) {
    if (k <= 185) {
      const jm = 1 + div(k, 31);
      const jd = mod(k, 31) + 1;
      return { jy, jm, jd };
    } else {
      k -= 186;
    }
  } else {
    jy -= 1;
    r = jalaliCal(jy); // <--- بسیار مهم: اطلاعات سال قبل را لود کن
    jdn1f = gregorianToJdn(r.gy, 3, r.march); // JDN اول فروردین سال قبل
    k = jdn - jdn1f; // k را دوباره بر اساس سال قبل حساب کن
    
    // حالا اگر k مثبت بود (که هست)، از بخش ماه‌های نیمه دوم حساب کن
    k -= 186;
  }

  const jm = 7 + div(k, 30);
  const jd = mod(k, 30) + 1;
  return { jy, jm, jd };
}
/**
 * Converts Gregorian date to Julian Day Number
 */
function gregorianToJdn(gy, gm, gd) {
  return (
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408 -
    div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) +
    752
  );
}

/**
 * Converts Julian Day Number to Gregorian date
 */
function jdnToGregorian(jdn) {
  let j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j, 1461), 4) * 5 + 308;
  const gd = div(mod(i, 153), 5) + 1;
  const gm = mod(div(i, 153), 12) + 1;
  const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { gy, gm, gd };
}

// -----------------------------------------------------------------------------
// Public Exported Functions
// -----------------------------------------------------------------------------

export function jalaliToday() {
  const now = new Date();
  return changeToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export function isLeapJalaliYear(jy) {
const kabisePattern = [1, 5, 9, 13, 17, 22, 26, 30];
return kabisePattern.includes(jy % 33);
}

export function monthDaysJalali(jy, jm) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return isLeapJalaliYear(jy) ? 30 : 29;
}

export function isValid(jy, jm, jd) {
  if (jm < 1 || jm > 12) return false;
  if (jd < 1) return false;
  return jd <= monthDaysJalali(jy, jm);
}

export function changeToJalali(gy, gm, gd) {
  const jdn = gregorianToJdn(gy, gm, gd);
  return jdnToJalali(jdn);
}

export function changeToGregorian(jy, jm, jd) {
  const jdn = jalaliToJdn(jy, jm, jd);
  return jdnToGregorian(jdn);
}

// --- Weekday Functions ---

export function weekDayJalali(jy, jm, jd) {
// return 0..6 where Saturday=0 ... Friday=6
const g = changeToGregorian(jy, jm, jd);
const weekday = new Date(g.gy, g.gm - 1, g.gd).getDay();
// convert JS (Sun=0) to Jalali-style (Sat=0)
return (weekday + 1) % 7; 
}

export function firstWeekDayOfJalaliMonth(jy, jm) {
  return weekDayJalali(jy, jm, 1);
}

export function firstWeekDayOfJalaliYear(jy) {
  return weekDayJalali(jy, 1, 1);
}

export function lastWeekDayOfJalaliYear(jy) {
  return weekDayJalali(jy, 12, monthDaysJalali(jy, 12));
}

export function nameOfJalaliWeekday(jy, jm, jd) {
  const weekdays = [
    "شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"
  ];
  return weekdays[weekDayJalali(jy, jm, jd)];
}

export function nameOfJalaliMonth(jm) {
  const months = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  return months[jm - 1];
}

export function formaterJalaliDate(jy, jm, jd) {
  return `${nameOfJalaliWeekday(jy, jm, jd)}، ${jd} ${nameOfJalaliMonth(jm)} ${jy}`;
}

// --- Arithmetic Functions (Fixed) ---

export function addDaysToJalaliDate(jy, jm, jd, daysToAdd) {
  const currentJdn = jalaliToJdn(jy, jm, jd);
  const newJdn = currentJdn + daysToAdd;
  return jdnToJalali(newJdn);
}

export function addMonthsToJalaliDate(jy, jm, jd, monthsToAdd) {
  // Normalize months (handling negatives and large numbers)
  const totalMonths = (jy * 12) + (jm - 1) + monthsToAdd;
  
  let newJy = Math.floor(totalMonths / 12);
  let newJm = (totalMonths % 12) + 1;
  
  // Handle case where modulo returns negative for negative monthsToAdd
  if (newJm <= 0) {
      newJm += 12;
      newJy -= 1; // Correction logic handled by floor usually, but explicit check matches logic better
  }

  // Handle End-of-Month Overflow (e.g., 31 Shahrivar -> Mehr)
  const maxDays = monthDaysJalali(newJy, newJm);
  const newJd = Math.min(jd, maxDays);

  return { jy: newJy, jm: newJm, jd: newJd };
}

export function addYearsToJalaliDate(jy, jm, jd, yearsToAdd) {
    const newJy = jy + yearsToAdd;
    // Check for leap year mismatch (e.g. 30 Esfand in leap year -> next year non-leap)
    const maxDays = monthDaysJalali(newJy, jm);
    const newJd = Math.min(jd, maxDays);
    
    return { jy: newJy, jm, jd: newJd };
}

export function differenceInDaysJalali(jy1, jm1, jd1, jy2, jm2, jd2) {
  const jdn1 = jalaliToJdn(jy1, jm1, jd1);
  const jdn2 = jalaliToJdn(jy2, jm2, jd2);
  return jdn2 - jdn1;
}

export function differenceInMonthsJalali(jy1, jm1, jy2, jm2) {
  const totalMonths1 = jy1 * 12 + (jm1 - 1);
  const totalMonths2 = jy2 * 12 + (jm2 - 1);
  return totalMonths2 - totalMonths1;
}