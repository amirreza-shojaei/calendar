import './style.css';
import {
    createCalendarView
} from './components/calendar_view';

import {
    loadEvents
} from './components/calendar_events';
//import {webheader} from './components/site_header'

const body = document.body;
const calendardisplay = document.createElement('div');
calendardisplay.className = 'calendardisplay';
body.appendChild(calendardisplay);
/*
const siteheader = webheader();
document.body.prepend(siteheader.header);
siteheader.startClock();
*/

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


//reload calendar function
function reloadCalendar() {

    calendardisplay.innerHTML = '';

    const calendarview = createCalendarView(jyear, jmonth, jday);
    calendardisplay.appendChild(calendarview.main);
    const calendarevent = loadEvents(jmonth);
    calendardisplay.appendChild(calendarevent);

    calendarview.main.addEventListener('change', () => {
        calendardisplay.removeChild(calendarview.main);
        calendardisplay.removeChild(calendarevent);
        calendardisplay.appendChild(createCalendarView(jyear, jmonth, jday).main);
        calendardisplay.appendChild(loadEvents(jmonth));
    });
    
    calendarview.prevBtn.addEventListener('click', () => {
        jmonth--;
        if (jmonth < 0) {
            jmonth = 11;
            jyear--;
        }
        calendarview.main.dispatchEvent(new Event('change'));
        reloadCalendar();
    });

    calendarview.nextBtn.addEventListener('click', () => {
        jmonth++;
        if (jmonth > 11) {
            jmonth = 0;
            jyear++;
        }
        calendarview.main.dispatchEvent(new Event('change'));
        reloadCalendar();
    });

}
reloadCalendar();
