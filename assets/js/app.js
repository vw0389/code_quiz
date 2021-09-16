// Timer functionality
function countdown(seconds) {
    function tick(wrongQuestion) {
        var time = document.getElementById("time");
        if (wrongQuestion === true) {
            if (seconds <= 5) {
                seconds = 0;
            } else {
                seconds = seconds - 5;
            }
        } else {
            seconds--;
        }
        
        time.innerHTML = (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        }
    }
    tick(false);
}
