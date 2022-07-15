import * as actionType from "../types/ActionTypes";

const initialState = {
  country: [],
  postCountry: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const Country = (state = initialState, action) => {
  switch (action.type) {
    case actionType.COUNTRY_SET_DATA:
      return {
        ...state,
        country: action.country,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.COUNTRY_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.COUNTRY_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.COUNTRY_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.COUNTRY_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_COUNTRY_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_COUNTRY_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postCountry: action.postCountry,
      };
    case actionType.UPDATE_COUNTRY_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COUNTRY_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COUNTRY_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
