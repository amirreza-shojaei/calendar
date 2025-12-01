//import {webheader} from './components/site_header'
import './style.css';
import {
    Event
} from './components/calendar_events';
import {
    View
} from './components/calendar_view'
/*
const siteheader = webheader();
document.body.prepend(siteheader.header);
siteheader.startClock();
*/

const body = document.body;
const calendardisplay = document.createElement('div');
calendardisplay.className = 'calendardisplay';
body.appendChild(calendardisplay);

// get today in jalali
const formatter = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
});
const parts = formatter.formatToParts(new Date());
let jyear = +parts.find(p => p.type === 'year').value;
let jmonth = +parts.find(p => p.type === 'month').value - 1;
let jday = +parts.find(p => p.type === 'day').value;

//create calendar view element
const ViewElement = new View(jyear, jmonth, jday);
// create calendar event element
const EventElement = new Event(jmonth);


// button controller
ViewElement.buttoncontrols(
    //prev button
    function () {
        jmonth--;
        if (jmonth < 0) {
            jmonth = 11;
            jyear--;
        }
        ViewElement.reloadview(jyear, jmonth, jday);
        EventElement.reloadEvents(jmonth);

    },
    //next button
    function () {
        jmonth++;
        if (jmonth > 11) {
            jmonth = 0;
            jyear++;
        }
        ViewElement.reloadview(jyear, jmonth, jday);
        EventElement.reloadEvents(jmonth);

    });

calendardisplay.appendChild(ViewElement.loaderview());
calendardisplay.appendChild(EventElement.loaderevents());