import React from 'react';
import { Link } from 'react-router-dom';
import './css/navs.css'

export default function Navs({nav}) {
  return (
    <>
        {nav==='userPosts'? <div className='navs'><Link to='/'>home page</Link> &gt; <Link to='/blog/users'>users</Link></div>: <div className='navs'><Link to='/'>home page</Link></div>}
    </>
  )
}
