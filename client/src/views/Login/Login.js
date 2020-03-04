import React from 'react';
import logo from '../../assets/logo.svg';
import './Login.css';

function Login() {
    return (
        <div className="App">
            <header className="App-header">                
                <p>
                    Login Page.
                </p>
                <a className="App-link" href="/Register">Register</a>
                <a className="App-link" href="/RecoverPassword">Recover Password</a>                
            </header>
        </div>
    );
}

export default Login;
