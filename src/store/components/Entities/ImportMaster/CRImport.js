import { combineReducers } from "redux";
import simport from "./simport";
import simportSalesContract from "./simportSalesContract";
import sbillofEntry from "./sBillofEntry";
import squalityMatch from "./squalityMatch";
import simportClaim from "./simportClaim";
import simportLoadingdetail from "./simportLoadingdetail";
import sinvoice from "./sinvoice";

export const importMasterReducer = combineReducers({
  import: simport,
  importSalesContract: simportSalesContract,
  billofEntry: sbillofEntry,
  qualityMatch: squalityMatch,
  importClaim: simportClaim,
  importLoadingdetail: simportLoadingdetail,
  invoice: sinvoice,
});
