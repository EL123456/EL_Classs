import React from 'react'
import './css/userInfo.css'

export default function UserInfo({user: {name, username, address: { street,suite,city }, phone, website, company: {name: companyName, catchPhrase, bs}}}) {
  return (
    <div className='userDivInfo'>
      <h1>{website}</h1>
      <p><span>by:</span> {name}</p>
      <p><span>username:</span> {username}</p>
      <p><span>address:</span> {street} {suite}, {city}</p>
      <p><span>phone number:</span> {phone}</p>
      <p><span>company:</span> {companyName}</p>
      <p>{bs}</p>
      <p>"{catchPhrase}"</p>
    </div>
  )
}