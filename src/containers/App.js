import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, browserHistory, Switch, Route } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingPage from '../components/mini/LoadingPage';
import Nav from '../containers/Nav';
import PrivateRoute from '../components/PrivateRoute';
import LandingPage from '../containers/LandingPage';
import SignUp from '../containers/SignUp';
import SignIn from '../containers/SignIn';
import '../style.scss';

const mapStateToProps = state => (
  {
    isAuthenticated: state.auth.isAuthenticated,
  }
);

const HomePage = loadable({
  loader: () => import('../containers/HomePage'),
  loading: LoadingPage,
});

const Profile = loadable({
  loader: () => import('../containers/Profile'),
  loading: LoadingPage,
});

const TeamProfile = loadable({
  loader: () => import('../containers/TeamProfile'),
  loading: LoadingPage,
});

const App = (props) => {
  return (
    <Router history={browserHistory}>
      <div id='app-container'>
        <Nav />
        <Switch>
          <Route exact path="/" component={props.isAuthenticated ? HomePage : LandingPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/profile/:userId" component={Profile} isAuthenticated={props.isAuthenticated} />
          <PrivateRoute path="/team" component={TeamProfile} isAuthenticated={props.isAuthenticated} />
          <Route render={() => (<div>Page not found.</div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(mapStateToProps, null)(App);
