import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkAuth } from '../actions/index';

class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.props.checkAuth();
  }

  render() {
    return (
      this.props.children
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ checkAuth: checkAuth }, dispatch);
}

export default connect(null, mapDispatchToProps)(AppContainer);
