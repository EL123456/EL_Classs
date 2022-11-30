'use strict';
class Vehicle{
    constructor(color) {
        this.color = color;
    }

    go(speed) {
        this.speed = speed;
        console.log(`now going at speed ${this.speed}`);
    }
    print() {
        console.log(`${this.color} at speed ${this.speed}`);
    }
}

class Plane extends Vehicle {
    constructor(color) {
        super(color);
    }
    go(speed) {
        this.speed = speed;
        console.log(`now flying at speed ${this.speed}`);
    }
}
const car1 = new Vehicle('red');
console.log(car1);
car1.go(35);
car1.print();
const plane1 = new Plane('fire-truck-red');
console.log(plane1);
plane1.go(2000);
plane1.print();

////////////////////////////////

function Vehicle2 (color) {
    this.color = color;
}
Vehicle2.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`now going at speed ${this.speed}`);
}
Vehicle2.prototype.print = function() {
    console.log(`${this.color} at speed ${this.speed}`);
}

function Plane2(color) {
    Vehicle2.call(this,color);
}
Plane2.prototype = new Vehicle2();
Plane2.prototype.go = function(speed) {
    this.speed = speed;
    console.log(`now flying at speed ${this.speed}`);
}
const car2 = new Vehicle2('yellow');
console.log(car2);
car2.go(99);
car2.print();
const plane2 = new Plane2('orange');
console.log(plane2);
plane2.go(340);
plane2.print();