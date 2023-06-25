window.app = window.app || {};
window.app.counter1 = (function() {
    'use strict';

    let i = 0;

    return {
        increment: () => ++i,
        getCount: () => i
    };
}());