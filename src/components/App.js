import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Routes from './Routes';
import NavBar from './NavBar';
import Login from './Login';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { notLoggedIn } = this.props;
    return (
      <Router>
        <Fragment>
          <div className='main-container'>
            {notLoggedIn ? (
              <>
                <NavBar />
                <Route render={() => <Login />} />
              </>
            ) : (
              <>
                <NavBar />
                <Routes notLoggedIn={notLoggedIn} />
              </>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    notLoggedIn: authedUser === null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
