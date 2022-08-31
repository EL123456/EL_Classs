'use strict';
(function () {
    function createAccount(openingBalance) {
        return {
            balance: openingBalance,
            //            performTransaction: function(amount) {
            //                this.balance += amount;}
        };
    }

    function performTransaction(amount) {
        this.balance += amount;
    }
    const account1 = createAccount(1000);
    const account2 = createAccount(2000);

    //    account1.performTransaction(100);
    //    account1.performTransaction(-10);

    performTransaction.call(account1, 100);
    performTransaction.call(account1, -10);
    performTransaction.apply(account2, [200]);
    performTransaction.call(account2, -20);

    const depositIntoAccount = performTransaction.bind(account1, 50);
    depositIntoAccount();

    console.log(account1, account2);
}());