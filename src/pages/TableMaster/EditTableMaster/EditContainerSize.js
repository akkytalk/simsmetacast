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
  Label,
  InputGroup,
} from "reactstrap";

function EditContainerSize(props) {
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
    console.log("values in ContainerSize:", values);
    setSubmitting(true);

    let user = {
      size: values.size,
    };

    console.log("Data of ContainerSize:", user);
    props.updateContainerSizeData(data, user, toggle, setSubmitting);
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
          Edit Container Size
        </ModalHeader>
        {props.containerSize?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              size: props.data?.size,
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
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditContainerSize);
