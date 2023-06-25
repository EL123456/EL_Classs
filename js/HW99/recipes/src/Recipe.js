import React from 'react'
import Ingredients from './Ingredients';

export default function Recipe({recipe: {name, ingredients, picture},pictureShowing,setPictureShowing}) {
  return (
    <div className='siteContent'>
        <h2>{name}</h2>
        {pictureShowing && <img src={picture} alt={name}/>}
        <button onClick={setPictureShowing}>{pictureShowing? 'hide' : 'show picture'}</button>
        <Ingredients ingredients={ingredients}/>
    </div>
  )
}


