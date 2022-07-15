import * as actionType from "../types/ActionTypes";

const initialState = {
  payment: [],
  postPayment: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const Payment = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PAYMENT_SET_DATA:
      return {
        ...state,
        payment: action.payment,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.PAYMENT_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.PAYMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.PAYMENT_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.PAYMENT_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_PAYMENT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_PAYMENT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postPayment: action.postPayment,
      };
    case actionType.UPDATE_PAYMENT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PAYMENT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PAYMENT_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
