import React from 'react'

export default function AuthLogout({setIsLoggedIn, username}) {

    async function onSubmit(e) {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8080/blog/auth/logout', {
                method: 'POST'
            });
    
            if (!response.ok) {
              throw new Error(`${response.statusCode} ${response.statusText}`);
            }

            setIsLoggedIn('');
        } catch (e) {
          console.error(e);
        }
    }
  return (
    <div>
        <p>welcome, {username}</p>
        <form onSubmit={onSubmit}>
            <button>logout</button>
        </form>
    </div>
  )
}
