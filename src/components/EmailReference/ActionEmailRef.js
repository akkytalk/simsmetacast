import React, { useState } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "../../redux/creators";

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
import { MenuItem } from "@mui/material";

function ActionEmailRef(props) {
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
    console.log("values in Email Ref:", values);
    setSubmitting(true);

    let user = {
      subject: values.subject,
      email_date: values.date,
      sent_to: values.sent_to,
      order_id: props.data.order_id,
    };

    console.log("Data of Email Ref:", user);
    props.updateEmailRefData(data, user, toggle, setSubmitting);
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
          Edit Email Ref
        </ModalHeader>
        {props.emailRef?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              subject: props.data.subject,
              date: props.data.email_date,
              sent_to: props.data.sent_to,
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group d-flex align-items-end">
                  <Col md={4}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="subject"
                        label="Email Subject"
                        name="subject"
                        value={formProps.values.subject}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.subject &&
                          Boolean(formProps.errors.subject)
                        }
                        helperText={
                          formProps.touched.subject && formProps.errors.subject
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <Label className="label">Email Date</Label>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="date"
                        type="date"
                        name="date"
                        value={formProps.values.date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.date &&
                          Boolean(formProps.errors.date)
                        }
                        helperText={
                          formProps.touched.date && formProps.errors.date
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        select
                        variant="standard"
                        id="sent_to"
                        label="Sent To"
                        type="email"
                        name="sent_to"
                        value={formProps.values.sent_to}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.sent_to &&
                          Boolean(formProps.errors.sent_to)
                        }
                        helperText={
                          formProps.touched.sent_to && formProps.errors.sent_to
                        }
                      >
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="supplier">Supplier</MenuItem>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    suppiler: state.suppiler.suppiler,
    city: state.city.city,
    country: state.country.country,
    states: state.state.state,
    login: state.login,
    emailRef: state.emailRef,
    commissionUnit: state.commissionUnit.commissionUnit,
    priceUnit: state.priceUnit.priceUnit,
    quantityUnit: state.quantityUnit.quantityUnit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEmailRefGetData: (data) => dispatch(actions.emailRefGetData(data)),
    onDeleteEmailRef: (id, data) => dispatch(actions.deleteEmailRef(id, data)),
    onPostEmailRefData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postEmailRefData(data, user, toggle, setSubmitting)),
    updateEmailRefData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateEmailRefData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ActionEmailRef);
