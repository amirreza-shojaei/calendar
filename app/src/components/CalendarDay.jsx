import React, { PureComponent } from "react";
import { toPersianNumber } from "../helperCode/util";
import "../style/CalendarDay.css";


class CalendarDay extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
         <div className="calendar_dates">
          {this.props.days.map((day, index) => (
            <div
              className={`day ${day.type}

                ${day.isHoliday ? "holiday" : ""}
                ${day.isToday ? "today" : ""}
                ${day.isNextHoliday ? "nextholiday" : ""}
                ${this.props.hover[0] === day.value && day.type == "current" ? `highlighted-day-type-${this.props.hover[1]}` : ""}
              `}
              key={index}
            >
              <span className="jala">{toPersianNumber(day.value)}</span>
              <span className="geo">{day.geoDay}</span>
            </div>
          ))}
        </div>
    );
  }
}
export default CalendarDay;
