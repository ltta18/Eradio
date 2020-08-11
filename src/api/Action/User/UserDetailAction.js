

import axios from 'axios';
import { FETCH_USER_DETAIL_REQUEST,
         FETCH_USER_DETAIL_SUCCESS,
         FETCH_USER_DETAIL_FAILURE} from '../../Type';
import { fetchLogOut } from './AuthAction';

const fetchUserDetailSuccess = (user_detail) => {
  return {
    type: FETCH_USER_DETAIL_SUCCESS,
    payload: user_detail
  }
}

const fetchUserDetailFailure = (error) => {
  return {
    type: FETCH_USER_DETAIL_FAILURE,
    payload: error
  }
}

const fetchUserDetailRequest = () => {
  return {
    type: FETCH_USER_DETAIL_REQUEST
  }
}

export const fetchUserDetail = (token) => async (dispatch) => {
  dispatch(fetchUserDetailRequest())
  try {
    const response = await axios.get('https://10.2.50.232:1209/auth/detail', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    dispatch(fetchUserDetailSuccess(response));
    return response

  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchUserDetailFailure(response.status));
      await dispatch(fetchLogOut(token));
    }
  }
};
