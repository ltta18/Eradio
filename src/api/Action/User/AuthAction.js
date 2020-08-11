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
    const response = await axios.post('https://10.2.50.172:5000/auth/login', {
      email: email,
      password: password
    })
    dispatch(fetchSignInSuccess(response));
    history.push('/')
    
  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchSignInFailure(response.status));
    }
  }
};

export const fetchLogOut = (token) => (dispatch) => {
  dispatch(fetchLogOutRequest())
  try {
    const response = axios({
      method: 'POST',
      url: 'https://10.2.50.172/auth/logout',
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
