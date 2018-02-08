import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

import Login from './scenes/Login';
import Example from './scenes/Example';

export default class App extends Component {

  render() {
    return (
      // <Provider store={ store }>
        <Router>
          <Scene key='root'>
            <Scene
              key='login'
              component={ Login }
              title='Login'
              hideNavBar
              initial />
            <Scene
              key='example'
              component={ Example }
              title='Example' />
          </Scene>
        </Router>
      // </Provider>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     user: state.user
//   };
// }

// export default connect(mapStateToProps, null)(App);
