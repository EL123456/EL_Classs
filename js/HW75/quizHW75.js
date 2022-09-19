window.newThing = window.newThing || {};
window.newThing.match = (function () {
    'use strict';

    function determineGender (elem) {
        if (elem === 1) {
            return "f";
        } else {
            return "m";
        }
    }

    function determinePair (elem,id) {
        
        if (elem === 1) {
            return id - 1;
        } else {
             return id + 1;
        }
    }

    let idNum = 0;

    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 2; j++) { 
            ++idNum;
            const person = {
                id: idNum,
                //is it okay that the names are this way?
                firstName: `firstName${idNum}`,
                lastName: `lastName${idNum}`,
                gender: determineGender(j),
                pair: determinePair(j,idNum)
            };
            console.log(person);
        }
    }
}());

//i finished most of it during class, besides the first and last names, which took 4 minutes to figure out

//i didn't get my mark for the html quiz. do i get it when i complete the javascript quiz, or is it a mistake? 