(function () {
    'use strict';

    class Student {
        constructor(first,last,age,grade) {
            this.first = first;
            this.last = last;
            this.age = age;
            this.grade = grade;
        }
    }

    const studentArray = [
        new Student('Alice','A',85,0),
        new Student('Boris','B',50,10)
    ];

    function printStudents(backwards ,...theStudents) {
        theStudents.forEach(student => {
            let { first: a, last: b, age, grade} = student;
            if(backwards) {
                [a,b] = [b,a];
            }
            console.log(a,b,age,grade);
        });
    }

    printStudents(false,...studentArray);
    printStudents(true,...studentArray);

    function copyStudent(student) {
        const { first, last, ...theRest} = student;
        console.log(first,last,theRest);
        return {last: first, first: last,...theRest};
    }

    const aCopy = copyStudent(studentArray[0]);
    console.log(aCopy);
}());