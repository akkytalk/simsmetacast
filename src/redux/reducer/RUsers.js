import * as actionType from "../types/ActionTypes";

const initialState = {
  users: [],
  postUsers: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const Users = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USERS_SET_DATA:
      return {
        ...state,
        users: action.users,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.USERS_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.USERS_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.USERS_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_USERS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_USERS_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postUsers: action.postUsers,
      };
    case actionType.UPDATE_USERS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_USERS_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_USERS_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
