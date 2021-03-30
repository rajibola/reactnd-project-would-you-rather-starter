import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import NewQuestion from './NewQuestion';
import QuestionDetails from './QuestionDetails';
import LeaderBoard from './LeaderBoard';
import Logout from './Logout';

function Routes(props) {
  return (
    <div className='container'>
      <Switch>
        {props.notLoggedIn ? (
          <Route path='/' exact component={Login} />
        ) : (
          <Fragment>
            <Route path='/' exact component={Dashboard} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leaderboard' exact component={LeaderBoard} />
            <Route path='/questions/:id' component={QuestionDetails} />
            <Route exact path='/logout' component={Logout} />
          </Fragment>
        )}
      </Switch>
    </div>
  );
}

Routes.propTypes = { notLoggedIn: PropTypes.any };

export default Routes;
