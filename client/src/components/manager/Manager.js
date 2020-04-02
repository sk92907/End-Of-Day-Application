import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Table
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const fuzzysort = require('fuzzysort');

export class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      users: [],
      searchQuery: '',
      dipslayUsers: null
    };
  }

  async componentWillMount() {
    this.setState({
      user: this.props.user
    });
    if (
      this.state.user.empType === 'executive' ||
      this.state.user.empType === 'teleCaller'
    ) {
      this.props.history.push('/');
    }
    this.fillUsers();
  }

  fillUsers = async () => {
    try {
      let res = await axios.get('/api/manager/');
      const { token } = res.data;
      const decoded = jwt_decode(token);
      this.setState({
        displayUsers: decoded.users.map((emp, id) => {
          let user = emp;
          const sendProps = {
            empType: user.empType,
            empId: user._id,
            name: user.name,
            email: user.email
          };
          return (
            <tr key={id}>
              <td>
                <Link
                  to={{
                    pathname: '/show',
                    state: { sendProps }
                  }}
                >
                  {user.name}
                </Link>
              </td>
              <td>{user.email}</td>
              <td>
                {user.empType === 'executive' ? 'Executive' : 'Tele Caller'}
              </td>
            </tr>
          );
        })
      });
    } catch (err) {
      console.log(err);
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.id === 'searchQuery' && e.target.value === '') {
      this.fillUsers();
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    try {
      let res = await axios.get('/api/manager/' + this.state.searchQuery);
      const { token } = res.data;
      const decoded = jwt_decode(token);
      this.setState({
        displayUsers: decoded.users.map((emp, id) => {
          let user = emp.obj;
          const sendProps = {
            empType: user.empType,
            empId: user._id,
            name: user.name,
            email: user.email
          };
          return (
            <tr key={id}>
              <td>
                <Link
                  to={{
                    pathname: '/show',
                    state: { sendProps }
                  }}
                >
                  {user.name}
                </Link>
              </td>
              <td>{user.email}</td>
              <td>
                {user.empType === 'executive' ? 'Executive' : 'Tele Caller'}
              </td>
            </tr>
          );
        })
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Container fluid>
        <Container fluid>
          <Row className='justify-content-center'>
            <Col sm='10' md='6'>
              <p>
                <Link to='/register'>Register an Employee?</Link>
              </p>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId='searchQuery'>
                  <Form.Label>Enter Name to Search</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='name'
                    onChange={this.onChange}
                    value={this.state.searchQuery}
                  />
                </Form.Group>
                <Form.Group>
                  <p className='text-center'>
                    <Button variant='primary' type='submit'>
                      Submit
                    </Button>
                  </p>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <br />
        </Container>

        <Container fluid>
          <Row className='justify-content-center'>
            <Col md={8} sm={12}>
              {this.state.displayUsers ? (
                <Table>
                  <thead>
                    <tr>
                      <td>
                        <b>Name</b>
                      </td>
                      <td>
                        <b>Email</b>
                      </td>
                      <td>
                        <b>Emp Type</b>
                      </td>
                    </tr>
                  </thead>
                  <tbody>{this.state.displayUsers}</tbody>
                </Table>
              ) : null}
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

Manager.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(withRouter(Manager));
