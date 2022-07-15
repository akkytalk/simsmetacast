import { combineReducers } from "redux";
import Commodity from "./commodity";
import CommodityAnalysis from "./commodityAnalysis";
import containerSize from "./containerSize";
import portDelivery from "./portDelivery";
import portDischarge from "./portDischarge";
import portLoading from "./portLoading";
import scommissionUnit from "./scommissionUnit";
import sduty from "./sduty";
import slicense from "./slicense";
import spaymentAdvanceUnit from "./spaymentAdvanceUnit";
import spaymentPendingUnit from "./spaymentPendingUnit";
import spriceUnit from "./spriceUnit";
import squantityUnit from "./squantityUnit";
import sweightUnit from "./sweightUnit";

export const masterReducer = combineReducers({
  commodity: Commodity,
  commodityAnalysis: CommodityAnalysis,
  containerSize: containerSize,
  portLoading: portLoading,
  portDischarge: portDischarge,
  portDelivery: portDelivery,
  quantityUnit: squantityUnit,
  commissionUnit: scommissionUnit,
  priceUnit: spriceUnit,
  weightUnit: sweightUnit,
  paymentAdvanceUnit: spaymentAdvanceUnit,
  paymentPendingUnit: spaymentPendingUnit,
  license: slicense,
  duty: sduty,
});
