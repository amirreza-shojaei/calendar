//import {webheader} from './components/site_header'
import './style.css';
import {
    calendar_events
} from './components/calendar_events';
import {
    calendar_view
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
const ViewElement = new calendar_view(jyear, jmonth, jday);
// create calendar event element
const EventElement = new calendar_events(jmonth);
// link month change event
ViewElement.mainCalendar.addEventListener('monthChange', (e) => {
const newMonth = e.detail.month;
EventElement.reload_Events(newMonth);
});


calendardisplay.appendChild(ViewElement.load_View());
calendardisplay.appendChild(EventElement.load_Events());