import eventsList from '../data/events.json';
import jMonths2 from '../data/jalali-months.json';
import {
    toPersianNumber as toPersian
} from './util';

export class calendar_events {
    month_index;
    dates_information;
    dates_info_header;
    dates_info_list;
    events;
    month_name;
    events_holiday_list;
    constructor(month_index) {
        this.set_Month(month_index);
        // root element
        this.dates_information = document.createElement('div');
        this.dates_information.className = 'dates_information';
        // header
        this.dates_info_header = document.createElement('div');
        this.dates_info_header.id = 'dates_info_header';
        // list
        this.dates_info_list = document.createElement('ul');
        this.dates_info_list.id = 'dates_info_list';
    }
    set_Month(month_index) {
        this.month_index = month_index;
        this.month_name = jMonths2[month_index];
        this.events = eventsList[month_index] || [];
    }
    create_Header() {
        this.dates_info_header.innerText = `مناسب های ${this.month_name} ماه`;
    }
    sort_Events() {
        this.events.sort((a, b) => a.day - b.day);
    
    }
    create_Event_item(ev) {
        const li = document.createElement('li');
        li.className = 'event-item';
        li.innerHTML = `
            <span class="event-day">${toPersian(ev.day)} ${this.month_name}</span>
            <span class="event-title">${ev.title}</span>
        `;
        if (ev.holiday===true) {
            li.classList.add('holiday-event');
        }
        return li;
    }
    append_Events() {
        this.events.forEach(ev => {
            const li = this.create_Event_item(ev);
            this.dates_info_list.appendChild(li);
        });
    }
    reload_Events(month_index) {
        this.set_Month(month_index);
        this.load_Events();
    }
    load_Events() {
        this.dates_info_list.innerText = "";

        this.create_Header();
        this.sort_Events();
        this.append_Events();
        this.dates_information.append(this.dates_info_header, this.dates_info_list);

        return this.dates_information;
    }
}