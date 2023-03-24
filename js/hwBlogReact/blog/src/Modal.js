import React from 'react'
import UserInfo from './UserInfo'

export default function Modal({modalWindow,user,setModalWindow}) {
  return (
    <div id='modalDiv' style={modalWindow? {display: 'block'} : {display : 'none'}}>
        <div className='modal' style={modalWindow? {display: 'block'} : {display : 'none'}} >
            <span onClick={() => setModalWindow(!modalWindow)}>x</span>
            {user? <UserInfo user={user}/>: <p>Loading info. Please wait a moment</p>}
        </div>
    </div>
  )
}
