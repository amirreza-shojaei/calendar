import React ,{PureComponent} from "react";
import { nameOfJalaliMonth } from "jalali-lib";
import eventsList from "../data/events.json";
import EventItem from "./CalendarEventItem";
import "../style/CalendarEvent.css";
import AppContext from "../Contexts/AppContex";

class CalendarEvent extends PureComponent {
  constructor(props) {
    super(props);
    
  };
  static contextType =AppContext;
  state = { activeFilters: ["official"],eventsFromInput:this.props.newEventFromInput };

  getMonthName() {
    return nameOfJalaliMonth(this.props.month + 1);
  }
  getEvents() {
    let eventsDefualt =[];
    let eventsInput =[];
    eventsList.forEach(element => {
      if(element.year ==this.props.year && element.month ==this.props.month){
        eventsDefualt.push(element);
      }
    });
    this.state.eventsFromInput.forEach(element => {
      if(element.year ==this.props.year && element.month ==this.props.month){
        eventsInput.push(element);
      }
    });
        return [...eventsDefualt,...eventsInput];
  }
  getSortedEvents() {
    return [ ...this.getEvents()].sort((a, b) => a.day - b.day);
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
      const type = ev.type  || "official";
      return this.state.activeFilters.includes(type);
    });
  };



  render() {
    const filteredEvents =this.getFilteredEvents();
    const monthName = this.getMonthName();

    const filters = [
      { id: "official", name: "رسمی" },
      { id: "work", name: "محل کار" },
      { id: "university", name: "دانشگاه" },
      {id :"personal" ,name:"شخصی"}
    ];
    return (
    <>
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

        <div className="dates_info_header">مناسبت های {monthName} ماه</div>

        <ul className="dates_info_list">
          {filteredEvents.map((ev, index) => (
            <EventItem
              key={index}
              ev={ev}
              monthName={monthName}
            />
          ))}
        </ul>
        <button onClick={()=>this.context.newEventBoolian(true) } className="newevent-button"><i className=" fa-solid fa-plus "></i></button>
      </div>
      </>
    );
  }
}
export default CalendarEvent;


