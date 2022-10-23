(function ShowTime(){
    document.body.style.backgroundColor = 'black';
    const theClock = document.createElement('div');
    theClock.id = 'clock';
    
    //have css for the clock
    theClock.style.position = 'absolute';
    theClock.style.top = '50%';
    theClock.style.left = '50%';
    theClock.style.transform = 'translateX(-50%) translateY(-50%)';
    theClock.style.color = '#17D4FE';
    theClock.style.fontSize = '60px';
    theClock.style.fontFamily = 'Orbitron';
    theClock.style.letterSpacing = '7px';
    document.body.appendChild(theClock);

    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let session = "AM";

    //have the numbers reset at the end of s,m,h
    if(h == 0){
        h = 12;
    }

    if(h > 12) {
        h = h - 12;
        session = "PM";
    }
    h = (h < 10) ? "0"+h: h;
    m = (m < 10) ? "0"+m: m;
    s = (s < 10) ? "0"+s: s;

    //have the time displayed
    let time = h + ':' + m + ':' + s + ' ' + session;

    document.getElementById('clock').innerText = time;

    //add a set interval for the time to go by seconds
    setTimeout(ShowTime,1000);   
}());


