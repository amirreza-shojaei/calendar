import "./style.css";
import {
    loadEvents
} from './components/calendar-event';
import {
    calendarloader
} from './components/calendar-dates';


const body = document.body;
const media = document.createElement('div');
media.className = 'media';
body.appendChild(media);

//Find jalali date
const formatter = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
});
const parts = formatter.formatToParts(new Date());
let jy = +parts.find(p => p.type === "year").value;
let jm = +parts.find(p => p.type === "month").value - 1;
let jd = +parts.find(p => p.type === "day").value;

const cal = calendarloader(jy, jm, jd);
media.append(cal.mainCalender, loadEvents(jm));

//Change Month event
cal.calenderBody.addEventListener("change", () => {
    media.childNodes[1].remove();
    media.appendChild(loadEvents(jm));
});

//Next button
cal.nextBtn.addEventListener("click", () => {
    jm++;
    if (jm > 11) {
        jm = 0;
        jy++;
    }

    cal.reload(jy, jm, jd);
    cal.calenderBody.dispatchEvent(new Event("change"));
});

//Prev button
cal.prevBtn.addEventListener("click", () => {
    jm--;
    if (jm < 0) {
        jm = 11;
        jy--;
    }

    cal.reload(jy, jm, jd);
    cal.calenderBody.dispatchEvent(new Event("change"));
});