import axios from 'axios';
import { FETCH_GET_CHAPTER_REQUEST,
         FETCH_GET_CHAPTER_SUCCESS,
         FETCH_GET_CHAPTER_FAILURE} from '../../Type';
import { fetchLogOut } from '../User/AuthAction';
import history from '../../../history';

const fetchGetChapterSuccess = (chapter_content) => {
  return {
    type: FETCH_GET_CHAPTER_SUCCESS,
    payload: chapter_content
  }
}

const fetchGetChapterFailure = (error) => {
  return {
    type: FETCH_GET_CHAPTER_FAILURE,
    payload: error
  }
}

const fetchGetChapterRequest = () => {
  return {
    type: FETCH_GET_CHAPTER_REQUEST
  }
}

export const fetchGetChapter = (book_id, chapter_id, token) => async (dispatch) => {
  dispatch(fetchGetChapterRequest())
  try {
    const response = await axios.get('https://api.eradio.vn/book/'+book_id+'/chapter/'+chapter_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchGetChapterSuccess(response));
    history.push(`/book/${book_id}/chapter/${chapter_id}`);
    return response;

  } catch (e) {
    const response = e.response;
    if (response) {
      dispatch(fetchGetChapterFailure(response.status));
      await dispatch(fetchLogOut(token));
    }
  }
};
