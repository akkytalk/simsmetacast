/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as actions from "../../redux/creators";
import LinerLoader from "components/Loaders/LinerLoader";
import TextField from "@material-ui/core/TextField";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  InputGroup,
  Label,
} from "reactstrap";
// import { MenuItem } from "@mui/material";
import CustomInput from "views/Views/CustomInput";
import Swal from "sweetalert2";

function EditLMEUpdate(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  // const viewStatus =
  //   props.login?.login?.user?.role == "admin"
  //     ? true
  //     : props.login?.login.user?.actions?.length > 0 &&
  //       props.login?.login.user?.actions[4]?.view == 1
  //     ? true
  //     : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[4]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[4]?.update == 1
      ? true
      : false;
  // const createStatus =
  //   props.login?.login?.user?.role == "admin"
  //     ? true
  //     : props.login?.login.user?.actions?.length > 0 &&
  //       props.login?.login.user?.actions[4]?.create == 1
  //     ? true
  //     : false;

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
        props.onDeleteLMEUpdate(id, data);
      }
    });
  }

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in LMEUpdate:", values);
    setSubmitting(true);

    let user = {
      date: values.date,
      is_holiday: values.is_holiday,
      al: values.al,
      cu: values.cu,
      pb: values.pb,
      ni: values.ni,
      sn: values.sn,
      zn: values.zn,
      us: values.us,
      eur: values.eur,
    };

    console.log("Data of LMEUpdate:", user);
    props.updateLMEUpdateData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <div>
      {updateStatus && (
        <Button
          className="bg-gradient-yellow p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-edit" aria-hidden="true"></i>
        </Button>
      )}

      {deleteStatus && (
        <Button
          className="bg-gradient-danger p-1 ml-2 text-white"
          onClick={(id) => {
            deleteSupplier(data.id);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </Button>
      )}

      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit LMEUpdate
        </ModalHeader>
        {props.LMEUpdate?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              date: props.data.date,
              is_holiday: props.data.is_holiday,
              al: props.data.al,
              cu: props.data.cu,
              pb: props.data.pb,
              ni: props.data.ni,
              sn: props.data.sn,
              zn: props.data.zn,
              us: props.data.us,
              eur: props.data.eur,
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group d-flex justify-content-center align-items-center">
                  <Col md={3}>
                    <Label className="label">Date</Label>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      type="date"
                      id="date"
                      name="date"
                      value={formProps.values.date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.date && Boolean(formProps.errors.date)
                      }
                      helperText={
                        formProps.touched.date && formProps.errors.date
                      }
                    />
                    <Col md={5}>
                      {/* <label>
                          <Field type="checkbox" name="is_holiday" />
                          {`${formProps.values.is_holiday}`}
                        </label> */}
                      <Field
                        component={CustomInput}
                        type="checkbox"
                        name="is_holiday"
                        size="medium"
                        id="is_holiday"
                        checked={
                          formProps.values.is_holiday == 1 ? true : false
                        }
                        onChange={(event) => {
                          formProps.setFieldValue(
                            `is_holiday`,
                            event.target.value
                          );
                        }}
                        value={formProps.values.is_holiday == 1 ? 0 : 1}
                      />
                      <Label>Holiday</Label>
                    </Col>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={3}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="al"
                        label="AL"
                        name="al"
                        value={formProps.values.al}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.al && Boolean(formProps.errors.al)
                        }
                        helperText={formProps.touched.al && formProps.errors.al}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="cu"
                        label="CU"
                        name="cu"
                        value={formProps.values.cu}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.cu && Boolean(formProps.errors.cu)
                        }
                        helperText={formProps.touched.cu && formProps.errors.cu}
                      />
                    </InputGroup>
                  </Col>

                  <Col md={3}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="pb"
                        label="PB"
                        name="pb"
                        value={formProps.values.pb}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.pb && Boolean(formProps.errors.pb)
                        }
                        helperText={formProps.touched.pb && formProps.errors.pb}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      id="ni"
                      label="NI"
                      name="ni"
                      value={formProps.values.ni}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.ni && Boolean(formProps.errors.ni)
                      }
                      helperText={formProps.touched.ni && formProps.errors.ni}
                    />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={3}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      type="text"
                      id="sn"
                      label="SN"
                      name="sn"
                      value={formProps.values.sn}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.price_unit &&
                        Boolean(formProps.errors.price_unit)
                      }
                      helperText={
                        formProps.touched.price_unit &&
                        formProps.errors.price_unit
                      }
                    />
                  </Col>
                  <Col md={3}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      id="zn"
                      label="ZN"
                      name="zn"
                      value={formProps.values.zn}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.zn && Boolean(formProps.errors.zn)
                      }
                      helperText={formProps.touched.zn && formProps.errors.zn}
                    />
                  </Col>

                  <Col md={3}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      type="text"
                      id="us"
                      label="US$/INR"
                      name="us"
                      value={formProps.values.us}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.us && Boolean(formProps.errors.us)
                      }
                      helperText={formProps.touched.us && formProps.errors.us}
                    />
                  </Col>
                  <Col md={3}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      type="text"
                      id="eur"
                      label="$/EUR"
                      name="eur"
                      value={formProps.values.eur}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.eur && Boolean(formProps.errors.eur)
                      }
                      helperText={formProps.touched.eur && formProps.errors.eur}
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    LMEUpdate: state.LMEUpdate,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLMEUpdateGetData: (data) => dispatch(actions.LMEUpdateGetData(data)),
    onDeleteLMEUpdate: (id, data) =>
      dispatch(actions.deleteLMEUpdate(id, data)),
    onPostLMEUpdateData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postLMEUpdateData(data, user, toggle, setSubmitting)),
    updateLMEUpdateData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateLMEUpdateData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditLMEUpdate);
