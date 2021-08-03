import * as actionTypes from "../types";
import axios from "axios";
import queryString from "query-string";

export const baseURL = "http://hr.ekrut.co";

export const http = (params, setProgress) => async (dispatch, state) => {
  try {
    let auth = JSON.parse(localStorage.getItem("Ekrut-regis"));
    let query = params.query
      ? "?" + queryString.stringify(params.query, { arrayFormat: "bracket" })
      : "";
    let config = {
      method: params.method ? params.method : "GET",
      baseURL: baseURL,
      url: params.path ? params.path + (query || "") : "",
      data: params.data ? params.data : {},
      headers: {
        Authorization: "Bearer " + (auth ? auth.jwt : ""),
        "Content-Type": params.content_type
          ? params.content_type
          : "application/json",
      },
      onUploadProgress: function (progressEvent) {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (setProgress) {
          setProgress("progress", percentCompleted);
        }
      },
    };

    let { data } = await axios(config);
    return { success: true, response: data };
  } catch (err) {
    let newErr = { success: false, response: err };
    return newErr;
  }
};

export const changeStateLoading = state => {
  return {
    type: actionTypes.SET_LOADING,
    state,
  };
};

export const changeStateUserId = state => {
  return {
    type: actionTypes.SET_USERID,
    state,
  };
};

export const onSubmitBasicForm = data => async dispatch => {
  let params = {
    method: "POST",
    path: "/items/users",
    data,
  };

  const res = await dispatch(http(params));
  if (res.success) {
    //console.log("[sukses create User]", res);
  } else {
    //console.log("error create user");
  }
  return res;
};

export const onSubmitEduForm = data => async dispatch => {
  let params = {
    method: "POST",
    path: "/items/education",
    data,
  };

  const res = await dispatch(http(params));
  if (res.success) {
    // console.log("[sukses create edu]", res);
  } else {
    //console.log("error create edu");
  }
  return res;
};

export const onSubmitExperienceForm = data => async dispatch => {
  let params = {
    method: "POST",
    path: "/items/experience",
    data,
  };

  const res = await dispatch(http(params));
  if (res.success) {
    //console.log("[sukses create xperience]", res);
  } else {
    //console.log("error create xperience");
  }
  return res;
};
