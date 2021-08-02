import { useState } from 'react';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        if(!username || !password) {
            alert('Please fill in username and password');
            return;
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input 
                className='form-control' 
                type='text' 
                placeholder='Username'
                value={username}
            />
            <input 
                className='form-control' 
                type='password' 
                placeholder='Password'
                value={password}
            />
        </form>
    )
}

export default LoginForm;