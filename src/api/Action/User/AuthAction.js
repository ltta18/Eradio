import axios from 'axios';
import history from '../../../history';
import { FETCH_SIGNIN_REQUEST, 
         FETCH_SIGNIN_SUCCESS, 
         FETCH_SIGNIN_FAILURE,
         FETCH_LOGOUT_REQUEST,
         FETCH_LOGOUT_SUCCESS, 
         FETCH_LOGOUT_FAILURE} from '../../Type';

const fetchSignInSuccess = (users) => {
  return {
    type: FETCH_SIGNIN_SUCCESS,
    payload: users
  }
}

const fetchSignInFailure = (error) => {
  return {
    type: FETCH_SIGNIN_FAILURE,
    payload: error
  }
}

const fetchSignInRequest = () => {
  return {
    type: FETCH_SIGNIN_REQUEST
  }
}

const fetchLogOutRequest = () => {
  return {
    type: FETCH_LOGOUT_REQUEST,
  }
}

const fetchLogOutSuccess = (users) => {
  return {
    type: FETCH_LOGOUT_SUCCESS,
    payload: users
  }
}

const fetchLogOutFailure = (error) => {
  return {
    type: FETCH_LOGOUT_FAILURE,
    payload: error
  }
}

export const fetchSignIn = (email, password) => async (dispatch) => {
  dispatch(fetchSignInRequest())
  try {
    const response = await axios.post('https://api.eradio.vn/auth/login', {
      email: email,
      password: password
    })
    dispatch(fetchSignInSuccess(response));
    history.push('/');
    
  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchSignInFailure(response.status));

      var error = document.getElementById('error');
      error.classList.add('show-flex');
      error.classList.remove('show-none');
      
      var email_container = document.getElementById('email-container');
      email_container.style.borderColor = '#cc0000';

      var password_container = document.getElementById('password-container');
      password_container.style.borderColor = '#cc0000';
    }
  }
};

export const fetchLogOut = (token) => (dispatch) => {
  dispatch(fetchLogOutRequest())
  try {
    const response = axios({
      method: 'POST',
      url: 'https://api.eradio.vn/auth/logout',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    dispatch(fetchLogOutSuccess(response));

  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchLogOutFailure(response.status));
    }
  }
};
