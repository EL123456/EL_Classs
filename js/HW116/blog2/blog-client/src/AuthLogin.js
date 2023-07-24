import React from 'react'
import useForm from './useForm'

export default function AuthLogin({setIsLoggedIn}) {
    const [formData, setFormData] = useForm({
        username: '',
        password: ''
    });
    
    async function onSubmit(e) {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8080/blog/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
              throw new Error(`${response.statusCode} ${response.statusText}`);
            }

            setIsLoggedIn(formData.username);
        } catch (e) {
          console.error(e);
        }
    }
  return (
    <div>
        <form onSubmit={onSubmit}> <span id='title_span'>Login: </span>
            <label>
            Username:
            <input name="username" value={formData.username} onChange={setFormData} />
        </label>
            <label>
                Password:
                <input name="password" type='password' value={formData.password} onChange={setFormData}/>
        </label>
        <button>login</button>
        </form>
    </div>
  )
}
