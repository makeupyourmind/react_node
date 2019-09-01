import * as ACTION from '../actions/types';

const initialState = {
  user: {},
  err: ''
};

export default function(state = initialState, action) {
  // console.log("return data", action.payload);
  switch (action.type) {
    case ACTION.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case ACTION.LOGIN_FAILED : 
      return {
        ...state, 
        isAuth:action.isAuth, 
        err: action.err
    }
    case ACTION.REGISTER_SUCCESS : 
      return {
        ...state, 
        user: action.payload, 
        err: ""
    }
    case ACTION.REGISTER_FAILED : 
      return {
        ...state, 
        err: action.err
    }
    case ACTION.LOGOUT: 
      return {
        ...state,
        user: {}, 
        err: ""
    }
    default:
      return state;
  }
}