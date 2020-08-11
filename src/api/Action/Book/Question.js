import axios from 'axios';
import { FETCH_QUESTION_REQUEST,
         FETCH_QUESTION_SUCCESS,
         FETCH_QUESTION_FAILURE} from '../../Type';
import { fetchLogOut } from '../User/AuthAction';
import history from '../../../history';

const fetchQuestionSuccess = (question) => {
  return {
    type: FETCH_QUESTION_SUCCESS,
    payload: question
  }
}

const fetchQuestionFailure = (error) => {
  return {
    type: FETCH_QUESTION_FAILURE,
    payload: error
  }
}

const fetchQuestionRequest = () => {
  return {
    type: FETCH_QUESTION_REQUEST
  }
}

export const fetchQuestion = (book_id, token) => async (dispatch) => {
  dispatch(fetchQuestionRequest())
  try {
    const response = await axios.get(`https://10.2.50.232:5000/book/question/${book_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchQuestionSuccess(response));
    history.push(`/book/question/${book_id}`);
    return response;

  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchQuestionFailure(response.status));
      await dispatch(fetchLogOut(token));
    }
  }
};
