window.myApp = window.myApp || {};

window.myApp.utils = (function dayutils(myModule) {
    'use strict';

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    myModule.getDay = function getDay(index) {
        return days[index - 1];
    };
    myModule.getDayIndex = function getDayIndex(day) {
        const d = day.toLowerCase();
        return days.findIndex(e => e.toLowerCase() === d) + 1;
    };
    return myModule;
}(window.myApp.utils || {}));

console.log(window.myApp.utils.getDay(2));
console.log(window.myApp.utils.getDayIndex('monday'));
