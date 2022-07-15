import { combineReducers } from "redux";

import { Login } from "./login";
import { AdvanceDetail } from "./RAdvanceDetail";
import { BpoGraph } from "./RBpoGraph";
import { City } from "./RCity";
import { Claims } from "./RClaims";
import { CommissionUnit } from "./RCommissionUnit";
import { Commodity } from "./RCommodity";
import { CommodityAnalysis } from "./RCommodityAnalysis";
import { ContainerSize } from "./RContainerSize";
import { Count } from "./RCount";
import { Country } from "./RCountry";
import { EmailRef } from "./REmailRef";
import { FileUpload } from "./RFileUpload";
import { GBQGraph } from "./RGBQGraph";
import { Invoice } from "./RInvoice";
import { LmeFixation } from "./RLMEFixation";
import { LmeOrder } from "./RLmeOrder";
import { LMEUpdate } from "./RLMEUpdate";
import { LoadingDetail } from "./RLoadingDetail";
import { LongTerm } from "./RLongTerm";
import { MetricTon } from "./RMetricTon";
import { Payment } from "./RPayment";
import { PaymentAdvanceUnit } from "./RPaymentAdvanceUnit";
import { PaymentPendingUnit } from "./RPaymentPendingUnit";
import { PendingShipement } from "./RPendingShipment";
import { PortDelivery } from "./RPortOfDelivery";
import { PortDischarge } from "./RPortOfDischarge";
import { PortLoading } from "./RPortOfLoading";
import { PriceUnit } from "./RPriceUnit";
import { PurchaseOrder } from "./RPurchaseOrder";
import { PurchaseSalesIndent } from "./RPurchaseSalesIndent";
import { QuantityUnit } from "./RQuantityUnit";
import { State } from "./RState";
import { Supplier } from "./RSuppiler";
import { UserHistory } from "./RUserHistory";
import { WeightUnit } from "./RWeightUnit";
import { Courier } from "./RCourier";
import { Users } from "./RUsers";
import { Rights } from "./RRights";

export const rootReducer = combineReducers({
  login: Login,
  containerSize: ContainerSize,
  portLoading: PortLoading,
  portDischarge: PortDischarge,
  portDelivery: PortDelivery,
  quantityUnit: QuantityUnit,
  commissionUnit: CommissionUnit,
  priceUnit: PriceUnit,
  weightUnit: WeightUnit,
  paymentAdvanceUnit: PaymentAdvanceUnit,
  paymentPendingUnit: PaymentPendingUnit,
  commodity: Commodity,
  commodityAnalysis: CommodityAnalysis,
  suppiler: Supplier,
  city: City,
  state: State,
  country: Country,
  purchaseOrder: PurchaseOrder,
  emailRef: EmailRef,
  purchaseSalesIndent: PurchaseSalesIndent,
  LMEUpdate: LMEUpdate,
  advanceDetail: AdvanceDetail,
  loadingDetail: LoadingDetail,
  fileUpload: FileUpload,
  userHistory: UserHistory,
  count: Count,
  bpoGraph: BpoGraph,
  GBQGraph: GBQGraph,
  payment: Payment,
  pendingShipment: PendingShipement,
  lmeFixation: LmeFixation,
  metricTon: MetricTon,
  longTerm: LongTerm,
  lmeOrder: LmeOrder,
  claims: Claims,
  invoice: Invoice,
  courier: Courier,
  users: Users,
  rights: Rights,
});
