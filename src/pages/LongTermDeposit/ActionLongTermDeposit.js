/* eslint-disable eqeqeq */
import LinerLoader from "components/Loaders/LinerLoader";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import * as actions from "../../redux/creators";

import TextField from "@material-ui/core/TextField";
// import MenuItem from "@mui/material/MenuItem";
import { Autocomplete } from "@mui/material";
import "../../css/main.css";
import DeleteButton from "Helpers/DeleteButton";

function ActionLongTermDeposit(props) {
  let data = {
    token: props.login?.login?.token,
    id: props.data.id,
  };

  const defaultProps = {
    options: props.suppiler.filter(
      (s) => s.customer_type == "Customer" || s.customer_type == "Both"
    ),
    getOptionLabel: (option) => option.company_name,
  };

  const flatProps = {
    options: props.suppiler?.filter(
      (s) => s.customer_type == "Supplier" || s.customer_type == "Both"
    ),
    getOptionLabel: (option) => option.company_name,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  // const viewStatus =
  //   props.login?.login?.user?.role == "admin"
  //     ? true
  //     : props.login?.login.user?.actions?.length > 0 &&
  //       props.login?.login.user?.actions[6]?.view == 1
  //     ? true
  //     : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[6]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[6]?.update == 1
      ? true
      : false;
  // const createStatus =
  //   props.login?.login?.user?.role == "admin"
  //     ? true
  //     : props.login?.login.user?.actions?.length > 0 &&
  //       props.login?.login.user?.actions[6]?.create == 1
  //     ? true
  //     : false;

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    let user = {
      customer_id: values.customer_id,
      // order_id: values.order_id,
      supplier_id: values.supplier_id,
      amount: values.amount,
      date: values.date,
      remark: values.remark,
    };

    console.log("Data of BPO:", user);
    props.updateLongTermData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <div className="m-4">
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
        <DeleteButton
          deleteFunction={() => props.onDeleteLongTerm(props.data.id, data)}
        />
      )}

      <Modal
        className="modal-lg"
        backdrop="static"
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Add New Long Term Deposit
        </ModalHeader>

        {props.longTerm?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              customer_id: props.data.customer_id ?? "",
              supplier_id: props.data.supplier_id ?? "",
              // order_id: props.data.order_id ?? "",
              amount: props.data.amount ?? "",
              date: props.data.date ?? "",
              remark: props.data.remark ?? "",
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => (
              <Form>
                {console.log(`formProps.values`, formProps.values)}
                <Row className="form-group d-flex  align-items-center">
                  <Col md={6} className="">
                    <InputGroup>
                      <Autocomplete
                        {...defaultProps}
                        id="customer_id"
                        name="customer_id"
                        defaultValue={props.data.customer}
                        onChange={(event, newValue) => {
                          formProps.setFieldValue(
                            `customer_id`,
                            newValue?.id ?? ""
                          );
                        }}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Customer Name"
                            variant="standard"
                            name="customer_id"
                            error={
                              formProps.touched.customer_id &&
                              Boolean(formProps.errors.customer_id)
                            }
                            helperText={
                              formProps.touched.customer_id &&
                              formProps.errors.customer_id
                            }
                          />
                        )}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup>
                      <Autocomplete
                        {...flatProps}
                        id="supplier_id"
                        name="supplier_id"
                        defaultValue={props.data.supplier}
                        onChange={(event, newValue) => {
                          formProps.setFieldValue(
                            `supplier_id`,
                            newValue?.id ?? ""
                          );
                        }}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Supplier Name"
                            variant="standard"
                            name="supplier_id"
                            error={
                              formProps.touched.supplier_id &&
                              Boolean(formProps.errors.supplier_id)
                            }
                            helperText={
                              formProps.touched.supplier_id &&
                              formProps.errors.supplier_id
                            }
                          />
                        )}
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="form-group">
                  {/* <Col md={6}>
                    <TextField
                      fullWidth
                      select
                      variant="standard"
                      size="small"
                      type="text"
                      id="order_id"
                      label="Order Id"
                      name="order_id"
                      value={formProps.values.order_id}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.order_id &&
                        Boolean(formProps.errors.order_id)
                      }
                      helperText={
                        formProps.touched.order_id && formProps.errors.order_id
                      }
                    >
                      {props.purchaseOrder?.purchaseOrder?.map((unit) => {
                        return (
                          <MenuItem value={unit.id}>
                            Id: {unit.id} Ref No. {unit.ref_no}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Col> */}
                  <Col md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      id="amount"
                      label="Amount"
                      name="amount"
                      value={formProps.values.amount}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.amount &&
                        Boolean(formProps.errors.amount)
                      }
                      helperText={
                        formProps.touched.amount && formProps.errors.amount
                      }
                    />
                  </Col>
                </Row>
                <Row className="form-group d-flex align-items-center">
                  <Col md={6}>
                    <Label className="label">Date</Label>
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
                        formProps.touched.date && Boolean(formProps.errors.date)
                      }
                      helperText={
                        formProps.touched.date && formProps.errors.date
                      }
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      id="remark"
                      label="Remarks"
                      name="remark"
                      value={formProps.values.remark}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.remark &&
                        Boolean(formProps.errors.remark)
                      }
                      helperText={
                        formProps.touched.remark && formProps.errors.remark
                      }
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
    longTerm: state.longTerm,
    login: state.login,
    suppiler: state.suppiler.suppiler,
    purchaseOrder: state.purchaseOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSupplierGetData: (data) => dispatch(actions.suppilerGetData(data)),
    onPurchaseOrderGetData: (data) =>
      dispatch(actions.purchaseOrderGetData(data)),
    longTermGetData: (data) => dispatch(actions.longTermGetData(data)),
    onDeleteLongTerm: (id, data) => dispatch(actions.deleteLongTerm(id, data)),
    onPostLongTermData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postLongTermData(data, user, toggle, setSubmitting)),
    updateLongTermData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateLongTermData(data, user, toggle, setSubmitting)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionLongTermDeposit);
