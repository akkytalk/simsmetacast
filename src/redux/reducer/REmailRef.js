import * as actionType from "../types/ActionTypes";

const initialState = {
  emailRef: [],
  postEmailRef: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const EmailRef = (state = initialState, action) => {
  switch (action.type) {
    case actionType.EMAIL_REF_SET_DATA:
      return {
        ...state,
        emailRef: action.emailRef,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.EMAIL_REF_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.EMAIL_REF_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.EMAIL_REF_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.EMAIL_REF_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_EMAIL_REF_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_EMAIL_REF_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postEmailRef: action.postEmailRef,
      };
    case actionType.UPDATE_EMAIL_REF_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_EMAIL_REF_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_EMAIL_REF_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
