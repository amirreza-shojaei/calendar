// just  view builder and creator month days.
import jMonths from '../data/jalali-months.json';
import {
    toPersianNumber
} from './util';
import * as core from './calendar_logic';

export class View {
    initialYear;
    initialMonth;
    initialDay;
    mainCalendar;
    boxheader;
    monthYearDiv;
    monthSpan;
    yearSpan;
    prevBtn;
    nextBtn;
    calendarBody;
    constructor(year, month, day) {
        this.initialDay = day;
        this.initialMonth = month;
        this.initialYear = year;
        this.mainCalendar = document.createElement('div');
        this.mainCalendar.className = 'main_calendar';
        //caledar box header
        this.boxheader = document.createElement('div');
        this.boxheader.className = 'calendar_header';
        //calendar box header month and year
        this.monthYearDiv = document.createElement('div');
        this.monthYearDiv.className = 'month_year';
        this.monthSpan = document.createElement('span');
        this.monthSpan.id = 'monthName';
        this.yearSpan = document.createElement('span');
        this.yearSpan.id = 'year';
        // buttons placeholders
        this.prevBtn = document.createElement('button');
        this.prevBtn.id = 'prev_button';
        this.prevBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        this.nextBtn = document.createElement('button');
        this.nextBtn.id = 'next_button';
        this.nextBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        //calendar box month days
        this.calendarBody = document.createElement('div');
        this.calendarBody.className = 'calendar_dates';

    }
    setdate(year, month, day) {
        this.initialDay = day;
        this.initialMonth = month;
        this.initialYear = year;
    }
    jalalimonthdays() {
        return core.getJalaliMonthDays(this.initialYear, this.initialMonth);
    }
    startofmonthweekday() {
        return core.getStartOfJalaliMonthWeekday(this.initialYear, this.initialMonth);
    }
    prevmonthdays() {
        const prevMonth = this.initialMonth === 0 ? 11 : this.initialMonth - 1;
        const prevYear = this.initialMonth === 0 ? this.initialYear - 1 : this.initialYear;
        const prevDays = core.getJalaliMonthDays(prevYear, prevMonth);
        return prevDays;
    }
    nextmonthdays() {
        const days = this.jalalimonthdays();
        const start = this.startofmonthweekday();
        const totalCells = 42; // 6 rows * 7 cols
        const nextNeeded = totalCells - (start + days);
        return nextNeeded;
    }
    createprevmonthdays() {
        const start = this.startofmonthweekday();
        const prevDays = this.prevmonthdays();
        for (let i = 0; i < start; i++) {
            const el = document.createElement('div');
            el.className = 'day prev';
            el.innerText = toPersianNumber(prevDays - start + i + 1);
            this.calendarBody.appendChild(el);
        }
    }
    createcurrentmonthdays() {
        const days = this.jalalimonthdays();
        const start = this.startofmonthweekday();
        for (let day = 1; day <= days; day++) {
            const el = document.createElement('div');
            el.className = 'day current';
            el.innerText = toPersianNumber(day);
            const weekday = (start + (day - 1)) % 7;
            if (weekday === 6) el.classList.add('holiday');
            this.calendarBody.appendChild(el);
        }

    }
    createnextmonthdays() {
        const days = this.jalalimonthdays();
        const start = this.startofmonthweekday();
        const nextNeeded = this.nextmonthdays();
        for (let i = 1; i <= nextNeeded; i++) {
            const el = document.createElement('div');
            el.className = 'day next';
            el.innerText = toPersianNumber(i);
            const weekday = (start + days + (i - 1)) % 7;
            if (weekday === 6) el.classList.add('nextholiday');
            this.calendarBody.appendChild(el);
        }
    }
    createboxheader() {
        this.monthSpan.innerText = jMonths[this.initialMonth];
        this.yearSpan.innerText = toPersianNumber(this.initialYear);
    }
    buttoncontrols(clickprev, clicknext) {
        this.nextBtn.addEventListener('click', clicknext);
        this.prevBtn.addEventListener('click', clickprev);

    }
    reloadview(year, month, day) {
        this.setdate(year, month, day);
        this.loaderview();
    }
    loaderview() {
        this.calendarBody.innerText = '';
        this.createprevmonthdays();
        this.createcurrentmonthdays();
        this.createnextmonthdays();
        this.createboxheader();
        this.monthYearDiv.append(this.monthSpan, this.yearSpan);
        this.boxheader.append(this.prevBtn, this.monthYearDiv, this.nextBtn);
        this.mainCalendar.append(this.boxheader, this.calendarBody);
        return this.mainCalendar;
    }
}