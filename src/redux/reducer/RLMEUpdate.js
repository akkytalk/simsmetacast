import * as actionType from "../types/ActionTypes";

const initialState = {
  LMEUpdate: [],
  postLMEUpdate: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const LMEUpdate = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LME_UPDATE_SET_DATA:
      return {
        ...state,
        LMEUpdate: action.LMEUpdate,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.LME_UPDATE_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.LME_UPDATE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.LME_UPDATE_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.LME_UPDATE_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_LME_UPDATE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_LME_UPDATE_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postLMEUpdate: action.postLMEUpdate,
      };
    case actionType.UPDATE_LME_UPDATE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LME_UPDATE_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LME_UPDATE_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
