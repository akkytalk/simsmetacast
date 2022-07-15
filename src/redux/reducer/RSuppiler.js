import * as actionType from "../types/ActionTypes";

const initialState = {
  suppiler: [],
  postSupplier: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const Supplier = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SUPPILER_SET_DATA:
      return {
        ...state,
        suppiler: action.suppiler,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.SUPPILER_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.SUPPILER_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.SUPPILER_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.SUPPILER_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_SUPPILER_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_SUPPILER_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postSupplier: action.postSupplier,
      };
    case actionType.UPDATE_SUPPILER_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_SUPPILER_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_SUPPILER_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
