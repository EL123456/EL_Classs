import React, { useState, useEffect} from 'react'
import './css/comments.css'
import Loading from './Loading';

export default function Comments({postId}) {
    const [comments,setComments] = useState();
    const [loading,setLoading] = useState();
    useEffect(
        () => {
            const abortController = new AbortController();
            async function getComments() {
                try{
                    setLoading(true);
                    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, {signal: abortController.signal});
                    if(!response.ok) {
                        throw new Error(`${response.status} ${response.statusText}`);
                    }
                    const comments = await response.json();
                    setComments(comments);
                } catch(e) {
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            }
            getComments();
            return () => {
                abortController.abort();
              }
        },[postId])
    return (
        <>
            {loading && <Loading styled={{color: 'black'}}/>}
            {comments && 
                <div>
                    {comments.map(comment => {
                        return <div key={comment.id} className='commentDiv'>
                            <p className='name'>{comment.name}</p>
                            <p className='body'>{comment.body}</p>
                            <p className='email'>{comment.email}</p>
                        </div>
                    })}
                </div>
            }
        </>
    )
}
