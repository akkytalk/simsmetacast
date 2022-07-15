/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "store/creators";
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

function Claims({ currentImportSalesContract, ...props }) {
  let data = {
    token: props.login?.login?.token,
    id: currentImportSalesContract?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const claimData =
    props.importClaim?.importClaim?.filter(
      (c) => c.loading_detail_id == props.data.id
    ).length > 0
      ? props.importClaim?.importClaim.filter(
          (c) => c.loading_detail_id == props.data.id
        )[0]
      : [];

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Claims:", values);
    setSubmitting(true);

    let user =
      claimData.length > 0
        ? {
            claim_settled_on: values.claim_settled_on,
            nature_of_claim: values.nature_of_claim,
            loading_detail_id: props.data.id,
            status: values.status,
            payment: values.payment,
            payment_type: values.payment_type,
            remark: values.remark,
          }
        : {
            id: claimData?.id,
            claim_settled_on: values.claim_settled_on,
            nature_of_claim: values.nature_of_claim,
            loading_detail_id: props.data.id,
            status: values.status,
            payment: values.payment,
            payment_type: values.payment_type,
            remark: values.remark,
          };

    console.log("Data of Claims:", user);
    props.onPostImportClaimData(data, user, toggle, setSubmitting);
    return;
  };

  console.log("claimData", claimData);
  return (
    <>
      <Button className="bg-gradient-info text-white" onClick={() => toggle()}>
        {claimData?.id ? "Claimed" : "Claim"}
      </Button>
      <Modal className="modal-xl" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Claims
        </ModalHeader>

        <ModalBody className="">
          <Label>Supplier Details</Label>
          <Col md={12} style={{ overflow: "scroll" }}>
            <Table className="table table-sm m-2">
              <thead>
                <tr>
                  <th scope="col">Company Name</th>
                  <th scope="col">partner Name</th>
                  {/* <th scope="col">Commodity</th> */}
                  <th scope="col">Weight</th>
                  <th scope="col">Container Number</th>
                  <th scope="col">LME</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {
                      currentImportSalesContract?.sales_confirmation?.customer
                        ?.company_name
                    }
                  </td>
                  <td>
                    {
                      currentImportSalesContract?.sales_confirmation
                        ?.partner_name
                    }
                  </td>
                  {/* <td>{currentImportSalesContract[0]?.commodities}</td> */}

                  <td>{props.data?.quantity_sum}</td>
                  <td>{props.data?.container_details[0]?.container_no}</td>
                  <td>{props.data?.container_details[0]?.price}</td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Formik
            initialValues={{
              claim_settled_on: claimData?.claim_settled_on ?? "",
              nature_of_claim: claimData?.nature_of_claim ?? "",
              status: claimData?.status ?? "",
              payment: claimData?.payment ?? "",
              payment_type: claimData?.payment_type ?? "",
              remark: claimData?.remark ?? "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              claim_settled_on: Yup.string().required("Required"),
              nature_of_claim: Yup.string().required("Required"),
              status: Yup.string().required("Required"),
              payment: Yup.string().required("Required"),
              payment_type: Yup.string().required("Required"),
            })}
          >
            {(formProps) => {
              return (
                <Form>
                  {console.log(`formProps.values`, formProps.values)}
                  <Row className="form-group pt-4 d-flex align-items-end">
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
                    <Col md={3}>
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
                    <Col md={3}>
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
                    <Col md={3}>
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
                            formProps.touched.status && formProps.errors.status
                          }
                        >
                          <MenuItem value="Received">Received</MenuItem>
                          <MenuItem value="Pending">Pending</MenuItem>
                        </TextField>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={12}>
                      <InputGroup>
                        <TextField
                          fullWidth
                          multiline
                          variant="standard"
                          size="small"
                          label="Remark"
                          id="remark"
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
              );
            }}
          </Formik>
        </ModalBody>
        <ModalFooter>
          {props.importClaim?.isPostLoading && <LinerLoader />}
        </ModalFooter>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    priceUnit: state.entities.master.priceUnit.priceUnit,
    commodity: state.entities.master.commodity.commodity,
    quantityUnit: state.entities.master.quantityUnit.quantityUnit,
    importLoadingdetail: state.entities.importer.importLoadingdetail,
    importClaim: state.entities.importer.importClaim,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    importClaimGetData: (data) => dispatch(actions.importClaimGetData(data)),
    onDeleteImportClaim: (id, data) =>
      dispatch(actions.deleteImportClaim(id, data)),
    onPostImportClaimData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postImportClaimData(data, user, toggle, setSubmitting)),
    updateImportClaimData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateImportClaimData(data, user, toggle, setSubmitting)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Claims);
