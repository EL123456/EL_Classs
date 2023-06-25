//just research if i actually used an interface here... and we are done this homework!!
var User = /** @class */ (function () {
    function User(name, timesTable) {
        this.name = name;
        this.timesTable = timesTable;
    }
    User.prototype.print = function () {
        document.body.innerHTML = "check the console";
        console.log(this.name, this.timesTable);
    };
    return User;
}());
var user1 = new User('Ella', []);
function multiply(user, multiplyNumber) {
    for (var i = 1; i <= 12; i++) {
        var sum = i * multiplyNumber;
        user.timesTable.push(sum);
    }
}
multiply(user1, 12);
user1.print();
