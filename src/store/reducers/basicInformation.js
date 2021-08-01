import * as actionTypes from "../types";

const initialState = {
  fullname: "",
  email: "",
  phone: "",
};

const changeStateFullname = (state, action) => {
  return {
    ...state,
    fullname: action.state,
  };
};

const changeStateEmail = (state, action) => {
  return {
    ...state,
    email: action.state,
  };
};

const changeStatePhone = (state, action) => {
  return {
    ...state,
    phone: action.state,
  };
};

const basicInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FULLNAME:
      return changeStateFullname(state, action);
    case actionTypes.SET_EMAIL:
      return changeStateEmail(state, action);
    case actionTypes.SET_PHONE:
      return changeStatePhone(state, action);
    default:
      return state;
  }
};

export default basicInformationReducer;
