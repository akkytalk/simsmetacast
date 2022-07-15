import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../store/creators";
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
} from "reactstrap";

function EditPortofLoading(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in PortLoading:", values);
    setSubmitting(true);

    let user = {
      name: values.name,
    };

    console.log("Data of PortLoading:", user);
    props.updatePortLoadingData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <div>
      <Button
        className="bg-gradient-yellow p-1"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-edit" aria-hidden="true"></i>
      </Button>
      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit Port of Loading
        </ModalHeader>
        {props.portLoading?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              name: props.data?.name ?? "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Port of Loading is required"),
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
                        id="name"
                        label="Port of Loading"
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    portLoading: state.entities.master.portLoading,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPortLoadingGetData: (data) => dispatch(actions.portLoadingGetData(data)),
    onDeletePortLoading: (id, data) =>
      dispatch(actions.deletePortLoading(id, data)),
    onPostPortLoadingData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postPortLoadingData(data, user, toggle, setSubmitting)),
    updatePortLoadingData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updatePortLoadingData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPortofLoading);
