/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  InputGroup,
} from "reactstrap";
import { Form, Formik } from "formik";
import { connect } from "react-redux";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "store/creators";

import CustomTextField from "components/MuiComponents/CustomTextField";

function EditDuty(props) {
  let data = {
    token: props.login?.login?.token,
    id: props.data.id,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onDutyGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Duty:", values);
    setSubmitting(true);

    let user = {
      product_name: values.product_name,
      percent: values.percent,
    };

    console.log("Data of Duty:", user);
    props.updateDutyData(data, user, toggle, setSubmitting);
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

      <Modal className="modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Eidt Duty{" "}
        </ModalHeader>

        {props.duty?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              product_name: props.data.product_name ?? "",
              percent: props.data.percent ?? "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              percent: Yup.string().required("required"),
              product_name: Yup.string().required("required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={6}>
                    <InputGroup>
                      <CustomTextField
                        formProps={formProps}
                        name="product_name"
                        label="Product Name"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup>
                      <CustomTextField
                        formProps={formProps}
                        name="percent"
                        label="Duty Percentage"
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
    duty: state.entities.master.duty,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDutyGetData: (data) => dispatch(actions.dutyGetData(data)),
    onDeleteDuty: (id, data) => dispatch(actions.deleteDuty(id, data)),
    onPostDutyData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postDutyData(data, user, toggle, setSubmitting)),
    updateDutyData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateDutyData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditDuty);
