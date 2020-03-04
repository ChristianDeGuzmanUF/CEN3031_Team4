import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Home Page
                </p>
                <a className="App-link" href="/Register">Register</a>
                <a className="App-link" href="/Login">Login</a>
            </header>
        </div>
    );
}

export default Home;
