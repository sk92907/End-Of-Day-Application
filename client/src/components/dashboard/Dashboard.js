import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Manager } from '../manager/Manager';
import { Container, Col, Row } from 'react-bootstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: null
    };
  }

  componentWillMount() {
    if (this.props.user.empType === 'executive') {
      this.setState({
        render: (
          <p className='text-center'>
            <h4>
              <Link to='/update'>Fill Updates</Link>
            </h4>
            <br />
            <h4>
              <Link to='/leave'>Apply for Leaves</Link>
            </h4>
          </p>
        )
      });
    } else if (this.props.user.empType === 'teleCaller') {
      this.setState({
        render: (
          <p className='text-center'>
            <h4>
              <Link to='/update'>Fill Updates</Link>
            </h4>
            <br />
            <h4>
              <Link to='/leave'>Apply for Leaves</Link>
            </h4>
            <br />
            <h4>
              <Link to='/report'>Report Calls</Link>
            </h4>
          </p>
        )
      });
    } else {
      this.setState({
        render: <Manager />
      });
    }
  }

  render() {
    return (
      <Container fluid>
        <Container fluid>{this.state.render}</Container>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(withRouter(Dashboard));
