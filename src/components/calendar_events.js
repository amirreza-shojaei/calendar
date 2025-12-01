import eventsList from '../data/events.json';
import jMonths2 from '../data/jalali-months.json';
import {
    toPersianNumber as toPersian
} from './util';

export class Event {
    monthindex;
    datesInformation;
    datesInfoHeader;
    datesInfoList;
    events;
    monthname;
    constructor(monthindex) {
        this.setMonth(monthindex);
        // root element
        this.datesInformation = document.createElement('div');
        this.datesInformation.className = 'dates_information';
        // header
        this.datesInfoHeader = document.createElement('div');
        this.datesInfoHeader.id = 'dates_info_header';
        // list
        this.datesInfoList = document.createElement('ul');
        this.datesInfoList.id = 'dates_info_list';
    }
    setMonth(monthIndex) {
        this.monthindex = monthIndex;
        this.monthname = jMonths2[monthIndex];
        this.events = eventsList[monthIndex] || [];
    }
    createHeader() {
        this.datesInfoHeader.innerText = `مناسب های ${this.monthname} ماه`;
    }
    sortEvents() {
        this.events.sort((a, b) => a.day - b.day);
    }
    createEventItem(ev) {
        const li = document.createElement('li');
        li.className = 'event-item';
        li.innerHTML = `
            <span class="event-day">${toPersian(ev.day)} ${this.monthname}</span>
            <span class="event-title">${ev.title}</span>
        `;
        return li;
    }
    appendEvents() {
        this.events.forEach(ev => {
            const li = this.createEventItem(ev);
            this.datesInfoList.appendChild(li);
        });
    }
    reloadEvents(monthIndex) {
        this.setMonth(monthIndex);
        this.loaderevents();
    }
    loaderevents() {
        this.datesInfoList.innerText = "";

        this.createHeader();
        this.sortEvents();
        this.appendEvents();
        this.datesInformation.append(this.datesInfoHeader, this.datesInfoList);

        return this.datesInformation;
    }
}