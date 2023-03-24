import React from 'react'
import { Link } from 'react-router-dom'
import './css/errorpage.css'

export default function ErrorPage({styled,isNotSingleBlog,singleBlogError}) {
  console.log(singleBlogError);
  return (
    <div className='errorDiv'>
      {!singleBlogError && <div style={styled}>I'm sorry, there is no such page</div>}
      {isNotSingleBlog && <Link to='/'>Go to our Home Page</Link>}
      {!singleBlogError && !isNotSingleBlog && <Link to='/blog/users'>Check out our other blogs!</Link>}
      {singleBlogError && <div style={styled}>I'm sorry, the blog information is unavailable</div>}
    </div>
    
  )
}