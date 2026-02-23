// به جای require از import استفاده کن
import {
  changeToJalali,
  changeToGregorian,
  isLeapJalaliYear,
  monthDaysJalali,
  isValid,
  weekDayJalali,
  firstWeekDayOfJalaliMonth,
  firstWeekDayOfJalaliYear,
  lastWeekDayOfJalaliYear,
  nameOfJalaliWeekday,
  nameOfJalaliMonth,
  formaterJalaliDate,
  addDaysToJalaliDate,
  addMonthsToJalaliDate,
  addYearsToJalaliDate,
  differenceInDaysJalali,
  differenceInMonthsJalali,
  jalaliToday
} from "./temp.js";


describe("Public Exported Functions", () => {
  it("jalaliToday", () => {
    const today = jalaliToday();
    expect(today).toHaveProperty('jy');
    expect(today).toHaveProperty('jm');
    expect(today).toHaveProperty('jd');
    expect(today.jy).toBeGreaterThan(1300);
  });
test.each([ 1403,1399,1408])("isLeapJalaliYear return true", (year) => {
    expect(isLeapJalaliYear(year)).toEqual(true);
  });
  test.each([1404,1406,1407])("isLeapJalaliYear return false", (year) => {
    expect(isLeapJalaliYear(year)).toEqual(false);
  });
  it("monthDaysJalali", () => {
    expect(monthDaysJalali(1400, 1)).toBe(31);
    expect(monthDaysJalali(1400, 7)).toBe(30);
    expect(monthDaysJalali(1400, 12)).toBe(29);
    expect(monthDaysJalali(1403, 12)).toBe(30);
    expect(monthDaysJalali(1299, 12)).toBe(29);
    expect(monthDaysJalali(1408, 12)).toBe(30);
  });
  it("isValid", () => {
    expect(isValid(1400, 1, 31)).toBe(true);
    expect(isValid(1400, 12, 30)).toBe(false);
    expect(isValid(1403, 12, 30)).toBe(true);
    expect(isValid(1400, 13, 1)).toBe(false);
    expect(isValid(1400, 6, 31)).toBe(true);
    expect(isValid(1400, 7, 31)).toBe(false);
    expect(isValid(1399, 12, 30)).toBe(true);
  });
  it("changeToJalali", () => {
    expect(changeToJalali(2021, 3, 21)).toEqual({
      jy: 1400,
      jm: 1,
      jd: 1
    });
    expect(changeToJalali(2024, 3, 20)).toEqual({
      jy: 1403,
      jm: 1,
      jd: 1
    });
  });
  it("jchangeToGregoriany", () => {
    expect(changeToGregorian(1400, 1, 1)).toEqual({
      gy: 2021,
      gm: 3,
      gd: 21
    });
    expect(changeToGregorian(1403, 12, 30)).toEqual({
      gy: 2025,
      gm: 3,
      gd: 20
    });
    expect(changeToGregorian(1299, 12, 29)).toEqual({
      gy: 1921,
      gm: 3,
      gd: 20
    });
  });

});

describe("Weekday Functions", () => {
  it("weekDayJalali", () => {
    expect(weekDayJalali(1400, 1, 1)).toBe(1);
    expect(weekDayJalali(1404, 11, 30)).toEqual(5);

  });
  it("firstWeekDayOfJalaliMonth", () => {
    expect(firstWeekDayOfJalaliMonth(1400, 1)).toBe(1);
    expect(firstWeekDayOfJalaliMonth(1400, 7)).toBe(5);
    expect(firstWeekDayOfJalaliMonth(1403, 1)).toBe(4);
    expect(firstWeekDayOfJalaliMonth(1404, 11)).toEqual(4);
  });
  it("firstWeekDayOfJalaliYear", () => {
    expect(firstWeekDayOfJalaliYear(1410)).toBe(6);
    expect(firstWeekDayOfJalaliYear(1400)).toBe(1);
    expect(firstWeekDayOfJalaliYear(1386)).toBe(4);
  });
  it("lastWeekDayOfJalaliYear", () => {
    expect(lastWeekDayOfJalaliYear(1400)).toBe(1);
    expect(lastWeekDayOfJalaliYear(1403)).toBe(5);
  });
  it("nameOfJalaliWeekday", () => {
    expect(nameOfJalaliWeekday(1400, 1, 1)).toBe("یک‌شنبه");
  });
  it("nameOfJalaliMonth", () => {
    expect(nameOfJalaliMonth(1)).toBe("فروردین");
    expect(nameOfJalaliMonth(12)).toBe("اسفند");
  });
  it("formaterJalaliDate", () => {
    expect(formaterJalaliDate(1400, 1, 1)).toBe("یک‌شنبه، 1 فروردین 1400");
  });


});

describe("Arithmetic Functions", () => {

  it("addDaysToJalaliDate", () => {
    expect(addDaysToJalaliDate(1300, 12, 30, 1)).toEqual({
      jy: 1301,
      jm: 1,
      jd: 1
    });
    expect(addDaysToJalaliDate(1400, 1, 1, -10)).toEqual({
      jy: 1399,
      jm: 12,
      jd: 21
    });
    expect(addDaysToJalaliDate(1400, 6, 31, 1)).toEqual({
      jy: 1400,
      jm: 7,
      jd: 1
    });
    expect(addDaysToJalaliDate(1400, 1, 1, -1)).toEqual({
      jy: 1399,
      jm: 12,
      jd: 30
    });
    expect(addDaysToJalaliDate(1400, 5, 10, 365)).toEqual({
      jy: 1401,
      jm: 5,
      jd: 10
    });
  });
  it("addMonthsToJalaliDate", () => {
    expect(addMonthsToJalaliDate(1400, 1, 15, 2)).toEqual({
      jy: 1400,
      jm: 3,
      jd: 15
    });
    expect(addMonthsToJalaliDate(1400, 6, 31, 1)).toEqual({
      jy: 1400,
      jm: 7,
      jd: 30
    });
    expect(addMonthsToJalaliDate(1400, 11, 1, 3)).toEqual({
      jy: 1401,
      jm: 2,
      jd: 1
    });
  });
  it("addYearsToJalaliDate", () => {
    expect(addYearsToJalaliDate(1403, 12, 30, 1)).toEqual({
      jy: 1404,
      jm: 12,
      jd: 29
    });
    expect(addYearsToJalaliDate(1400, 1, 5, 2)).toEqual({
      jy: 1402,
      jm: 1,
      jd: 5
    });
  });
  it("differenceInDaysJalali", () => {
    expect(differenceInDaysJalali(1400, 1, 1, 1400, 1, 10)).toBe(9);
    expect(differenceInDaysJalali(1400, 1, 1, 1399, 12, 30)).toBe(-1);
  });
  it("differenceInMonthsJalali", () => {
    expect(differenceInMonthsJalali(1400, 1, 1401, 2)).toBe(13);
  });



});