import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className="header">
            {/* Logo */}
            <Link className="nav-title" to="/">
                <img className="nav-logo" src={"/logo192.png"} alt="React logo" />
            </Link>

            {/* Page Links */}
            <div className="nav-items">
                <Link className="nav-link" to='/'>Home</Link>
                <Link className="nav-link" to='/Login'>Login</Link>
                <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://github.com/ChristianDeGuzmanUF/CEN3031_Team4">Github</a>
            </div>
        </div>
    )
};

export default NavBar;
