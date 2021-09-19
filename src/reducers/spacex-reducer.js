import { createAction } from "@reduxjs/toolkit";

//intial State
let initialState = {
  isLoading: true,
  dataLoadingSuccess: false,
  dataLoadingErrorMsg: "",
  launchData: [],
};

//Actions
const IS_DATA_LOADING = "IS_DATA_LOADING";
const DATA_LOADING_ERROR = "DATA_LOADING_ERROR";
const DATA_LOADING_SUCCESS = "DATA_LOADING_SUCCESS";

export function spacexReducer(state = initialState, action) {
  switch (action.type) {
    case IS_DATA_LOADING:
      state = { ...state, isLoading: action.payload.isLoading };
      break;

    case DATA_LOADING_ERROR:
      state = {
        ...state,
        isLoading: false,
        dataLoadingErrorMsg: action.payload.dataLoadingErrorMsg,
      };
      break;

    case DATA_LOADING_SUCCESS:
      console.log(action.payload.data);
      state = {
        ...state,
        isLoading: false,
        dataLoadingErrorMsg: "",
        launchData: action.payload.launchData,
      };
      break;

    default:
      return state;
  }
  return state;
}

//actions
export const dataLoadingAction = createAction("IS_DATA_LOADING");
export const dataLoadingErrorAction = createAction("DATA_LOADING_ERROR");
export const dataLoadingSuccessAction = createAction("DATA_LOADING_SUCCESS");
