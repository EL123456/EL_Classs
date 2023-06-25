import React, { useState } from 'react'
import Ingredients from './Ingredients';

export default function Recipe({recipe,recipe : {name,picture,ingredients}}) {
    const [pictureShowing,setPictureShowing] = useState(true);
    return (
        <div className='siteContent'>
            {recipe 
            ? <>
                <h2>{name}</h2>
                {pictureShowing && <img src={picture} alt={name}/>}
                <button onClick={() => setPictureShowing(!pictureShowing)}>{pictureShowing? 'hide' : 'show picture'}</button>
                <Ingredients ingredients={ingredients}/>
            </>
            : <div></div>}
            </div>
       
    )
}


