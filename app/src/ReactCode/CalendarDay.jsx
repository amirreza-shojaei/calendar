import React from "react";
import { toPersianNumber } from "../components/util";
class CalendarDay extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
     <div  className={`day ${this.props.day.type}
                ${this.props.day.isHoliday ? "holiday" : ""}
                ${this.props.day.isToday ? "today" : ""}
                ${this.props.day.isNextHoliday ? "nextholiday" : ""}
              `}
     >
      {toPersianNumber(this.props.day.value)}
     </div>
    );
  };

}
export default CalendarDay;