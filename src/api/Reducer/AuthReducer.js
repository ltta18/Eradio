import { FETCH_SIGNIN_REQUEST, 
         FETCH_SIGNIN_SUCCESS, 
         FETCH_SIGNIN_FAILURE,
         FETCH_LOGOUT_REQUEST,
         FETCH_LOGOUT_SUCCESS, 
         FETCH_LOGOUT_FAILURE,} from "../Type"

const initialState = {
  access_token: '',
  error: ''
}

const auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SIGNIN_REQUEST:
      return {
        ...state,
      }
    case FETCH_SIGNIN_SUCCESS:
      return {
        ...state,
        access_token: action.payload.data.auth_token,
      }
    case FETCH_SIGNIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case FETCH_LOGOUT_REQUEST:
      return {
        ...state,
      }
    case FETCH_LOGOUT_SUCCESS:
      return {
        ...state,
        access_token: '',
        error: '',
      }
    case FETCH_LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default: return state
  }
}

export default auth_reducer;