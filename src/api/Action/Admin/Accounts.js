import axios from 'axios';
import { FETCH_ACCOUNTS_REQUEST,
         FETCH_ACCOUNTS_SUCCESS,
         FETCH_ACCOUNTS_FAILURE} from '../../Type';
import { fetchLogOut } from '../User/AuthAction';
import history from '../../../history';

const fetchAccountsSuccess = (accounts) => {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    payload: accounts
  }
}

const fetchAccountsFailure = (error) => {
  return {
    type: FETCH_ACCOUNTS_FAILURE,
    payload: error
  }
}

const fetchAccountsRequest = () => {
  return {
    type: FETCH_ACCOUNTS_REQUEST
  }
}

export const fetchAccounts = (book_id, token) => async (dispatch) => {
  dispatch(fetchAccountsRequest())
  try {
    const response = await axios.get(`https://10.2.50.232:1209/book/accounts/${book_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchAccountsSuccess(response));
    history.push(`/book/accounts/${book_id}`);
    return response;

  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchAccountsFailure(response.status));
      await dispatch(fetchLogOut(token));
    }
  }
};
