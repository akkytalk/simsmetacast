import React from "react";
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import WordDocuments from "pages/wordDocuments/Docs3";
const Supplier = React.lazy(() => import("./pages/suppiler/Suppiler"));

// Sales Contract
const SalesConfirmation = React.lazy(() =>
  import("./pages/SalesConfirmation/SalesConfirmation")
);

const CreateImport = React.lazy(() =>
  import("./pages/SalesConfirmation/CreateImport")
);

const ActionBriefPurchaseOrder = React.lazy(() =>
  import("./pages/briefPurchaseOrder/ActionBriefPurchaseOrder")
);

const CreatePurchaseOrder = React.lazy(() =>
  import("./pages/briefPurchaseOrder/CreatePurchaseOrder")
);

const CancelBPO = React.lazy(() =>
  import("./pages/briefPurchaseOrder/CancelBPO")
);

const LMEUpdate = React.lazy(() => import("./pages/LMEUpdate/LMEUpdate"));

const ManageCommission = React.lazy(() =>
  import("./pages/ManageCommission/ManageCommission")
);

// Exports
const OrderHistory = React.lazy(() =>
  import("./pages/OrderHistory/OrderHistory")
);

const CancelOrderHistory = React.lazy(() =>
  import("./pages/OrderHistory/Cancel/CancelOrderHistory")
);

const DuplicatePurchaseIndent = React.lazy(() =>
  import("./pages/OrderHistory/Duplicate/DuplicatePurchaseIndent")
);

const CreatePurchaseIndents = React.lazy(() =>
  import("./pages/OrderHistory/CreatePurchaseIndents")
);
const EditCreateSalesIndents = React.lazy(() =>
  import("./pages/OrderHistory/EditCreateSalesIndents")
);

const AddAdvanceDetail = React.lazy(() =>
  import("./pages/OrderHistory/AddAdvanceDetail")
);
const AddLoadingDetails = React.lazy(() =>
  import("./pages/OrderHistory/AddLoadingDetails")
);

const AddSalesContract = React.lazy(() =>
  import("./pages/OrderHistory/AddSalesContract")
);
const IndentLMEFixation = React.lazy(() =>
  import("./pages/OrderHistory/IndentLMEFixation")
);

const SidebarOrderHistory = React.lazy(() =>
  import("./pages/OrderHistory/SidebarOrderHistory")
);
const ManagesFiles = React.lazy(() =>
  import("./pages/OrderHistory/ManagesFiles")
);

// Reports Routes

const MetricTonBooked = React.lazy(() =>
  import("pages/Report/MetricTonBooked/MetricTonBooked")
);
const PaidPayment = React.lazy(() =>
  import("pages/Report/PaidPayment/PaidPayment")
);
const PendingLMEFixation = React.lazy(() =>
  import("pages/Report/PendingLMEFixation/PendingLMEFixation")
);
const PendingPayment = React.lazy(() =>
  import("pages/Report/PendingPayment/PendingPayment")
);
const PendingShipment = React.lazy(() =>
  import("pages/Report/PendingShipment/PendingShipment")
);

const PendingAdvance = React.lazy(() =>
  import("pages/Report/PendingAdvance/PendingAdvance")
);

// Masters Routes

const AdvanceUnit = React.lazy(() => import("pages/TableMaster/AdvanceUnit"));
const CommissionUnit = React.lazy(() =>
  import("pages/TableMaster/CommissionUnit")
);
const Commodity = React.lazy(() => import("pages/TableMaster/Commodity"));
const CommodityAnalysis = React.lazy(() =>
  import("pages/TableMaster/CommodityAnalysis")
);
const ContainerSize = React.lazy(() =>
  import("pages/TableMaster/ContainerSize")
);
const PaymentAdvanceUnit = React.lazy(() =>
  import("pages/TableMaster/PaymentAdvanceUnit")
);
const PaymentPendingUnit = React.lazy(() =>
  import("pages/TableMaster/PaymentPendingUnit")
);
const PortofDelivery = React.lazy(() =>
  import("pages/TableMaster/PortofDelivery")
);
const PortofDischarge = React.lazy(() =>
  import("pages/TableMaster/PortofDischarge")
);
const PortofLoading = React.lazy(() =>
  import("pages/TableMaster/PortofLoading")
);
const PriceUnit = React.lazy(() => import("pages/TableMaster/PriceUnit"));
const QuantityUnit = React.lazy(() => import("pages/TableMaster/QuantityUnit"));
const WeightUnit = React.lazy(() => import("pages/TableMaster/WeightUnit"));

const ExampleTable = React.lazy(() =>
  import("pages/example/table/ExampleTable")
);

const LicenseMaster = React.lazy(() =>
  import("pages/TableMaster/LicenseMaster")
);

const Duty = React.lazy(() => import("pages/TableMaster/Duty"));

// Long Term Deposit routes

const LongTermDeposit = React.lazy(() =>
  import("pages/LongTermDeposit/LongTermDeposit")
);

// user master

const AddUser = React.lazy(() => import("pages/UserMaster/AddUser"));
const Rights = React.lazy(() => import("pages/UserMaster/Rights"));

//Word Document

//Import

const Import = React.lazy(() => import("pages/Import/Import"));
const ImportSalesContract = React.lazy(() =>
  import("pages/Import/ImportSalesContracts")
);

const ImportLoadingDetails = React.lazy(() =>
  import("pages/Import/ImportLoadingDetails")
);

const QualityMatching = React.lazy(() =>
  import("pages/Import/QualityMatching")
);
const HighSea = React.lazy(() => import("pages/Import/HighSea"));

const ImportUploadDocs = React.lazy(() =>
  import("pages/Import/ImportUploadDocs")
);

const BillofEntry = React.lazy(() => import("pages/Import/BillofEntry"));
const ImportAdvanceDetail = React.lazy(() =>
  import("pages/Import/ImportAdvanceDetail")
);

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/example-table",
    name: "Example Table",
    icon: "ni ni-tv-2 text-primary",
    component: ExampleTable,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/suppiler",
    name: "Supplier  or  Customer",
    icon: "ni ni-bullet-list-67 text-red",
    component: Supplier,
    layout: "/admin",
  },
  {
    path: "/sales-confirmation/sales-contract/:id",
    name: "Add Sales Contract",
    icon: "ni ni-bullet-list-67 text-red",
    component: CreateImport,
    layout: "/admin",
  },
  {
    path: "/sales-confirmation",
    name: "Sales Confirmation List",
    icon: "ni ni-bullet-list-67 text-red",
    component: SalesConfirmation,
    layout: "/admin",
  },
  {
    path: "/canceled-sales-confirmation",
    name: "Canceled Sales ConfirmationcC List",
    icon: "ni ni-bullet-list-67 text-red",
    component: CancelBPO,
    layout: "/admin",
  },
  {
    path: "/edit-sales-confirmation/:id",
    name: "Sales Confirmation List",
    icon: "ni ni-bullet-list-67 text-red",
    component: ActionBriefPurchaseOrder,
    layout: "/admin",
  },
  {
    path: "/create-sales-confirmation/:id",
    name: "Sales Confirmation List",
    icon: "ni ni-bullet-list-67 text-red",
    component: CreatePurchaseOrder,
    layout: "/admin",
  },
  {
    path: "/order-history",
    name: "Exports",
    icon: "ni ni-bullet-list-67 text-red",
    component: OrderHistory,
    layout: "/admin",
  },
  {
    path: "/canceled-order-history",
    name: "Canceled Exports",
    icon: "ni ni-bullet-list-67 text-red",
    component: CancelOrderHistory,
    layout: "/admin",
  },

  {
    path: "/order-history",
    name: "Exports",
    icon: "ni ni-bullet-list-67 text-red",
    component: OrderHistory,
    layout: "/admin",
  },

  {
    path: "/edit-purchase-indents/:id",
    name: "Edit Exports",
    icon: "ni ni-bullet-list-67 text-red",
    component: CreatePurchaseIndents,
    layout: "/admin",
  },
  {
    path: "/duplicate-purchase-indent/:id",
    name: "Edit Exports",
    icon: "ni ni-bullet-list-67 text-red",
    component: DuplicatePurchaseIndent,
    layout: "/admin",
  },
  {
    path: "/edit-create-sales-indents/:id",
    name: "Exports",
    icon: "ni ni-bullet-list-67 text-red",
    component: EditCreateSalesIndents,
    layout: "/admin",
  },
  // {
  //   path: "/add-sales-contract/:id",
  //   name: "Exports",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: AddSalesContract,
  //   layout: "/admin",
  // },
  {
    path: "/add-advance-details/:id",
    name: "Exports",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddAdvanceDetail,
    layout: "/admin",
  },
  {
    path: "/add-loading-details/:id",
    name: "Exports",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddLoadingDetails,
    layout: "/admin",
  },
  {
    path: "/lme-fixation/:id",
    name: "Exports",
    icon: "ni ni-bullet-list-67 text-red",
    component: IndentLMEFixation,
    layout: "/admin",
  },
  {
    path: "/manages-files/:id",
    name: "Exports",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManagesFiles,
    layout: "/admin",
  },
  {
    path: "/new-order-history/:id",
    name: "Exports",
    icon: "ni ni-bullet-list-67 text-red",
    component: SidebarOrderHistory,
    layout: "/admin",
  },
  {
    path: "/lme-update",
    name: "LME Update",
    icon: "ni ni-bullet-list-67 text-red",
    component: LMEUpdate,
    layout: "/admin",
  },
  {
    path: "/manage-commission",
    name: "Manage Commission",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManageCommission,
    layout: "/admin",
  },

  {
    path: "/commodity",
    name: "Commodity",
    icon: "ni ni-bullet-list-67 text-red",
    component: Commodity,
    layout: "/admin",
  },
  {
    path: "/commodity-analysis",
    name: "Commodity",
    icon: "ni ni-bullet-list-67 text-red",
    component: CommodityAnalysis,
    layout: "/admin",
  },
  {
    path: "/container-size",
    name: "Contanier Size",
    icon: "ni ni-bullet-list-67 text-red",
    component: ContainerSize,
    layout: "/admin",
  },
  {
    path: "/port-loading",
    name: "Port of Loading",
    icon: "ni ni-bullet-list-67 text-red",
    component: PortofLoading,
    layout: "/admin",
  },
  {
    path: "/port-discharge",
    name: "Port of Discharge",
    icon: "ni ni-bullet-list-67 text-red",
    component: PortofDischarge,
    layout: "/admin",
  },
  {
    path: "/port-delivery",
    name: "Final Port of Delivery",
    icon: "ni ni-bullet-list-67 text-red",
    component: PortofDelivery,
    layout: "/admin",
  },
  {
    path: "/payment-advance",
    name: "Payment Advance Unit",
    icon: "ni ni-bullet-list-67 text-red",
    component: PaymentAdvanceUnit,
    layout: "/admin",
  },
  {
    path: "/payment-pending",
    name: "Payment Pending Unit",
    icon: "ni ni-bullet-list-67 text-red",
    component: PaymentPendingUnit,
    layout: "/admin",
  },
  {
    path: "/commision-unit",
    name: "Commission Unit",
    icon: "ni ni-bullet-list-67 text-red",
    component: CommissionUnit,
    layout: "/admin",
  },
  {
    path: "/wight-unit",
    name: "Weight Unit",
    icon: "ni ni-bullet-list-67 text-red",
    component: WeightUnit,
    layout: "/admin",
  },
  {
    path: "/quantity-unit",
    name: "Quantity Unit",
    icon: "ni ni-bullet-list-67 text-red",
    component: QuantityUnit,
    layout: "/admin",
  },
  {
    path: "/price-unit",
    name: "Price Unit",
    icon: "ni ni-bullet-list-67 text-red",
    component: PriceUnit,
    layout: "/admin",
  },
  {
    path: "/advance-unit",
    name: "Advance Unit",
    icon: "ni ni-bullet-list-67 text-red",
    component: AdvanceUnit,
    layout: "/admin",
  },
  {
    path: "/license",
    name: "License Master",
    icon: "ni ni-bullet-list-67 text-red",
    component: LicenseMaster,
    layout: "/admin",
  },
  {
    path: "/duty",
    name: "Duty Master",
    icon: "ni ni-bullet-list-67 text-red",
    component: Duty,
    layout: "/admin",
  },
  {
    path: "/pending-payments",
    name: "Pending Payments",
    icon: "ni ni-bullet-list-67 text-red",
    component: PendingPayment,
    layout: "/admin",
  },
  {
    path: "/paid-payment",
    name: "Paid Payments",
    icon: "ni ni-bullet-list-67 text-red",
    component: PaidPayment,
    layout: "/admin",
  },
  {
    path: "/metric-booked",
    name: "Metric Tons Booked",
    icon: "ni ni-bullet-list-67 text-red",
    component: MetricTonBooked,
    layout: "/admin",
  },
  {
    path: "/pending-shipment",
    name: "Pending Shipment",
    icon: "ni ni-bullet-list-67 text-red",
    component: PendingShipment,
    layout: "/admin",
  },
  {
    path: "/pending-lme-fixation",
    name: "Pending LME Fixation",
    icon: "ni ni-bullet-list-67 text-red",
    component: PendingLMEFixation,
    layout: "/admin",
  },
  {
    path: "/pending-advance",
    name: "Pending Advance",
    icon: "ni ni-bullet-list-67 text-red",
    component: PendingAdvance,
    layout: "/admin",
  },
  {
    path: "/long-term-deposit",
    name: "Long Term Deposit",
    icon: "ni ni-bullet-list-67 text-red",
    component: LongTermDeposit,
    layout: "/admin",
  },
  {
    path: "/add-user",
    name: "Add User",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddUser,
    layout: "/admin",
  },
  {
    path: "/rights",
    name: "Rights",
    icon: "ni ni-bullet-list-67 text-red",
    component: Rights,
    layout: "/admin",
  },
  {
    path: "/words",
    name: "Words Documents",
    icon: "ni ni-bullet-list-67 text-red",
    component: WordDocuments,
    layout: "/admin",
  },
  {
    path: "/import/add-sales-contract/:id",
    name: "Add Sales Contract",
    icon: "ni ni-bullet-list-67 text-red",
    component: ImportSalesContract,
    layout: "/admin",
  },

  {
    path: "/import/add-loading-details/:id",
    name: "Add Loading Details",
    icon: "ni ni-bullet-list-67 text-red",
    component: ImportLoadingDetails,
    layout: "/admin",
  },
  {
    path: "/import/upload-doc/:id",
    name: "Upload Documents",
    icon: "ni ni-bullet-list-67 text-red",
    component: ImportUploadDocs,
    layout: "/admin",
  },
  {
    path: "/import/highseas/:id",
    name: "Highseas",
    icon: "ni ni-bullet-list-67 text-red",
    component: HighSea,
    layout: "/admin",
  },
  {
    path: "/import/quality-match/:id",
    name: "Quality Match",
    icon: "ni ni-bullet-list-67 text-red",
    component: QualityMatching,
    layout: "/admin",
  },
  {
    path: "/import/bill/:id",
    name: "Bill",
    icon: "ni ni-bullet-list-67 text-red",
    component: BillofEntry,
    layout: "/admin",
  },
  {
    path: "/import/add-advance-details/:id",
    name: "Advance Details",
    icon: "ni ni-bullet-list-67 text-red",
    component: ImportAdvanceDetail,
    layout: "/admin",
  },
  {
    path: "/import",
    name: "Import",
    icon: "ni ni-bullet-list-67 text-red",
    component: Import,
    layout: "/admin",
  },
];
export default routes;
