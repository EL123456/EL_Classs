import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/userPosts.css'
import ErrorPage from './ErrorPage';
import Loading from './Loading';
import Post from './Post';
import SingleBlogInfo from './SingleBlogInfo';


export default function UserPosts({blog,setNav, setBlog}) {
  const [posts,setPosts] = useState();
  const [haveBlog,setHaveBlog] = useState();
  const {userId} = useParams();
  const [loading, setLoading] = useState();
  const [error,setError] = useState();
  
  useEffect(
    () => {
      
      setError(null);
      setLoading(true);
      setNav('userPosts');
      const abortController = new AbortController();
      async function fetchJson(url,error) {
        try{
          const response = await fetch(url);
          if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          const data = response.json();
          return data;
        } catch (e) {
          setError(error);
          console.error(e)
        }
      }
      async function getPosts() {
        try{
          const posts = await fetchJson(`https://jsonplaceholder.typicode.com/posts?${userId}`,'page',{ signal: abortController.signal });
          setPosts(posts);
          if(error !== 'page' && posts.length !== 0) {
            if(posts[0]?.userId !== blog.id) {
              const newBlog = await fetchJson(`https://jsonplaceholder.typicode.com/users?id=${posts[0].userId}`);
              if(!newBlog) {
                setError('blogInfo');
              } else {
                setBlog(newBlog[0]);
                setHaveBlog(true);
              }
            } else {
              setHaveBlog(true);
            }
          } else {
            setError('page');
          }
        } catch(e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
      getPosts();
      console.log(error);
      
      return () => {
        abortController.abort();
      }
    },[userId,setNav,blog,setBlog,error])

  return (
    <>
      {loading && <Loading styled={{color: 'white'}}/>}
      {error==='page' && <ErrorPage styled={{color: 'white'}}/>}
      {posts && 
        <div id='singleBlogWindow'>
          <div id='posts'>
            {posts.map(post => {
            return <Post post={post} key={post.id}/>;
            })}
          </div>
          <div id='infoWindow'>
            {error==='blogInfo' && <ErrorPage singleBlogError={error} styled={{color:'white'}}/>}
            {posts && haveBlog && <SingleBlogInfo blog={blog}/>}
          </div>
        </div>
      }
    </>
  )
}
