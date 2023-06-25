(function () {
    let interval;

    const theButton = document.getElementById('start');

    theButton.addEventListener('click', () => {
        if(!interval) {
            startColors();
        } else {
            stopColors();
        }
    });

    let r = -1;
    let g = 0;
    let b = 0;

    const INCREMENT = 50;

    function startColors() {
        theButton.innerText = 'stop';
        interval = setInterval(() => {
            r+=INCREMENT;
            if(r >= 255) {
                r=0;
                g+=INCREMENT;
                if(g >= 255) {
                    g = 0;
                    b+=INCREMENT;
                    if(b >= 255) {
                        b = 0;
                    }
                }
            }

            console.log(`rgb(${r},${g},${b})`);
            document.body.style.color = `rgb(${r},${g},${b})`;
            document.body.style.backgroundColor = `rgb(${b},${g},${r})`;
        },1000)

    }

    function stopColors() {
        theButton.innerText = 'start';
        clearInterval(interval);
        interval = null;
    }
}());