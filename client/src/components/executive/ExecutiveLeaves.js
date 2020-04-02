import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { setAlert } from '../../actions/alertActions';

class ExecutiveLeaves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holidays: 0,
      date: '',
      reason: ''
    };
  }

  componentWillMount() {
    if (
      this.props.user.empType !== 'executive' &&
      this.props.user.empType !== 'teleCaller'
    )
      this.props.history.push('/');
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const leaveData = {
      empId: this.props.user.id,
      holidays: this.state.holidays,
      date: this.state.date,
      reason: this.state.reason
    };
    axios
      .post('/api/employee/' + this.props.user.id + '/leave', leaveData)
      .then(res => {
        this.props.setAlert('Successfully submitted.', 'success');
        this.props.history.push('/');
      })
      .catch(err => {
        this.props.setAlert(err.response.data.message, 'danger');
        this.props.history.push('/leave');
      });
  };

  render() {
    return (
      <Container fluid>
        <Row className='justify-content-center'>
          <Col md={4} sm={6} xs={12}>
            <Link to='/'>Back to home</Link>{' '}
            <h4>
              <b>Submit Leaves</b>
            </h4>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId='holidays'>
                <Form.Label>Number of Holidays</Form.Label>
                <Form.Control
                  type='number'
                  max='28'
                  min='1'
                  placeholder='number of holidays'
                  onChange={this.onChange}
                  value={this.state.holidays}
                  required
                />
              </Form.Group>

              <Form.Group controlId='date'>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type='date'
                  onChange={this.onChange}
                  value={this.state.date}
                  required
                  min="<?= date('Y-m-d'); ?>"
                />
              </Form.Group>
              <Form.Group controlId='reason'>
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='reason'
                  onChange={this.onChange}
                  value={this.state.reason}
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

ExecutiveLeaves.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { setAlert })(
  withRouter(ExecutiveLeaves)
);
