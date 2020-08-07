import axios from 'axios';
import { FETCH_BOOK_REQUEST,
         FETCH_BOOK_SUCCESS,
         FETCH_BOOK_FAILURE} from '../../Type';
import { fetchLogOut } from '../User/AuthAction';

const fetchBookSuccess = (book_data) => {
  return {
    type: FETCH_BOOK_SUCCESS,
    payload: book_data
  }
}

const fetchBookFailure = (error) => {
  return {
    type: FETCH_BOOK_FAILURE,
    payload: error
  }
}

const fetchBookRequest = () => {
  return {
    type: FETCH_BOOK_REQUEST
  }
}

export const fetchBook = (book_id, token) => async (dispatch) => {
  dispatch(fetchBookRequest())
  try {
    const response = await axios.get('https://10.2.50.172/book/'+book_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchBookSuccess(response));
    return response;

  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchBookFailure(response.status));
      await dispatch(fetchLogOut(token));
    }
  }
};
