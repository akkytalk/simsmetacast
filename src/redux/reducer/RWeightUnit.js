import * as actionType from "../types/ActionTypes";

const initialState = {
  weightUnit: [],
  postWeightUnit: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const WeightUnit = (state = initialState, action) => {
  switch (action.type) {
    case actionType.WEIGHT_UNIT_SET_DATA:
      return {
        ...state,
        weightUnit: action.weightUnit,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.WEIGHT_UNIT_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.WEIGHT_UNIT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.WEIGHT_UNIT_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.WEIGHT_UNIT_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_WEIGHT_UNIT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_WEIGHT_UNIT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postWeightUnit: action.postWeightUnit,
      };
    case actionType.UPDATE_WEIGHT_UNIT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_WEIGHT_UNIT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_WEIGHT_UNIT_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
