import { FETCH_SIGNIN_REQUEST, 
         FETCH_SIGNIN_SUCCESS, 
         FETCH_SIGNIN_FAILURE,
         FETCH_LOGOUT_REQUEST,
         FETCH_LOGOUT_SUCCESS, 
         FETCH_LOGOUT_FAILURE,} from "../Type"

const initialState = {
  access_token: '',
  is_loading: false,
  error: ''
}

const auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SIGNIN_REQUEST:
      return {
        ...state,
        is_loading: true,
      }
    case FETCH_SIGNIN_SUCCESS:
      return {
        ...state,
        access_token: action.payload.data.auth_token,
        is_loading: false,
      }
    case FETCH_SIGNIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        is_loading: false,
      }
    case FETCH_LOGOUT_REQUEST:
      return {
        ...state,
        is_loading: true,
      }
    case FETCH_LOGOUT_SUCCESS:
      return {
        ...state,
        access_token: '',
        error: '',
        is_loading: false,
      }
    case FETCH_LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        is_loading: false,
      }
    default: return state
  }
}

export default auth_reducer;