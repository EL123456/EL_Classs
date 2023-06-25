import './App.css';
import { Component} from 'react'
import OrderComponent from './OrderComponent'

class Item {
  constructor(item, quantity, total) {
    this.name = item;
    this.quantity = quantity;
    if (this.quantity === 1) {
      this.price = total;
    } else {
      this.price = (total / quantity);
    }
  }
}

class Order {
  constructor(customer, address, items = []) {
    this.customer = customer;
    this.address = address;
    this.items = items;
  }
  get total() {
    let theTotal = 0;
    this.items.forEach(item => {
      theTotal += (item.price * item.quantity);
    });
    return theTotal;
  }
}

export default class App extends Component {

  async componentDidMount() {
    await this.getOrders();
  }

  async getOrders() {
    try {
      const response = await fetch(`theOrders.json`);
      const theOrderData = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const theOrders = await theOrderData.map(order => {
        const theItems = order.items.map(item => new Item(item.item, item.quantity, item.total));
        return new Order(order.customer, order.address, theItems);
      });
      this.setState({myOrders: theOrders})
      console.log(this.state.myOrders);
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const {myOrders} = this.state || {};

    return (
      myOrders?.map(order => {
        return (
          <div>
            <OrderComponent key={order.id} orders={order}/>
          </div>
        )
      })
      
    );
  }
}