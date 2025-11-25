// create and handel events 
import eventsList from '../data/events.json';
import jMonths2 from '../data/jalali-months.json';
import { toPersianNumber as toPersian } from './util';


export function loadEvents(monthIndex) {
const datesInformation = document.createElement('div');
datesInformation.className = 'dates_information';
datesInformation.id = 'datesInfo';


const datesInfoHeader = document.createElement('div');
datesInfoHeader.id = 'dates_info_header';
datesInfoHeader.innerText = `مناسب های ${jMonths2[monthIndex]} ماه`;


const datesInfoList = document.createElement('ul');
datesInfoList.id = 'dates_info_list';


const events = eventsList[monthIndex];
if (!events || events.length === 0) return datesInformation;


events.sort((a, b) => a.day - b.day);
events.forEach(ev => {
const li = document.createElement('li');
li.className = 'event-item';
li.innerHTML = `
<span class="event-day">${toPersian(ev.day)} ${jMonths2[monthIndex]}</span>
<span class="event-title">${ev.title}</span>
`;
datesInfoList.appendChild(li);
});


datesInformation.append(datesInfoHeader, datesInfoList);
return datesInformation;
}