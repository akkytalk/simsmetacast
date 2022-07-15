/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/creators";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  InputGroup,
  Table,
  ModalFooter,
} from "reactstrap";
import LinerLoader from "components/Loaders/LinerLoader";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { Form, Formik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import "css/main.css";
import CustomTextField from "../../../components/MuiComponents/CustomTextField";
// import InvoiceLongTermDeposit from "./InvoiceLongTermDeposit";
import { isEmpty } from "Helpers/helper";

function ImportInvoice({ currentImportSalesContract, ...props }) {
  let data = {
    token: props.login?.login?.token,
    id: currentImportSalesContract?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const invoiceData =
    props.invoice?.invoice?.filter((c) => c.loading_detail_id == props.data.id)
      .length > 0
      ? props.invoice?.invoice.filter(
          (c) => c.loading_detail_id == props.data.id
        )[0]
      : [];

  const claimData =
    props.importClaim?.importClaim?.filter(
      (c) => c.loading_detail_id == props.data.id
    ).length > 0
      ? props.importClaim?.importClaim.filter(
          (c) => c.loading_detail_id == props.data.id
        )[0]
      : [];

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Invoice:", values);
    setSubmitting(true);

    let user =
      invoiceData.length > 0
        ? {
            invoice_no: values.invoice_no,
            total_value: values.total_value,
            loading_detail_id: props.data.id,
            advance_adjusted_type: values.advance_adjusted_type,
            final_to_pay_type: values.final_to_pay_type,
            date: values.date.toString(),
            total_advance_received: values.total_advance_received,
            advance_adjusted: values.advance_adjusted,
            final_to_pay: values.final_to_pay,
            description: values.description,
          }
        : {
            id: invoiceData?.id,
            invoice_no: values.invoice_no,
            total_value: values.total_value,
            loading_detail_id: props.data.id,
            advance_adjusted_type: values.advance_adjusted_type,
            final_to_pay_type: values.final_to_pay_type,
            date: values.date.toString(),
            total_advance_received: values.total_advance_received,
            advance_adjusted: values.advance_adjusted,
            final_to_pay: values.final_to_pay,
            description: values.description,
          };

    console.log("Data of Invoice:", user);
    props.onPostInvoiceData(data, user, toggle, setSubmitting);
    return;
  };

  console.log("invoiceData", invoiceData);
  return (
    <>
      <Button
        className="bg-gradient-danger text-white"
        onClick={() => toggle()}
      >
        <i className="fa fa-plus mr-2" />
        Invoice
      </Button>
      <Modal className="modal-xl" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Invoice
        </ModalHeader>

        <ModalBody className="">
          <Col md={12} style={{ overflow: "scroll" }}>
            <Table className="table table-sm m-2">
              <thead>
                <tr>
                  {/* <th scope="col">Commodity</th> */}
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(props.data?.container_details)
                  ? props.data.container_details.map((c, i) => (
                      <tr key={i}>
                        {/* <td>{currentImportSalesContract[0]?.commodities}</td> */}
                        <td>{c.quantity}</td>
                        <td>{c.price}</td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </Table>
          </Col>
          <Row className="mt-4">
            <Col md={9}>
              <div className="d-flex justify-content-between align-items-center">
                <Label className="m-0">
                  Total Advance Expected : {props.advance_amount}
                </Label>
                {/* <InvoiceLongTermDeposit
                  data={invoiceData}
                  currentImportSalesContract={currentImportSalesContract}
                /> */}
              </div>
              <Formik
                initialValues={{
                  invoice_no: invoiceData?.invoice_no ?? "",
                  total_value:
                    props.data?.quantity_sum *
                    props.data?.container_details[0]?.price,
                  date: invoiceData?.date?.toString() ?? "",
                  total_advance_received:
                    invoiceData?.total_advance_received ?? props.advance_amount,
                  advance_adjusted: invoiceData?.advance_adjusted ?? 0,
                  advance_adjusted_type:
                    invoiceData?.advance_adjusted_type ?? "USD",
                  final_to_pay: invoiceData?.final_to_pay ?? "",
                  final_to_pay_type: invoiceData?.final_to_pay_type ?? "USD",
                  contract_number:
                    currentImportSalesContract?.contract_no || "",
                  description: invoiceData?.description ?? "",
                  claim_settled_on: claimData?.claim_settled_on ?? "",
                  nature_of_claim: claimData?.nature_of_claim ?? "",
                  status: claimData?.status ?? "",
                  payment: claimData?.payment ?? "",
                  payment_type: claimData?.payment_type ?? "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  invoice_no: Yup.string().required("Required"),
                  date: Yup.string().required("Required"),
                  advance_adjusted: Yup.number().required("Required"),
                })}
              >
                {(formProps) => {
                  formProps.values.final_to_pay =
                    formProps.values.total_value -
                    formProps.values.advance_adjusted;
                  formProps.total_value =
                    props.data?.quantity_sum *
                    props.data?.container_details[0]?.price;
                  return (
                    <Form>
                      {console.log(`formProps.values`, formProps.values)}
                      <Row className="form-group pt-4 d-flex align-items-end">
                        <Col md={3}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              label="Invoice Number"
                              id="invoice_no"
                              name="invoice_no"
                              required
                              value={formProps.values.invoice_no}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.invoice_no &&
                                Boolean(formProps.errors.invoice_no)
                              }
                              helperText={
                                formProps.touched.invoice_no &&
                                formProps.errors.invoice_no
                              }
                            />
                          </InputGroup>
                        </Col>
                        <Col md={3}>
                          <Label className="label">Date</Label>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              id="date"
                              name="date"
                              type="date"
                              required
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
                              disabled
                              variant="standard"
                              size="small"
                              label="Total Value"
                              id="total_value"
                              name="total_value"
                              value={formProps.values.total_value}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.total_value &&
                                Boolean(formProps.errors.total_value)
                              }
                              helperText={
                                formProps.touched.total_value &&
                                formProps.errors.total_value
                              }
                            />
                          </InputGroup>
                        </Col>
                        <Col md={3}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              label="Total Advance Received"
                              id="total_advance_received"
                              name="total_advance_received"
                              value={formProps.values.total_advance_received}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.total_advance_received &&
                                Boolean(formProps.errors.total_advance_received)
                              }
                              helperText={
                                formProps.touched.total_advance_received &&
                                formProps.errors.total_advance_received
                              }
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={4}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              label="Advance adjusted in this invoice"
                              id="advance_adjusted"
                              name="advance_adjusted"
                              required={true}
                              value={formProps.values.advance_adjusted}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.advance_adjusted &&
                                Boolean(formProps.errors.advance_adjusted)
                              }
                              helperText={
                                formProps.touched.advance_adjusted &&
                                formProps.errors.advance_adjusted
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
                              size="small"
                              label="Advance adjusted type"
                              id="advance_adjusted_type"
                              name="advance_adjusted_type"
                              value={formProps.values.advance_adjusted_type}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.advance_adjusted_type &&
                                Boolean(formProps.errors.advance_adjusted_type)
                              }
                              helperText={
                                formProps.touched.advance_adjusted_type &&
                                formProps.errors.advance_adjusted_type
                              }
                            >
                              <MenuItem value="USD">USD</MenuItem>
                              <MenuItem value="Euro">Euro</MenuItem>
                            </TextField>
                          </InputGroup>
                        </Col>
                        <Col md={2}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              disabled
                              label="Final to Pay"
                              id="final_to_pay"
                              name="final_to_pay"
                              value={formProps.values.final_to_pay}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.final_to_pay &&
                                Boolean(formProps.errors.final_to_pay)
                              }
                              helperText={
                                formProps.touched.final_to_pay &&
                                formProps.errors.final_to_pay
                              }
                            />
                          </InputGroup>
                        </Col>
                        <Col md={3}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              select
                              size="small"
                              label="Final to Pay type"
                              id="final_to_pay_type"
                              name="final_to_pay_type"
                              value={formProps.values.final_to_pay_type}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.final_to_pay_type &&
                                Boolean(formProps.errors.final_to_pay_type)
                              }
                              helperText={
                                formProps.touched.final_to_pay_type &&
                                formProps.errors.final_to_pay_type
                              }
                            >
                              <MenuItem value="USD">USD</MenuItem>
                              <MenuItem value="Euro">Euro</MenuItem>
                            </TextField>
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="Form-group">
                        <Col md={6}>
                          <InputGroup>
                            <CustomTextField
                              name="contract_number"
                              label="Contract Number"
                              formProps={formProps}
                            />
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <InputGroup>
                            <CustomTextField
                              name="description"
                              label="Description"
                              formProps={formProps}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <Label className="mt-4">Claim Details</Label>
                      <Row className="form-group  d-flex align-items-end">
                        <Col md={6}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              label="Nature of Claim *"
                              id="nature_of_claim"
                              name="nature_of_claim"
                              value={formProps.values.nature_of_claim}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.nature_of_claim &&
                                Boolean(formProps.errors.nature_of_claim)
                              }
                              helperText={
                                formProps.touched.nature_of_claim &&
                                formProps.errors.nature_of_claim
                              }
                            />
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <Label for="">Claim Settled On *</Label>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              type="date"
                              id="claim_settled_on"
                              name="claim_settled_on"
                              value={formProps.values.claim_settled_on}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.claim_settled_on &&
                                Boolean(formProps.errors.claim_settled_on)
                              }
                              helperText={
                                formProps.touched.claim_settled_on &&
                                formProps.errors.claim_settled_on
                              }
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={4}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              label="Payment *"
                              id="payment"
                              name="payment"
                              value={formProps.values.payment}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.payment &&
                                Boolean(formProps.errors.payment)
                              }
                              helperText={
                                formProps.touched.payment &&
                                formProps.errors.payment
                              }
                            />
                          </InputGroup>
                        </Col>
                        <Col md={4}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              select
                              size="small"
                              label="Payment Unit *"
                              id="payment_type"
                              name="payment_type"
                              value={formProps.values.payment_type}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.payment_type &&
                                Boolean(formProps.errors.payment_type)
                              }
                              helperText={
                                formProps.touched.payment_type &&
                                formProps.errors.payment_type
                              }
                            >
                              <MenuItem value="USD">USD</MenuItem>
                              <MenuItem value="Euro">Euro</MenuItem>
                            </TextField>
                          </InputGroup>
                        </Col>
                        <Col md={4}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              select
                              variant="standard"
                              size="small"
                              label="Status *"
                              id="status"
                              name="status"
                              value={formProps.values.status}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.status &&
                                Boolean(formProps.errors.status)
                              }
                              helperText={
                                formProps.touched.status &&
                                formProps.errors.status
                              }
                            >
                              <MenuItem value="Received">Received</MenuItem>
                              <MenuItem value="Pending">Pending</MenuItem>
                            </TextField>
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row className="Form-group"></Row>
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
                  );
                }}
              </Formik>
            </Col>
            <Col md={3} style={{ overflow: "scroll" }}>
              <Table className="table table-sm m-2 w-100">
                <thead>
                  <tr>
                    <th scope="col">Advance Adjusted</th>
                  </tr>
                  <tr>
                    <th scope="col">Invoice Number</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{invoiceData?.invoice_no ?? "Not Maded"}</td>
                    <td>{invoiceData?.advance_adjusted ?? 0}</td>
                  </tr>

                  <tr>
                    <th>Total</th>
                    <td>{invoiceData?.advance_adjusted ?? 0}</td>
                  </tr>
                  <tr>
                    <th>Balance To be Adjusted</th>
                    <td>
                      {invoiceData?.total_advance_received
                        ? invoiceData?.total_advance_received -
                          invoiceData?.advance_adjusted
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          {props.invoice?.isPostLoading && <LinerLoader />}
        </ModalFooter>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    importSalesContract: state.entities.importer.importSalesContract,
    login: state.login,
    priceUnit: state.entities.master.priceUnit.priceUnit,
    commodity: state.entities.master.commodity.commodity,
    quantityUnit: state.entities.master.quantityUnit.quantityUnit,
    importClaim: state.entities.importer.importClaim,
    invoice: state.entities.importer.invoice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    invoiceGetData: (data) => dispatch(actions.invoiceGetData(data)),
    onDeleteInvoice: (id, data) => dispatch(actions.deleteInvoice(id, data)),
    onPostInvoiceData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postInvoiceData(data, user, toggle, setSubmitting)),
    updateInvoiceData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateInvoiceData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ImportInvoice);
