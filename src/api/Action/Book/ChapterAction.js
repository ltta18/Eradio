import axios from 'axios';
import { FETCH_CHAPTER_REQUEST,
         FETCH_CHAPTER_SUCCESS,
         FETCH_CHAPTER_FAILURE} from '../../Type';
import { fetchLogOut } from '../User/AuthAction';
import history from '../../../history';

const fetchChapterSuccess = (chapter_content) => {
  return {
    type: FETCH_CHAPTER_SUCCESS,
    payload: chapter_content
  }
}

const fetchChapterFailure = (error) => {
  return {
    type: FETCH_CHAPTER_FAILURE,
    payload: error
  }
}

const fetchChapterRequest = () => {
  return {
    type: FETCH_CHAPTER_REQUEST
  }
}

export const fetchChapter = (book_id, chapter_id, token) => async (dispatch) => {
  dispatch(fetchChapterRequest())
  try {
    const response = await axios.get('https://api.eradio.vn/book/'+book_id+'/chapter/'+chapter_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchChapterSuccess(response));
    history.push(`/book/${book_id}/chapter/${chapter_id}`);
    return response;

  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchChapterFailure(response.status));
      await dispatch(fetchLogOut(token));
    }
  }
};
