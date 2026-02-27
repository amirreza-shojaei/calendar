import React from "react";
import { toPersianNumber } from "../components/util";
import {
  monthDaysJalali,
  firstWeekDayOfJalaliMonth,
  nameOfJalaliMonth,
} from "jalali-lib";
import eventsList from "../data/events.json";
import CalendarDay from "./CalendarDay";
class CalendarView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Year: props.year,
      Month: props.month,
      Day: props.day,
      today: {
        curentYear: props.year,
        curentMonth: props.month,
        curentDay: props.day,
      },
    };
  }
  jalaliMonthDays(year, month) {
    return monthDaysJalali(year, month + 1);
  }
  startOfMonthWeekday(year, month) {
    return firstWeekDayOfJalaliMonth(year, month + 1);
  }
  getHolodays(month) {
    const list = [];
    const events = eventsList[month] || [];
    events.forEach((element) => {
      if (element.holiday) list.push(element.day);
    });
    return list;
  }
  changeMonth(selection) {
    this.setState((prev) => {
      let year = prev.Year;
      let month = prev.Month;
      month += selection;
      if (month > 11) {
        month = 0;
        year++;
      }
      if (month < 0) {
        month = 11;
        year--;
      }
      //برای اینکه خبر بدیم به پدرش ماه تغییر کرده حالا اگه باید خودتو تغییر بده
      if (this.props.onMonthChange) {
        this.props.onMonthChange({ year, month });
      }
      return { Year: year, Month: month };
    });
  }
  goToday() {
    let { today } = this.state;
    this.setState({
      Year: today.curentYear,
      Month: today.curentMonth,
      Day: today.curentDay,
    });

    if (this.props.onMonthChange) {
      this.props.onMonthChange(today);
    }
  }
  createCalendarDate() {
    const { Year, Month, Day, today } = this.state;
    const monthDay = monthDaysJalali(Year, Month+1);
    const monthStartDay = this.startOfMonthWeekday(Year, Month);
    //+1 for change index to reall
    const prevMonthDaysCount =
      Month === 0
        ? monthDaysJalali(Year - 1, 11 + 1)
        : monthDaysJalali(Year, Month - 1 + 1);
    const nextMonthDaysCount = 42 - (monthStartDay + monthDay);
    const holidays = this.getHolodays(Month);
    const allDays = [];

    //prev Month
    for (let i = 0; i < monthStartDay; i++) {
      allDays.push({
        type: "prev",
        value: prevMonthDaysCount - monthStartDay + i + 1,
      });
    }
    //current Month
    for (let d = 1; d <= monthDay; d++) {
      const weekday = (monthStartDay + (d - 1)) % 7;
      allDays.push({
        type: "current",
        value: d,
        isHoliday: weekday === 6 || holidays.includes(d),
        isToday:
          d === today.curentDay &&
          Month === today.curentMonth &&
          Year === today.curentYear,
      });
    }
    //next Month
    for (let d = 1; d <= nextMonthDaysCount; d++) {
      const weekday = (monthStartDay + monthDay + (d - 1)) % 7;
      allDays.push({ type: "next", value: d ,isNextHoliday: weekday === 6});
    }

    return allDays;
  }

  render() {
    const { Year, Month } = this.state;
    const days = this.createCalendarDate();
    return (
      <div className="main_calendar">
        <div className="calendar_header">
          <button className="prev_button" onClick={() => this.changeMonth(-1)}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div className="month_year">
            <span id="monthName">{nameOfJalaliMonth(Month + 1)}</span>
            <span id="year">{toPersianNumber(Year)}</span>
          </div>
          <button className="next_button" onClick={() => this.changeMonth(1)}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        </div>

        <div className="calendar_dates">
          {days.map((day, index) => (
            <CalendarDay key={index} day={day} />
          ))}
        </div>

        <button id="today_button" onClick={() => this.goToday()}>
          بازگشت به روز جاری
        </button>
      </div>
    );
  }
}

export default CalendarView;

