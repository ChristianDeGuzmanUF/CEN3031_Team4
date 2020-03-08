import React from 'react';
import logo from '../../assets/logo.svg';
import './Landing.css';
import ThumbnailCareers from "../../components/Body/ThumbnailCareers";
import data from '../../data/data';

function Landing() {	

	return (
		<main role="main">
			<section className="jumbotron text-center">
				<div className="container">
					<h1 className="jumbotron-heading">Career Finder</h1>
					<p className="lead text-muted">Career Finder is a website to help students find a career, answer questions about their interest and find a matching career based on interest</p>
					<p>
						<a href="#" className="btn btn-primary my-2" href="/login">Login</a>&nbsp;
						<a href="#" className="btn btn-secondary my-2" href="/register">Register</a>
					</p>
				</div>
			</section>
			<div className="album py-5 bg-light">
				<div className="container">
					<div className="row">

						<ThumbnailCareers data={data} />
						
					</div>
				</div>
			</div>
		</main>
	);
}

export default Landing;
