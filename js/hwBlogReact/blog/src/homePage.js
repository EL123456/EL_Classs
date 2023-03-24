import React from 'react';
import { Link } from 'react-router-dom';
import './css/homePage.css';

export default function HomePage() {
  return (
    <div id='homeScreen'>
        <h1>The Blog</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, saepe.</p>
        <Link to="/blog/users">check out our blogs</Link>
    </div>
  )
}