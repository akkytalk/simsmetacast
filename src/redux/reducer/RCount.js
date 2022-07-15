import * as actionType from "../types/ActionTypes";

const initialState = {
  count: [],
  postCount: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const Count = (state = initialState, action) => {
  switch (action.type) {
    case actionType.COUNT_SET_DATA:
      return {
        ...state,
        count: action.count,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.COUNT_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.COUNT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.COUNT_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.COUNT_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_COUNT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_COUNT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postCount: action.postCount,
      };
    case actionType.UPDATE_COUNT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COUNT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COUNT_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
