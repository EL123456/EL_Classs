import React from 'react'
import ItemComponent from './ItemComponent'

////////////////////////////////////////////////////////////////////
//fix this to make it look like the original order quiz thingy
//////////////////////////////////////////////////////////////////

 export default function OrderComponent({orders: {address,customer,items,total}}) {
  return (
    <div>
      <h2>{customer}</h2>
      <div>
        <h4>Customer: {customer}</h4>
        <h4>Address: {address}</h4>
        <h4>Total: {total.toFixed(2)}</h4>
        <br></br>
        <h4>Items:</h4>
        {items.map(item => {
          return (
            <div>
              <ItemComponent key={item.id} item={item}/>
             
            </div>
          )
        })}
        <br></br>
      </div>
    </div>
  )
}
