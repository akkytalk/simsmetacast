import * as actionType from "../types/ActionTypes";

const initialState = {
  invoice: [],
  postInvoice: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const Invoice = (state = initialState, action) => {
  switch (action.type) {
    case actionType.INVOICE_SET_DATA:
      return {
        ...state,
        invoice: action.invoice,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.INVOICE_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.INVOICE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.INVOICE_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.INVOICE_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_INVOICE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_INVOICE_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postInvoice: action.postInvoice,
      };
    case actionType.UPDATE_INVOICE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_INVOICE_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_INVOICE_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
