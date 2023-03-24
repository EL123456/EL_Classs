import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo';
import './css/userPage.css';
import User from './User';
import Loading from './Loading';
import ErrorPage from './ErrorPage';

export default function UserPage({setBlog,setNav,modalWindow,setModalWindow,setModalInfo}) {

  const [users, setUsers] = useState();
  const [isHover, setIsHover] = useState();
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(
    () => {
      async function getUsers() {
        try{
          setError(null);
          setLoading(true);
          setNav('userPage');
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          const users = await response.json();
          setUsers(users);
        } catch(e) {
          setError(true);
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
      getUsers();
    }, [setNav])

  return (
    <>
      {loading && <Loading styled={{color: 'white'}}/>}
      {error && <ErrorPage styled={{color: 'white'}} isNotSingleBlog={true}/>}
      {users && 
        <div id='homePageWindow'>
          <div id='pageDiv'>
            <div id='users'>
              {users.map(user => {
                return <User key={user.id} user={user} setIsHover={setIsHover} setUserInfo={setUserInfo} setBlog={setBlog} modalWindow={modalWindow} setModalWindow={setModalWindow} setModalInfo={setModalInfo}/>
              })}
            </div>
            
          </div>
          <div id='infoDiv'>
            {isHover?<UserInfo user={userInfo}/>:<p className='userDivInfo' style={{textAlign: 'center'}}>hover over a blog to view more info</p>}
          </div>
      </div>}
    </>
  )
}