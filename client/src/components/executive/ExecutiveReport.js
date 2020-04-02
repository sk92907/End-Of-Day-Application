import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { setAlert } from '../../actions/alertActions';

class ExecutiveReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCalls: 0,
      callsReceived: 0,
      callsNotReceived: 0,
      response: ''
    };
  }

  componentWillMount() {
    if (this.props.user.empType === 'executive') this.props.history.push('/');
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const reportData = {
      empId: this.props.user.id,
      totalCalls: this.state.totalCalls,
      callsReceived: this.state.callsReceived,
      callsNotReceived: this.state.callsNotReceived
    };
    axios
      .post('/api/employee/' + this.props.user.id + '/report', reportData)
      .then(res => {
        this.props.setAlert('Successfully Submitted.', 'success');
        this.props.history.push('/');
      })
      .catch(err => {
        this.props.setAlert(err.response.data.message, 'danger');
        this.props.history.push('/report');
      });
  };

  render() {
    return (
      <Container fluid>
        <Row className='justify-content-center'>
          <Col md={4} sm={6} xs={12}>
            <Link to='/'>Back to home</Link>{' '}
            <h4>
              <b>Submit Call Reports</b>
            </h4>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId='totalCalls'>
                <Form.Label>Total Calls</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='total calls'
                  onChange={this.onChange}
                  value={this.state.totalCalls}
                  min='1'
                  max='50'
                  required
                />
              </Form.Group>

              <Form.Group controlId='callsReceived'>
                <Form.Label>Calls Received</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='calls received'
                  onChange={this.onChange}
                  value={this.state.callsReceived}
                  min='1'
                  max='50'
                  required
                />
              </Form.Group>

              <Form.Group controlId='callsNotReceived'>
                <Form.Label>Calls Not Received</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='calls not received'
                  onChange={this.onChange}
                  value={this.state.callsNotReceived}
                  required
                />
              </Form.Group>

              <Form.Group controlId='response'>
                <Form.Label>Response</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='response'
                  onChange={this.onChange}
                  value={this.state.response}
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

ExecutiveReport.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { setAlert })(
  withRouter(ExecutiveReport)
);
