import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/authActions';
import { Button, Navbar, Nav } from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.setState({
      logout: false
    });
    this.props.logoutUser();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({
        logout: true
      });
    }
  }

  render() {
    return (
      <Navbar collapseOnSelect bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          id='responsive-navbar-nav'
          className='justify-content-around'
        >
          <Navbar.Brand href='/' className='justify-content-center'>
            Home
          </Navbar.Brand>

          {this.props.auth && this.props.auth.isAuthenticated ? (
            <Fragment>
              <Navbar.Text className='dark'>
                Signed in as: {' ' + this.props.name + ' '}{' '}
              </Navbar.Text>
              <Button
                className='justify-content-right'
                onClick={this.onLogoutClick}
              >
                {' '}
                Logout
              </Button>
            </Fragment>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  name: state.auth.user.name
});

export default connect(mapStateToProps, { loginUser, logoutUser })(
  withRouter(Header)
);
