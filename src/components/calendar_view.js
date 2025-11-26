// just  view builder and creator month days.
import jMonths from '../data/jalali-months.json';
import {
    toPersianNumber
} from './util';
import * as core from './calendar_logic';
/*
// creates buttons and wires handlers passed from caller
export function createCalendarButtons(onPrev, onNext) {

    //prev
    const prevBtn = document.createElement('button');
    prevBtn.id = 'prev_button';
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    //next
    const nextBtn = document.createElement('button');
    nextBtn.id = 'next_button';
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

    prevBtn.addEventListener('click', onPrev);
    nextBtn.addEventListener('click', onNext);

    //return buttons
    return {
        prevBtn,
        nextBtn
    };
}
*/
export function createCalendarView(initialYear, initialMonth, initialDay) {

    //calender box
    const mainCalendar = document.createElement('div');
    mainCalendar.className = 'main_calendar';
    //caledar box header
    const boxheader = document.createElement('div');
    boxheader.className = 'calendar_header';
    //calendar box header month and year
    const monthYearDiv = document.createElement('div');
    monthYearDiv.className = 'month_year';
    const monthSpan = document.createElement('span');
    monthSpan.id = 'monthName';
    const yearSpan = document.createElement('span');
    yearSpan.id = 'year';
    // buttons placeholders
    const prevBtn = document.createElement('button');
    prevBtn.id = 'prev_button';
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    const nextBtn = document.createElement('button');
    nextBtn.id = 'next_button';
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    //calendar box month days
    const calendarBody = document.createElement('div');
    calendarBody.className = 'calendar_dates';

    // month days creator function
    calendarBody.innerHTML = '';
    const days = core.getJalaliMonthDays(initialYear, initialMonth);
    const start = core.getStartOfJalaliMonthWeekday(initialYear, initialMonth);

    const prevMonth = initialMonth === 0 ? 11 : initialMonth - 1;
    const prevYear = initialMonth === 0 ? initialYear - 1 : initialYear;
    const prevDays = core.getJalaliMonthDays(prevYear, prevMonth);
    const totalCells = 42; // 6 rows * 7 cols
    const nextNeeded = totalCells - (start + days);
    // prev month days
    for (let i = 0; i < start; i++) {
        const el = document.createElement('div');
        el.className = 'day prev';
        el.innerText = toPersianNumber(prevDays - start + i + 1);
        calendarBody.appendChild(el);
    }
    // current month days
    for (let day = 1; day <= days; day++) {
        const el = document.createElement('div');
        el.className = 'day current';
        el.innerText = toPersianNumber(day);
        const weekday = (start + (day - 1)) % 7;
        if (weekday === 6) el.classList.add('holiday');
        // if (y === initialYear && m === initialMonth && day === initialDay) el.classList.add('today');
        calendarBody.appendChild(el);
    }
    // next month days
    for (let i = 1; i <= nextNeeded; i++) {
        const el = document.createElement('div');
        el.className = 'day next';
        el.innerText = toPersianNumber(i);
        const weekday = (start + days + (i - 1)) % 7;
        if (weekday === 6) el.classList.add('nextholiday');
        calendarBody.appendChild(el);
    }

    monthSpan.innerText = jMonths[initialMonth];
    yearSpan.innerText = toPersianNumber(initialYear);

    monthYearDiv.append(monthSpan, yearSpan);
    boxheader.append(prevBtn, monthYearDiv, nextBtn);
    mainCalendar.append(boxheader, calendarBody);

    return {
        main: mainCalendar,
        prevBtn,
        nextBtn,

    };
}