

import axios from 'axios';
import { FETCH_GET_USER_DETAIL_REQUEST,
         FETCH_GET_USER_DETAIL_SUCCESS,
         FETCH_GET_USER_DETAIL_FAILURE} from '../../Type';
import { fetchLogOut } from './AuthAction';

const fetchGetUserDetailSuccess = (user_detail) => {
  return {
    type: FETCH_GET_USER_DETAIL_SUCCESS,
    payload: user_detail
  }
}

const fetchGetUserDetailFailure = (error) => {
  return {
    type: FETCH_GET_USER_DETAIL_FAILURE,
    payload: error
  }
}

const fetchGetUserDetailRequest = () => {
  return {
    type: FETCH_GET_USER_DETAIL_REQUEST
  }
}

export const fetchGetUserDetail = (token) => async (dispatch) => {
  dispatch(fetchGetUserDetailRequest())
  try {
    const response = await axios.get('https://api.eradio.vn/auth/detail', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchGetUserDetailSuccess(response));
    return response;

  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchGetUserDetailFailure(response.status));
      await dispatch(fetchLogOut(token));
    }
  }
};
