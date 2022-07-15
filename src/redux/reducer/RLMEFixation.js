import * as actionType from "../types/ActionTypes";

const initialState = {
  lmeFixation: [],
  postLmeFixation: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const LmeFixation = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LME_FIXATION_SET_DATA:
      return {
        ...state,
        lmeFixation: action.lmeFixation,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.LME_FIXATION_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.LME_FIXATION_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.LME_FIXATION_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.LME_FIXATION_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_LME_FIXATION_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_LME_FIXATION_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postLmeFixation: action.postLmeFixation,
      };
    case actionType.UPDATE_LME_FIXATION_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LME_FIXATION_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LME_FIXATION_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
