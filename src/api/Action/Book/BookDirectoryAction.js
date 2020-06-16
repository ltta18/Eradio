import axios from 'axios';
import { FETCH_GET_BOOK_REQUEST,
         FETCH_GET_BOOK_SUCCESS,
         FETCH_GET_BOOK_FAILURE} from '../../Type';
import { fetchLogOut } from '../User/AuthAction';

const fetchGetBookSuccess = (book_data) => {
  return {
    type: FETCH_GET_BOOK_SUCCESS,
    payload: book_data
  }
}

const fetchGetBookFailure = (error) => {
  return {
    type: FETCH_GET_BOOK_FAILURE,
    payload: error
  }
}

const fetchGetBookRequest = () => {
  return {
    type: FETCH_GET_BOOK_REQUEST
  }
}

export const fetchGetBook = (book_id, token) => async (dispatch) => {
  dispatch(fetchGetBookRequest())
  try {
    const response = await axios.get('https://api.eradio.vn/book/'+book_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchGetBookSuccess(response));
    return response;

  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchGetBookFailure(response.status));
      await dispatch(fetchLogOut(token));
    }
  }
};
