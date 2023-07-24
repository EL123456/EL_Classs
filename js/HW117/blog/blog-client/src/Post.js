import React from 'react'
import Comments from './Comments';

export default function Post({ post: { _id,title, body, author, date,comments } }) {

  return (
    <div className="post">
      <h2>{title}</h2>
      <h3>by {author} on {new Date(date).toLocaleString()} </h3>
      <article>{body}</article>
      <Comments comments={comments} id={_id}/>
    </div>
  )
}
