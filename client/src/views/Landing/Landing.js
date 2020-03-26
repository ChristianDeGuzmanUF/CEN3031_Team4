import React from 'react';
import './Landing.css';
import ThumbnailCareers from "../../components/Body/ThumbnailCareers";
import data from '../../data/data';

function Landing() {
    const register = () =>{
        window.location.href = "/Register";
    };
    const login = () =>{
        window.location.href = "/Login";
    };
	return (
		<div className="main-theme">
			<header className="home-header">
                <p>
                    Welcome to Career Finder
                </p>
            </header>
			<div className="home-welcome">
				<div className="welcome-text">
                    <p>
                        Discover career paths that match your strengths and interests. <br/><br/>Explore Career Finder to learn about the day-to-day experiences, salaries, and responsibilities in a variety of professional areas. Get started below or register to find your best matches!
                    </p>
                    <div className="nav-links">
						<div>
                            <button className="large-button" onClick={register}>Register</button>
						</div>
						<div>
                            <button className="large-button" onClick={login}>Login</button>
						</div>
                    </div>
                </div>
            </div>

            <div className="career-cards-container">
                <p>
                    Imagine the Possibilities
                </p>
                <div className="career-cards-rows">
                    <div className="c-container">
                        <div className="card">
                            <ThumbnailCareers data={data} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="credits">
                Photo by Marvin Meyer on <a className="credit_link" href = "https://Unsplash.com" target="_blank">Unsplash</a>
            </div>
        </div>
    );
}
export default Landing;


			/*
						<a href="#" className="btn btn-primary my-2" href="/login">Login</a>&nbsp;
						<a href="#" className="btn btn-secondary my-2" href="/register">Register</a>
					</p>
				</div>
			<div className="album py-5 bg-light">
				<div className="container">
					<div className="row">

						<ThumbnailCareers data={data} />
						
					</div>
				</div>
			</div>
		</div>
	);*/

