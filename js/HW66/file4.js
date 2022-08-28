"use: strict";

const upper = ['A', 'B', 'C'];
const lower = ['a', 'b', 'c'];
const mixed = ['A', 'b', 'C', 'd'];

function theEvery(theArray, callback) {
    for (let i = 0; i < theArray.length; i++) {
        if (!callback(theArray[i])) {
            return false;
        }
    }
    return true;
}
function isUpper(char) {
    return char === char.toUpperCase();
}

console.log("upper:", theEvery(upper, isUpper), "upper2:", upper.every(isUpper));
console.log("mixed:", theEvery(mixed, isUpper));
console.log('lower:', theEvery(lower, isUpper));


function theSome(theArray, callback) {
    for (let i = 0; i < theArray.length; i++) {
        if (callback(theArray[i])) {
            return true;
        }
    }
    return false;
}

console.log('upper:', theSome(upper, isUpper));
console.log('mixed:', theSome(mixed, isUpper));
console.log('lower:', theSome(lower, isUpper), 'lower2:', lower.some(isUpper));


function onlyIf(theArray, test, action) {
    theArray.forEach(element => {
        if (test(element)) {
            action(element);
        }
    });
}

console.log('onlyIf1:');
onlyIf(mixed, isUpper, console.log);
console.log('onlyIf2:');
onlyIf(lower, isUpper, console.log);
console.log('onlyIf3:');
onlyIf(upper, isUpper, console.log);


console.log('...');
mixed.filter(isUpper).forEach(elem => console.log(elem));
upper.filter(isUpper).forEach(console.log);


function multiply(a, b) {
    return a * b;
}
console.log('1// 2 * 3 =', multiply(2, 3));

function getMultiplier() {
    return function (a, b) {
        return a * b;
    };
}
console.log('2// 2 * 3 =', getMultiplier()(2, 3));

function theMultiplier(a) {
    return function (b) {
        return a * b;
    };
}
let multiplyBy5 = theMultiplier(5);
theProduct = multiplyBy5(2);
console.log('3// 5 * 2 =', theProduct);

const multiplyBy6 = theMultiplier(6);
theProduct = multiplyBy6(2);
console.log('4// 6 * 2 =', theProduct);

console.log('5// 5 * 2 =', theMultiplier(5)(2));