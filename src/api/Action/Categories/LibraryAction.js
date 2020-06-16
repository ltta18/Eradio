import axios from 'axios';
import { FETCH_GET_LIBRARY_REQUEST,
         FETCH_GET_LIBRARY_SUCCESS,
         FETCH_GET_LIBRARY_FAILURE} from '../../Type';
import { fetchLogOut } from '../User/AuthAction';

const fetchGetLibrarySuccess = (library) => {
  return {
    type: FETCH_GET_LIBRARY_SUCCESS,
    payload: library
  }
}

const fetchGetLibraryFailure = (error) => {
  return {
    type: FETCH_GET_LIBRARY_FAILURE,
    payload: error
  }
}

const fetchGetLibraryRequest = () => {
  return {
    type: FETCH_GET_LIBRARY_REQUEST
  }
}

export const fetchGetLibrary = (token) => async (dispatch) => {
  dispatch(fetchGetLibraryRequest())
  try {
    const response = await axios.get('http://api.eradio.vn/category/library', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchGetLibrarySuccess(response));
    return response;
    
  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchGetLibraryFailure(response.status));
      await dispatch(fetchLogOut(token));
    }
  }
};
