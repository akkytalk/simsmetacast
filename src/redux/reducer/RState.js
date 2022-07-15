import * as actionType from "../types/ActionTypes";

const initialState = {
  state: [],
  postState: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const State = (state = initialState, action) => {
  switch (action.type) {
    case actionType.STATE_SET_DATA:
      return {
        ...state,
        state: action.state,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.STATE_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.STATE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.STATE_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.STATE_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_STATE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_STATE_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postState: action.postState,
      };
    case actionType.UPDATE_STATE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_STATE_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_STATE_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
