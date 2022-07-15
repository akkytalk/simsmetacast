/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import dateFormat from "dateformat";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  InputGroup,
  Table,
} from "reactstrap";
import { Field, FieldArray, Form, Formik } from "formik";
import { connect } from "react-redux";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "../../store/creators";
import TextField from "@material-ui/core/TextField";
import "../../css/main.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  // GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { DateFormat } from "components/DateFormat/DateFormat";

import MenuButton from "../../components/MenuButton/MenuButton";
import ExportCSV from "components/ExcelFile/ExportCSV";
import { useHistory } from "react-router-dom";
import DeleteButton from "../../Helpers/DeleteButton";
import CustomTextField from "../../components/MuiComponents/CustomTextField";
import CustomAutoComplete from "../../components/MuiComponents/CustomAutoComplete";
import CustomInput from "views/Views/CustomInput";
import CustomSelectField from "../../components/MuiComponents/CustomSelectField";
import { isEmpty } from "./../../Helpers/helper";
import EditSalesConfirmation from "./EditSalesConfirmation";
import AddButton from "Helpers/AddButton";

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

const options = [
  { name: "Edit Sales Confirmation", page: "edit-sales-confirmation" },
  { name: "Create Purchase Order", page: "create-sales-confirmation" },
];

function SalesConfirmation(props) {
  const history = useHistory();
  const [csv, setCsv] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [pageSize, setPageSize] = React.useState(10);
  let data2 = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onCommissionUnitGetData(data2);
    props.onPriceUnitGetData(data2);
    props.onClientGetData(data2);
    props.salesConfirmationGetData(data2);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      props.salesConfirmation.salesConfirmation
        .filter((user) => {
          return user.partner_name >= startDate && user.partner_name <= endDate;
        })
        .map((user, index) =>
          csv?.push({
            "Sr No": index + 1,
            "Book Date": dateFormat(user.partner_name, "dd-mm-yyyy"),
            "Customer Name": user.customer?.company_name,
            "Supplier Name": user.supplier?.company_name,
            "No of Purchase Order": user.pan_nos,
            telephone_no: user.telephone_no,
            Commission: user.address,
            iec_no: user.iec_nos,
          })
        );
    }
  }, [startDate && endDate]);
  const defaultProps = {
    options: props.client,
    getOptionLabel: (option) => option.company_name,
  };

  const flatProps = {
    options: props.client?.filter(
      (s) => s.customer_type == "Supplier" || s.customer_type == "Both"
    ),
    getOptionLabel: (option) => option.company_name,
  };

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.create == 1
      ? true
      : false;

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      disableExport: true,
      sortable: false,
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <EditSalesConfirmation data={params.row} index={params.row.id} />
      ),
    },
    { field: "id", headerName: "ID", flex: 1 },
    { field: "ref_no", headerName: "Ref No", flex: 1 },
    {
      field: "booking_date",
      headerName: "Booking Date",
      flex: 1,
      valueFormatter: ({ value }) => {
        return `${value ? dateFormat(value, "dd-mm-yyyy") : ""}`;
      },
    },
    {
      field: "partner_name",
      headerName: "Partner Name",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      valueFormatter: ({ value }) => `${value?.company_name ?? ""}`,
      renderCell: ({ value }) => value?.company_name ?? "",
    },

    { field: "address", headerName: "address", flex: 1 },
    {
      field: "telephone_no",
      headerName: "telephone_no",
      flex: 1,
    },
  ];

  const rows = props.salesConfirmation?.isLoading
    ? []
    : !isEmpty(props.salesConfirmation.salesConfirmation)
    ? startDate && endDate
      ? props.salesConfirmation.salesConfirmation.filter((user) => {
          return user.booking_date >= startDate && user.booking_date <= endDate;
        })
      : props.salesConfirmation.salesConfirmation
    : [];

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const user = new FormData();
    user.append("user_id", props.login?.login?.user?.id);
    user.append("customer_id", values.company_name);
    user.append("partner_name", values.partner_name);
    user.append("email", values.email);
    user.append("telephone_no", values.telephone_no);
    user.append("gst_no", values.gst_no);
    user.append("iec_no", values.iec_no);
    user.append("pan_no", values.pan_no);
    user.append("bank_name", values.bank_name);
    user.append("bank_ac_no", values.bank_ac_no);
    user.append("bank_address", values.bank_address);
    user.append("bank_telephone_no", values.bank_telephone_no);
    user.append("swift_code", values.swift_code);
    user.append("rtgs_code", values.rtgs_code);
    user.append("desc", values.desc);
    user.append("destination_port", values.destination_port);
    user.append("select_final_destination", values.select_final_destination);
    user.append("advance_amount", values.advance_amount);
    user.append("is_highsea", values.is_highsea);
    user.append("highsea_file", values.highsea_file);
    user.append("address", values.address);
    user.append(
      "commodity_analysis",
      JSON.stringify(values.commodity_analysis_id)
    );
    user.append("sc_id", "");

    console.log("Data of Sales Confirmation:", user);
    props.postSalesConfirmationData(data2, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              start_date: "",
              end_date: "",
            }}
            validationSchema={Yup.object().shape({
              start_date: Yup.string().required("required"),
              end_date: Yup.string().required("required"),
            })}
          >
            {(formProps) => {
              // setStartDate(formProps.values.start_date);
              // setEndDate(formProps.values.end_date);
              return (
                <Form>
                  <Row className="form-group d-flex align-items-end">
                    <Col md={2}>
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
                    <Col md={2}>
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
                    <Col md={2} className="align-self-end">
                      <ExportCSV
                        csvData={csv}
                        setCsv={setCsv}
                        fileName={`purchase_order-${dateFormat(
                          startDate,
                          "dd-mm-yyyy"
                        )}-${dateFormat(endDate, "dd-mm-yyyy")}`}
                      />
                      {/* <Button
                        type="submit"
                        disabled={formProps.isSubmitting}
                        className="bg-gradient-info text-white"
                      >
                        Download
                      </Button> */}
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </div>
        {createStatus && (
          <Button
            className="btn-success p-2 float-right"
            onClick={() => {
              toggle();
            }}
          >
            <i className="fa fa-plus text-white mr-2" />
            Create Sales Confirmation
          </Button>
        )}

        <Modal
          className="modal-xl"
          backdrop="static"
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add New Sales Confirmation
          </ModalHeader>

          {props.salesConfirmation?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                company_name: "",
                partner_name: "",
                email: "",
                telephone_no: "",
                address: "",
                gst_no: "",
                iec_no: "",
                pan_no: "",
                bank_name: "",
                bank_address: "",
                bank_telephone_no: "",
                swift_code: "",
                rtgs_code: "",
                bank_ac_no: "",
                desc: "",
                destination_port: "",
                select_final_destination: "",
                advance_amount: "",
                is_highsea: "",
                highsea_file: "",
                commodity_analysis_id: [
                  {
                    product_name: "",
                    analysis: "",
                  },
                ],
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                //     company_name: Yup.string().required("required"),
                //     partner_name: Yup.string().required("required"),
                //     email: Yup.string().required("required"),
                //     telephone_no: Yup.string().required("required"),
                //     address: Yup.string().required("required"),
                //     // gst_no: Yup.string().required("required"),
                //     pan_no: Yup.string().required("required"),
                //     swift_code:
                //       Yup.string().required("required"),
                //    bank_ac_no:
                //       Yup.string().required("required"),
                //    desc: Yup.string().required("required"),
                // bank_name: Yup.string().required("required"),
                // bank_address: Yup.string().required("required"),
                // bank_telephone_no: Yup.string().required("required"),
              })}
            >
              {(formProps) => (
                <Form>
                  {console.log(`formProps.values`, formProps.values)}
                  <Row className="form-group">
                    <Col md={3} className="">
                      <InputGroup>
                        <CustomAutoComplete
                          name="company_name"
                          formProps={formProps}
                          defaultProps={defaultProps}
                          label="Company Name"
                        />
                        {/* <Autocomplete
                          {...defaultProps}
                          id="company_name"
                          name="company_name"
                          onChange={(event, newValue) => {
                            formProps.setFieldValue(
                              `company_name`,
                              newValue?.id ?? ""
                            );
                          }}
                          sx={{ width: "100%" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Customer Name *"
                              variant="standard"
                              name="company_name"
                              error={
                                formProps.touched.company_name &&
                                Boolean(formProps.errors.company_name)
                              }
                              helperText={
                                formProps.touched.company_name &&
                                formProps.errors.company_name
                              }
                            />
                          )}
                        /> */}
                      </InputGroup>
                    </Col>
                    <Col md={3} className="">
                      <CustomTextField
                        formProps={formProps}
                        name="partner_name"
                        label="Partner Name"
                      />
                    </Col>

                    <Col md={3}>
                      <InputGroup>
                        <CustomTextField
                          name="telephone_no"
                          type="tel"
                          formProps={formProps}
                          label="Telephone No"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={3}>
                      <InputGroup>
                        <CustomTextField
                          name="email"
                          type="email"
                          formProps={formProps}
                          label="Email Address"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <InputGroup>
                        <CustomTextField
                          label="Address"
                          name="address"
                          formProps={formProps}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={3}>
                      <CustomTextField
                        label="GST NO"
                        name="gst_no"
                        formProps={formProps}
                      />
                    </Col>
                    <Col md={3}>
                      <CustomTextField
                        label="IEC No"
                        name="iec_no"
                        formProps={formProps}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={3}>
                      <CustomTextField
                        label="PAN No"
                        name="pan_no"
                        formProps={formProps}
                      />
                    </Col>
                    <Col md={3}>
                      <CustomTextField
                        label="Bank Name"
                        name="bank_name"
                        formProps={formProps}
                      />
                    </Col>

                    <Col md={6}>
                      <CustomTextField
                        label="Bank Address"
                        name="bank_address"
                        formProps={formProps}
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={3}>
                      <CustomTextField
                        label="Bank Telphone No"
                        name="bank_telephone_no"
                        type="tel"
                        formProps={formProps}
                      />
                    </Col>
                    <Col md={3}>
                      <CustomTextField
                        label="Swift Code"
                        name="swift_code"
                        formProps={formProps}
                      />
                    </Col>
                    <Col md={3}>
                      <CustomTextField
                        label="RTGS Code"
                        name="rtgs_code"
                        formProps={formProps}
                      />
                    </Col>
                    <Col md={3}>
                      <CustomTextField
                        label="Bank A/C No"
                        name="bank_ac_no"
                        formProps={formProps}
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={3}>
                      <CustomTextField
                        label="Description"
                        name="desc"
                        formProps={formProps}
                      />
                    </Col>
                    <Col md={3}>
                      <CustomTextField
                        label="Advance Amount"
                        name="advance_amount"
                        formProps={formProps}
                      />
                    </Col>
                    <Col md={3}>
                      <CustomTextField
                        label="Select Destination Port"
                        name="destination_port"
                        formProps={formProps}
                      />
                    </Col>

                    <Col md={3}>
                      <CustomTextField
                        label="Select Final Destination"
                        name="select_final_destination"
                        formProps={formProps}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group mb-50">
                    <Col md={6}>
                      <FieldArray
                        name={`commodity_analysis_id`}
                        render={(analysisArrayHelper) => {
                          return (
                            <>
                              <Table className="table">
                                <thead className="bg-black text-white">
                                  <tr>
                                    <th scope="col" className="analysis-th">
                                      Commodity
                                    </th>
                                    <th scope="col" className="analysis-th">
                                      Analysis
                                    </th>
                                    <th
                                      scope="col"
                                      className="analysis-th"
                                    ></th>
                                  </tr>
                                </thead>
                                {formProps.values.commodity_analysis_id?.map(
                                  (ana, analysisIndex) => {
                                    return (
                                      <tbody
                                        className="bg-white analysis-body"
                                        key={analysisIndex}
                                      >
                                        <tr>
                                          <td className="analysis-td">
                                            <Field
                                              fullWidth
                                              component={CustomInput}
                                              className="bg-white"
                                              id={`commodity_analysis_id.${analysisIndex}.product_name`}
                                              placeholder="Commodity"
                                              name={`commodity_analysis_id.${analysisIndex}.product_name`}
                                            />
                                          </td>
                                          <td className="analysis-td">
                                            <Field
                                              className="bg-white"
                                              component={CustomInput}
                                              id={`commodity_analysis_id.${analysisIndex}.analysis`}
                                              placeholder="Analysis"
                                              name={`commodity_analysis_id.${analysisIndex}.analysis`}
                                            />
                                          </td>
                                          <td className="analysis-td">
                                            {formProps.values
                                              ?.commodity_analysis_id
                                              ?.length ===
                                              analysisIndex + 1 && (
                                              <AddButton
                                                onClick={() => {
                                                  analysisArrayHelper.push({
                                                    product_name: "",
                                                    analysis: "",
                                                  });
                                                }}
                                              />
                                            )}
                                            {formProps.values
                                              ?.commodity_analysis_id?.length >
                                              1 && (
                                              <DeleteButton
                                                deleteFunction={() =>
                                                  analysisArrayHelper.remove(
                                                    analysisIndex
                                                  )
                                                }
                                              />
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    );
                                  }
                                )}
                              </Table>
                            </>
                          );
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <CustomSelectField
                        name={`is_highsea`}
                        label="Select Highsea Status"
                        formProps={formProps}
                        options={[
                          { name: "Yes", value: 1 },
                          { name: "No", value: 0 },
                        ]}
                        value={formProps?.values.is_highsea}
                      />
                    </Col>
                    <Col md={3}>
                      {formProps?.values.is_highsea === 1 && (
                        <InputGroup>
                          <Label className="label">File Upload</Label>
                          <TextField
                            fullWidth
                            variant="standard"
                            id="highsea_file"
                            type="file"
                            name="highsea_file"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "highsea_file",
                                event.currentTarget.files[0]
                              );
                            }}
                            error={
                              formProps.touched.highsea_file &&
                              Boolean(formProps.errors.highsea_file)
                            }
                            helperText={
                              formProps.touched.highsea_file &&
                              formProps.errors.highsea_file
                            }
                          ></TextField>
                        </InputGroup>
                      )}
                    </Col>
                  </Row>

                  <Row className="form-group d-flex align-items-end"></Row>

                  <Row style={{ justifyContent: "center" }}>
                    <Col md={4}>
                      <Button type="reset" color="danger" block>
                        <b>Reset</b>
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        type="submit"
                        disabled={formProps.isSubmitting}
                        color="primary"
                        block
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </CardHeader>
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // getRowClassName={(params) => {
          //   if (params.row.pan_nos == params?.row?.psi_count) {
          //     return "bg-green-2";
          //   } else if (
          //     Number(Math.round(params.row.pan_nos / 2)) ==
          //     Number(params?.row?.psi_count)
          //   ) {
          //     return "bg-orange-2";
          //   }
          //   // else if (params.row.pan_nos < params?.row?.psi_count) {
          //   //   return "bg-yellow-2";
          //   // }
          //   else {
          //     return "bg-white";
          //   }
          // }}
          loading={props.salesConfirmation?.isLoading ? true : false}
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
    client: state.entities.client.client,
    city: state.entities.address.city,
    country: state.entities.address.country,
    state: state.entities.address.state,
    login: state.login,
    salesConfirmation: state.entities.salesConfirmation,
    commissionUnit: state.entities.master.commissionUnit.commissionUnit,
    priceUnit: state.entities.master.priceUnit.priceUnit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuantityUnitGetData: (data) =>
      dispatch(actions.quantityUnitGetData(data)),
    onPriceUnitGetData: (data) => dispatch(actions.priceUnitGetData(data)),
    onCommissionUnitGetData: (data) =>
      dispatch(actions.commissionUnitGetData(data)),
    onClientGetData: (data) => dispatch(actions.clientGetData(data)),
    salesConfirmationGetData: (data) =>
      dispatch(actions.salesConfirmationGetData(data)),
    cityGetData: (data) => dispatch(actions.cityGetData(data)),
    countryGetData: (data) => dispatch(actions.countryGetData(data)),
    stateGetData: (data) => dispatch(actions.stateGetData(data)),
    deleteSalesConfirmation: (id, data) =>
      dispatch(actions.deleteSalesConfirmation(id, data)),
    postSalesConfirmationData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postSalesConfirmationData(data, user, toggle, setSubmitting)
      ),
    updateSalesConfirmationData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateSalesConfirmationData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SalesConfirmation);
