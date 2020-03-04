import React from 'react';
import logo from '../../assets/logo.svg';
import './RecoverPassword.css';

function RecoverPassword() {
    return (
        <div className="App">
            <header className="App-header">                
                <p>
                    Recover Page
                </p>
                <a className="App-link" href="/SendEmail">Send Email</a>                
            </header>
        </div>
    );
}

export default RecoverPassword;
