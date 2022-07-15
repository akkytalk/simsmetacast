/* eslint-disable eqeqeq */
import LinerLoader from "components/Loaders/LinerLoader";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  InputGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import * as actions from "store/creators";
import * as Yup from "yup";
import MenuButton from "components/MenuButton/MenuButton";
import Swal from "sweetalert2";
import { Autocomplete, TextField } from "@mui/material";
import CustomTextField from "components/MuiComponents/CustomTextField";
import DeleteButton from "Helpers/DeleteButton";

function ActionImport(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const flatProps = {
    options: props.client,
    getOptionLabel: (option) => option.company_name,
  };

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[3]?.create == 1
      ? true
      : false;

  async function deleteSupplier(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.onDeletePurchaseSalesIndent(id, data);
      }
    });
  }
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
    props.updateImportData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <>
      <>
        <Button
          className="bg-gradient-yellow p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-edit" aria-hidden="true"></i>
        </Button>

        <DeleteButton
          deleteFunction={() => props.deleteImport(data.id, data)}
        />

        <MenuButton
          data={props.data}
          index={props.data.id}
          options={props.options}
        />
      </>
      {/* <Modal
        className="modal-lg"
        backdrop="static"
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit Import
        </ModalHeader>

        {props.import?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              unique_number: props.data?.unique_number ?? "",
              company_name: props.data?.company_name ?? "",
              rate: props.data?.rate ?? "",
              quantity: props.data?.quantity ?? "",
              quality: props.data?.quality ?? "",
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
                        formProps.touched.rate && Boolean(formProps.errors.rate)
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
                        formProps.touched.quantity && formProps.errors.quantity
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
      </Modal> */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    import: state.entities.importer.import,
    login: state.login,
    client: state.entities.client.client,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    importGetData: (data) => dispatch(actions.importGetData(data)),
    onClientGetData: (data) => dispatch(actions.clientGetData(data)),
    deleteImport: (id, data) => dispatch(actions.deleteImport(id, data)),
    postImportData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postImportData(data, user, toggle, setSubmitting)),
    updateImportData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateImportData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ActionImport);
