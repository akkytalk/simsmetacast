/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import LinerLoader from "components/Loaders/LinerLoader";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import * as actions from "store/creators";
import * as Yup from "yup";

import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@mui/material";
import "../../css/main.css";
import dateFormat from "dateformat";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import ActionImport from "./Action/ActionImport";
import CustomTextField from "components/MuiComponents/CustomTextField";

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
  { name: "Add Sales Contract", page: "import/add-sales-contract" },
  { name: "Add Loading Details", page: "import/add-loading-details" },
  { name: "Add Advance Details", page: "import/add-advance-details" },
  { name: "Bill of Entry", page: "import/bill" },
  { name: "Quality Match", page: "import/quality-match" },
];

function Import(props) {
  let data = {
    token: props.login?.login?.token,
  };
  const [pageSize, setPageSize] = React.useState(5);

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[6]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[6]?.delete == 1
      ? true
      : false;

  const upquantityStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[6]?.upquantity == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[6]?.create == 1
      ? true
      : false;

  const columns = [
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <ActionImport
            data={params.row}
            index={params.row.id}
            options={options}
          />
        );
      },
    },
    { field: "id", headerName: "ID", flex: 1 },
    { field: "contract_no", headerName: "Contract No", flex: 1 },
    {
      field: "contract_date",
      headerName: "Contract Date",
      flex: 1,
      valueFormatter: ({ value }) => {
        return `${value ? dateFormat(value, "dd-mm-yyyy") : ""}`;
      },
    },
    {
      field: "price_status",
      headerName: "Price",
      flex: 1,
      valueFormatter: ({ value }) => {
        return `${
          value == 0 ? "Fixed" : value == 1 ? "LME" : value == 2 ? "LLME" : ""
        }`;
      },
      renderCell: ({ value }) => {
        return value == 0
          ? "Fixed"
          : value == 1
          ? "LME"
          : value == 2
          ? "LLME"
          : "";
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
  ];

  const rows = props.importSalesContract?.isLoading
    ? []
    : props.importSalesContract.importSalesContract;

  const flatProps = {
    options: props.client,
    getOptionLabel: (option) => option.company_name,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    // props.importGetData(data);
    props.onClientGetData(data);
    props.onPriceUnitGetData(data);
    props.salesConfirmationGetData(data);
    props.importSalesContractGetData(data);
    props.billofEntryGetData(data);
    props.qualityMatchGetData(data);
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    let user = {
      unique_number: values.unique_number,
      company_name: values.company_name,
      rate: values.rate,
      quantity: values.quantity,
      quality: values.quality,
    };

    console.log("Data of BPO:", user);
    props.postImportData(data, user, toggle, setSubmitting);
    return;
  };
  return (
    <Card className="m-4">
      <CardHeader>
        {/* <Button
          className="btn-success p-2 float-right"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-plus text-white mr-2" />
          Create Import
        </Button> */}

        <Modal
          className="modal-lg"
          backdrop="static"
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add New Import
          </ModalHeader>

          {props.import?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                unique_number: "",
                company_name: "",
                rate: "",
                quantity: "",
                quality: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                unique_number: Yup.string().required("required"),
                company_name: Yup.string().required("required"),
                rate: Yup.string().required("required"),
                quantity: Yup.string().required("required"),
              })}
            >
              {(formProps) => (
                <Form>
                  {console.log(`formProps.values`, formProps.values)}
                  <Row className="form-group d-flex  align-items-center">
                    <Col md={6} className="">
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          id="unique_number"
                          label="Unqiue Number"
                          name="unique_number"
                          value={formProps.values.unique_number}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.unique_number &&
                            Boolean(formProps.errors.unique_number)
                          }
                          helperText={
                            formProps.touched.unique_number &&
                            formProps.errors.unique_number
                          }
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <InputGroup>
                        <CustomTextField
                          formProps={formProps}
                          name="company_name"
                          label="Company Name"
                        />
                        {/* <Autocomplete
                          {...flatProps}
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
                              label="Company Name"
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
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="rate"
                        label="Rate"
                        name="rate"
                        value={formProps.values.rate}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.rate &&
                          Boolean(formProps.errors.rate)
                        }
                        helperText={
                          formProps.touched.rate && formProps.errors.rate
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="quantity"
                        label="Quantity"
                        name="quantity"
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
                  </Row>
                  <Row className="form-group">
                    <Col md={12}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="quality"
                        label="Quality"
                        name="quality"
                        value={formProps.values.quality}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.quality &&
                          Boolean(formProps.errors.quality)
                        }
                        helperText={
                          formProps.touched.quality && formProps.errors.quality
                        }
                      />
                    </Col>
                  </Row>

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
      <CardBody>
        <DataGrid
          rows={rows}
          columns={columns}
          // getRowClassName={(params) => {
          //   if (params.row.quantity > 160) {
          //     return "bg-green-2";
          //   } else if (params.row.quantity < 200) {
          //     return "bg-orange-2";
          //   }
          // }}
          loading={props.importSalesContract?.isLoading ? true : false}
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
    import: state.entities.importer.import,
    login: state.login,
    client: state.entities.client.client,
    importSalesContract: state.entities.importer.importSalesContract,
    billofEntry: state.entities.importer.billofEntry,
    qualityMatch: state.entities.importer.qualityMatch,
    salesConfirmation: state.entities.salesConfirmation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    qualityMatchGetData: (data) => dispatch(actions.qualityMatchGetData(data)),
    billofEntryGetData: (data) => dispatch(actions.billofEntryGetData(data)),
    importSalesContractGetData: (data) =>
      dispatch(actions.importSalesContractGetData(data)),
    onQuantityUnitGetData: (data) =>
      dispatch(actions.quantityUnitGetData(data)),
    onPriceUnitGetData: (data) => dispatch(actions.priceUnitGetData(data)),
    onCommissionUnitGetData: (data) =>
      dispatch(actions.commissionUnitGetData(data)),
    salesConfirmationGetData: (data) =>
      dispatch(actions.salesConfirmationGetData(data)),
    importGetData: (data) => dispatch(actions.importGetData(data)),
    onClientGetData: (data) => dispatch(actions.clientGetData(data)),
    deleteImport: (id, data) => dispatch(actions.deleteImport(id, data)),
    postImportData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postImportData(data, user, toggle, setSubmitting)),
    updateImportData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateImportData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Import);
