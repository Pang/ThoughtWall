import { useState } from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AccountPage = ({ onLogin }) => {
    const [showRegisterForm, setShowRegister] = useState(false);

    return(
        <div>
            {!showRegisterForm 
                ? <LoginForm onLogin={onLogin} showRegister={() => setShowRegister(true)} /> 
                : <RegisterForm onLogin={onLogin} showRegister={() => setShowRegister(false)} />
            }
        </div>
    )
}

export default AccountPage;