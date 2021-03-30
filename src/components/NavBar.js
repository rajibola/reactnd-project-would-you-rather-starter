import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';
import User from './User';
import Login from './Login';
import { unsetAuthedUser } from '../actions/authedUser';

class NavBar extends PureComponent {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { authedUser } = this.props;

    return (
      <div>
        <Navbar bg='primary' variant='dark' light expand='md'>
          <NavbarBrand tag={Link} to='/'>
            Would You Rather
          </NavbarBrand>
          {authedUser ? (
            <Fragment>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className='ml-auto' navbar>
                  <NavItem>
                    <NavLink tag={Link} to='/add'>
                      New Question
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to='/leaderboard'>
                      LeaderBoard
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <User id={authedUser} />
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to='/logout'>
                      Logout
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Fragment>
          ) : (
            <Redirect to='/' exact component={Login} />
          )}
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  authedUser: PropTypes.string,
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(unsetAuthedUser());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
