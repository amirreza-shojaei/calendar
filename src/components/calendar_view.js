// just  view builder and creator month days.
import jMonths from '../data/jalali-months.json';
import {
    toPersianNumber
} from './util';
import * as core from './calendar_logic';

export class calendar_view {
    initial_Year;
    initial_Month;
    initial_Day;
    mainCalendar;
    boxheader;
    monthYearDiv;
    monthSpan;
    yearSpan;
    prevBtn;
    nextBtn;
    calendarBody;
    currentdate;
    constructor(year, month, day) {
        this.initial_Day = day;
        this.initial_Month = month;
        this.initial_Year = year;
        this.currentdate = {
            year: year,
            month: month,
            day: day
        }
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
    updat_edate(year, month, day) {
        this.initial_Day = day;
        this.initial_Month = month;
        this.initial_Year = year;
    }
    set_current_date(day, el) {
        if (day === this.currentdate.day && this.initial_Month === this.currentdate.month && this.initial_Year === this.currentdate.year) {
            el.classList.add('today');
        }
    }
    jalali_month_days() {
        return core.get_Jalali_Month_Days(this.initial_Year, this.initial_Month);
    }
    start_of_month_weekday() {
        return core.get_Start_Of_Jalali_Month_Weekday(this.initial_Year, this.initial_Month);
    }
    prev_month_days() {
        const prevMonth = this.initial_Month === 0 ? 11 : this.initial_Month - 1;
        const prevYear = this.initial_Month === 0 ? this.initial_Year - 1 : this.initial_Year;
        const prevDays = core.get_Jalali_Month_Days(prevYear, prevMonth);
        return prevDays;
    }
    next_month_days() {
        const days = this.jalali_month_days();
        const start = this.start_of_month_weekday();
        const totalCells = 42; // 6 rows * 7 cols
        const nextNeeded = totalCells - (start + days);
        return nextNeeded;
    }
    create_prev_month_days() {
        const start = this.start_of_month_weekday();
        const prevDays = this.prev_month_days();
        for (let i = 0; i < start; i++) {
            const el = document.createElement('div');
            el.className = 'day prev';
            el.innerText = toPersianNumber(prevDays - start + i + 1);
            this.calendarBody.appendChild(el);
        }
    }
    create_current_month_days() {
        const days = this.jalali_month_days();
        const start = this.start_of_month_weekday();
        for (let day = 1; day <= days; day++) {
            const el = document.createElement('div');
            el.className = 'day current';
            el.innerText = toPersianNumber(day);
            const weekday = (start + (day - 1)) % 7;
            if (weekday === 6) el.classList.add('holiday');
            this.set_current_date(day, el);
            this.calendarBody.appendChild(el);
        }

    }
    create_next_month_days() {
        const days = this.jalali_month_days();
        const start = this.start_of_month_weekday();
        const nextNeeded = this.next_month_days();
        for (let i = 1; i <= nextNeeded; i++) {
            const el = document.createElement('div');
            el.className = 'day next';
            el.innerText = toPersianNumber(i);
            const weekday = (start + days + (i - 1)) % 7;
            if (weekday === 6) el.classList.add('nextholiday');
            this.calendarBody.appendChild(el);
        }
    }
    create_box_header() {
        this.monthSpan.innerText = jMonths[this.initial_Month];
        this.yearSpan.innerText = toPersianNumber(this.initial_Year);
    }
    listener_month_change() {
        const datails = {
            year: this.initial_Year,
            month: this.initial_Month,
            day: this.initial_Day
        }
        this.mainCalendar.dispatchEvent(new CustomEvent('monthChange', {
            detail: datails
        }));
    }
    change_month_functions(selection) {
        if (selection == 1) {
            this.initial_Month++;
            if (this.initial_Month > 11) {
                this.initial_Month = 0;
                this.initial_Year++;
            }

        } else if (selection == -1) {
            this.initial_Month--;
            if (this.initial_Month < 0) {
                this.initial_Month = 11;
                this.initial_Year--;
            }
        }
        this.render();
        this.listener_month_change();


    }
    buttons_controls() {
        this.nextBtn.addEventListener('click', () => this.change_month_functions(1));
        this.prevBtn.addEventListener('click', () => this.change_month_functions(-1));
    }
    reloadview(year, month, day) {
        this.updatedate(year, month, day);
        this.loaderview();
    }
    render() {
        this.calendarBody.innerText = '';
        this.create_prev_month_days();
        this.create_current_month_days();
        this.create_next_month_days();
        this.create_box_header();
    }
    load_View() {
        this.render();
        this.buttons_controls();
        this.monthYearDiv.append(this.monthSpan, this.yearSpan);
        this.boxheader.append(this.prevBtn, this.monthYearDiv, this.nextBtn);
        this.mainCalendar.append(this.boxheader, this.calendarBody);
        return this.mainCalendar;
    }

}