import axios from 'axios';
import {FETCH_SEARCH_REQUEST,
        FETCH_SEARCH_SUCCESS,
        FETCH_SEARCH_FAILURE} from '../../Type';


const fetchSearchSuccess = (books) => {
  return {
    type: FETCH_SEARCH_SUCCESS,
    payload: books
  }
}

const fetchSearchFailure = (error) => {
  return {
    type: FETCH_SEARCH_FAILURE,
    payload: error
  }
}

const fetchSearchRequest = () => {
  return {
    type: FETCH_SEARCH_REQUEST
  }
}

export const fetchSearch = (token, name) => async (dispatch) => {
  dispatch(fetchSearchRequest())
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://api.eradio.vn/category/search',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        name: name,
      }
    })
    dispatch(fetchSearchSuccess(response));
    return response

  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchSearchFailure(response.status));
    }
  }
};
