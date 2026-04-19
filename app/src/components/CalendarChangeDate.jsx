import React from "react";
import monthName from "../data/jalali-months.json";
import "../style/CalendarChangeDate.css";
import { toPersianNumber } from "../helperCode/util";
import AppContext from "../Contexts/AppContex";
class ChangeDate extends React.PureComponent {
  constructor(props) {
    super(props);
  };
  static contextType=AppContext;

  state = {
    inputYear: this.props.year,
    outputDate: { newSetYear: this.props.year, newSetMonth:this.props.month},
  };

  counterYears(year) {
    let years = [];
    let startY = year - 10;
    for (let i = startY; i <= startY + 20; i++) {
      years.push(i);
    }
    return years;
  }

  render() {
    const allYears = this.counterYears(this.state.inputYear);
    const months = monthName.Jalali;
    return (
      
      <div className="main-box">
        <header className="calendar_header">
          {/*prev button */}
          <button
            className="prev_button"
            onClick={() =>
              this.setState({ inputYear: this.state.inputYear - 20 })
            }
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          {/*month and year*/}
          <div className="header-info">
            <span id="monthName">
              {monthName.Jalali[this.state.outputDate.newSetMonth]}
            </span>
            <span id="year">{toPersianNumber(this.state.outputDate.newSetYear)}</span>
          </div>

          {/*next button */}
          <button
            className="next_button"
            onClick={() =>
              this.setState({ inputYear: this.state.inputYear + 20 })
            }
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        </header>

        <div className="box-item">
          {months.map((data, index) => (
            <button
              key={index}
              onClick={() =>
                this.setState((prevState) => {
                  return {
                    outputDate: { ...prevState.outputDate, newSetMonth: index },
                  };
                  
                })
              }
                className={`item ${
                this.state.outputDate.newSetMonth == index ? "active" : ""
              }`}
            >
              {data}
            </button>
          ))}
        </div>
        <div className="box-item-year">
          {allYears.map((data, index) => (
            <button
              key={index} 
              onClick={() =>
                this.setState((prevState) => {
                  return {
                    outputDate: { ...prevState.outputDate, newSetYear: data },
                  };
                })
              }
              className={`item ${
                this.state.outputDate.newSetYear == data ? "active" : ""
              }`}
            >
              {toPersianNumber(data)}
            </button>
          ))}
        </div>

        <button
          onClick={() => this.context.newDate(this.state.outputDate, false)}
          className="today_button"
        >
          تایید
        </button>
      </div>
    );
  }
}
export default ChangeDate;
