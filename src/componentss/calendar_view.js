// just  view builder and creator month days.
import jMonths from '../data/jalali-months.json';
import {
    toPersianNumber
} from './util';
import * as core from './calendar_logic';


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

    monthYearDiv.append(monthSpan, yearSpan);

    // buttons placeholders
    const prevBtn = document.createElement('button');
    prevBtn.id = 'prev_button';
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    const nextBtn = document.createElement('button');
    nextBtn.id = 'next_button';
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

    boxheader.append(prevBtn, monthYearDiv, nextBtn);
    //calendar box month days
    const calendarBody = document.createElement('div');
    calendarBody.className = 'calendar_dates';

    mainCalendar.append(boxheader, calendarBody);

    // month days creator function
    function renderMonth(y, m, d) {
        calendarBody.innerHTML = '';
        const days = core.getJalaliMonthDays(y, m);
        const start = core.getStartOfJalaliMonthWeekday(y, m);

        const prevMonth = m === 0 ? 11 : m - 1;
        const prevYear = m === 0 ? y - 1 : y;
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
            if (y === initialYear && m === initialMonth && day === initialDay) el.classList.add('today');
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

        monthSpan.innerText = jMonths[m];
        yearSpan.innerText = toPersianNumber(y);
    }

    return {
        main: mainCalendar,
        prevBtn,
        nextBtn,
        renderMonth,
    };
}