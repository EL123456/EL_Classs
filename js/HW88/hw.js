(function () {
    'use strict';

    class Person {
        constructor(first, last, age) {
            this.first = first;
            this.last = last;
            this.age = age;
        }

        get age() {
            return this._age;
        }

        set age(age) {
            age = +age;
            if(isNaN(age) || age<0 || age>120) {
                throw new Error('age must be a number between 0 and 120');
            }
            this._age = age;
        }

        toString() {
            let retVal = '';
            for (let prop in this) {
                if(this.hasOwnProperty(prop)) {
                    retVal += `${prop}: ${this[prop]}, `;
                }
            }
            return retVal;
        }
    }

    class Student extends Person {
        constructor(first,last,age,grade) {
            super(first,last,age);
            this.grade = grade;
        }
    }

    const p = new Person('Alice','In Wonderland', 1);
    console.log(p.toString())
    p.age = 89;
    console.log(p);

    const s = new Student('Abcd','Efgh',110,2);
    console.log(s.toString());
}());