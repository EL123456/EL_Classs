window.app = window.app || {};

window.app.createCounter = (function () {
    let numberOfCounters = 0;

    return function() {
        numberOfCounters++;

        let i = 0;

        return {
            increment: () => ++i,
            getCount: () => i,
            getNumberOfCounters: () => numberOfCounters
        };
    };
}());