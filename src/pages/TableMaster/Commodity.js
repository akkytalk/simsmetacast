/* eslint-disable eqeqeq */
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

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import EditCommodity from "./EditTableMaster/EditCommodity";
import { MenuItem } from "@mui/material";

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

function Commodity(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "is_active",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.is_active == 0 ? "Not Active" : "Active"}</div>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <EditCommodity data={params.row} index={params.row.id} />;
      },
    },
  ];

  const rows = props.commodity?.isLoading ? [] : props.commodity.commodity;

  let data = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onCommodityGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };
  // const { data } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Commodity:", values);
    setSubmitting(true);

    let user = {
      name: values.name,
      is_active: values.is_active,
    };

    console.log("Data of Commodity:", user);
    props.onPostCommodityData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-yellow p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Commodity</strong>
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
            Add New Commodity{" "}
          </ModalHeader>

          {props.commodity?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                name: "",
                is_active: 1,
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("required"),
                is_active: Yup.string().required("required"),
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

                  <Row className="form-group">
                    <Col md={12}>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="outlined"
                          select
                          size="small"
                          id="is_active"
                          label="Select Status"
                          name="is_active"
                          value={formProps.values.is_active}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.is_active &&
                            Boolean(formProps.errors.is_active)
                          }
                          helperText={
                            formProps.touched.is_active &&
                            formProps.errors.is_active
                          }
                        >
                          <MenuItem value={1}>Active</MenuItem>
                          <MenuItem value={0}>Not Active</MenuItem>
                        </TextField>
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
          loading={props.commodity?.isLoading ? true : false}
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
    commodity: state.entities.master.commodity,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCommodityGetData: (data) => dispatch(actions.commodityGetData(data)),
    onDeleteCommodity: (id, data) =>
      dispatch(actions.deleteCommodity(id, data)),
    onPostCommodityData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postCommodityData(data, user, toggle, setSubmitting)),
    updateCommodityData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateCommodityData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Commodity);
