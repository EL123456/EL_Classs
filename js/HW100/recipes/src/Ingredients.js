import React from 'react';

export default function Ingredients({ ingredients}) {
    const list = ingredients?.map(ingredient => <li key={ingredient}>{ingredient}</li>)
    
    return (
        <div >
            <ul className='bulletless' id='ingredients'>
                {list}
            </ul>
        </div>
    )
}
