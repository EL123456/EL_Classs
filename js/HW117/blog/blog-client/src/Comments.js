import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment';

export default function Comments({comments,id}) {
    
  return (
    <div>
        <hr/>
        {comments?.map(comment => <Comment key={comment.body} comment={comment}/>)}
        <AddComment id={id}/>
    </div>
  )
}
