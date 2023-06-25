import React from 'react'
import { NavLink } from 'react-router-dom';
import './header.css'

export default function Header() {
  return (
    <div id='Header'>
        <h1>Real Estate</h1>
        <h3>it&apos;s skeletal</h3>
        <nav id='navLinks'>
            <NavLink to='/' >Home Page</NavLink>
            <NavLink to='/Buy_A_Home' >Buy A Home</NavLink>
            <NavLink to='/Sell_A_Home' >Sell A Home</NavLink>
        </nav>
        
    </div>
  )
}