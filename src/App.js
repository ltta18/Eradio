import React from 'react';
// import logo from './logo.svg';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import history from './history'
import { useSelector } from 'react-redux';

import './App.css';

import BookZoom from 'components/Book/BookZoom';
import Page from 'components/Page';
import SignIn from 'components/User/SignIn';
import SignUp from 'components/User/SignUp';
import UserVerify from 'components/User/UserVerify';
import { selectAccessToken } from 'api/Reducer/AuthReducer';

const routes = [
  {
    name: 'signin-route',
    component: SignIn,
    path: '/signin',
    protected: false,
  },
  
  {
    name: 'signup-route',
    component: SignUp,
    path: '/signup',
    protected: false,
  },
    
  {
    name: 'verify-route',
    component: UserVerify,
    path: '/verify',
    protected: false,
  },

  {
    name: 'page-route',
    component: Page,
    path: '/',
    protected: true,
  },

  {
    name: 'question-route',
    component: BookZoom,
    path: '/book/question/:book_id',
    protected: true,
  },

  {
    name: 'result-route',
    component: BookZoom,
    path: '/book/result/:book_id',
    protected: true,
  },

  {
    name: 'book-route',
    component: BookZoom,
    path: '/book/:book_id/chapter/:chapter_id',
    protected: true,
  },

  {
    name: 'list-book-route',
    component: Page,
    path: '/components',
    protected: true,
  },

  {
    name: 'account-route',
    component: Page,
    path: '/account',
    protected: true,
  },


  {
    name: 'payment-route',
    component: Page,
    path: '/payment',
    protected: true,
  }, 

  {
    name: 'admin-route',
    component: Page,
    path: '/admin',
    protected: false,
  },
]

const App = () => {
  const accessToken = useSelector(selectAccessToken);
  const defaultRoute = accessToken ? '/' : '/signin';

  (function(timer) {
    window.addEventListener('load', function() {
      var el = document.querySelector('#body');
      if (el) {
        el.addEventListener('scroll', function(e) {
          (function(el){
            el.classList.add('scroll');
            clearTimeout(timer);
            timer = setTimeout(function() {
              el.classList.remove('scroll');
            }, 500);   
          })(el);
        })
      }
    })
  })();  

  return  (
    <Router history={history}>
      <Switch>
        {
          routes.map((route) => 
          // XOR
            !!accessToken === route.protected && 
            (<Route key={route.name} exact path={route.path}>
              <route.component/>
            </Route>))
        }
        <Redirect to={defaultRoute} />
      </Switch>
    </Router>
  )
}


export default App;
