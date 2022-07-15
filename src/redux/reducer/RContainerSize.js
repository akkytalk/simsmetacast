import * as actionType from "../types/ActionTypes";

const initialState = {
  containerSize: [],
  postContainerSize: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const ContainerSize = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CONTAINER_SIZE_SET_DATA:
      return {
        ...state,
        containerSize: action.containerSize,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.CONTAINER_SIZE_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.CONTAINER_SIZE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.CONTAINER_SIZE_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.CONTAINER_SIZE_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_CONTAINER_SIZE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_CONTAINER_SIZE_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postContainerSize: action.postContainerSize,
      };
    case actionType.UPDATE_CONTAINER_SIZE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_CONTAINER_SIZE_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_CONTAINER_SIZE_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
