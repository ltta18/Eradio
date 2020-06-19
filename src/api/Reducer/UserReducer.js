import { FETCH_USER_DETAIL_REQUEST,
         FETCH_USER_DETAIL_SUCCESS,
         FETCH_USER_DETAIL_FAILURE } from '../Type';

const initialState = {
  user_detail: {},
  error: '',
}

const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DETAIL_REQUEST:
      return {
        ...state,
      }
    case FETCH_USER_DETAIL_SUCCESS:
      return {
        ...state,
        user_detail: action.payload,
      }
    case FETCH_USER_DETAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default: return state
  }
}

export default user_reducer;
export const selectUserDetail = state => state.user_reducer.user_detail