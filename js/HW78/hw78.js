(function () {
    'use strict';
    
    const name = $('#fileName');
    const spinner = $('img');
    $('#loadFile').click( () => {
        spinner.show();
        fetch(name.val())
            .then(response => {
                if(! response.ok) {
                    throw new Error (`${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(text => $('#output').text(text))
            .catch(e => app.messageBox.show(e.message))
            .finally(() => spinner.hide());
                
    });
}());