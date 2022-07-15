import React, { useState } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as actions from "store/creators";
import LinerLoader from "components/Loaders/LinerLoader";
import TextField from "@material-ui/core/TextField";
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
import { MenuItem } from "@mui/material";
import DeleteButton from "Helpers/DeleteButton";

function EditUser(props) {
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
    console.log("Edit values in Users:", values);
    setSubmitting(true);

    let user =
      values.password && values.password_confirmation
        ? {
            name: values.name,
            email: values.email,
            mobile_no: values.mobile_no,
            designation: values.designation,
            password: values.password,
            password_confirmation: values.password_confirmation,
            address: values.address,
            city: values.city,
            country: values.country,
            pincode: values.pincode,
            role: values.role,
            status: values.status,
          }
        : {
            name: values.name,
            email: values.email,
            mobile_no: values.mobile_no,
            designation: values.designation,
            address: values.address,
            city: values.city,
            country: values.country,
            pincode: values.pincode,
            role: values.role,
            status: values.status,
          };

    console.log("Edit Data of Users:", user);
    props.updateUsersData(data, user, toggle, setSubmitting);
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
      {props.data?.role !== "admin" && (
        <DeleteButton
          id={props.data.id}
          deleteFunction={() => props.onDeleteUsers(props.data.id, data)}
        />
      )}

      <Modal className="modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit Users
        </ModalHeader>
        {props.users.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              name: props.data.name,
              email: props.data.email,
              mobile_no: props.data.mobile_no,
              designation: props.data.designation,
              role: props.data.role,
              address: props.data.address,
              city: props.data.city,
              country: props.data.country,
              pincode: props.data.pincode,
              password: "",
              password_confirmation: "",
              status: props.data.status,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("required"),
              email: Yup.string().required("required"),
              mobile_no: Yup.string().required("required"),
              designation: Yup.string().required("required"),

              //   password: Yup.string().required("required"),
              password_confirmation: Yup.string().when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                  [Yup.ref("password")],
                  "Both password need to be the same"
                ),
              }),
            })}
          >
            {(formProps) => (
              <Form>
                {console.log(`formProps.values`, formProps.values)}
                <Row className="form-group">
                  <Col md={6} className="">
                    <TextField
                      fullWidth
                      className="mb-3"
                      variant="standard"
                      size="small"
                      label="Name *"
                      id="name"
                      name="name"
                      value={formProps.values.name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.name && Boolean(formProps.errors.name)
                      }
                      helperText={
                        formProps.touched.name && formProps.errors.name
                      }
                    />
                  </Col>

                  <Col md={6}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        type="email"
                        id="email"
                        label="Email *"
                        name="email"
                        value={formProps.values.email}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.email &&
                          Boolean(formProps.errors.email)
                        }
                        helperText={
                          formProps.touched.email && formProps.errors.email
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="mobile_no"
                        label="Mobile No *"
                        name="mobile_no"
                        value={formProps.values.mobile_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.mobile_no &&
                          Boolean(formProps.errors.mobile_no)
                        }
                        helperText={
                          formProps.touched.mobile_no &&
                          formProps.errors.mobile_no
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="designation"
                        label="Designation *"
                        name="designation"
                        value={formProps.values.designation}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.designation &&
                          Boolean(formProps.errors.designation)
                        }
                        helperText={
                          formProps.touched.designation &&
                          formProps.errors.designation
                        }
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
                      label="Address"
                      id="address"
                      name="address"
                      value={formProps.values.address}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.address &&
                        Boolean(formProps.errors.address)
                      }
                      helperText={
                        formProps.touched.address && formProps.errors.address
                      }
                    />
                  </Col>

                  <Col md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      label="City Name"
                      id="city"
                      name="city"
                      value={formProps.values.city}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.city && Boolean(formProps.errors.city)
                      }
                      helperText={
                        formProps.touched.city && formProps.errors.city
                      }
                    />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      id="country"
                      label="Country Name"
                      name="country"
                      value={formProps.values.country}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.country &&
                        Boolean(formProps.errors.country)
                      }
                      helperText={
                        formProps.touched.country && formProps.errors.country
                      }
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      id="pincode"
                      label="Enter Pincode"
                      name="pincode"
                      value={formProps.values.pincode}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.pincode &&
                        Boolean(formProps.errors.pincode)
                      }
                      helperText={
                        formProps.touched.pincode && formProps.errors.pincode
                      }
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      type="password"
                      label="Password *"
                      id="password"
                      name="password"
                      value={formProps.values.password}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.password &&
                        Boolean(formProps.errors.password)
                      }
                      helperText={
                        formProps.touched.password && formProps.errors.password
                      }
                    ></TextField>
                  </Col>
                  <Col md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      type="password"
                      label="Confirm Password *"
                      id="password_confirmation"
                      name="password_confirmation"
                      value={formProps.values.password_confirmation}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.password_confirmation &&
                        Boolean(formProps.errors.password_confirmation)
                      }
                      helperText={
                        formProps.touched.password_confirmation &&
                        formProps.errors.password_confirmation
                      }
                    />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      select
                      label="Status"
                      id="status"
                      name="status"
                      value={formProps.values.status}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.status &&
                        Boolean(formProps.errors.status)
                      }
                      helperText={
                        formProps.touched.status && formProps.errors.status
                      }
                    >
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>Not Active</MenuItem>
                    </TextField>
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
    users: state.entities.userMaster.users,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersGetData: (data) => dispatch(actions.usersGetData(data)),
    onDeleteUsers: (id, data) => dispatch(actions.deleteUsers(id, data)),
    onPostUsersData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postUsersData(data, user, toggle, setSubmitting)),
    updateUsersData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateUsersData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
