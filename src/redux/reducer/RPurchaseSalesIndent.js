import * as actionType from "../types/ActionTypes";

const initialState = {
  purchaseSalesIndent: [],
  postPurchaseSalesIndent: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const PurchaseSalesIndent = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_SALES_INDENT_SET_DATA:
      return {
        ...state,
        purchaseSalesIndent: action.purchaseSalesIndent,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.PURCHASE_SALES_INDENT_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.PURCHASE_SALES_INDENT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.PURCHASE_SALES_INDENT_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.PURCHASE_SALES_INDENT_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_PURCHASE_SALES_INDENT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_PURCHASE_SALES_INDENT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postPurchaseSalesIndent: action.postPurchaseSalesIndent,
      };
    case actionType.UPDATE_PURCHASE_SALES_INDENT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PURCHASE_SALES_INDENT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PURCHASE_SALES_INDENT_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
