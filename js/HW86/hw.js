(function () {
    'use strict';

    const vehicleFunctions = {
        go: function (speed) {
            this.speed = speed;
            console.log(`the ${this.color} vehicle is now going at ${this.speed}`);
        },
        print: function () {
            console.log(`the ${this.color} vehicle is going at ${this.speed}`);
        }
    };

    function createVehicle(color) {
        const v = {
            color: color,
            speed: 0
        };

        Object.assign(v,vehicleFunctions);
        return v;
    }

    const v1 = createVehicle('red');
    v1.go(100);
    v1.print();

    const planeFunctions = {
        go: function (speed) {
            this.speed = speed;
            console.log(`the ${this.color} plane is now flying at ${this.speed}`);
        }
    };

    function createPlane(color) {
        const p = createVehicle(color);
        Object.assign(p, planeFunctions);
        return p;
    }

    const p = createPlane('white');
    p.go(500);
    p.print()
}());