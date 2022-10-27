(function(){
    'use strict';

    const nameInput = $("#name");
    const addressInput = $("#address");

    const nameResult = $('#nameResult');
    const addressResult = $('#addressResult');

    $('#theForm').submit(e => {
        e.preventDefault();
        console.log(`${nameInput.val()} ${addressInput.val()}`);
        nameResult.text(nameInput.val());
        addressResult.text(addressInput.val());
    });
    const theButton = $('#theForm button');
    const theCheckbox = $('#check');
    theCheckbox.change(() => {
        theButton.prop('disabled', !theCheckbox.prop('checked'));
    });
}());
