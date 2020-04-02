import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { setAlert } from '../../actions/alertActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.setAlert('Logged you in.', 'success');
      this.props.history.push('/dashboard');
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    return (
      <Container fluid>
        <Row className='justify-content-center'>
          <Col md={4} sm={6} xs={12}>
            <Link to='/'>Back to home</Link>{' '}
            <div>
              {' '}
              <h4>
                <b>Login</b> below
              </h4>
            </div>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  onChange={this.onChange}
                  value={this.state.email}
                  required
                />
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  minLength='8'
                  onChange={this.onChange}
                  value={this.state.password}
                  required
                />
              </Form.Group>
              <p className='text-center'>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser, setAlert })(Login);
