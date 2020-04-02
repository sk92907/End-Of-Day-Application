import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import 'bootstrap/dist/css/bootstrap.min.css';

import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import ExecutiveUpdates from './components/executive/ExecutiveUpdates';
import ExecutiveLeaves from './components/executive/ExecutiveLeaves';
import ExecutiveReport from './components/executive/ExecutiveReport';
import Manager from './components/manager/Manager';
import EmployeeShow from './components/manager/EmployeeShow';
import Notifications from './components/layout/Notifications';
import { Container, Row, Col } from 'react-bootstrap';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Header />
            <br />
            <Container fluid>
              <Row className='justify-content-center'>
                <Col sm={12} md={8}>
                  <Notifications />
                </Col>
              </Row>
            </Container>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Switch>
              <PrivateRoute exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/update' component={ExecutiveUpdates} />
              <PrivateRoute exact path='/report' component={ExecutiveReport} />
              <PrivateRoute exact path='/leave' component={ExecutiveLeaves} />
              <PrivateRoute exact path='/show' component={EmployeeShow} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
