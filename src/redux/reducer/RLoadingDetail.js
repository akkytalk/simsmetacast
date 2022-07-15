import * as actionType from "../types/ActionTypes";

const initialState = {
  loadingDetail: [],
  postLoadingDetail: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const LoadingDetail = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOADING_DETAIL_SET_DATA:
      return {
        ...state,
        loadingDetail: action.loadingDetail,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.LOADING_DETAIL_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.LOADING_DETAIL_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.LOADING_DETAIL_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.LOADING_DETAIL_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_LOADING_DETAIL_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_LOADING_DETAIL_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postLoadingDetail: action.postLoadingDetail,
      };
    case actionType.UPDATE_LOADING_DETAIL_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LOADING_DETAIL_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LOADING_DETAIL_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
