import React from 'react';
import useForm from './useForm';

export default function RegisterForm({setGonnaRegister}) {
    const [formData, setFormData] = useForm({
        username: '',
        password: ''
    });
    
    async function onSubmit(e) {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8080/blog/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
              throw new Error(`${response.statusCode} ${response.statusText}`);
            }

            setGonnaRegister(false);
        } catch (e) {
          console.error(e);
        }
    }
  return (
    <div>
        <form onSubmit={onSubmit}> <span id='title_span'>Register: </span>
            <label>
            Username:
            <input name="username" value={formData.username} onChange={setFormData} />
        </label>
            <label>
                Password:
                <input name="password" type='password' value={formData.password} onChange={setFormData}/>
        </label>
        <button>register</button>
        </form>
    </div>
  )
}
