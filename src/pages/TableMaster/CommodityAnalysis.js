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
import EditCommodityAnalysis from "./EditTableMaster/EditCommodityAnalysis";
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

function CommodityAnalysis(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "product_name", headerName: "Product Name", flex: 1 },
    {
      field: `commodity.name`,
      headerName: "Commodity",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.commodity?.name}</div>;
      },
    },
    {
      field: "analysis",
      headerName: "Analysis",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <EditCommodityAnalysis data={params.row} index={params.row.id} />
        );
      },
    },
  ];

  const rows = props.commodityAnalysis?.isLoading
    ? []
    : props.commodityAnalysis.commodityAnalysis;

  let data = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onCommodityGetData(data);
    props.onCommodityAnalysisGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };
  // const { data } = useDemoData({
  //   dataSet: "CommodityAnalysis",
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in CommodityAnalysis:", values);
    setSubmitting(true);

    let user = {
      commodity_id: values.commodity_id,
      product_name: values.product_name,
      analysis: values.analysis,
    };

    console.log("Data of CommodityAnalysis:", user);
    props.onPostCommodityAnalysisData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-pink p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Commodity Analysis</strong>
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
            Add New Commodity Analysis{" "}
          </ModalHeader>

          {props.commodityAnalysis?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                // commodity_id: "",
                product_name: "",
                analysis: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                commodity_id: Yup.string().required("required"),
                product_name: Yup.string().required("required"),
                analysis: Yup.string().required("required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={12}>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="outlined"
                          select
                          size="small"
                          id="commodity_id"
                          label="Select Commodity"
                          name="commodity_id"
                          value={formProps.values.commodity_id}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.commodity_id &&
                            Boolean(formProps.errors.commodity_id)
                          }
                          helperText={
                            formProps.touched.commodity_id &&
                            formProps.errors.commodity_id
                          }
                        >
                          {props.commodity?.map((comm) => {
                            return (
                              <MenuItem key={comm.id} value={comm.id}>
                                {comm.name}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={12}>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          id="product_name"
                          label="Product Name"
                          name="product_name"
                          value={formProps.values.product_name}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.product_name &&
                            Boolean(formProps.errors.product_name)
                          }
                          helperText={
                            formProps.touched.product_name &&
                            formProps.errors.product_name
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
                          size="small"
                          id="analysis"
                          label="Analysis"
                          name="analysis"
                          value={formProps.values.analysis}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.analysis &&
                            Boolean(formProps.errors.analysis)
                          }
                          helperText={
                            formProps.touched.analysis &&
                            formProps.errors.analysis
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
          loading={props.commodityAnalysis?.isLoading ? true : false}
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
    commodityAnalysis: state.entities.master.commodityAnalysis,
    commodity: state.entities.master.commodity.commodity,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCommodityGetData: (data) => dispatch(actions.commodityGetData(data)),

    onCommodityAnalysisGetData: (data) =>
      dispatch(actions.commodityAnalysisGetData(data)),
    onDeleteCommodityAnalysis: (id, data) =>
      dispatch(actions.deleteCommodityAnalysis(id, data)),
    onPostCommodityAnalysisData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postCommodityAnalysisData(data, user, toggle, setSubmitting)
      ),
    updateCommodityAnalysisData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateCommodityAnalysisData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommodityAnalysis);
