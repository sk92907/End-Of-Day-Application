import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alerts.alerts && nextProps.alerts.alerts.length > 0) {
      let alertsList;
      alertsList = nextProps.alerts.alerts.map(alert => {
        return <Alert variant={alert.alertType}>{alert.msg}</Alert>;
      });
      this.setState({
        alerts: alertsList
      });
    } else {
      this.setState({
        alerts: null
      });
    }
  }

  render() {
    return this.state.alerts;
  }
}

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Notifications);
