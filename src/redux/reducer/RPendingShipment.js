import * as actionType from "../types/ActionTypes";

const initialState = {
  pendingShipment: [],
  postPendingShipement: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const PendingShipement = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PENDING_SHIPMENT_SET_DATA:
      return {
        ...state,
        pendingShipment: action.pendingShipment,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.PENDING_SHIPMENT_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.PENDING_SHIPMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.PENDING_SHIPMENT_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.PENDING_SHIPMENT_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_PENDING_SHIPMENT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_PENDING_SHIPMENT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postPendingShipement: action.postPendingShipement,
      };
    case actionType.UPDATE_PENDING_SHIPMENT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PENDING_SHIPMENT_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PENDING_SHIPMENT_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
