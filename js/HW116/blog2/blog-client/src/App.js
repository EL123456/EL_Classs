import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './Posts';
import AddPost from './AddPost';
import PageNotFound from './PageNotFound';
import Header from './Header';
import AuthLogin from './AuthLogin';
import { useState } from 'react';
import AuthLogout from './AuthLogout';
import RegisterForm from './RegisterForm';
import RegisterButton from './RegisterButton';

function App() {
  //now just need to check if it works in different browsers...it doesn't work in brave, but thats a browser that has protections against cookies, i was gonna try opera

  const [gonnaRegister,setGonnaRegister] = useState();
  const [isLoggedIn,setIsLoggedIn] = useState();

  
  return (
    <BrowserRouter>
      <Header />
      {gonnaRegister 
        ? <RegisterForm setGonnaRegister={setGonnaRegister}/>
        : <RegisterButton setGonnaRegister={setGonnaRegister}/>
      }
      {isLoggedIn 
        ? <AuthLogout setIsLoggedIn={setIsLoggedIn} username={isLoggedIn}/> 
        : <AuthLogin setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="addPost" element={<AddPost />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
