import './style.css';
import {
    createCalendarView
} from './componentss/calendar_view';
import {
    createCalendarButtons
} from './componentss/calendar_buttons';
import {
    loadEvents
} from './componentss/calendar_events';
import {webheader} from './componentss/site_header'

const body = document.body;
const calendardisplay = document.createElement('div');
calendardisplay.className = 'calendardisplay';
body.appendChild(calendardisplay);

const siteheader = webheader();
document.body.prepend(siteheader.header);
siteheader.startClock();


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

//append components to load the calendar 
function render() {
    calendardisplay.innerHTML = '';

    // create view
    const view = createCalendarView(jyear, jmonth, jday);

    // create buttons wired to handlers
    const buttons = createCalendarButtons(() => {
        // prev
        jmonth--;
        if (jmonth < 0) {
            jmonth = 11;
            jyear--;
        }
        view.renderMonth(jyear, jmonth, jday);
        // update events
        calendardisplay.lastChild && calendardisplay.removeChild(calendardisplay.lastChild);
        calendardisplay.appendChild(loadEvents(jmonth));
    }, () => {
        // next
        jmonth++;
        if (jmonth > 11) {
            jmonth = 0;
            jyear++;
        }
        view.renderMonth(jyear, jmonth, jday);
        // update events
        calendardisplay.lastChild && calendardisplay.removeChild(calendardisplay.lastChild);
        calendardisplay.appendChild(loadEvents(jmonth));
    });


    // replace view's buttons with those created by createCalendarButtons 
    const header = view.main.querySelector('.calendar_header');
    header.replaceChild(buttons.prevBtn, header.querySelector('#prev_button'));
    header.replaceChild(buttons.nextBtn, header.querySelector('#next_button'));


    // initial render
    view.renderMonth(jyear, jmonth, jday);


    // append calendar and events
    calendardisplay.appendChild(view.main);
    calendardisplay.appendChild(loadEvents(jmonth));
}


render();