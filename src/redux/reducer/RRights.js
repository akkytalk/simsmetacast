import * as actionType from "../types/ActionTypes";

const initialState = {
  rights: [],
  postRights: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const Rights = (state = initialState, action) => {
  switch (action.type) {
    case actionType.RIGHTS_SET_DATA:
      return {
        ...state,
        rights: action.rights,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.RIGHTS_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.RIGHTS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.RIGHTS_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.RIGHTS_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_RIGHTS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_RIGHTS_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postRights: action.postRights,
      };
    case actionType.UPDATE_RIGHTS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_RIGHTS_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_RIGHTS_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
