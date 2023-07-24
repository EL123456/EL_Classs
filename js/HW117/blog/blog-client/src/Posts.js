import React, { useEffect, useState } from 'react'
import Post from './Post';
import socketIo from 'socket.io-client';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        const posts = await response.json();
        setPosts(posts);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    const io = socketIo('http://localhost:8080');

    function handleNewPost(newPost) {
      const newPostsArray = [...posts];
      newPostsArray.push(newPost);
      setPosts(newPostsArray);
    }
    io.on('post', newPost => handleNewPost(newPost))

    function handleNewComment(new_comment) {

      const newPosts = [...posts];
      const postIndex = newPosts.findIndex(p => p._id === new_comment.postId);
      const thePost = {...newPosts[postIndex]};
      thePost.comments = thePost.comments || [];
      thePost.comments.push(new_comment);
      newPosts[postIndex] = thePost;
      setPosts(newPosts);
    }

    io.on('comment', newComment => handleNewComment(newComment))

    return () => {
      io.off('post'/* , newPost => handleNewPost(newPost) */);
      io.off('comment'/* , newComment => handleNewComment(newComment) */);
    };
  }, [posts]);

  return (
    <div>
      {posts.map(post => <Post key={post._id} post={post} />)}
    </div>
  )
}
