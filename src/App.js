import React from 'react';
import logo from './logo.svg';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import history from './history'
import { useSelector } from 'react-redux';

import './App.css';

import BookZoom from 'components/Book/BookZoom';
import Page from 'components/Page';
import SignIn from 'components/User/SignIn';
import SignUp from 'components/User/SignUp';
import UserVerify from 'components/User/UserVerify';
import { fetchLogOut } from 'api/Action/User/AuthAction';


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
    path: '/book/question/:book_id',
    protected: true,
  },

  {
    component: BookZoom,
    path: '/book/result/:book_id',
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

const App = () => {
  const accessToken = useSelector(state => state.access_token);
  const defaultRoute = accessToken ? '/' : '/signin';
  return  (
    <Router history={history}>
      <Switch>
        {
          routes.map((route) => 
          // XOR
            ((!!accessToken && route.protected) || (!accessToken && !route.protected)) && 
            (<Route exact path={route.path}>
              <route.component token={accessToken}/>
            </Route>))
        }
        <Redirect to={defaultRoute} />
      </Switch>
    </Router>
  )
}


export default App;
