import eventsList from '../data/events.json';
import jMonths2 from '../data/jalali-months.json';
import {
    toPersianNumber,
    persianToEnglishNumber
} from './util';

export class calendar_events {
    month_index;
    dates_information;
    dates_info_header;
    dates_info_list;
    filter_container; // 1. اضافه کردن کانتینر فیلترها
    events;
    month_name;
    activeFilters; // 2. متغیری برای ذخیره فیلترهای انتخاب شده

    constructor(month_index) {
        this.set_Month(month_index);

        // تنظیم پیش‌فرض: فقط رسمی‌ها نمایش داده شوند
        this.activeFilters = new Set(['official']); 

        // root element
        this.dates_information = document.createElement('div');
        this.dates_information.className = 'dates_information';

        // 3. ساخت بخش فیلترها
        this.filter_container = document.createElement('div');
        this.filter_container.className = 'filter_container';
        this.create_Filters(); // فراخوانی تابع ساخت دکمه‌ها

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

    // 4. تابع جدید برای ساخت دکمه‌های فیلتر
    create_Filters() {
        const filters = [
            { id: 'official', name: 'رسمی' },
            { id: 'work', name: 'محل کار' },
            { id: 'university', name: 'دانشگاه' }
        ];

        this.filter_container.innerText = '';
        this.filter_container.className = 'filter_container';

        filters.forEach(f => {
            const btn = document.createElement('button');
            btn.innerText = f.name;
            // اضافه کردن کلاس پایه و کلاس اختصاصی رنگ
            btn.className = `filter-btn ${f.id}`;
            
            // اگر فیلتر فعال بود، کلاس active را اضافه کن
            if (this.activeFilters.has(f.id)) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                if (this.activeFilters.has(f.id)) {
                    this.activeFilters.delete(f.id);
                } else {
                    this.activeFilters.add(f.id);
                }
                this.create_Filters(); 
                this.load_Events();
            });

            this.filter_container.appendChild(btn);
        });
    }

    create_Header() {
        this.dates_info_header.innerText = `مناسب های ${this.month_name} ماه`;
    }

    sort_Events() {
        this.events.sort((a, b) => a.day - b.day);
    }

    listenerHoverEventItems() {
        // ... (بدون تغییر) ...
        this.dates_info_list.addEventListener('mouseover', (e) => {
            const item = e.target.closest('.event_item');
            if (!item) return;
            const detail = {
                day: persianToEnglishNumber(
                    item.querySelector('.event-day').innerText.split(' ')[0]
                )
            };
            this.dates_information.dispatchEvent(
                new CustomEvent('mouseon', { detail })
            );
        });

        this.dates_info_list.addEventListener('mouseout', (e) => {
            const item = e.target.closest('.event_item');
            if (!item) return;
            this.dates_information.dispatchEvent(
                new CustomEvent('mouseout', { detail: null })
            );
        });
    }

    create_Event_item(ev) {
        const li = document.createElement('li');
        const type = ev.type || 'official'; 
        
        // اضافه کردن کلاس‌ها برای CSS
        li.className = `event_item type-${type}`;
        
        const daysInMonth = ev.day;
        li.innerHTML = `
            <span class="event-day">${toPersianNumber(daysInMonth)} ${this.month_name}</span>
            <span class="event-title">${ev.title}</span>
        `;

        if (ev.holiday === true) {
            li.classList.add('holiday-event');
        }
        return li;
    }

    append_Events() {
        this.dates_info_list.innerText = ""; // پاک کردن لیست قبل از رندر مجدد

        // 5. فیلتر کردن ایونت‌ها قبل از نمایش
        const filteredEvents = this.events.filter(ev => {
            // اگر در جیسون type نداری، پیش‌فرض را official می‌گیریم که پروژت خراب نشه
            const eventType = ev.type || 'official';
            return this.activeFilters.has(eventType);
        });

        filteredEvents.forEach(ev => {
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

        // پاکسازی و چیدمان: اول فیلتر، بعد هدر، بعد لیست رویدادها
        this.dates_information.innerText = "";
        this.dates_information.append(this.filter_container, this.dates_info_header, this.dates_info_list);

        this.listenerHoverEventItems();
        return this.dates_information;
    }
}
