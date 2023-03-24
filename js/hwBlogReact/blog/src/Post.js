import React, { useState } from 'react'
import Comments from './comments'

export default function Post({post: {id,title,body}}) {

  const [commentsShowing, setCommentsShowing] = useState(false);
  
  return (
    <div className='postDivs'>
        <h3>{title}</h3>
        <p>{body}</p>
        <button onClick={() => setCommentsShowing(!commentsShowing)}>
          {commentsShowing ? 'Hide Comments' : 'Show Comments'}
        </button>
        {commentsShowing && <Comments postId={id}/>}
        <br/>
      </div>
  )
}
