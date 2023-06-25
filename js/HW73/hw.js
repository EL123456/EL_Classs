(function () {
    'use strict';

    let interval;

    const theButton = document.getElementById('start');
    //maybe change it to getElementById
    const colorTable = document.querySelector('#theTable');

    function getRandomColorPart() {
        return Math.floor(Math.random() * 256);
    }

    function getRandomColor() {
        const r = getRandomColorPart();
        const g = getRandomColorPart();
        const b = getRandomColorPart();

        return `rgb(${r},${g},${b})`;
    }

    function setColors(elem,color,backgroundColor) {
        elem.style.color = color;
        elem.style.backgroundColor = backgroundColor;
    }

    function addColorsToTable(color,backgroundColor) {
        const row = colorTable.insertRow();
        setColors(row,color,backgroundColor);

        row.insertCell().innerText = new Date().toLocaleTimeString();

        const colorCell = row.insertCell();
        const backgroundColorCell = row.insertCell();

        colorCell.innerText = color;
        backgroundColorCell.innerText = backgroundColor;
    }

    theButton.addEventListener('click',() => {
        if(!interval) {
            startColors();
        } else {
            stopColors();
        }
    });

    function startColors() {
        theButton.innerText = 'stop';
        interval = setInterval(() => {
            const color = getRandomColor();
            const backgroundColor = getRandomColor();
            setColors(document.body,color,backgroundColor);
            addColorsToTable(color,backgroundColor);
        },1000);
    }

    function stopColors() {
        theButton.innerText = 'start';
        clearInterval(interval);
        interval = null;
    }

    colorTable.addEventListener('click', handleRowClick);
    function handleRowClick(event) {
        stopColors();
        setColors(document.body, event.target.parentNode.style.color, event.target.parentNode.style.backgroundColor);
    }
}());