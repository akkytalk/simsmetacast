/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Label,
  InputGroup,
} from "reactstrap";
import { Form, Formik } from "formik";
import { connect } from "react-redux";

// import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "../../redux/creators";
import TextField from "@material-ui/core/TextField";
// import MenuItem from "@mui/material/MenuItem";
import "../../css/main.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import { DateFormat } from "components/DateFormat/DateFormat";
import dateFormat from "dateformat";
import { Autocomplete, Checkbox, FormControlLabel } from "@mui/material";
import ExportCSV from "components/ExcelFile/ExportCSV";
import ActionPurchaseIndent from "./ActionPurchaseIndent";
import { MenuItem } from "@material-ui/core";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const options = [
  { name: "Edit Exports", page: "edit-purchase-indents" },
  { name: "Create/Edit Sales Indents", page: "edit-create-sales-indents" },
  { name: "Add Sales Contract", page: "add-sales-contract" },
  { name: "Add Advance Details", page: "add-advance-details" },
  { name: "Add Loading Details", page: "add-loading-details" },
  { name: "LME Fixation", page: "lme-fixation" },
  { name: "Manage Files", page: "manages-files" },
  { name: "User History", page: "new-order-history" },
];
function OrderHistory(props) {
  const defaultProps = {
    options: props.suppiler.filter(
      (s) => s.customer_type == "Customer" || s.customer_type == "Both"
    ),
    getOptionLabel: (option) => option.company_name,
  };

  const flatProps = {
    options: props.suppiler?.filter(
      (s) => s.customer_type == "Supplier" || s.customer_type == "Both"
    ),
    getOptionLabel: (option) => option.company_name,
  };

  const [pageSize, setPageSize] = React.useState(10);
  const [csv, setCsv] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [saleContract, setSaleContract] = useState();
  const [port, setPort] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [commodity, setCommodity] = useState("");
  const [container, setContainer] = useState("");
  const [invoice, setInvoice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [bl, setbl] = useState();
  const [airwayBill, setAirwayBill] = useState("");
  const [status, setStatus] = useState("");
  const [filter, setFilter] = useState(false);

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.create == 1
      ? true
      : false;

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      disableClickEventBubbling: true,
      width: 150,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <ActionPurchaseIndent
            data={params.row}
            index={params.row.id}
            options={options}
          />
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "bpo.id",
      headerName: "SC ID",
      width: 70,
      renderCell: (params) => {
        return <div>{params.row.bpo?.id}</div>;
      },
    },
    {
      field: "ref_no",
      headerName: "Ref No",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "booking_date",
      headerName: "Ref Date",
      width: 100,
      renderCell: (params) => {
        return <DateFormat data={params.row?.bpo?.booking_date} />;
      },
    },
    {
      field: "bpo.customer.company_name",
      headerName: "Customer",
      width: 100,
      renderCell: (params) => {
        return <div>{params.row.bpo?.customer?.company_name}</div>;
      },
    },
    {
      field: "bpo.supplier.company_name",
      headerName: "Supplier",
      width: 100,

      renderCell: (params) => {
        return <div>{params.row.bpo?.supplier?.company_name}</div>;
      },
    },
    {
      field: "sc_no",
      headerName: "SC No",
      width: 100,
      renderCell: (params) => {
        return <div>{params.row.bpo?.contract_number}</div>;
      },
    },
    { field: "commodities", headerName: "Commodity", width: 100 },
    {
      field: "prices",
      headerName: "Price",

      width: 100,
    },
    {
      field: "bpo.quantity",
      headerName: "Quantity",
      width: 100,

      renderCell: (params) => {
        return <div>{params.row.bpo?.quantity}</div>;
      },
    },
    {
      field: "made_by.name",
      headerName: "Last Modified User",
      width: 100,

      renderCell: (params) => {
        return <div>{params.row.made_by?.name}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      headerAlign: "center",
    },
  ];

  const rows = props.purchaseSalesIndent?.isLoading
    ? []
    : filter
    ? props.purchaseSalesIndent?.purchaseSalesIndent?.filter((pur) => {
        return (
          (startDate ? pur.bpo?.booking_date >= startDate : pur) &&
          (endDate ? pur.bpo?.booking_date <= endDate : pur) &&
          (port
            ? pur.ref_no?.toLowerCase().includes(port?.trim().toLowerCase())
            : pur) &&
          (supplierId ? pur.bpo?.supplier_id == supplierId : pur) &&
          (customerId ? pur.bpo?.customer_id == customerId : pur) &&
          (groupName
            ? pur.bpo?.supplier?.group_name
                ?.toLowerCase()
                .includes(groupName?.trim().toLowerCase()) ||
              pur.bpo?.customer?.group_name
                ?.toLowerCase()
                .includes(groupName?.trim().toLowerCase())
            : pur) &&
          (commodity
            ? pur.commodities
                ?.toLowerCase()
                .includes(commodity?.trim().toLowerCase())
            : pur) &&
          (container ? pur : pur) &&
          (invoice ? pur : pur) &&
          (quantity ? pur.bpo?.quantity == quantity : pur) &&
          (bl ? pur : pur) &&
          (airwayBill ? pur : pur) &&
          (status ? pur.status == status : pur) &&
          (saleContract
            ? pur.bpo?.contract_number
                ?.toLowerCase()
                .includes(saleContract.trim().toLowerCase())
            : pur)
        );
      })
    : props.purchaseSalesIndent.purchaseSalesIndent;

  let data2 = {
    token: props.login?.login?.token,
  };

  useEffect(() => {
    props.onPurchaseSalesIndentGetData(data2);
    props.onSupplierGetData(data2);
    props.cityGetData(data2);
    props.countryGetData(data2);
    props.stateGetData(data2);
  }, []);

  useEffect(() => {
    if (filter) {
      rows?.length > 0 &&
        rows?.map((user, index) =>
          csv?.push({
            "Sr No.": index + 1,
            "Ref No": user.ref_no,
            "CTT No": "",
            Supplier: user.bpo?.supplier?.company_name ?? "",
            Customer: user.bpo?.supplier?.company_name ?? "",
            "PSIC Number": "",
            Commodity: "",
            Container: "",
            Quantity: user.bpo?.bl,
            Price: user.bpo?.price,
            "Inv No.": "",
            Date: user.bpo?.booking_date,
            Total: "",
            Advance: "",
            Net: "",
            "B/L": "",
            Shipping: "",
            "Port of Disharge": props.portDischarge.filter(
              (d) => d.id == user.port_discharge_id
            )[0]?.name,
            ETD: "",
            ETA: "",
            "ETA ICD": "",
            "Final Port of Delivery": props.portDelivery.filter(
              (d) => d.id == user.delivery_port_id
            )[0]?.name,
            AWB: "",
            CU: "",
            DY: "",
          })
        );
    }
  }, [filter]);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Supplier:", values);
    setSubmitting(true);

    let user = {
      name: values.name,
    };

    console.log("Data of Supplier:", user);
    props.onPostSupplierData(data2, user, setSubmitting);
    return;
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <Formik
            initialValues={{
              start_date: "",
              end_date: "",
              is_advance_search: 0,
              sales_contact_no: "",
              portal_reference_no: "",
              supplier_id: "",
              customer_id: "",
              group_name: "",
              commodity: "",
              container_no: "",
              invoice_no: "",
              quantity: "",
              bl_no: "",
              airway_bill_no: "",
              status: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              start_date: Yup.string().required("required"),
              end_date: Yup.string().required("required"),
            })}
          >
            {(formProps) => {
              setSaleContract(formProps.values.sales_contact_no);
              setCustomerId(formProps.values.customer_id);
              setSupplierId(formProps.values.supplier_id);
              setGroupName(formProps.values.group_name);
              setCommodity(formProps.values.commodity);
              setStartDate(formProps.values.start_date);
              setEndDate(formProps.values.end_date);
              setInvoice(formProps.values.invoice_no);
              setContainer(formProps.values.container_no);
              setQuantity(formProps.values.quantity);
              setbl(formProps.values.bl_no);
              setAirwayBill(formProps.values.airway_bill_no);
              setStatus(formProps.values.status);
              setPort(formProps.values.portal_reference_no);

              console.log(`formProps.values`, formProps.values);
              return (
                <Form>
                  <Row className="">
                    <Col md={5}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 25 },
                            }}
                            name="is_advance_search"
                            id="is_advance_search"
                            checked={
                              formProps.values.is_advance_search == 1
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              formProps.setFieldValue(
                                `is_advance_search`,
                                event.target.value
                              );
                            }}
                            value={
                              formProps.values.is_advance_search == 1 ? 0 : 1
                            }
                          />
                        }
                        label="Advance Search"
                      />
                      {/* <Field
                        component={CustomInput}
                        type="checkbox"
                        name="is_advance_search"
                        id="is_advance_search"
                        checked={
                          formProps.values.is_advance_search == 1 ? true : false
                        }
                        onChange={(event) => {
                          formProps.setFieldValue(
                            `is_advance_search`,
                            event.target.value
                          );
                        }}
                        value={formProps.values.is_advance_search == 1 ? 0 : 1}
                      />
                      <Label>Advance Search</Label> */}
                    </Col>
                  </Row>
                  {formProps.values.is_advance_search == 1 && (
                    <>
                      <Row className="form-group">
                        <Col md={3}>
                          <TextField
                            name="sales_contact_no"
                            id="sales_contact_no"
                            label="Sales Contact Number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.sales_contact_no}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.sales_contact_no &&
                              Boolean(formProps.errors.sales_contact_no)
                            }
                            helperText={
                              formProps.touched.sales_contact_no &&
                              formProps.errors.sales_contact_no
                            }
                          />
                        </Col>
                        <Col md={3}>
                          <TextField
                            name="portal_reference_no"
                            id="portal_reference_no"
                            label="Port Reference Number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.portal_reference_no}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.portal_reference_no &&
                              Boolean(formProps.errors.portal_reference_no)
                            }
                            helperText={
                              formProps.touched.portal_reference_no &&
                              formProps.errors.portal_reference_no
                            }
                          />
                        </Col>
                        <Col md={3}>
                          <InputGroup>
                            <Autocomplete
                              {...flatProps}
                              id="supplier_id"
                              name="supplier_id"
                              onChange={(event, newValue) => {
                                formProps.setFieldValue(
                                  `supplier_id`,
                                  newValue?.id ?? ""
                                );
                              }}
                              sx={{ width: "100%" }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Supplier Name"
                                  variant="outlined"
                                  size="small"
                                  name="supplier_id"
                                  error={
                                    formProps.touched.supplier_id &&
                                    Boolean(formProps.errors.supplier_id)
                                  }
                                  helperText={
                                    formProps.touched.supplier_id &&
                                    formProps.errors.supplier_id
                                  }
                                />
                              )}
                            />
                          </InputGroup>
                        </Col>
                        <Col md={3}>
                          <InputGroup>
                            <Autocomplete
                              {...defaultProps}
                              id="customer_id"
                              name="customer_id"
                              onChange={(event, newValue) => {
                                formProps.setFieldValue(
                                  `customer_id`,
                                  newValue?.id ?? ""
                                );
                              }}
                              sx={{ width: "100%" }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Customer Name"
                                  variant="outlined"
                                  size="small"
                                  name="customer_id"
                                  error={
                                    formProps.touched.customer_id &&
                                    Boolean(formProps.errors.customer_id)
                                  }
                                  helperText={
                                    formProps.touched.customer_id &&
                                    formProps.errors.customer_id
                                  }
                                />
                              )}
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={3}>
                          <TextField
                            name="group_name"
                            id="group_name"
                            label="Group Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.group_name}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.group_name &&
                              Boolean(formProps.errors.group_name)
                            }
                            helperText={
                              formProps.touched.group_name &&
                              formProps.errors.group_name
                            }
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            name="commodity"
                            id="commodity"
                            label="Commodity"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.commodity}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.commodity &&
                              Boolean(formProps.errors.commodity)
                            }
                            helperText={
                              formProps.touched.commodity &&
                              formProps.errors.commodity
                            }
                          />
                        </Col>

                        {/* <Col md={3}>
                          <TextField
                            name="container_no"
                            id="container_no"
                            label="Container Number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.container_no}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.container_no &&
                              Boolean(formProps.errors.container_no)
                            }
                            helperText={
                              formProps.touched.container_no &&
                              formProps.errors.container_no
                            }
                          />
                        </Col> */}

                        {/* <Col md={3}>
                          <TextField
                            name="invoice_no"
                            id="invoice_no"
                            label="Invoice Number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.invoice_no}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.invoice_no &&
                              Boolean(formProps.errors.invoice_no)
                            }
                            helperText={
                              formProps.touched.invoice_no &&
                              formProps.errors.invoice_no
                            }
                          />
                        </Col> */}
                        {/* </Row>
                      <Row className="form-group"> */}
                        <Col md={3}>
                          <TextField
                            name="quantity"
                            id="quantity"
                            label="Quantity"
                            type="number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.quantity}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.quantity &&
                              Boolean(formProps.errors.quantity)
                            }
                            helperText={
                              formProps.touched.quantity &&
                              formProps.errors.quantity
                            }
                          />
                        </Col>

                        {/* <Col md={3}>
                          <TextField
                            name="bl_no"
                            id="bl_no"
                            label="BL Number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.bl_no}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.bl_no &&
                              Boolean(formProps.errors.bl_no)
                            }
                            helperText={
                              formProps.touched.bl_no && formProps.errors.bl_no
                            }
                          />
                        </Col> */}

                        {/* <Col md={3}>
                          <TextField
                            name="airway_bill_no"
                            id="airway_bill_no"
                            label="Airway Bl Number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.airway_bill_no}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.airway_bill_no &&
                              Boolean(formProps.errors.airway_bill_no)
                            }
                            helperText={
                              formProps.touched.airway_bill_no &&
                              formProps.errors.airway_bill_no
                            }
                          />
                        </Col> */}

                        <Col md={3}>
                          <TextField
                            name="status"
                            select
                            id="status"
                            variant="outlined"
                            size="small"
                            label="Select Status"
                            fullWidth
                            value={formProps.values.status}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.status &&
                              Boolean(formProps.errors.status)
                            }
                            helperText={
                              formProps.touched.status &&
                              formProps.errors.status
                            }
                          >
                            <MenuItem value="">Select Status</MenuItem>
                            <MenuItem value="not modified yet">
                              not modified yet
                            </MenuItem>
                            <MenuItem value="Sales Contract Created">
                              Sales Contract Created
                            </MenuItem>
                            <MenuItem value="Sale Indent Created">
                              Sale Indent Created
                            </MenuItem>
                            <MenuItem value="Export Created">
                              Export Created
                            </MenuItem>
                            <MenuItem value="Advance detail Created">
                              Advance detail Created
                            </MenuItem>
                            <MenuItem value="Loading Detail Created">
                              Loading Detail Created
                            </MenuItem>
                            {/* <MenuItem value="Purchase Order Created">
                              Purchase Order Created
                            </MenuItem>
                            <MenuItem value="Sales Order Created">
                              Sales Order Created
                            </MenuItem>
                            <MenuItem value="Contract Number Added">
                              Contract Number Added
                            </MenuItem>
                            <MenuItem value="Partial Advance Received">
                              Partial Advance Received
                            </MenuItem>
                            <MenuItem value="Full Advance Received">
                              Full Advance Received
                            </MenuItem>
                            <MenuItem value="Partial Loading">
                              Partial Loading
                            </MenuItem>
                            <MenuItem value="Order Is Completed">
                              Order Is Completed
                            </MenuItem>
                            <MenuItem value="Full Loading Completed">
                              Full Loading Completed
                            </MenuItem>
                            <MenuItem value="Partial Order Completed">
                              Partial Order Completed
                            </MenuItem> */}
                          </TextField>
                        </Col>
                      </Row>
                      <Row className="form-group d-flex">
                        <Col md={3}>
                          <Label className="label">Start At</Label>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="date"
                            id="start_date"
                            name="start_date"
                            value={formProps.values.start_date}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.start_date &&
                              Boolean(formProps.errors.start_date)
                            }
                            helperText={
                              formProps.touched.start_date &&
                              formProps.errors.start_date
                            }
                          />
                        </Col>
                        <Col md={3}>
                          <Label className="label">End At</Label>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={formProps.values.end_date}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.end_date &&
                              Boolean(formProps.errors.end_date)
                            }
                            helperText={
                              formProps.touched.end_date &&
                              formProps.errors.end_date
                            }
                          />
                        </Col>
                        <Col md={6} className="align-self-end">
                          <Button
                            type="button"
                            disabled={formProps.isSubmitting}
                            className="bg-gradient-orange text-white"
                            onClick={() => setFilter(true)}
                          >
                            Apply Filter
                          </Button>
                          <ExportCSV
                            csvData={csv}
                            setCsv={setCsv}
                            report
                            fileName={`sales-confirmations-${dateFormat(
                              startDate,
                              "dd-mm-yyyy"
                            )}-${dateFormat(endDate, "dd-mm-yyyy")}`}
                          />
                          {/* <Button
                            type="button"
                            disabled={formProps.isSubmitting}
                            className="bg-gradient-info text-white"
                          >
                            Download Report
                          </Button> */}
                        </Col>
                      </Row>
                    </>
                  )}
                </Form>
              );
            }}
          </Formik>
        </div>
      </CardHeader>
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props.purchaseSalesIndent?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
          // isRowSelectable={(params) => params.row.size < 50}

          // autoPageSize
          autoHeight
        />
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    suppiler: state.suppiler.suppiler,
    city: state.city.city,
    country: state.country.country,
    states: state.state.state,
    login: state.login,
    purchaseOrder: state.purchaseOrder,
    commissionUnit: state.commissionUnit.commissionUnit,
    priceUnit: state.priceUnit.priceUnit,
    quantityUnit: state.quantityUnit.quantityUnit,
    purchaseSalesIndent: state.purchaseSalesIndent,
    portDischarge: state.portDischarge.portDischarge,
    portDelivery: state.portDelivery.portDelivery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cityGetData: (data) => dispatch(actions.cityGetData(data)),
    countryGetData: (data) => dispatch(actions.countryGetData(data)),
    stateGetData: (data) => dispatch(actions.stateGetData(data)),
    onSupplierGetData: (data) => dispatch(actions.suppilerGetData(data)),
    onPurchaseSalesIndentGetData: (data) =>
      dispatch(actions.purchaseSalesIndentGetData(data)),
    onDeletePurchaseSalesIndent: (id, data) =>
      dispatch(actions.deletePurchaseSalesIndent(id, data)),
    onPostPurchaseSalesIndentData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postPurchaseSalesIndentData(data, user, toggle, setSubmitting)
      ),
    updatePurchaseSalesIndentData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updatePurchaseSalesIndentData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
