import * as actionType from "../types/ActionTypes";

const initialState = {
  fileUpload: [],
  postFileUpload: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const FileUpload = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FILE_UPLOAD_SET_DATA:
      return {
        ...state,
        fileUpload: action.fileUpload,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.FILE_UPLOAD_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.FILE_UPLOAD_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.FILE_UPLOAD_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.FILE_UPLOAD_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_FILE_UPLOAD_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_FILE_UPLOAD_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postFileUpload: action.postFileUpload,
      };
    case actionType.UPDATE_FILE_UPLOAD_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_FILE_UPLOAD_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_FILE_UPLOAD_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
