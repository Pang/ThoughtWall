import { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        const loginForm = {
            username: username,
            password: password
        }
        if(!username || !password) {
            alert('Please fill in username and password');
            return;
        }
        await axios.post(`http://localhost:5000/api/auth/login`, loginForm).then((res) => {
            console.info('tokenReceived', res.data);
            localStorage.setItem('token', res.data[`token`]);
            onLogin(res.data[`token`]);
            history.push('/');
        })
    }

    return (
        <div className="card p-4 mx-auto my-5" style={{width: '300px'}}>
            <form onSubmit={onSubmit}>
                <input 
                    className='form-control my-1' 
                    type='text' 
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    className='form-control my-1' 
                    type='password' 
                    placeholder='Password'
                    value={password}
                    onChange={(e => setPassword(e.target.value))}
                />
                <button
                    className="btn btn-success w-100"
                    type='submit'
                >Login</button>
            </form>
        </div>
    )
}

export default LoginForm;