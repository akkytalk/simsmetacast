import { combineReducers } from "redux";
import { masterReducer } from "./master/MasterCombineReducer";
import { userMasterReducer } from "./UserMaster/CRUser";
import { addressReducer } from "./Address/CRAddress";
import { importMasterReducer } from "./ImportMaster/CRImport";

import Client from "./client";
import salesConfirmation from "./salesConfirmation";

export const entitesReducer = combineReducers({
  master: masterReducer,
  userMaster: userMasterReducer,
  address: addressReducer,
  importer: importMasterReducer,
  client: Client,
  salesConfirmation: salesConfirmation,
});
