"use: strict";

let a = '5';
const b = 5;

console.log(a === b);
console.log(a !== b);

function ifNaN(a) {
    if(isNaN(a)) {
        return "This is NaN";
    } else {
        return "This is not NaN";
    }
}
console.log(ifNaN(b * 5));
console.log(ifNaN(b * "four"));