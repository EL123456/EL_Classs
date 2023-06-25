//just research if i actually used an interface here... and we are done this homework!!

interface UserInfo {
    timesTable : number[]
}

class User implements UserInfo {
    constructor(
        private name : string,
        public timesTable : number[]
    ) {}

    print() {
        document.body.innerHTML = `check the console`
        console.log(this.name, this.timesTable)
    }
}

const user1 = new User('Ella',[]);

function multiply(user : UserInfo, multiplyNumber : number) {
    for (let i = 1; i <= 12; i++) {
        let sum = i * multiplyNumber;
        user.timesTable.push(sum);
    }
}

multiply(user1, 12);
user1.print()