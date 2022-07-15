/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col, Label, Button } from "reactstrap";
import { Form, Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import "../../../css/main.css";
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
function MetricTonBooked(props) {
  const [csv, setCsv] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [client, setClient] = useState();
  const [filter, setFilter] = useState(false);

  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "pc_no", headerName: "Ref No", flex: 1 },
    // { field: "ctt_no", headerName: "CTT No", flex: 1 },
    { field: "supplier", headerName: "Supplier", flex: 1 },
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "contract_number", headerName: "Sales Contract Number", flex: 1 },
    { field: "sc_date", headerName: "Sales Contract Date", flex: 1 },
    { field: "commodity", headerName: "Commodity", flex: 1 },
    { field: "total_quantity", headerName: "Total Quantity", flex: 1 },
    { field: "price", headerName: "Total Price", flex: 1 },
    { field: "quantity_fixed", headerName: "Quantity Shipped", flex: 1 },
    { field: "pending_quantity", headerName: "Pending Quantity", flex: 1 },
  ];

  const rows = props.metricTon?.isLoading
    ? []
    : filter
    ? props.metricTon.metricTon.filter((pay, i) => {
        if (startDate && endDate && !client)
          return pay.booking_date >= startDate && pay.booking_date <= endDate;
        else if (client && !startDate && !endDate)
          return (
            pay.supplier?.toLowerCase().includes(client.trim().toLowerCase()) ||
            pay.customer?.toLowerCase().includes(client.trim().toLowerCase())
          );
        else if (startDate && endDate && client)
          return (
            pay.booking_date >= startDate &&
            pay.booking_date <= endDate &&
            (pay.supplier
              ?.toLowerCase()
              .includes(client.trim().toLowerCase()) ||
              pay.customer?.toLowerCase().includes(client.trim().toLowerCase()))
          );
        else {
          return pay;
        }
      })
    : props.metricTon.metricTon;

  let data = {
    token: props.login?.login?.token,
  };

  useEffect(() => {
    props.metricTonGetData(data);
  }, []);

  useEffect(() => {
    if (filter) {
      props.metricTon.metricTon
        .filter((pay, i) => {
          if (startDate && endDate && !client)
            return pay.booking_date >= startDate && pay.booking_date <= endDate;
          else if (client && !startDate && !endDate)
            return (
              pay.supplier
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
              pay.customer?.toLowerCase().includes(client.trim().toLowerCase())
            );
          else if (startDate && endDate && client)
            return (
              pay.booking_date >= startDate &&
              pay.booking_date <= endDate &&
              (pay.supplier
                ?.toLowerCase()
                .includes(client.trim().toLowerCase()) ||
                pay.customer
                  ?.toLowerCase()
                  .includes(client.trim().toLowerCase()))
            );
          else {
            return pay;
          }
        })
        .map((pur, i) =>
          csv.push({
            "Sr No": i + 1 ?? "",
            "Ref No": pur.pc_no ?? "",
            Supplier: pur.supplier ?? "",
            Customer: pur.customer ?? "",
            "Sales Contract Number": pur.contract_number ?? "",
            "Sales Contract Date": pur.sc_date ?? "",
            Commodity: pur.commodity ?? "",
            "Total Quantity": pur.total_quantity ?? "",
            "Total price": pur.price ?? "",
            "Quantity Shipped": pur.quantity_fixed ?? "",
            "Pending Quantity": pur.pending_quantity ?? "",
          })
        );
    }
  }, [startDate, endDate, client, filter]);
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

              return (
                <Form>
                  {/* <Label>Data Range</Label> */}
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
                          formProps.touched.end_date &&
                          formProps.errors.end_date
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
                        fileName={`pending-lme-${dateFormat(
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
            loading={props.metricTon?.isLoading ? true : false}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            components={{
              Toolbar: CustomToolbar,
            }}
            checkboxSelection
            disableSelectionOnClick
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
    metricTon: state.metricTon,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    metricTonGetData: (data) => dispatch(actions.metricTonGetData(data)),
    onDeleteMetricTon: (id, data) =>
      dispatch(actions.deleteMetricTon(id, data)),
    onPostMetricTonData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postMetricTonData(data, user, toggle, setSubmitting)),
    updateMetricTonData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateMetricTonData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MetricTonBooked);
