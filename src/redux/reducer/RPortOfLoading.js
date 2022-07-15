import * as actionType from "../types/ActionTypes";

const initialState = {
  portLoading: [],
  postPortLoading: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const PortLoading = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PORT_LOADING_SET_DATA:
      return {
        ...state,
        portLoading: action.portLoading,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.PORT_LOADING_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.PORT_LOADING_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.PORT_LOADING_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.PORT_LOADING_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_PORT_LOADING_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_PORT_LOADING_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postPortLoading: action.postPortLoading,
      };
    case actionType.UPDATE_PORT_LOADING_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PORT_LOADING_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PORT_LOADING_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
