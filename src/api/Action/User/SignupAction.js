import axios from 'axios';
import {FETCH_SIGNUP_REQUEST,
        FETCH_SIGNUP_SUCCESS,
        FETCH_SIGNUP_FAILURE} from '../../Type';
import history from '../../../history';


const fetchSignUpSuccess = (users) => {
  return {
    type: FETCH_SIGNUP_SUCCESS,
    payload: users
  }
}

const fetchSignUpFailure = (error) => {
  return {
    type: FETCH_SIGNUP_FAILURE,
    payload: error
  }
}

const fetchSignUpRequest = () => {
  return {
    type: FETCH_SIGNUP_REQUEST
  }
}

export const fetchSignUp = (email, password) => async (dispatch) => {
  dispatch(fetchSignUpRequest())
  try {
    const response = await axios.post('http://10.2.50.232:1209/auth/signup', {
      email: email,
      password: password
    })
    dispatch(fetchSignUpSuccess(response));
    if (response.status === 202) {
      return 'Email này đã tồn tại!'
    } else {
      history.push('/verify');
    }
  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchSignUpFailure(response.status));
    }
  }
};
