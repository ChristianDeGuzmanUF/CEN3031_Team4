import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import RecoverPassword from "./views/RecoverPassword/RecoverPassword";
import ResetPassword from "./views/ResetPassword/ResetPassword";
import Register from "./views/Register/Register";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/Home" component={Home} />
		<Route exact path="/Login" component={Login} />
		<Route exact path="/RecoverPassword" component={RecoverPassword} />
		<Route exact path="/ResetPassword" component={ResetPassword} />
		<Route exact path="/Register" component={Register} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
