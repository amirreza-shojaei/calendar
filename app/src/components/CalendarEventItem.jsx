import React from "react";
import { toPersianNumber } from "../helperCode/util";
import "../style/CalendarEventItem.css";
import AppContext from "../Contexts/AppContex";

class EventItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType =AppContext;
  shouldComponentUpdate(props, state) {
    if (props.ev != this.props.ev) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <li
        className={`event_item type-${this.props.ev.type || "official"} ${
          this.props.ev.holiday ? "holiday-event" : ""
        }`}
        onMouseEnter={() =>
          this.context.onEventHover(this.props.ev.day, this.props.ev.type)
        }
        onMouseLeave={() => this.context.onEventHover(null)}
      >
        <span className="event-day">
          {toPersianNumber(this.props.ev.day)} {this.props.monthName}
        </span>
        <span className="event-title">{this.props.ev.title}</span>
      </li>
    );
  }
}
export default EventItem;
