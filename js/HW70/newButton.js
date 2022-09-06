(function () {
    'use strict';

    let buttonCount = 1;

    const clickHandler = () => {
        const newButton = document.createElement('button');
        newButton.innerText = `${++buttonCount}`;
        newButton.addEventListener('click',clickHandler);
        document.body.appendChild(newButton);
    };

    document.querySelector('#one').addEventListener('click',clickHandler);
})();