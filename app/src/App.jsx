import React from "react";
import ".//style/App.css";
//import components
import CalendarView from "./components/CalendarView";
import CalendarEvent from "./components/CalendarEvent";
import ChangeDate from ".//components/CalendarChangeDate";
import EventRegistration from "./components/NewEventRegistration";
//import Contexts
import AppContext from "./Contexts/AppContex";


class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.currentDate = {
      year: this.caculateDate().jyear,
      month: this.caculateDate().jmonth,
      day: this.caculateDate().jday,
    };
  }

  caculateDate() {
    const formatter = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const parts = formatter.formatToParts(new Date());
    const jyear = +parts.find((p) => p.type === "year").value;
    const jmonth = +parts.find((p) => p.type === "month").value - 1;
    const jday = +parts.find((p) => p.type === "day").value;
    return { jyear, jmonth, jday };
  }

  state = {
    jyear: this.caculateDate().jyear,
    jmonth: this.caculateDate().jmonth,
    jday: this.caculateDate().jday,
    hoveredDate: null,
    type: null,
    changeDate: false,
    newEvents: [],
    newEventBoolianPage: false,
  };

  handelMonthchange = ({ year, month, day }) => {
    this.setState(() => ({
      jyear: year,
      jmonth: month,
      jday: day,
    }));
  };
  handelEventHover = (day, type) => {
    this.setState({ hoveredDate: day, type: type });
  };
  eventHandler = (e) => {
    if (e.day != null) {
      this.setState((prevState) => ({ newEvents: [...prevState.newEvents, e] }));
    }
  };
  handlerEventBoolian = (e)=> {
    this.setState({ newEventBoolianPage: e })
  };
  handlerChangeBoolian =(e) =>{
    this.setState({ changeDate: e })
  }
  handlerNewDate = (date, ev) =>
              this.setState({
                jyear: date.newSetYear,
                jmonth: date.newSetMonth,
                changeDate: ev,
              });

  render() {
    const { jyear, jmonth, jday } = this.state;
    const currentDate = this.currentDate;
    console.log("App");
    return (
      <AppContext.Provider  value={{
        year:this.state.jyear,
        month:this.state.jmonth,
        day:this.state.jday,
        currentDate:this.currentDate,
        onMonthChange:this.handelMonthchange,
        changeBoolian:this.handlerChangeBoolian,
        newEvent:this.eventHandler,
        newEventBoolian:this.handlerEventBoolian,
        onEventHover:this.handelEventHover,
        newDate:this.handlerNewDate
        }}>

        <div className="calendardisplay">
        {this.state.changeDate ? (
          <ChangeDate
            year={jyear}
            month={jmonth}
          />
        ) : (
          <CalendarView
            year={jyear}
            month={jmonth}
            day={jday}
            currentDate={currentDate}
            highlightedDate={[this.state.hoveredDate, this.state.type]}
          />
        )}
        {this.state.newEventBoolianPage ? (
          <EventRegistration />
        ) : (
          <CalendarEvent
            year={jyear}
            month={jmonth}
            newEventFromInput ={this.state.newEvents}
          />
        )}
      </div>

      </AppContext.Provider>
    );
  }
}

export default App;