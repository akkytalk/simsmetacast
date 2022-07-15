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
  Label,
  InputGroup,
} from "reactstrap";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@material-ui/core/TextField";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "../../redux/creators";
import "../../css/main.css";
import ActionEmailRef from "./ActionEmailRef";
import { DateFormat } from "components/DateFormat/DateFormat";
import { MenuItem } from "@mui/material";

function EmailRef(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "subject", headerName: "Email Subject", flex: 1 },
    {
      field: "email_date",
      headerName: "Email Date",
      flex: 1,
      renderCell: (params) => {
        return <DateFormat data={params.row?.email_date} />;
      },
    },
    {
      field: "added_by.name",
      headerName: "Added By",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.added_by?.name}</div>;
      },
    },
    {
      field: "sent_to",
      headerName: "Sent To",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <ActionEmailRef data={params.row} index={params.row.id} />;
      },
    },
  ];

  const rows = props.emailRef?.isLoading
    ? []
    : props.emailRef.emailRef.filter(
        (email) => email.order_id == props.orderId
      );

  let data2 = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onEmailRefGetData(data2);
  }, []);

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
      order_id: props.orderId,
    };

    console.log("Data of Email Ref:", user);
    props.onPostEmailRefData(data2, user, toggle, setSubmitting);
    return;
  };

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={props.emailRef?.isLoading ? true : false}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        checkboxSelection
        disableSelectionOnClick
        // isRowSelectable={(params) => params.row.size < 50}
        // autoPageSize
        autoHeight
      />
      <Modal className="modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Add New Email Reference
        </ModalHeader>

        {props.emailRef?.isPostLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              subject: "",
              date: "",
              sent_to: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              subject: Yup.string().required("required"),
              date: Yup.string().required("required"),
              sent_to: Yup.string().required("required"),
            })}
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
      <Button
        className="btn-success p-2 m-3"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-plus text-white mr-2" />
        Add New Reference
      </Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(EmailRef);
