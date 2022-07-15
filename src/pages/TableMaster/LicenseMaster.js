/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
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
} from "reactstrap";
import { Form, Formik } from "formik";
import { connect } from "react-redux";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "../../store/creators";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import EditLicense from "./EditTableMaster/EditLicenseMaster";
import CustomTextField from "../../components/MuiComponents/CustomTextField";
import { DateFormat } from "./../../components/DateFormat/DateFormat";

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

function LicenseMaster(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "license_type", headerName: "License Type", flex: 1 },
    {
      field: "license_no",
      headerName: "License Number",
      flex: 1,
    },
    {
      field: "license_value",
      headerName: "License value",
      flex: 1,
    },
    {
      field: "license_start_date",
      headerName: "License Start Date",
      flex: 1,
      valueFormatter: ({ value }) => <DateFormat data={value} />,
      renderCell: ({ value }) => <DateFormat data={value} />,
    },
    {
      field: "license_end_date",
      headerName: "License End Date",
      flex: 1,
      valueFormatter: ({ value }) => <DateFormat data={value} />,
      renderCell: ({ value }) => <DateFormat data={value} />,
    },
    {
      field: "license_quantity",
      headerName: "License Quantity",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableExport: true,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <EditLicense data={params.row} index={params.row.id} />;
      },
    },
  ];

  const rows = props.license?.isLoading ? [] : props.license.license;

  let data = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onLicenseGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in License:", values);
    setSubmitting(true);

    let user = {
      license_type: values.license_type,
      license_no: values.license_no,
      license_value: values.license_value,
      license_desc: values.license_desc,
      license_start_date: values.license_start_date,
      license_end_date: values.license_end_date,
      license_quantity: values.license_quantity,
      cif_value_inr: values.cif_value_inr,
      cif_value_usd: values.cif_value_usd,
    };

    console.log("Data of License:", user);
    props.onPostLicenseData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-yellow p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">License</strong>
          <div>
            <Button
              className="btn-success p-2"
              onClick={() => {
                toggle();
              }}
            >
              <i className="fa fa-plus text-white mr-2" />
              Add New
            </Button>
          </div>
        </div>
        <Modal className="modal-lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add New License{" "}
          </ModalHeader>

          {props.license?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                license_type: "",
                license_no: "",
                license_value: "",
                license_desc: "",
                license_start_date: "",
                license_end_date: "",
                license_quantity: "",
                cif_value_inr: "",
                cif_value_usd: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                license_no: Yup.string().required("required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <InputGroup>
                        <CustomTextField
                          formProps={formProps}
                          name="license_type"
                          label="License Type"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <InputGroup>
                        <CustomTextField
                          formProps={formProps}
                          name="license_no"
                          label="License Number"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <InputGroup>
                        <CustomTextField
                          formProps={formProps}
                          name="license_value"
                          label="License Value"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <InputGroup>
                        <CustomTextField
                          formProps={formProps}
                          name="license_desc"
                          label="License Description"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <Label>License Start Date</Label>
                      <CustomTextField
                        formProps={formProps}
                        name="license_start_date"
                        type="date"
                      />
                    </Col>
                    <Col md={6}>
                      <Label>License End Date</Label>
                      <CustomTextField
                        formProps={formProps}
                        name="license_end_date"
                        type="date"
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <CustomTextField
                        formProps={formProps}
                        name="license_quantity"
                        label="License Quantity"
                      />
                    </Col>
                    <Col md={6}>
                      <CustomTextField
                        formProps={formProps}
                        name="cif_value_inr"
                        label="CIF Value INR"
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <CustomTextField
                        formProps={formProps}
                        name="cif_value_usd"
                        label="CIF Value USD"
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
      <CardBody style={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props.license?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
        />
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    license: state.entities.master.license,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLicenseGetData: (data) => dispatch(actions.licenseGetData(data)),
    onDeleteLicense: (id, data) => dispatch(actions.deleteLicense(id, data)),
    onPostLicenseData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postLicenseData(data, user, toggle, setSubmitting)),
    updateLicenseData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateLicenseData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LicenseMaster);
