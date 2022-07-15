/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { useDemoData } from "@mui/x-data-grid-generator";
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
import TextField from "@material-ui/core/TextField";
import EditPaymentPendingUnit from "./EditTableMaster/EditPaymentPendingUnit";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

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

function PaymentPendingUnit(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "payment_unit", headerName: "Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <EditPaymentPendingUnit data={params.row} index={params.row.id} />
        );
      },
    },
  ];

  const rows = props.paymentPendingUnit?.isLoading
    ? []
    : props.paymentPendingUnit.paymentPendingUnit;

  let data = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onPaymentPendingUnitGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };
  // const { data } = useDemoData({
  //   dataSet: "PaymentPendingUnit",
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in PaymentPendingUnit:", values);
    setSubmitting(true);

    let user = {
      payment_unit: values.name,
    };

    console.log("Data of PaymentPendingUnit:", user);
    props.onPostPaymentPendingUnitData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-gray p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Payment Pending Unit</strong>
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
        <Modal className="modal-md" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add New Payment Pending Unit{" "}
          </ModalHeader>

          {props.paymentPendingUnit?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                name: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={12}>
                      {/* <Label for="size">Name</Label> */}
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          id="name"
                          label="Enter Name"
                          name="name"
                          value={formProps.values.name}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.name &&
                            Boolean(formProps.errors.name)
                          }
                          helperText={
                            formProps.touched.name && formProps.errors.name
                          }
                        />
                      </InputGroup>
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
          loading={props.paymentPendingUnit?.isLoading ? true : false}
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
          // autoHeight
        />
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    paymentPendingUnit: state.entities.master.paymentPendingUnit,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPaymentPendingUnitGetData: (data) =>
      dispatch(actions.paymentPendingUnitGetData(data)),
    onDeletePaymentPendingUnit: (id, data) =>
      dispatch(actions.deletePaymentPendingUnit(id, data)),
    onPostPaymentPendingUnitData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postPaymentPendingUnitData(data, user, toggle, setSubmitting)
      ),
    updatePaymentPendingUnitData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updatePaymentPendingUnitData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentPendingUnit);
