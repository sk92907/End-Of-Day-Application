import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Button, Row, Col } from 'react-bootstrap';

class Landing extends Component {
  componentWillMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
  }

  render() {
    return (
      <Container fluid>
        <Row className='justify-content-md-center'>
          <Col lg='6' sm='8'>
            <Jumbotron fluid>
              <p>
                <h1 className='text-center'>Welcome User!</h1> <br />
              </p>
              <p className='text-center'>
                <Button variant='dark'>
                  <Link to='/login'>Log In</Link>
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(withRouter(Landing));
