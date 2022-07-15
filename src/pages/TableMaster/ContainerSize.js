/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
// import {  GridToolbar } from "@mui/x-data-grid";
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
  Input,
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
import EditContainerSize from "./EditTableMaster/EditContainerSize";

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

function ContainerSize(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "size", headerName: "Size", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <EditContainerSize data={params.row} index={params.row.id} />;
      },
    },
  ];

  const rows = props.containerSize?.isLoading
    ? []
    : props.containerSize.containerSize;

  let data = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onContainerSizeGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };
  // const { data } = useDemoData({
  //   dataSet: "ContainerSize",
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in ContainerSize:", values);
    setSubmitting(true);

    let user = {
      size: values.size,
    };

    console.log("Data of ContainerSize:", user);
    props.onPostContainerSizeData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-info p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Container Size Details</strong>
          <div>
            {/* <Input placeholder="search" /> */}
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
            Add New Container Size
          </ModalHeader>
          {props.containerSize?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                size: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                size: Yup.string().required("Container Size is required"),
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
                          size="small"
                          id="size"
                          label="Container Size"
                          name="size"
                          value={formProps.values.size}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.size &&
                            Boolean(formProps.errors.size)
                          }
                          helperText={
                            formProps.touched.size && formProps.errors.size
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
          loading={props.containerSize?.isLoading ? true : false}
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
    containerSize: state.entities.master.containerSize,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onContainerSizeGetData: (data) =>
      dispatch(actions.containerSizeGetData(data)),
    onDeleteContainerSize: (id, data) =>
      dispatch(actions.deleteContainerSize(id, data)),
    onPostContainerSizeData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postContainerSizeData(data, user, toggle, setSubmitting)
      ),
    updateContainerSizeData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateContainerSizeData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContainerSize);
