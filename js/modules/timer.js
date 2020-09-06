function timer(){
    
    const deadline = '2020-08-23';

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t/(1000 * 60 * 60 * 24)),
            hours = Math.floor((t/(1000 * 60 * 60) % 24)),
            minutes = Math.floor((t/(1000 * 60) % 60)),
            seconds = Math.floor((t/1000) % 60);

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function addZerotoTimer(num){
        if(num > 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime){
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerId = setInterval(updateClock, 1000);
        
        updateClock();
        
        function updateClock(){
            let time = getTimeRemaining(endtime);
            days.textContent = addZerotoTimer(time.days);
            hours.textContent = addZerotoTimer(time.hours);
            minutes.textContent = addZerotoTimer(time.minutes);
            seconds.textContent = addZerotoTimer(time.seconds);
            if(time.total <= 0){
                clearInterval(timerId);
            }
        }
    }

    setClock('.timer', deadline);
}

export default timer;