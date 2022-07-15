/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Label,
  Button,
  CardHeader,
} from "reactstrap";
import { useDemoData } from "@mui/x-data-grid-generator";
import dateFormat from "dateformat";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import "../../css/main.css";
import MenuItem from "@mui/material/MenuItem";
import * as actions from "../../redux/creators";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  // GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { connect } from "react-redux";
import { DateFormat } from "components/DateFormat/DateFormat";
import ExportCSV from "components/ExcelFile/ExportCSV";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  );
}

function ManageCommission(props) {
  const [csv, setCsv] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [client, setClient] = useState();
  const [customerType, setCustomerType] = useState("");
  const [commissionType, setCommissionType] = useState("");
  const [filter, setFilter] = useState(false);

  const [pageSize, setPageSize] = React.useState(5);

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[5]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[5]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[5]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[5]?.create == 1
      ? true
      : false;

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "ref_no", headerName: "Ref No", flex: 1 },
    {
      field: "booking_date",
      headerName: "Ref Date",
      flex: 1,
      renderCell: (params) => {
        return <DateFormat data={params.row?.bpo?.booking_date} />;
      },
    },
    {
      field: "bpo.customer.company_name",
      headerName: "Customer",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.bpo?.customer?.company_name}</div>;
      },
    },
    {
      field: "bpo.supplier.company_name",
      headerName: "Supplier",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.bpo?.supplier?.company_name}</div>;
      },
    },
    {
      field: "bpo.contract_number",
      headerName: "Contract No",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.bpo?.contract_number}</div>;
      },
    },

    { field: "invoice_no", headerName: "Invoice No", flex: 1 },
    { field: "invoice_status", headerName: "Invoice Status", flex: 1 },
    { field: "container_number", headerName: "Container Number", flex: 1 },
    { field: "commodity", headerName: "Commodity", flex: 1 },
    {
      field: "bpo.quantity",
      headerName: "Quantity",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.bpo?.quantity}</div>;
      },
    },
    { field: "price", headerName: "Contract Price", flex: 1 },
    { field: "", headerName: "Invoice Price", flex: 1 },
    { field: "psic", headerName: "PSIC", flex: 1 },
    { field: "commission", headerName: "Commission", flex: 1 },
    { field: "", headerName: "Total PSIC", flex: 1 },
    { field: "", headerName: "Total Commission", flex: 1 },
  ];
  const rows = props.purchaseSalesIndent?.isLoading
    ? []
    : filter
    ? props.purchaseSalesIndent.purchaseSalesIndent.filter((pur, i) => {
        if (startDate && endDate && !client && !customerType)
          return (
            pur.bpo?.booking_date >= startDate &&
            pur.bpo?.booking_date <= endDate
          );
        else if (client && !startDate && !endDate && !customerType)
          return (
            pur.bpo?.supplier?.company_name
              ?.toLowerCase()
              .includes(client.trim().toLowerCase()) ||
            pur.bpo?.customer?.company_name
              ?.toLowerCase()
              .includes(client.trim().toLowerCase())
          );
        else if (customerType && !startDate && !endDate && !client)
          return (
            pur.bpo?.customer?.customer_type == customerType ||
            pur.bpo?.supplier?.customer_type == customerType
          );
        else if (startDate && endDate && client && !customerType)
          return (
            pur.bpo?.booking_date >= startDate &&
            pur.bpo?.booking_date <= endDate &&
            (pur.bpo?.supplier?.company_name
              ?.toLowerCase()
              .includes(client.trim().toLowerCase()) ||
              pur.bpo?.customer?.company_name
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()))
          );
        else if (client && customerType && !startDate && !endDate)
          return (
            (pur.bpo?.supplier?.company_name
              ?.toLowerCase()
              .includes(client.trim().toLowerCase()) ||
              pur.bpo?.customer?.company_name
                ?.toLowerCase()
                .includes(client.trim().toLowerCase())) &&
            (pur.bpo?.customer?.customer_type == customerType ||
              pur.bpo?.supplier?.customer_type == customerType)
          );
        else if (startDate && endDate && customerType && !client)
          return (
            (pur.bpo?.customer?.customer_type == customerType ||
              pur.bpo?.supplier?.customer_type == customerType) &&
            pur.bpo?.booking_date >= startDate &&
            pur.bpo?.booking_date <= endDate
          );
        else if (startDate && endDate && client && customerType)
          return (
            (pur.bpo?.customer?.customer_type == customerType ||
              pur.bpo?.supplier?.customer_type == customerType) &&
            pur.bpo?.booking_date >= startDate &&
            pur.bpo?.booking_date <= endDate &&
            (pur.bpo?.supplier?.company_name
              ?.toLowerCase()
              .includes(client.trim().toLowerCase()) ||
              pur.bpo?.customer?.company_name
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()))
          );
        else {
          return pur;
        }
        // return (
        //   (pur.bpo?.booking_date >= startDate &&
        //     pur.bpo?.booking_date <= endDate) ||
        //   pur.bpo?.customer?.customer_type == customerType ||
        //   pur.bpo?.supplier?.customer_type == customerType ||
        //   pur.bpo?.supplier?.company_name
        //     ?.toLowerCase()
        //     .includes(client.trim().toLowerCase()) ||
        //   pur.bpo?.customer?.company_name
        //     ?.toLowerCase()
        //     .includes(client.trim().toLowerCase())
        // );
      })
    : props.purchaseSalesIndent.purchaseSalesIndent;

  let data2 = {
    token: props.login?.login?.token,
  };
  useEffect(() => {
    props.onPurchaseSalesIndentGetData(data2);
    props.onSupplierGetData(data2);
  }, []);

  useEffect(() => {
    if (filter) {
      props.purchaseSalesIndent.purchaseSalesIndent
        .filter((pur, i) => {
          if (startDate && endDate && !client && !customerType)
            return (
              pur.bpo?.booking_date >= startDate &&
              pur.bpo?.booking_date <= endDate
            );
          else if (client && !startDate && !endDate && !customerType)
            return (
              pur.bpo?.supplier?.company_name
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
              pur.bpo?.customer?.company_name
                ?.toLowerCase()
                .includes(client.trim().toLowerCase())
            );
          else if (customerType && !startDate && !endDate && !client)
            return (
              pur.bpo?.customer?.customer_type == customerType ||
              pur.bpo?.supplier?.customer_type == customerType
            );
          else if (startDate && endDate && client && !customerType)
            return (
              pur.bpo?.booking_date >= startDate &&
              pur.bpo?.booking_date <= endDate &&
              (pur.bpo?.supplier?.company_name
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
                pur.bpo?.customer?.company_name
                  ?.toLowerCase()
                  .includes(client.trim().toLowerCase()))
            );
          else if (client && customerType && !startDate && !endDate)
            return (
              (pur.bpo?.supplier?.company_name
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
                pur.bpo?.customer?.company_name
                  ?.toLowerCase()
                  .includes(client.trim().toLowerCase())) &&
              (pur.bpo?.customer?.customer_type == customerType ||
                pur.bpo?.supplier?.customer_type == customerType)
            );
          else if (startDate && endDate && customerType && !client)
            return (
              (pur.bpo?.customer?.customer_type == customerType ||
                pur.bpo?.supplier?.customer_type == customerType) &&
              pur.bpo?.booking_date >= startDate &&
              pur.bpo?.booking_date <= endDate
            );
          else if (startDate && endDate && client && customerType)
            return (
              (pur.bpo?.customer?.customer_type == customerType ||
                pur.bpo?.supplier?.customer_type == customerType) &&
              pur.bpo?.booking_date >= startDate &&
              pur.bpo?.booking_date <= endDate &&
              (pur.bpo?.supplier?.company_name
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
                pur.bpo?.customer?.company_name
                  ?.toLowerCase()
                  .includes(client.trim().toLowerCase()))
            );
          else {
            return pur;
          }

          // );
        })
        .map((pur, i) =>
          csv.push({
            "Ref Date": pur.bpo?.booking_date ?? "",
            Customer: pur.bpo?.customer?.company_name ?? "",
            Supplier: pur.bpo?.supplier?.company_name ?? "",
            "Contract Number": pur.bpo?.contract_number ?? "",
            "Invoice No": pur.invoice_no ?? "",
            "Invoice Status": pur.invoice_status ?? "",
            "Container Number": pur.container_number ?? "",
            Commodity: pur.commodity ?? "",
            Quantity: pur.bpo?.quantity ?? "",
            "Invoice Price": pur.bpo?.price ?? "",
            "Total Commission": pur.bpo?.commission ?? "",
            Commission: pur.commission ?? "",
          })
        );
    }
  }, [
    startDate,
    endDate,
    client,
    customerType,
    props.purchaseSalesIndent.purchaseSalesIndent,
    filter,
  ]);

  return (
    <Card className="m-4">
      <CardHeader className="p-2 text-white">
        <Formik
          initialValues={{
            start_date: "",
            end_date: "",
            client: "",
            customer_type: "",
            commission_type: "",
          }}
        >
          {(formProps) => {
            console.log(`formProps.values`, formProps.values);
            setStartDate(formProps.values.start_date);
            setEndDate(formProps.values.end_date);
            setClient(formProps.values.client);
            setCustomerType(formProps.values.customer_type);
            setCommissionType(formProps.values.commission_type);
            return (
              <Form>
                <Row className="form-group d-flex align-items-end">
                  <Col md={4}>
                    <Label className="label">Start At</Label>
                    <TextField
                      fullWidth
                      variant="standard"
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
                  <Col md={4}>
                    <Label className="label">End At</Label>
                    <TextField
                      fullWidth
                      variant="standard"
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
                        formProps.touched.end_date && formProps.errors.end_date
                      }
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="client"
                      name="client"
                      label="Search Supplier and Customer"
                      value={formProps.values.client}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.client &&
                        Boolean(formProps.errors.client)
                      }
                      helperText={
                        formProps.touched.client && formProps.errors.client
                      }
                    />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={4}>
                    <TextField
                      fullWidth
                      select
                      variant="standard"
                      id="customer_type"
                      name="customer_type"
                      label="Select Customer Type"
                      value={formProps.values.customer_type}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.customer_type &&
                        Boolean(formProps.errors.customer_type)
                      }
                      helperText={
                        formProps.touched.customer_type &&
                        formProps.errors.customer_type
                      }
                    >
                      <MenuItem value="Customer">Customer</MenuItem>
                      <MenuItem value="Supplier">Supplier</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={4}>
                    <TextField
                      fullWidth
                      variant="standard"
                      select
                      id="commission_type"
                      name="commission_type"
                      label="Select Commission Type"
                      value={formProps.values.commission_type}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.commission_type &&
                        Boolean(formProps.errors.commission_type)
                      }
                      helperText={
                        formProps.touched.commission_type &&
                        formProps.errors.commission_type
                      }
                    >
                      <MenuItem value="Paid Commission">
                        Paid Commission
                      </MenuItem>
                      <MenuItem value="All Commission">All Commission</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Button
                        type="button"
                        className="bg-gradient-green"
                        onClick={() => setFilter(true)}
                      >
                        Generate Report
                      </Button>
                      <ExportCSV
                        csvData={csv}
                        setCsv={setCsv}
                        report
                        fileName={`commission-${dateFormat(
                          startDate,
                          "dd-mm-yyyy"
                        )}-${dateFormat(endDate, "dd-mm-yyyy")}`}
                      />
                    </Row>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </CardHeader>
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props.purchaseSalesIndent?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
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
export default connect(mapStateToProps, mapDispatchToProps)(ManageCommission);
