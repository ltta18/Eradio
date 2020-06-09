import React from 'react';
import logo from './logo.svg';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import history from './history'
import { connect } from 'react-redux';

import './App.css';

import BookZoom from './components/Components/BookZoom';
import Page from './components/Page';
import SignIn from './components/SignIn_SignUp/SignIn';
import SignUp from './components/SignIn_SignUp/SignUp';
import UserVerify from './components/SignIn_SignUp/UserVerify';
import { fetchLogOut } from './api/Action/User/AuthAction';


const routes = [
  {
    component: SignIn,
    path: '/signin',
    protected: false,
  },
  
  {
    component: SignUp,
    path: '/signup',
    protected: false,
  },
    
  {
    component: UserVerify,
    path: '/verify',
    protected: false,
  },

  {
    component: Page,
    path: '/',
    protected: true,
  },

  {
    component: BookZoom,
    path: '/book/:book_id/chapter/:chapter_id',
    protected: true,
  },

  {
    component: Page,
    path: '/components',
    protected: true,
  },

  {
    component: Page,
    path: '/account',
    protected: true,
  },


  {
    component: Page,
    path: '/payment',
    protected: true,
  }, 
]

class App extends React.Component {
  componentDidMount = () => {
    if (this.props.error.status === '401') {
      this.props.fetchLogOut();
    }
  }

  render() {
    const { access_token } =  this.props;
    const default_route = access_token ? '/' : '/signin';
    return  (
      <Router history={history}>
        <Switch>
          {
            routes.map((route) => 
            // XOR
             ((!!access_token && route.protected) || (!access_token && !route.protected)) && 
              (<Route exact path={route.path}>
                <route.component token={access_token}/>
              </Route>))
          }
          <Redirect to={default_route} />
        </Switch>
      </Router>
    )
  };
}

const mapStateToProps = state => ({
  access_token: state.access_token,
  error: state.error,
})

export default connect(mapStateToProps, { fetchLogOut })(App);
