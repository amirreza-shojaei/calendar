import React, { useState } from "react";
import { nameOfJalaliMonth } from "../../../libs/jalali/src";
import eventsList from "../data/events.json";
import { toPersianNumber } from "../components/util";

class CalendarEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeFilters: ["official"], monthIndex: props.MonthIndex };
  }
  getMonthName() {
    return nameOfJalaliMonth(this.state.monthIndex + 1);
  }
  getEvents() {
    return eventsList[this.state.monthIndex] || [];
  }
  getSortedEvents() {
    return [...this.getEvents()].sort((a, b) => a.day - b.day);
  }
  toggleFilter(filterId) {
    this.setState((prev) => {
      if (prev.activeFilters.includes(filterId)) {
        return {
          activeFilters: prev.activeFilters.filter((f) => f !== filterId),
        };
      } else {
        return {
          activeFilters: [...prev.activeFilters, filterId],
        };
      }
    });
  }

  getFilteredEvents() {
    return this.getSortedEvents().filter((ev) => {
      const type = ev.type || "official";
      return this.state.activeFilters.includes(type);
    });
  }

  render() {
    const monthName = this.getMonthName();
    const filteredEvents = this.getFilteredEvents();
    const filters = [
      { id: "official", name: "رسمی" },
      { id: "work", name: "محل کار" },
      { id: "university", name: "دانشگاه" },
    ];

    return (
      <div className="dates_information">
        <div className="filter_container">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${filter.id} ${
                this.state.activeFilters.includes(filter.id) ? "active" : ""
              }`}
              onClick={() => this.toggleFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div id="dates_info_header">مناسبت های {monthName} ماه</div>

        <ul id="dates_info_list">
          {filteredEvents.map((ev, index) => (
            <li
              key={index}
              className={`event_item type-${ev.type || "official"} ${
                ev.holiday ? "holiday-event" : ""
              }`}
            >
              <span className="event-day">
                {ev.day} {monthName}
              </span>
              <span className="event-title">{ev.title}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default CalendarEvent;
