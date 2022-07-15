import * as actionType from "../types/ActionTypes";

const initialState = {
  claims: [],
  postClaims: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const Claims = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CLAIMS_SET_DATA:
      return {
        ...state,
        claims: action.claims,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.CLAIMS_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.CLAIMS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.CLAIMS_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.CLAIMS_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_CLAIMS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_CLAIMS_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postClaims: action.postClaims,
      };
    case actionType.UPDATE_CLAIMS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_CLAIMS_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_CLAIMS_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
