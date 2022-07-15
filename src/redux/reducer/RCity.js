import * as actionType from "../types/ActionTypes";

const initialState = {
  city: [],
  postCity: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const City = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CITY_SET_DATA:
      return {
        ...state,
        city: action.city,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.CITY_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.CITY_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.CITY_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.CITY_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_CITY_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_CITY_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postCity: action.postCity,
      };
    case actionType.UPDATE_CITY_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_CITY_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_CITY_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
