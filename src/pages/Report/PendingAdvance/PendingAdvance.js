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
function PendingAdvance(props) {
  const [csv, setCsv] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [client, setClient] = useState();
  const [filter, setFilter] = useState(false);
  const [commodity, setCommodity] = useState();
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "ref_no", headerName: "Ref No", flex: 1 },
    { field: "ctt_no", headerName: "CTT No", flex: 1 },
    { field: "supplier", headerName: "Supplier", flex: 1 },
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "psic_number", headerName: "PSIC Number", flex: 1 },
    { field: "commodity", headerName: "Commodity", flex: 1 },
    { field: "co", headerName: "Container", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "invoice_no", headerName: "Inv. No", flex: 1 },
    { field: "d", headerName: "Date", flex: 1 },
    { field: "total", headerName: "Total", flex: 1 },
    { field: "advance", headerName: "Advance", flex: 1 },
    { field: "n", headerName: "Net", flex: 1 },
    { field: "b", headerName: "B/L", flex: 1 },
    { field: "shipping", headerName: "Shipping", flex: 1 },
    { field: "disharge_port", headerName: "Port of Disharge", flex: 1 },
    { field: "etd", headerName: "ETD", flex: 1 },
    { field: "e", headerName: "ETA", flex: 1 },
    { field: "eta_at_icd", headerName: "ETA ICD", flex: 1 },
    { field: "c", headerName: "Container Status", flex: 1 },
    { field: "delivery_port", headerName: "Final Port of Delivery", flex: 1 },
    { field: "awb", headerName: "AWB", flex: 1 },
    { field: "cu", headerName: "CU", flex: 1 },
    { field: "dy", headerName: "DY", flex: 1 },
  ];

  const rows = props.payment?.isLoading
    ? []
    : filter
    ? props.payment.payment.filter((pay, i) => {
        if (
          startDate &&
          endDate &&
          !client &&
          !commodity &&
          pay.is_advance_pending == 1
        )
          return pay.payment_date >= startDate && pay.payment_date <= endDate;
        else if (client && !startDate && !endDate && !commodity)
          return (
            pay.supplier?.toLowerCase().includes(client.trim().toLowerCase()) ||
            pay.customer?.toLowerCase().includes(client.trim().toLowerCase())
          );
        else if (
          commodity &&
          !startDate &&
          !endDate &&
          !client &&
          pay.is_advance_pending == 1
        )
          return pay.commodity
            ?.toLowerCase()
            .includes(commodity.trim().toLowerCase());
        else if (
          startDate &&
          endDate &&
          client &&
          !commodity &&
          pay.is_advance_pending == 1
        )
          return (
            pay.payment_date >= startDate &&
            pay.payment_date <= endDate &&
            (pay.supplier
              ?.toLowerCase()
              .includes(client.trim().toLowerCase()) ||
              pay.customer?.toLowerCase().includes(client.trim().toLowerCase()))
          );
        else if (
          client &&
          commodity &&
          !startDate &&
          !endDate &&
          pay.is_advance_pending == 1
        )
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
        else if (
          startDate &&
          endDate &&
          commodity &&
          !client &&
          pay.is_advance_pending == 1
        )
          return (
            pay.commodity
              ?.toLowerCase()
              .includes(commodity.trim().toLowerCase()) &&
            pay.payment_date >= startDate &&
            pay.payment_date <= endDate
          );
        else if (
          startDate &&
          endDate &&
          client &&
          commodity &&
          pay.is_advance_pending == 1
        )
          return (
            pay.commodity
              ?.toLowerCase()
              .includes(commodity.trim().toLowerCase()) &&
            pay.payment_date >= startDate &&
            pay.payment_date <= endDate &&
            (pay.supplier
              ?.toLowerCase()
              .includes(client.trim().toLowerCase()) ||
              pay.customer?.toLowerCase().includes(client.trim().toLowerCase()))
          );
        else if (
          !startDate &&
          !endDate &&
          !client &&
          !commodity &&
          pay.is_advance_pending == 1
        ) {
          return pay;
        } else {
          if (pay.is_advance_pending == 1) return pay;
        }
      })
    : props.payment.payment?.filter((p) => p.is_advance_pending == 1);

  let data = {
    token: props.login?.login?.token,
  };

  useEffect(() => {
    props.paymentGetData(data);
  }, []);

  useEffect(() => {
    if (filter) {
      props.payment.payment
        .filter((pay, i) => {
          if (
            startDate &&
            endDate &&
            !client &&
            !commodity &&
            pay.is_advance_pending == 1
          )
            return pay.payment_date >= startDate && pay.payment_date <= endDate;
          else if (
            client &&
            !startDate &&
            !endDate &&
            !commodity &&
            pay.is_advance_pending == 1
          )
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
          else if (
            startDate &&
            endDate &&
            client &&
            !commodity &&
            pay.is_advance_pending == 1
          )
            return (
              pay.payment_date >= startDate &&
              pay.payment_date <= endDate &&
              (pay.supplier
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
                pay.customer
                  ?.toLowerCase()
                  .includes(client.trim().toLowerCase()))
            );
          else if (
            client &&
            commodity &&
            !startDate &&
            !endDate &&
            pay.is_advance_pending == 1
          )
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
          else if (
            startDate &&
            endDate &&
            commodity &&
            !client &&
            pay.is_advance_pending == 1
          )
            return (
              pay.commodity
                ?.toLowerCase()
                .includes(commodity.trim().toLowerCase()) &&
              pay.payment_date >= startDate &&
              pay.payment_date <= endDate
            );
          else if (
            startDate &&
            endDate &&
            client &&
            commodity &&
            pay.is_advance_pending == 1
          )
            return (
              pay.commodity
                ?.toLowerCase()
                .includes(commodity.trim().toLowerCase()) &&
              pay.payment_date >= startDate &&
              pay.payment_date <= endDate &&
              (pay.supplier
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
                pay.customer
                  ?.toLowerCase()
                  .includes(client.trim().toLowerCase()))
            );
          else if (
            !startDate &&
            !endDate &&
            !client &&
            !commodity &&
            pay.is_advance_pending == 1
          ) {
            return pay;
          } else {
            if (pay.is_advance_pending == 1) return pay;
          }
        })
        .map((pur, i) =>
          csv.push({
            "Ref No": pur.ref_no ?? "",
            "CTT No": pur.ctt_no ?? "",
            Customer: pur.customer ?? "",
            Supplier: pur.supplier ?? "",
            "PSIC Number": pur.psic_number ?? "",
            Commodity: pur.commodity ?? "",
            Container: pur.container ?? "",
            Quantity: pur.quantity ?? "",
            Price: pur.price ?? "",
            "Invoice No": pur.invoice_no ?? "",
            Date: pur.invoice_no ?? "",
            Total: pur.total ?? "",
            Advance: pur.advance ?? "",
            Net: pur.net ?? "",
            "B/L": pur.bl ?? "",
            Shipping: pur.shipping ?? "",
            "Port of Disharge": pur.disharge_port ?? "",
            ETD: pur.etd ?? "",
            "ETA ICD": pur.eta_at_icd ?? "",
            "Container Status": pur.container_status ?? "",
            "Final Port of Delivery": pur.delivery_port ?? "",
            AWB: pur.awb ?? "",
            CU: pur.cu ?? "",
            DY: pur.dy ?? "",
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
                        fileName={`paid-payment-report-${dateFormat(
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
            loading={props.payment?.isLoading ? true : false}
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
    payment: state.payment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    paymentGetData: (data) => dispatch(actions.paymentGetData(data)),
    onDeletePayment: (id, data) => dispatch(actions.deletePayment(id, data)),
    onPostPaymentData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postPaymentData(data, user, toggle, setSubmitting)),
    updatePaymentData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updatePaymentData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PendingAdvance);
