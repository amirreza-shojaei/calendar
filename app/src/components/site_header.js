//site header   
export function webheader() {
    //header element
    const header = document.createElement('header');
    header.className = 'web_header';
    //clock element
    const clock = document.createElement('div');
    clock.className = 'clock';

    header.appendChild(clock);
    //load clock
    function startClock() {
        function tick() {
            const now = new Date();
            const h = now.getHours().toString().padStart(2, "0");
            const m = now.getMinutes().toString().padStart(2, "0");
            const s = now.getSeconds().toString().padStart(2, "0");
            clock.innerText = `${h}:${m}:${s}`;
        }
        tick();
        setInterval(tick, 1000);
    };

    return {
        header,
        startClock
    };


}