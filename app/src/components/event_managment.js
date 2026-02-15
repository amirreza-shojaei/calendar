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
    events;
    filteredEvents;
    month_name;

    // فیلترها
    activeCategories = new Set(["official"]);   // پیش‌فرض فقط رسمی

    constructor(month_index) {
        this.set_Month(month_index);

        this.dates_information = document.createElement('div');
        this.dates_information.className = 'dates_information';

        this.dates_info_header = document.createElement('div');
        this.dates_info_header.id = 'dates_info_header';

        this.dates_info_list = document.createElement('ul');
        this.dates_info_list.id = 'dates_info_list';

        this.filteredEvents = [...this.events];
    }

    set_Month(month_index) {
        this.month_index = month_index;
        this.month_name = jMonths2[month_index];

        const raw = eventsList[month_index] || [];
        this.events = raw.map(ev => ({
            ...ev,
            category: ev.category || "official"   // فعلاً همه رسمی
        }));

        this.filteredEvents = [...this.events];
        this.activeCategories = new Set(["official"]); // پیش‌فرض
    }

    // ====================== فیلترها ======================
    toggleCategory(category) {
        if (this.activeCategories.has(category)) {
            this.activeCategories.delete(category);
        } else {
            this.activeCategories.add(category);
        }
        this._applyFilter();
    }

    _applyFilter() {
        if (this.activeCategories.size === 0) {
            this.filteredEvents = [...this.events];
        } else {
            this.filteredEvents = this.events.filter(ev =>
                this.activeCategories.has(ev.category)
            );
        }
        this._renderEvents();
    }

    // ====================== UI فیلترها (مربعی) ======================
    createFilterButtons() {
        const container = document.createElement('div');
        container.className = 'filter-buttons';
        container.style.cssText = `
            display: flex; 
            gap: 8px; 
            margin-bottom: 18px;
            flex-wrap: wrap;
        `;

        const filters = [
            { name: "official",   label: "رسمی",     color: "#e63946" },
            { name: "work",       label: "محل کار",  color: "#4361ee" },
            { name: "university", label: "دانشگاه",  color: "#2a9d8f" }
        ];

        filters.forEach(f => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = f.label;
            btn.dataset.category = f.name;

            btn.style.cssText = `
                padding: 8px 16px;
                border: 2px solid ${f.color};
                background: ${this.activeCategories.has(f.name) ? f.color : 'transparent'};
                color: ${this.activeCategories.has(f.name) ? 'white' : f.color};
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.25s;
            `;

            btn.addEventListener('click', () => {
                this.toggleCategory(f.name);
                this.createFilterButtons(); // بروزرسانی رنگ دکمه‌ها
            });

            container.appendChild(btn);
        });

        return container;
    }

    // ====================== رندر لیست ======================
    create_Header() {
        this.dates_info_header.innerText = `مناسب های ${this.month_name} ماه`;
    }

    sort_Events() {
        this.filteredEvents.sort((a, b) => a.day - b.day);
    }

    create_Event_item(ev) {
        const li = document.createElement('li');
        li.className = 'event_item';

        if (ev.holiday) li.classList.add('holiday-event');

        // رنگ دسته
        const color = ev.category === "official" ? "#e63946" :
                      ev.category === "work" ? "#4361ee" : "#2a9d8f";

        li.innerHTML = `
            <span class="event-day" style="color:${color}">${toPersianNumber(ev.day)} ${this.month_name}</span>
            <span class="event-title">${ev.title}</span>
        `;

        return li;
    }

    _renderEvents() {
        this.dates_info_list.innerHTML = "";
        this.create_Header();
        this.sort_Events();

        this.filteredEvents.forEach(ev => {
            this.dates_info_list.appendChild(this.create_Event_item(ev));
        });
    }

    // ====================== متدهای قبلی (بدون تغییر) ======================
    listenerHoverEventItems() {
        // کد قبلی‌ات رو اینجا کپی کن (همان قبلی)
        this.dates_info_list.addEventListener('mouseover', (e) => { /* ... */ });
        this.dates_info_list.addEventListener('mouseout', (e) => { /* ... */ });
    }

    load_Events() {
        this.dates_info_list.innerText = "";
        this._renderEvents();
        this.listenerHoverEventItems();

        // اضافه کردن دکمه‌های فیلتر در بالای لیست
        const filters = this.createFilterButtons();
        this.dates_information.append(filters, this.dates_info_header, this.dates_info_list);

        return this.dates_information;
    }

    reload_Events(month_index) {
        this.set_Month(month_index);
        this.load_Events();   // دوباره همه چیز رو می‌سازه
    }
}