import React from 'react';
import logo from '../../assets/logo.svg';
import './ResetPassword.css';

function ResetPassword() {
    return (
        <div className="App">
            <header className="App-header">                
                <p>
                    ResetPassword Page
                </p>
                <a className="App-link" href="/ResetPasswordCompleted">Reset Password Completed</a> 
            </header>
        </div>
    );
}

export default ResetPassword;
