import React, { useState } from "react";
import { Formik, Form } from "formik";
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
import { MenuItem } from "@mui/material";

function EditCommodity(props) {
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
    console.log("values in Commodity:", values);
    setSubmitting(true);

    let user = {
      is_active: values.is_active,
      name: values.name,
    };

    console.log("Data of Commodity:", user);
    props.updateCommodityData(data, user, toggle, setSubmitting);
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
          Edit Commodity
        </ModalHeader>
        {props.commodity?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              name: props.data?.name ?? "",
              is_active: props.data?.is_active ?? "",
            }}
            onSubmit={handleSubmit}
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
                        label="Commodity"
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
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditCommodity);
