import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { setAlert } from '../../actions/alertActions';

class ExecutiveUpdates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInput: '',
      workDescription: '',
      totalWorkingHours: 0
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const reportData = {
      empId: this.props.user.id,
      taskInput: this.state.taskInput,
      workDescription: this.state.workDescription,
      totalWorkingHours: this.state.totalWorkingHours
    };
    axios
      .post('/api/employee/' + this.props.user.id + '/update', reportData)
      .then(res => {
        this.props.setAlert('Successfully submitted.', 'success');
        this.props.history.push('/');
      })
      .catch(err => {
        this.props.setAlert(err.response.data.message, 'danger');
        this.props.history.push('/update');
      });
  };

  render() {
    return (
      <Container fluid>
        <Row className='justify-content-center'>
          <Col md={4} sm={6} xs={12}>
            <Link to='/'>Back to home</Link>{' '}
            <h4>
              <b>Sumbit Updates</b>
            </h4>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId='taskInput'>
                <Form.Label>Task Input</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='task input'
                  onChange={this.onChange}
                  value={this.state.taskInput}
                  required
                />
              </Form.Group>

              <Form.Group controlId='workDescription'>
                <Form.Label>Work Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='work description'
                  onChange={this.onChange}
                  value={this.state.workDescription}
                  required
                />
              </Form.Group>
              <Form.Group controlId='totalWorkingHours'>
                <Form.Label>Total Working Hours</Form.Label>
                <Form.Control
                  type='number'
                  onChange={this.onChange}
                  value={this.state.totalWorkingHours}
                  min='4'
                  max='10'
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

ExecutiveUpdates.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { setAlert })(
  withRouter(ExecutiveUpdates)
);
