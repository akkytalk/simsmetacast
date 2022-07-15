import * as actionType from "../types/ActionTypes";

const initialState = {
  paymentPendingUnit: [],
  postPaymentPendingUnit: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const PaymentPendingUnit = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PAYMENT_PENDING_UNIT_SET_DATA:
      return {
        ...state,
        paymentPendingUnit: action.paymentPendingUnit,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.PAYMENT_PENDING_UNIT_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.PAYMENT_PENDING_UNIT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.PAYMENT_PENDING_UNIT_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.PAYMENT_PENDING_UNIT_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_PAYMENT_PENDING_UNIT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_PAYMENT_PENDING_UNIT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postPaymentPendingUnit: action.postPaymentPendingUnit,
      };
    case actionType.UPDATE_PAYMENT_PENDING_UNIT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PAYMENT_PENDING_UNIT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PAYMENT_PENDING_UNIT_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
