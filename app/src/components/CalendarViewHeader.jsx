import React from "react";
import "../data/jalali-months.json";
import { toPersianNumber } from "../helperCode/util";
import {
  monthDaysJalali,
  nameOfJalaliMonth,
  changeToGregorian,
} from "jalali-lib";
import monthName from "../data/jalali-months.json";
import "../style/CalendarViewHeader.css";
import AppContext from "../Contexts/AppContex";

class ViewHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType =AppContext;

  shouldComponentUpdate(props, state) {
    if (props.Month != this.props.Month) {
      return true;
    }
    return false;
  }

  render() {
    let geoFirstDayMonth = changeToGregorian(
      this.props.Year,
      this.props.Month + 1,
      1,
    );
    let geoLastDayMonth = changeToGregorian(
      this.props.Year,
      this.props.Month + 1,
      monthDaysJalali(this.props.Year, this.props.Month + 1),
    );
    return (
      <div className="calendar_header">
        <button
          className="prev_button"
          onClick={() => this.props.pointerChangeMonth(-1)}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        <div className="header-info">
          <span id="monthName">
            {nameOfJalaliMonth(this.props.Month + 1)}
            <span className="geo-info">
              {`${monthName.Geo[geoFirstDayMonth.gm % 12]} ${monthName.Geo[geoFirstDayMonth.gm] === monthName.Geo[geoLastDayMonth.gm] ? "" : `- ${monthName.Geo[geoLastDayMonth.gm % 12]}`} `}
            </span>
          </span>
          <span id="year">
            {toPersianNumber(this.props.Year)}
            <span className="geo-info">{geoFirstDayMonth.gy}</span>
          </span>
        </div>

        <button
          className="next_button"
          onClick={() => this.props.pointerChangeMonth(1)}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          className="changeDate-button"
          onClick={() => this.context.changeBoolian(true)}
        >
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>
    );
  }
}

export default ViewHeader;
