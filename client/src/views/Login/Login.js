import React from 'react';
import login from '../reg-pic.jpg'
import './Login.css';

function Login() {
    const dashboard = () =>{
        //needs fleshed out to determine student vs admin
        window.location.href = "/Dashboard";
    };
    const register = () =>{
        window.location.href = "/Register";
    };
    const recover = () =>{
        window.location.href = "/RecoverPassword";
    };
    return (
        <div className="Login">
            <div className="Login-container">
                <div className="Icon">
                    <img src={login} alt="Logo" />
                    <h1>Career Finder</h1>
                    <h4>Account Login</h4>
                </div>
                <form className="Login-form">
                    <div className="Login-form-col-1">
                        <input type="text" placeholder="UserName"/>
                        <input type="text" placeholder="Password"/>
                    </div>
                </form>
                <div>
                    <button onClick={dashboard}>Submit</button>
                </div>
                <div>
                    <a href=onClick={dashboard}>Submit</a>
                </div>
                <div className="credits">
                    Photo by Christin Hume on Unsplash
                </div>
            </div>
        </div>
    );
}

export default Login;