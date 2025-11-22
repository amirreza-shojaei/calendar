import {
    toPersianNumber
} from '../util';
import jMonths from "../data/jalali-months.json";
import {
    toGregorian
} from 'jalaali-js';


//Calculate Months days
function isLeapJalali(jy) {
    const kabisePattern = [1, 5, 9, 13, 17, 22, 26, 30];
    if (kabisePattern.includes(jy % 33)) {
        return true;
    }
    return false;
};
function getJalaliMonthDays(jy, jm) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    return isLeapJalali(jy) ? 30 : 29; // اسفند
};
//Calculate Start month weekday
function getStartOfJalaliMonthWeekday(jy, jm) {
    // تبدیل «روز اول ماه شمسی» به میلادی
    const g = toGregorian(jy, jm + 1, 1);

    // گرفتن روز هفته میلادی
    const weekday = new Date(g.gy, g.gm - 1, g.gd).getDay();
    // تبدیل استاندارد به شمسی (شنبه = 0)
    return (weekday + 1) % 7;
};
export function calendarloader(jalali_year, jalali_month, jalali_day) {

    const mainCalender = document.createElement('div');
    mainCalender.className = 'main_calender';
    mainCalender.id = 'main';

    const header = document.createElement('header');
    header.className = 'calender_header';
    header.id = 'header';

    const prevBtn = document.createElement('button');
    prevBtn.id = 'prev_button';
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

    const nextBtn = document.createElement('button');
    nextBtn.id = 'next_button';
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

    const monthYearDiv = document.createElement('div');
    monthYearDiv.className = 'month_year';

    const monthSpan = document.createElement('span');
    monthSpan.id = 'monthName';

    const yearSpan = document.createElement('span');
    yearSpan.id = 'year';

    const calenderBody = document.createElement('div');
    calenderBody.className = 'calender_dates';
    calenderBody.id = 'body';

    //load the calender
    function reload(y, m, d) {
        calenderBody.innerHTML = "";

        const days = getJalaliMonthDays(y, m);
        let startMonthDay = getStartOfJalaliMonthWeekday(y, m);

        let prevMonth = m === 0 ? 11 : m - 1;
        let prevYear = m === 0 ? y - 1 : y;
        const prevMonthDays = getJalaliMonthDays(prevYear, prevMonth);
        let days_next_month = 42 - (startMonthDay + days);
        //prev month days
        for (let i = 1; i <= startMonthDay; i++) {
            const div = document.createElement("div");
            div.className = "day prev";
            div.innerHTML = toPersianNumber(prevMonthDays - startMonthDay + i);
            calenderBody.appendChild(div);
        };
        //current month days
        for (let i = 1; i <= days; i++) {
            const div = document.createElement("div");
            div.className = "day current";
            div.innerText = toPersianNumber(i);

            const weekday = (startMonthDay + (i - 1)) % 7;
            if (weekday === 6) div.classList.add("holiday");

            calenderBody.appendChild(div);
        };
        //next month days
        for (let i = 1; i <= days_next_month; i++) {
            const div = document.createElement("div");
            div.className = "day next";
            div.innerText = toPersianNumber(i);

            const weekday = (startMonthDay + days + (i - 1)) % 7;
            if (weekday === 6) div.classList.add("holiday");

            calenderBody.appendChild(div);
        };

        monthSpan.innerHTML = jMonths[m];
        yearSpan.innerHTML = toPersianNumber(y);
    };
    //load for first time
    reload(jalali_year, jalali_month, jalali_day);

    monthYearDiv.append(monthSpan, " ", yearSpan);
    header.append(prevBtn, monthYearDiv, nextBtn);
    mainCalender.append(header, calenderBody);

    return {
        mainCalender,
        prevBtn,
        nextBtn,
        calenderBody,
        reload
    };
}