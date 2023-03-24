import React from 'react';
import { Link } from 'react-router-dom';
import './css/user.css';

export default function User({user,setBlog,setIsHover,setUserInfo, setModalWindow,modalWindow,setModalInfo}) {
    
    const {id,name,website} = user;

  return (
    <div className ='userDivs' 
        onClick={() => {
            setModalWindow(!modalWindow);
            setModalInfo(user)
        }}
        onMouseOver={() => {
            setIsHover(true);
            setUserInfo(user);
        }} onMouseLeave={() => {
            setIsHover(false);
            setUserInfo(null)
        }}>
        <Link to={`/blog/posts/userId=${id}`} onClick={(e) => {
            setBlog(user);
            e.stopPropagation();
        }}>{website}</Link>
        <p>by: {name}</p>
    </div>
  )
}
