import React, { PureComponent } from "react";
import {
  monthDaysJalali,
  firstWeekDayOfJalaliMonth,
  changeToGregorian,
} from "jalali-lib";
import eventsList from "../data/events.json";
import CalendarDay from "./CalendarDay";
import "../style/CalendarView.css";
import ViewHeader from "./CalendarViewHeader";
import AppContext from "../Contexts/AppContex";


class CalendarView extends PureComponent {
  constructor(props) {
    super(props);
    this.today = {
      curentYear: props.currentDate.year,
      curentMonth: props.currentDate.month,
      curentDay: props.currentDate.day,
    };
  };

  static contextType=AppContext;

  state = {
    Year: this.props.year,
    Month: this.props.month,
    Day: this.props.day,
    changeDate: false,
  };
  getHolodays(month) {
    const list = [];
    const events = [];
    eventsList.forEach(element => {
      if(element.year ==this.props.year && element.month ==this.props.month){
        events.push(element);
      }
    });
    events.forEach((element) => {
      if (element.holiday) list.push(element.day);
    });
    return list;
  }
  changeMonth = (selection) => {
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
      if (this.context.onMonthChange) {
        this.context.onMonthChange({ year, month });
      }
      return { Year: year, Month: month };
    });
  };
  goToday() {
    let today = this.today;
    let year = today.curentYear;
    let month = today.curentMonth;
    let day = today.curentDay;

    this.setState({
      Year: year,
      Month: month,
      Day: day,
    });
    //برای اینکه خبر بدیم به پدرش ماه تغییر کرده حالا اگه باید خودتو تغییر بده
    if (this.context.onMonthChange) {
      this.context.onMonthChange({ year, month, day });
    }
  }
  jalaliMonthDays(year, month) {
    return monthDaysJalali(year, month + 1);
  }
  startOfMonthWeekday(year, month) {
    return firstWeekDayOfJalaliMonth(year, month + 1);
  }
  createCalendarDate() {
    const { Year, Month, Day } = this.state;
    const today = this.today;
    const monthDay = monthDaysJalali(Year, Month + 1);
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
      let year = Year;
      let month = Month;
      if (month - 1 < 0) {
        year = year - 1;
        month = 11;
      } else {
        month = month - 1;
      }
      allDays.push({
        type: "prev",
        value: prevMonthDaysCount - monthStartDay + i + 1,
        geoDay: changeToGregorian(
          year,
          month + 1,
          prevMonthDaysCount - monthStartDay + i + 1,
        ).gd,
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
        geoDay: changeToGregorian(Year, Month + 1, d).gd,
      });
    }
    //next Month
    for (let d = 1; d <= nextMonthDaysCount; d++) {
      const weekday = (monthStartDay + monthDay + (d - 1)) % 7;
      let year = Year;
      let month = Month;
      if (month + 1 > 11) {
        year = year + 1;
        month = 0;
      }

      allDays.push({
        type: "next",
        value: d,
        isNextHoliday: weekday === 6,
        geoDay: changeToGregorian(year, month + 1, d).gd,
      });
    }

    return allDays;
  }

  render() {
    const { Year, Month, Day } = this.state;
    const days = this.createCalendarDate();
    return (
      <div className="main_calendar">
          <ViewHeader
            Year={Year}
            Month={Month}
            pointerChangeMonth={this.changeMonth}
          />
          <CalendarDay
            days={days}
            hover={[
              this.props.highlightedDate[0],
              this.props.highlightedDate[1],
            ]}
          />
          <button className="today_button" onClick={() => this.goToday()}>
            بازگشت به روز جاری
          </button>
      </div>
    );
  }
}

export default CalendarView;
