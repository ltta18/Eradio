import axios from 'axios';
import { FETCH_LIBRARY_REQUEST,
         FETCH_LIBRARY_SUCCESS,
         FETCH_LIBRARY_FAILURE} from '../../Type';
import { fetchLogOut } from '../User/AuthAction';

const fetchLibrarySuccess = (library) => {
  return {
    type: FETCH_LIBRARY_SUCCESS,
    payload: library
  }
}

const fetchLibraryFailure = (error) => {
  return {
    type: FETCH_LIBRARY_FAILURE,
    payload: error
  }
}

const fetchLibraryRequest = () => {
  return {
    type: FETCH_LIBRARY_REQUEST
  }
}

export const fetchLibrary = (token) => async (dispatch) => {
  dispatch(fetchLibraryRequest())
  try {
    const response = await axios.get('https://10.2.50.232:1209/category/library', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchLibrarySuccess(response));
    return response;
    
  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchLibraryFailure(response.status));
      await dispatch(fetchLogOut(token));
    }
  }
};
