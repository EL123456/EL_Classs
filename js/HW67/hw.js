"use: strict";

const du = function dayUtils() {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    function getDay(index) {
        return days[index - 1];
    }
    function getDayIndex(day) {
        const d = day.toLowerCase();
        return days.findIndex(e => e.toLowerCase() === d) + 1;
    }
    return {
        getDay: getDay,
        getDayIndex: getDayIndex
    };
}();

console.log(du.getDay(2));
console.log(du.getDayIndex('monday'));



const c = function interestCalculator() {
    let rate;
    let years;

    function setRate(r) {
        rate = r;
    }

    function setYears(y) {
        years = y;
    }

    function calculateInterest(principle) {
        let p = principle;
        for (let i = 0; i < years; i++) {
            p += p * rate;
        }
        return p - principle;
    }
    return {
        setRate: setRate,
        setYears: setYears,
        calculateInterest: calculateInterest
    };
}();

c.setRate(0.1);
c.setYears(2);
console.log(c.calculateInterest(100));