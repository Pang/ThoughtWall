import { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const RegisterForm = ({ onLogin, showRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    let history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        const registerForm = {
            username: username,
            password: password
        }
        if(!username || !password) {
            alert('Please fill in username and password');
            return;
        }
        if(rePassword !== password) {
            alert(`Passwords don't match`);
            return;
        }
        await axios.post(`http://localhost:5000/api/auth/register`, registerForm).then(() => {
            axios.post(`http://localhost:5000/api/auth/login`, registerForm).then((res) => {
                localStorage.setItem('token', res.data[`token`]);
                onLogin(res.data[`token`]);
                history.push('/');
            });
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
                <input 
                    className='form-control my-1' 
                    type='password' 
                    placeholder='Reenter Password'
                    value={password}
                    onChange={(e => setRePassword(e.target.value))}
                />
                <button
                    className="btn btn-success w-100"
                    type='submit'
                >Register</button>
            </form>
            <span>Already a member?&nbsp;
                <span 
                    onClick={showRegister}
                    style={{color:'blue', cursor: 'pointer'}}>
                        Login
                </span>
            </span>
        </div>
    )
}

export default RegisterForm;