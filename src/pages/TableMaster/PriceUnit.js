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
import EditPriceUnit from "./EditTableMaster/EditPriceUnit";

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

function PriceUnit(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "price_unit", headerName: "Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <EditPriceUnit data={params.row} index={params.row.id} />;
      },
    },
  ];

  const rows = props.priceUnit?.isLoading ? [] : props.priceUnit.priceUnit;

  let data = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onPriceUnitGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };
  // const { data } = useDemoData({
  //   dataSet: "PriceUnit",
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in PriceUnit:", values);
    setSubmitting(true);

    let user = {
      price_unit: values.name,
    };

    console.log("Data of PriceUnit:", user);
    props.onPostPriceUnitData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-gray p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Price Unit</strong>
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
            Add New Price Unit{" "}
          </ModalHeader>

          {props.priceUnit?.isPostLoading && <LinerLoader />}
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
          loading={props.priceUnit?.isLoading ? true : false}
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
    priceUnit: state.entities.master.priceUnit,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPriceUnitGetData: (data) => dispatch(actions.priceUnitGetData(data)),
    onDeletePriceUnit: (id, data) =>
      dispatch(actions.deletePriceUnit(id, data)),
    onPostPriceUnitData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postPriceUnitData(data, user, toggle, setSubmitting)),
    updatePriceUnitData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updatePriceUnitData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PriceUnit);
