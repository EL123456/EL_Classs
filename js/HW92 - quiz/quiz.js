(async function() {
    'use strict';
    const theAccordion = $('#accordion');
    class Item {
        constructor(name,quantity,price) {
            this.item = name;
            this.quantity = quantity;
            if(this.quantity === 1) {
                this.total = price;
            } else {
                this.total = (price/quantity);
            }
        }
    }
    class Order{
        constructor(name,address,items = []) {
            this.customer = name;
            this.address = address;
            this.items = items;
        }
        get total(){
            let theTotal = 0;
            this.items.forEach(item => {
                theTotal += (item.total * item.quantity);
            });
            return theTotal;
        }
    }

    async function fetchJson() {
        try {
            const response = await fetch(`quiz.json`);
            if (!response.ok) {
                throw new Error (`${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch(e) {
            console.error(e);
        }
    }

    const data = await fetchJson();
    console.log(data);
    const obj = data;
    function createClasses(data){
        data.forEach(order => {
            order.items.forEach(item => {
                order.items.splice(order.items.indexOf(item,0),1,new Item(item.item,item.quantity,item.total));
            });
            data.splice(data.indexOf(order),1,new Order(order.customer, order.address,order.items));
        });
        for (let i = 0; i < data.length; i++) {
            $(
                `<h2 class="selector">${data[i].customer}</h2>
                 <div id="content${[i]}">
                    <h4>Customer: ${data[i].customer}</h4>
                    <h4>Address: ${data[i].address}</h4>
                    <h4>Total: $${data[i].total.toFixed(2)}</h4>
                    <br>
                    <h4 >Items:</h4>
                 </div>`
            ).appendTo(theAccordion);//total = Order.total
            for (let z = 0; z < data[i].items.length; z++) {
                $(
                    `<h5>item: ${data[i].items[z].item}</h5>
                     <h5>quantity: ${data[i].items[z].quantity}</h5>
                     <h5>price: $${data[i].items[z].total.toFixed(2)}</h5>
                     <br>`
                ).appendTo($(`#content${[i]}`));//total = price
            }
        }
        return data;
    }
    const allTheClasses = createClasses(data);
    console.log(allTheClasses);
    $( function() {
        theAccordion.accordion({
            collapsible: true,
            active: false,
            autoheight: false,
            alwaysOpen: false
        }).show();
    });
}());