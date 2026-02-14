
//Change jalali to gregorian
// --- Utility ---
function div(a, b) {
  return ~~(a / b);
}

function mod(a, b) {
  return a - ~~(a / b) * b;
}

// --- Convert Jalaali date to Gregorian date ---
export function toGregorian(jy, jm, jd) {
  return d2g(j2d(jy, jm, jd));
}

// --- Jalaali to Julian Day Number ---
function j2d(jy, jm, jd) {
  var r = jalCal(jy);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}

// --- Julian Day to Gregorian ---
function d2g(jdn) {
  var j, i, gd, gm, gy;
  j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  i = div(mod(j, 1461), 4) * 5 + 308;
  gd = div(mod(i, 153), 5) + 1;
  gm = mod(div(i, 153), 12) + 1;
  gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { gy, gm, gd };
}

// --- Main Jalaali calendar core calculation ---
function jalCal(jy) {
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

// --- Gregorian to Julian Day ---
function g2d(gy, gm, gd) {
  var d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d =
    d -
    div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) +
    752;
  return d;
}
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