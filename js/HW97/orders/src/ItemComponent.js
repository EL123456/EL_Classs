import React from 'react'

export default function ItemComponent({item: {name,quantity,price}}) {
  return (
    <div>
        <h5>{quantity} - {name}....{price.toFixed(2)}</h5>
    </div>
  )
}