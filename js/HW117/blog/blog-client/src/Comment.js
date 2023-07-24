import './Comment.css';

export default function Comment({ comment: { author, date, body } }) {
  return (
    <div className='comment'>
      <h5>{body}</h5>
      <p>by {author} on {new Date(date).toLocaleString()}</p>
    </div>
  )
}