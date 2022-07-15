/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col, Label, Button } from "reactstrap";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import "../../../css/main.css";
import MenuItem from "@mui/material/MenuItem";
import * as actions from "../../../redux/creators";
import dateFormat from "dateformat";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  // GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { connect } from "react-redux";
import ExportCSV from "components/ExcelFile/ExportCSV";
import { DateFormat } from "components/DateFormat/DateFormat";

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
function PendingShipment(props) {
  const [csv, setCsv] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [client, setClient] = useState();
  const [filter, setFilter] = useState(false);
  const [commodity, setCommodity] = useState();
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    // { field: "ref_no", headerName: "Ref No", flex: 1 },
    // { field: "ctt_no", headerName: "CTT No", flex: 1 },
    { field: "supplier", headerName: "Supplier", flex: 1 },
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "sc_no", headerName: "SC. No", flex: 1 },
    {
      field: "sc_date",
      headerName: "SC. Date",
      flex: 1,
      renderCell: (params) => {
        return <DateFormat data={params.row?.sc_date} />;
      },
    },
    { field: "quantity", headerName: "PC.No.", flex: 1 },
    {
      field: "sac_date",
      headerName: "Expected Date of Shipment",
      flex: 1,
      renderCell: (params) => {
        return <DateFormat data={params.row?.sc_date} />;
      },
    },
    { field: "group_company", headerName: "Group Company", flex: 1 },
    { field: "document_desc", headerName: "Document Description", flex: 1 },
    { field: "commodity", headerName: "Commodity", flex: 1 },
    { field: "quantity", headerName: "P.C.Qty", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "advance", headerName: "Advance", flex: 1 },
    { field: "advance_date", headerName: "Advance Date", flex: 1 },
    { field: "advance_received", headerName: "Advance Received", flex: 1 },
    { field: "pending", headerName: "Pending Advance", flex: 1 },
    { field: "total_quantity", headerName: "Shipment Qty.", flex: 1 },
    { field: "pending_quantity", headerName: "Pending Qty.", flex: 1 },
    { field: "period", headerName: "Total Delay(in Days)", flex: 1 },
  ];

  const rows = props.pendingShipment?.isLoading
    ? []
    : filter
    ? props.pendingShipment.pendingShipment.filter((pay, i) => {
        if (startDate && endDate && !client && !commodity)
          return pay.sc_date >= startDate && pay.sc_date <= endDate;
        else if (client && !startDate && !endDate && !commodity)
          return (
            pay.supplier?.toLowerCase().includes(client.trim().toLowerCase()) ||
            pay.customer?.toLowerCase().includes(client.trim().toLowerCase())
          );
        else if (commodity && !startDate && !endDate && !client)
          return pay.commodity
            ?.toLowerCase()
            .includes(commodity.trim().toLowerCase());
        else if (startDate && endDate && client && !commodity)
          return (
            pay.sc_date >= startDate &&
            pay.sc_date <= endDate &&
            (pay.supplier
              ?.toLowerCase()
              .includes(client.trim().toLowerCase()) ||
              pay.customer?.toLowerCase().includes(client.trim().toLowerCase()))
          );
        else if (client && commodity && !startDate && !endDate)
          return (
            (pay.supplier
              ?.toLowerCase()
              .includes(client.trim().toLowerCase()) ||
              pay.customer
                ?.toLowerCase()
                .includes(client.trim().toLowerCase())) &&
            pay.commodity
              ?.toLowerCase()
              .includes(commodity.trim().toLowerCase())
          );
        else if (startDate && endDate && commodity && !client)
          return (
            pay.commodity
              ?.toLowerCase()
              .includes(commodity.trim().toLowerCase()) &&
            pay.sc_date >= startDate &&
            pay.sc_date <= endDate
          );
        else if (startDate && endDate && client && commodity)
          return (
            pay.commodity
              ?.toLowerCase()
              .includes(commodity.trim().toLowerCase()) &&
            pay.sc_date >= startDate &&
            pay.sc_date <= endDate &&
            (pay.supplier
              ?.toLowerCase()
              .includes(client.trim().toLowerCase()) ||
              pay.customer?.toLowerCase().includes(client.trim().toLowerCase()))
          );
        else if (!startDate && !endDate && !client && !commodity) {
          return pay;
        } else {
          return pay;
        }
      })
    : props.pendingShipment.pendingShipment;

  let data = {
    token: props.login?.login?.token,
  };

  useEffect(() => {
    props.pendingShipmentGetData(data);
  }, []);

  useEffect(() => {
    if (filter) {
      props.pendingShipment.pendingShipment
        .filter((pay, i) => {
          if (startDate && endDate && !client && !commodity)
            return pay.sc_date >= startDate && pay.sc_date <= endDate;
          else if (client && !startDate && !endDate && !commodity)
            return (
              pay.supplier
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
              pay.customer?.toLowerCase().includes(client.trim().toLowerCase())
            );
          else if (commodity && !startDate && !endDate && !client)
            return pay.commodity
              ?.toLowerCase()
              .includes(commodity.trim().toLowerCase());
          else if (startDate && endDate && client && !commodity)
            return (
              pay.sc_date >= startDate &&
              pay.sc_date <= endDate &&
              (pay.supplier
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
                pay.customer
                  ?.toLowerCase()
                  .includes(client.trim().toLowerCase()))
            );
          else if (client && commodity && !startDate && !endDate)
            return (
              (pay.supplier
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
                pay.customer
                  ?.toLowerCase()
                  .includes(client.trim().toLowerCase())) &&
              pay.commodity
                ?.toLowerCase()
                .includes(commodity.trim().toLowerCase())
            );
          else if (startDate && endDate && commodity && !client)
            return (
              pay.commodity
                ?.toLowerCase()
                .includes(commodity.trim().toLowerCase()) &&
              pay.sc_date >= startDate &&
              pay.sc_date <= endDate
            );
          else if (startDate && endDate && client && commodity)
            return (
              pay.commodity
                ?.toLowerCase()
                .includes(commodity.trim().toLowerCase()) &&
              pay.sc_date >= startDate &&
              pay.sc_date <= endDate &&
              (pay.supplier
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
                pay.customer
                  ?.toLowerCase()
                  .includes(client.trim().toLowerCase()))
            );
          else if (!startDate && !endDate && !client && !commodity) {
            return pay;
          } else {
            return pay;
          }
        })
        .map((pur, i) =>
          csv.push({
            "Sr No": i + 1 ?? "",
            Supplier: pur.supplier ?? "",
            Customer: pur.customer ?? "",
            "SC No.": pur.sc_no ?? "",
            "SC Date": pur.sc_date ?? "",
            "PC No": pur.pc_no ?? "",
            "Expected Date of Shipment": pur.sc_date ?? "",
            "Group Company": pur.group_company ?? "",
            "Document Decription": pur.document_desc ?? "",
            Commodity: pur.commodity ?? "",
            "PC Qty": pur.quantity ?? "",
            Price: pur.price ?? "",
            Advance: pur.advance ?? "",
            "Advance Date": pur.advance_date ?? "",
            "Advance Received": pur.advance_received ?? "",
            "Pending Advance": pur.pending ?? "",
            "Shipped Qty": pur.total_quantity ?? "",
            "Pending Qty": pur.pending_quantity ?? "",
            "Total Delays(in Days)": pur.period ?? "",
          })
        );
    }
  }, [startDate, endDate, client, filter]);

  console.log(`client`, client);
  return (
    <>
      <Card className="m-4">
        <CardBody>
          <Formik
            initialValues={{
              start_date: "",
              end_date: "",
              client: "",
              customer: "",
              commodity: "",
              export: "",
            }}

            // validationSchema={Yup.object().shape({
            //   start_date: Yup.string().required("required"),
            //   end_date: Yup.string().required("required"),
            // })}
          >
            {(formProps) => {
              setStartDate(formProps.values.start_date);
              setEndDate(formProps.values.end_date);
              setClient(formProps.values.client);
              setCommodity(formProps.values.commodity);
              return (
                <Form>
                  {/* <Label>Data Range</Label> */}
                  <Row className="form-group d-flex align-items-end">
                    <Col md={3}>
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
                    <Col md={3}>
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
                          formProps.touched.end_date &&
                          formProps.errors.end_date
                        }
                      />
                    </Col>
                    <Col md={3}>
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
                    <Col md={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="commodity"
                        name="commodity"
                        label="Commodity"
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
                  </Row>
                  {/* <Row className="form-group">
                  
                  <Col md={4}>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="customer"
                      name="customer"
                      label="Select Customer"
                      value={formProps.values.customer}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.customer &&
                        Boolean(formProps.errors.customer)
                      }
                      helperText={
                        formProps.touched.customer && formProps.errors.customer
                      }
                    />
                  </Col>
                  
                </Row> */}
                  <Row className="form-group">
                    {/* <Col md={4}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      type="text"
                      id="export"
                      label="Export"
                      name="export"
                      value={formProps.values.export}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.export &&
                        Boolean(formProps.errors.export)
                      }
                      helperText={
                        formProps.touched.export && formProps.errors.export
                      }
                    >
                      <MenuItem value="Summarized">Summarized</MenuItem>
                      <MenuItem value="Full Export">Full Export</MenuItem>
                    </TextField>
                  </Col> */}
                    <Col md={6}>
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
                        fileName={`pending-shipment-report-${dateFormat(
                          startDate,
                          "dd-mm-yyyy"
                        )}-${dateFormat(endDate, "dd-mm-yyyy")}`}
                      />
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
      <Card className="m-4">
        <CardBody>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={props.pendingShipment?.isLoading ? true : false}
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    city: state.city,
    country: state.country,
    states: state.state,
    pendingShipment: state.pendingShipment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pendingShipmentGetData: (data) =>
      dispatch(actions.pendingShipmentGetData(data)),
    onDeletePendingShipment: (id, data) =>
      dispatch(actions.deletePendingShipment(id, data)),
    onPostPendingShipmentData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postPendingShipmentData(data, user, toggle, setSubmitting)
      ),
    updatePendingShipmentData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updatePendingShipmentData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PendingShipment);
