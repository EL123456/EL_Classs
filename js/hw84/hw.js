//load the parts - draggable
//load the body - not draggable
//create something to make it look nice
(function () {
    'use strict';

    let dragging = false;
    let offset;
    let thePosition = [];
    let nextZIndex = 1;
    $(document).on('mousedown','.parts img', e => {
        console.log('mouse down',e);
        dragging = $(e.target);
        offset = {y: e.offsetY, x: e.offsetX, };
    }).mousemove(e => {
        e.preventDefault();
        if(dragging) {
            console.log('mouse move', e);
            dragging.css({top: e.pageY - offset.y, left: e.pageX - offset.x});
            dragging.css({zIndex : nextZIndex++});
        }
    }).mouseup(e => {
        console.log('mouse up', e);
        dragging = false;
    });
    //i am struggling a bit with the local storage - i could not figure out how to save the positions
}());