import * as actionType from "../types/ActionTypes";

const initialState = {
  purchaseOrder: [],
  postPurchaseOrder: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const PurchaseOrder = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_ORDER_SET_DATA:
      return {
        ...state,
        purchaseOrder: action.purchaseOrder,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.PURCHASE_ORDER_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.PURCHASE_ORDER_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.PURCHASE_ORDER_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.PURCHASE_ORDER_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_PURCHASE_ORDER_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_PURCHASE_ORDER_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postPurchaseOrder: action.postPurchaseOrder,
      };
    case actionType.UPDATE_PURCHASE_ORDER_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PURCHASE_ORDER_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PURCHASE_ORDER_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
