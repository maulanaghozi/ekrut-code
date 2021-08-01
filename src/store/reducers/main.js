import * as actionTypes from "../types";

const initialState = {
  loading: false,
  userId: null,
};

const changeStateLoading = (state, action) => {
  return {
    ...state,
    loading: action.state,
  };
};

const changeStateUserId = (state, action) => {
  return {
    ...state,
    userId: action.state,
  };
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return changeStateLoading(state, action);
    case actionTypes.SET_USERID:
      return changeStateUserId(state, action);
    default:
      return state;
  }
};

export default mainReducer;
