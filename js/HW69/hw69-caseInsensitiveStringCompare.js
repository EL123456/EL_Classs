window.myApp = window.myApp || {};

window.myApp.utils = (function (myModule,theAlert) {
    'use strict';

    myModule.caseInsensitiveCompare = function (a,b) {
        return a.toLowerCase() === b.toLowerCase();
    };

    myModule.show = msg => theAlert(msg);

    return myModule;
}(window.myApp.utils || {}, msg => console.log(msg)));

console.log(window.myApp.utils.caseInsensitiveCompare("EVERY","every"));
console.log(window.myApp.utils.caseInsensitiveCompare("Everyone","EVERY"));