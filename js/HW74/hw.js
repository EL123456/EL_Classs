window.app = window.app || {};
window.app.messageBox = (function() {
    'use strict';
    function showMessageBox(msg,callback,buttons = ['ok']) {
        const messageBoxDiv = document.createElement('div');
        messageBoxDiv.className = 'messageBox';

        const span = document.createElement('span');
        span.innerText = msg;
        messageBoxDiv.appendChild(span);

        const buttonsDiv = document.createElement('div');
        buttons.className = 'buttonDiv';
        buttons.forEach(button => {
            const newButton = document.createElement('button');
            newButton.innerText = button;

            newButton.addEventListener('click', () => {
                messageBoxDiv.remove();
                if (callback) {
                    callback(button);
                }
            });
            buttonsDiv.appendChild(newButton);
        });
        
        messageBoxDiv.appendChild(buttonsDiv);
        document.body.appendChild(messageBoxDiv);
    }

    return {
        show: showMessageBox
    };
}());