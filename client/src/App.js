import React, {Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
//import NavBar from "./components/Header/NavBar";
import Landing from "./views/Landing/Landing";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import RecoverPassword from "./views/RecoverPassword/RecoverPassword";
import ResetPassword from "./views/ResetPassword/ResetPassword";
import ClusterSurvey from "./views/ClusterSurvey/ClusterSurvey";
import PrivateRoute from "./views/PrivateRoute/PrivateRoute";
import AdminRoute from "./views/AdminRoute/AdminRoute";
import Dashboard from "./views/Dashboard/Dashboard";
import NotFound from "./views/NotFound";
import Admin from "./views/Admin/Admin";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);

	// Decode token and get user info and exp
	const decoded = jwt_decode(token);

	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds

	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Redirect to login
		window.location.href = "./login";
	}
}


class App extends Component {


	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						{/* <NavBar /> */}
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route exact path="/Login" component={Login} />
							<Route exact path="/Register" component={Register} />
							<Route exact path="/RecoverPassword" component={RecoverPassword} />
							<Route exact path="/ResetPassword" component={ResetPassword} />
							<Route exact path="/ClusterSurvey" component={ClusterSurvey} />
							<PrivateRoute exact path="/Dashboard" component={Dashboard} />
							<AdminRoute exact path="/Admin" component={Admin} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
};

export default App;
