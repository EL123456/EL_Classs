import React,{ useEffect, useState } from 'react';
import './css/App.css';
import { Route,Outlet,Routes} from 'react-router-dom';
import Header from './header';
import UserPage from './UserPage';
import UserPosts from './userPosts';
import Navs from './Navs';
import Modal from './Modal';
import ErrorPage from './ErrorPage';

function App() {

  const [blog,setBlog] = useState(JSON.parse(localStorage.getItem('blog')) || null);
  useEffect(() => localStorage.setItem('blog', JSON.stringify(blog)),[blog]);

  const [nav,setNav] = useState();
  const [modalWindow,setModalWindow] = useState();
  const [modalInfo, setModalInfo] = useState();

  return (
    <div>
      <Modal setModalWindow={setModalWindow} modalWindow={modalWindow} user={modalInfo}/>
      <Navs nav={nav}/>
      <Header/>
      <Routes>
        <Route path='/users' element={<UserPage setBlog={setBlog} setNav={setNav} modalWindow={modalWindow} setModalWindow={setModalWindow} setModalInfo={setModalInfo}/>}/>
        <Route path='/posts/:userId' element={<UserPosts blog={blog} setBlog={setBlog} setNav={setNav}/>}/>
        <Route path='*' element={<ErrorPage styled={{color: 'white'}} isNotSingleBlog={true}/>}/>
      </Routes>
      
      <Outlet/>
    </div>
    
  );
}

export default App;
