// creates buttons and wires handlers passed from caller
export function createCalendarButtons(onPrev, onNext) {
//prev
const prevBtn = document.createElement('button');
prevBtn.id = 'prev_button';
prevBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
//next
const nextBtn = document.createElement('button');
nextBtn.id = 'next_button';
nextBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

prevBtn.addEventListener('click', onPrev);
nextBtn.addEventListener('click', onNext);

//return buttons
return { prevBtn, nextBtn };
}