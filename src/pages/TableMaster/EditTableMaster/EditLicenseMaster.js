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
import { Label } from "reactstrap";

function EditLicense(props) {
  let data = {
    token: props.login?.login?.token,
    id: props.data.id,
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
    props.updateLicenseData(data, user, toggle, setSubmitting);
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
          Eidt License{" "}
        </ModalHeader>

        {props.license?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              license_type: props.data.license_type ?? "",
              license_no: props.data.license_no ?? "",
              license_value: props.data.license_value ?? "",
              license_desc: props.data.license_desc ?? "",
              license_start_date: props.data.license_start_date ?? "",
              license_end_date: props.data.license_end_date ?? "",
              license_quantity: props.data.license_quantity ?? "",
              cif_value_inr: props.data.cif_value_inr ?? "",
              cif_value_usd: props.data.cif_value_usd ?? "",
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
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditLicense);
