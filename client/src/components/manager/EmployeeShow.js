import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import Connect from 'redux';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { Container, Col, Row, Card, Button, Table } from 'react-bootstrap';

class EmployeeShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empId: '',
      empType: '',
      name: '',
      email: '',
      updates: [],
      leaves: [],
      reports: []
    };
  }

  componentWillMount() {
    this.setState({
      empId: this.props.location.state.sendProps.empId,
      empType:
        this.props.location.state.sendProps.empType === 'executive'
          ? 'Executive'
          : 'Tele Caller',
      name: this.props.location.state.sendProps.name,
      email: this.props.location.state.sendProps.email
    });
    if (
      this.props.user.empType === 'executive' ||
      this.props.user.empType === 'teleCaller'
    ) {
      this.props.history.push('/');
    }
  }

  updatesHandler = async () => {
    try {
      const res = await axios.get(
        '/api/manager/' + this.state.empId + '/updates'
      );
      const { token } = res.data;
      const decoded = jwt_decode(token);
      const updates = decoded.updates;
      this.setState({
        leaves: [],
        reports: [],
        updates: updates
      });
    } catch (error) {
      this.props.setAlert('Unable to fetch update details.', 'danger');
    }
  };

  leavesHandler = async () => {
    try {
      const res = await axios.get(
        '/api/manager/' + this.state.empId + '/leaves'
      );
      const { token } = res.data;
      const decoded = jwt_decode(token);
      const leaves = decoded.leaves;
      this.setState({
        updates: [],
        reports: [],
        leaves: leaves
      });
    } catch (error) {
      this.props.setAlert('Unable to fetch leave deatils.', 'danger');
    }
  };

  reportsHandler = async () => {
    try {
      const res = await axios.get(
        '/api/manager/' + this.state.empId + '/reports'
      );
      const { token } = res.data;
      const decoded = jwt_decode(token);
      const reports = decoded.reports;
      this.setState({
        updates: [],
        reports: reports,
        leaves: []
      });
    } catch (error) {
      this.props.setAlert('Unable to fetch Reports.', 'danger');
    }
  };

  render() {
    return (
      <Container fluid>
        <Container fluid>
          <Row className='justify-content-around'>
            <Col md='4' sm='10'>
              <Card className='text-center'>
                <Card.Title>
                  <b>
                    {this.state.empType}
                    {' : '}
                  </b>
                  {this.state.name}
                </Card.Title>
                <Card.Subtitle>{this.state.email}</Card.Subtitle>
              </Card>
            </Col>
            <Col md='4' sm='10'>
              <Card className='text-center'>
                <Card.Link href='/dashboard'>Go back?</Card.Link>
                <Card.Text>
                  <Button
                    variant='outline-success'
                    size='sm'
                    className='my-3 mx-2'
                    onClick={this.updatesHandler}
                  >
                    View Updates
                  </Button>
                  <Button
                    variant='outline-warning'
                    size='sm'
                    onClick={this.leavesHandler}
                  >
                    View Leaves
                  </Button>{' '}
                  {this.state.empType === 'Tele Caller' ? (
                    <Button
                      variant='outline-success'
                      size='sm'
                      onClick={this.reportsHandler}
                    >
                      View Reports
                    </Button>
                  ) : null}
                </Card.Text>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Table striped bordered hover>
            {this.state.updates.length > 0 ? (
              <thead>
                <tr>
                  <td>
                    <b>Date</b>
                  </td>
                  <td>
                    <b>Task Input</b>
                  </td>
                  <td>
                    <b>Work Description</b>
                  </td>
                  <td>
                    <b>Total Working Hours</b>
                  </td>
                </tr>
              </thead>
            ) : null}
            {this.state.leaves.length > 0 ? (
              <thead>
                <tr>
                  <td>
                    <b>Holidays</b>
                  </td>
                  <td>
                    <b>Reason</b>
                  </td>
                  <td>
                    <b>Date</b>
                  </td>
                </tr>
              </thead>
            ) : null}
            {this.state.reports.length > 0 ? (
              <thead>
                <tr>
                  <td>
                    <b>Date</b>
                  </td>
                  <td>
                    <b>Total Calls</b>
                  </td>
                  <td>
                    <b>Calls Received</b>
                  </td>
                  <td>
                    <b>Calls Not Received</b>
                  </td>
                </tr>
              </thead>
            ) : null}
            <tbody>
              {this.state.updates.map((update, i) => (
                <tr key={i}>
                  <td>{update.date}</td>
                  <td>{update.taskInput}</td>
                  <td>{update.workDescription}</td>
                  <td>{update.totalWorkingHours}</td>
                </tr>
              ))}
              {this.state.leaves.map((leave, i) => (
                <tr key={i}>
                  <td>{leave.holidays}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.date}</td>
                </tr>
              ))}
              {this.state.reports.map((report, i) => (
                <tr key={i}>
                  <td>{report.date}</td>
                  <td>{report.totalCalls}</td>
                  <td>{report.callsReceived}</td>
                  <td>{report.callsNotReceived}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Container>
    );
  }
}

EmployeeShow.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { setAlert })(EmployeeShow);
