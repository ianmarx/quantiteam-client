import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, browserHistory, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import PrivateRoute from './PrivateRoute';
import LandingPage from '../containers/LandingPage';
import SignUp from '../containers/SignUp';
import SignIn from '../containers/SignIn';
import HomePage from '../containers/HomePage';
import Profile from '../containers/Profile';
import TeamProfile from '../containers/TeamProfile';
import '../style.scss';

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

const App = (props) => {
  return (
    <Router history={browserHistory}>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/home/:userId" component={HomePage} isAuthenticated={props.authenticated} />
          <PrivateRoute path="/profile/:userId" component={Profile} isAuthenticated={props.authenticated} />
          <PrivateRoute path="/team/:userId" component={TeamProfile} isAuthenticated={props.authenticated} />
          <Route render={() => (<div>Page not found.</div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(mapStateToProps, null)(App);