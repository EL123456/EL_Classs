import PropTypes from 'prop-types';
import { useState } from "react";

export default function AddComment({ id}) {
  const [commentBody, setCommentBody] = useState('');

  const submit = async e => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8080/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: commentBody }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <input name="body" value={commentBody} onChange={e => setCommentBody(e.target.value)} required/>
      <button>add</button>
      <button type="button" onClick={() => setCommentBody('')}>cancel</button>
    </form>
  )
}

AddComment.propTypes = {
  id: PropTypes.string.isRequired,
  endCommenting: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};
