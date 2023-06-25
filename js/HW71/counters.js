(function () {
    'use strict';

    const counterA = window.app.createCounter();
    const CounterB = window.app.createCounter();

    for (let i = 0; i < 10; i++) {
        window.app.counter1.increment();
    }

    for(let i = 0; i < 5; i++) {
        counterA.increment();
    }

    for (let i = 0; i < 15; i++) {
        CounterB.increment();
    }
    console.log(window.app.counter1.getCount(), counterA.getCount(), CounterB.getCount());
}());