import { useState } from 'react';
import LoginForm from "./LoginForm";
import Profile from './Profile';
import RegisterForm from "./RegisterForm";

const AccountPage = ({ onLogin, loggedIn, account }) => {
    const [showRegisterForm, setShowRegister] = useState(false);

    return(
        <div>
            {loggedIn
                ? <Profile account={account} />
                : !showRegisterForm 
                ? <LoginForm 
                    onLogin={onLogin} 
                    showRegister={() => setShowRegister(true)} /> 
                : <RegisterForm 
                    onLogin={onLogin} 
                    showRegister={() => setShowRegister(false)} />
            }
        </div>
    )
}

export default AccountPage;