import React from "react";

const AppContext =React.createContext({
        year:null,
        month:null,
        day:null,
        currentDate:{},
        onMonthChange:() => {},
        changeBoolian:() => {},
        newEvent:() => {},
        newEventBoolian:() => {},
        onEventHover:() => {},
        newDate:()=>{}
});

export default AppContext;