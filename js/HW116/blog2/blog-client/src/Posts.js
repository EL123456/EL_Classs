import React, { useEffect, useState } from 'react'
import Post from './Post';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/blog/posts');
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const posts = await response.json();
        setPosts(posts);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      {posts.map(post => <Post key={post._id} post={post} />)}
    </div>
  )
}
