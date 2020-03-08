import React from 'react';
import './Home.css';

function Home() {
    const register = () =>{
        window.location.href = "/Register";
    };
    const login = () =>{
        window.location.href = "/Login";
    };

    return (
        <div className="Home">
            <header className="Home-header">
                <p>
                    Welcome to Career Finder
                </p>
            </header>
            <div className="Home-welcome">
                <div className="Welcome-text">
                    <p>
                        Discover career paths that match your strengths and interests. <br/><br/>Explore Career Finder to learn about the day-to-day experiences, salaries, and responsibilities in a variety of professional areas. Get started below or register to find your best matches!
                    </p>
                    <div className="Links">
                        <div className="Registration-link">
                            <button onClick={register}>Register</button>
                        </div>
                        <div className="Login-link">
                            <button onClick={login}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Career-cards-container">
                <p>
                    Imagine the Possibilities
                </p>
            </div>
            <div className="credits">
                Photo by Marvin Meyer on Unsplash
            </div>
        </div>
    );
}

export default Home;
