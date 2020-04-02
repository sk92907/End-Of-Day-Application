import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      empType: 'executive',
      image: null
    };
  }

  componentWillMount() {
    if (this.props.empType !== 'manager') {
      this.props.history.push('/dashboard');
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.id === 'password2') {
      if (this.state.password !== this.state.password2) {
        this.props.setAlert('Passwords need to be same.', 'danger');
      }
    }
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.password !== this.state.password2) {
      this.props.setAlert('Passwords need to be same.', 'danger');
      return;
    }
    let newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      empType: this.state.empType
    };
    axios
      .post('/api/users/register', newUser)
      .then(response => {
        this.props.setAlert(
          'Successfully Registered a new employee.',
          'success'
        );
        this.props.history.push('/');
      })
      .catch(error =>
        this.props.setAlert(error.response.data.message, 'danger')
      );
  };

  imageUploadHandler = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  render() {
    return (
      <Container fluid>
        <Row className='justify-content-center'>
          <Col md={6} sm={6} xs={12}>
            <Link to='/'>Back to home</Link>{' '}
            <div>
              {' '}
              <h4>
                <b>Register</b> below
              </h4>
            </div>
            <Form onSubmit={this.onSubmit} enctype='multipart/form-data'>
              <Form.Group controlId='name'>
                <Form.Label>Enter Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  onChange={this.onChange}
                  value={this.state.name}
                  required
                />
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  onChange={this.onChange}
                  value={this.state.email}
                  required
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  minLength='8'
                  type='password'
                  placeholder='Enter Password'
                  onChange={this.onChange}
                  value={this.state.password}
                  required
                />
              </Form.Group>

              <Form.Group controlId='password2'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  minLength='8'
                  placeholder='Confirm your password'
                  onChange={this.onChange}
                  value={this.state.password2}
                  required
                />
              </Form.Group>
              <Form.Group controlId='empType'>
                <Form.Label>Employee Type</Form.Label>
                <Form.Control
                  as='select'
                  size='lg'
                  value={this.state.empType}
                  onChange={this.onChange}
                  custom
                >
                  <option value='exectuive'>Executive</option>
                  <option value='teleCaller'>TeleCaller</option>
                </Form.Control>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  empType: state.auth.user.empType
});

export default connect(mapStateToProps, { registerUser, setAlert })(
  withRouter(Register)
);
