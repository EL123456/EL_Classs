window.app = window.app || {};
window.app.messageBox = (function() {
    'use strict';
    function showMessageBox(msg) {
        const messageBoxDiv = document.createElement('div');
        messageBoxDiv.className = 'messageBox';

        const span = document.createElement('span');
        span.innerText = msg;
        messageBoxDiv.appendChild(span);

        const buttons = document.createElement('div');
        buttons.className = 'buttonDiv';

        const okButton = document.createElement('button');
        okButton.innerText = 'ok';

        okButton.addEventListener('click', () => {
            messageBoxDiv.remove();
        });

        buttons.appendChild(okButton);
        messageBoxDiv.appendChild(buttons);
        document.body.appendChild(messageBoxDiv);
    }

    return {
        show: showMessageBox
    };
}());