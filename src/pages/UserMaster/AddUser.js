/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import dateFormat from "dateformat";

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
} from "reactstrap";
import { Form, Formik } from "formik";
import { connect } from "react-redux";

import LinerLoader from "components/Loaders/LinerLoader";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import "../../css/main.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import EditUser from "./EditUser";
import ExportCSV from "components/ExcelFile/ExportCSV";
import "../../css/main.css";
import { Badge } from "@mui/material";
import * as actions from "store/creators";

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

function AddUser(props) {
  const [csv, setCsv] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    { field: "mobile_no", headerName: "Mobile No", flex: 1 },

    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },

    // { field: "address", headerName: "Address", flex: 1 },
    // { field: "city", headerName: "City", flex: 1 },
    // { field: "country", headerName: "Country", flex: 1 },
    // { field: "pincode", headerName: "Pincode", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status == 0 ? (
              <Badge
                // className={classes.margin}s
                color="error"
                variant="dot"
              ></Badge>
            ) : (
              <Badge
                // className={classes.margin}
                color="primary"
                variant="dot"
              ></Badge>
            )}
          </div>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <EditUser data={params.row} index={params.row.id} />;
      },
    },
  ];

  const rows = props.users?.isLoading
    ? []
    : startDate && endDate
    ? props.users.users.filter((user) => {
        return user.name >= startDate && user.name <= endDate;
      })
    : props.users.users;

  let data2 = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    props.onUsersGetData(data2);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      props.users.users
        .filter((user) => {
          return user.name >= startDate && user.name <= endDate;
        })
        .map((user, index) =>
          csv?.push({
            "Sr No": index + 1,
            "Book Date": dateFormat(user.name, "dd-mm-yyyy"),
            "Customer Name": user.customer?.company_name,
            "Supplier Name": user.supplier?.company_name,
            "No of Purchase Order": user.no_purchase_orders,
            Quantity: user.email,
            Commission: user.mobile_no,
            Remark: user.passwords,
          })
        );
    }
  }, [startDate && endDate]);
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    let user = {
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
    };

    console.log("Data of Users:", user);
    props.onPostUsersData(data2, user, toggle, setSubmitting);
    return;
  };

  console.log("props.users", props.users);
  return (
    <Card className="m-4">
      <CardHeader>
        <div>
          <Formik
            initialValues={{
              start_date: "",
              end_date: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              start_date: Yup.string().required("required"),
              end_date: Yup.string().required("required"),
            })}
          >
            {(formProps) => {
              setStartDate(formProps.values.start_date);
              setEndDate(formProps.values.end_date);
              return (
                <Form>
                  <Row className="form-group d-flex align-items-end">
                    <Col md={2}>
                      <Label className="label">Start At</Label>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={formProps.values.start_date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.start_date &&
                          Boolean(formProps.errors.start_date)
                        }
                        helperText={
                          formProps.touched.start_date &&
                          formProps.errors.start_date
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <Label className="label">End At</Label>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={formProps.values.end_date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.end_date &&
                          Boolean(formProps.errors.end_date)
                        }
                        helperText={
                          formProps.touched.end_date &&
                          formProps.errors.end_date
                        }
                      />
                    </Col>
                    <Col md={2} className="align-self-end">
                      <ExportCSV
                        csvData={csv}
                        setCsv={setCsv}
                        fileName={`purchase_order-${dateFormat(
                          startDate,
                          "dd-mm-yyyy"
                        )}-${dateFormat(endDate, "dd-mm-yyyy")}`}
                      />
                      {/* <Button
                        type="submit"
                        disabled={formProps.isSubmitting}
                        className="bg-gradient-info text-white"
                      >
                        Download
                      </Button> */}
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </div>
        <Button
          className="btn-success p-2 float-right"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-plus text-white mr-2" />
          Add User
        </Button>
        <Modal
          className="modal-lg"
          backdrop="static"
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add New User
          </ModalHeader>

          {props.users?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                name: "",
                email: "",
                mobile_no: "",
                designation: "",
                role: "user",
                address: "",
                city: "",
                country: "",
                pincode: "",
                password: "",
                password_confirmation: "",
                status: 1,
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("required"),
                email: Yup.string().required("required"),
                mobile_no: Yup.string().required("required"),
                designation: Yup.string().required("required"),
                password: Yup.string().required("required"),
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
                          formProps.touched.name &&
                          Boolean(formProps.errors.name)
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
                          formProps.touched.city &&
                          Boolean(formProps.errors.city)
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
                          formProps.touched.password &&
                          formProps.errors.password
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
      </CardHeader>
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props.users?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[7, 10, 20, 50, 100]}
          pagination
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
        />
      </CardBody>
    </Card>
  );
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.entities.userMaster.users,
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
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
