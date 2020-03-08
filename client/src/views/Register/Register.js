import React from 'react';
import sigil from './sigil.png';
import './Register.css';

function Register() {
    const dashboard = () =>{
        //needs fleshed out to determine student vs admin
        window.location.href = "/Dashboard";
    };
    return (
        <div className="Register">
            <header className="Register-header">
                <p></p>
            </header>
            <div className="Register-container">
                <div className="Icon">
                    <img src={sigil} alt="Logo" />;
                </div>
                <div className="Caption">

                </div>
                <div className="Register-Form">

                </div>
            </div>
            <footer className="Register-header">
                <p></p>
            </footer>
        </div>
    );
}

export default Register;
