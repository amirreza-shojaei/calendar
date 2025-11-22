import eventsList from "../data/events.json";
import jMonths from "../data/jalali-months.json";
import {toPersianNumber} from '../util';

//Load Envent Month
export function loadEvents(monthIndex) {
    const datesInformation = document.createElement('div');
    datesInformation.className = 'dates_information';
    datesInformation.id = 'datesInfo';
    
    const datesInfoHeader = document.createElement('header');
    datesInfoHeader.id = 'dates_info_header';

    
    //Control Envents header
    datesInfoHeader.innerHTML = `مناسب های ${jMonths[monthIndex]} ماه`;

    const datesInfoList = document.createElement('ul');
    datesInfoList.id = 'dates_info_list';
    datesInfoList.innerHTML = "";

    const events = eventsList[monthIndex];

    if (!events || events.length === 0) {
        return;
    }

    events.sort((a, b) => a.day - b.day);

    events.forEach(event => {
        const li = document.createElement("li");
        li.className = "event-item";
        li.innerHTML = `
            <span class="event-day">${toPersianNumber(event.day)} ${jMonths[monthIndex]}</span>
            <span class="event-title">${event.title}</span>
        `;
        datesInfoList.appendChild(li);
    });

    datesInformation.append(datesInfoHeader, datesInfoList);

    return datesInformation;
};