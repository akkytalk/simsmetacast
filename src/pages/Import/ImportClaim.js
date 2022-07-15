/* eslint-disable eqeqeq */
import React, { useState } from "react";
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
  ModalFooter,
} from "reactstrap";
import LinerLoader from "components/Loaders/LinerLoader";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import "css/main.css";
import CustomSelectField from "../../components/MuiComponents/CustomSelectField";
import CustomCheckbox from "../../components/MuiComponents/CustomCheckbox";
import CustomTextField from "../../components/MuiComponents/CustomTextField";
import { isEmpty } from "Helpers/helper";

function ImportClaim({ ...props }) {
  let data = {
    token: props.login?.login?.token,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const claimData =
    props.importClaim?.importClaim?.filter(
      (c) => c.quality_match_id == props.data?.id
    ).length > 0
      ? props.importClaim?.importClaim.filter(
          (c) => c.quality_match_id == props.data?.id
        )[0]
      : [];

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in ImportClaim:", values);
    setSubmitting(true);

    let user = !isEmpty(claimData)
      ? {
          is_approved: values.is_approved,
          claim_type: values.claim_type,
          quality_match_id: props.data?.id,
          status: values.status,
          settled_amount: values.settled_amount,
          description: values.description,
          settled_date: values.settled_date,
          is_settled: values.is_settled,
          claim_status_2: values.claim_status_2,
          remark: values.remark,
        }
      : {
          id: claimData?.id,
          is_approved: values.is_approved,
          claim_type: values.claim_type,
          quality_match_id: props.data?.id,
          status: values.status,
          settled_amount: values.settled_amount,
          description: values.description,
          settled_date: values.settled_date,
          is_settled: values.is_settled,
          claim_status_2: values.claim_status_2,
          remark: values.remark,
        };

    console.log("Data of ImportClaim:", user);
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
          ImportClaim
        </ModalHeader>

        <ModalBody className="">
          <Formik
            initialValues={{
              is_approved: claimData?.is_approved ?? "",
              claim_type: claimData?.claim_type ?? "",
              status: claimData?.status ?? "",
              settled_amount: claimData?.settled_amount ?? "",
              description: claimData?.description ?? "",
              settled_date: claimData?.settled_date ?? "",
              is_settled: claimData?.is_settled ?? 0,
              claim_status_2: claimData?.claim_status_2 ?? "",
              remark: claimData?.remark ?? "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              is_approved: Yup.string().required("Required"),
              claim_type: Yup.string().required("Required"),
              status: Yup.string().required("Required"),
              settled_amount: Yup.string().required("Required"),
            })}
          >
            {(formProps) => {
              console.log("fomrProps", formProps.values);
              return (
                <Form>
                  {console.log(`formProps.values`, formProps.values)}
                  <Row className="form-group pt-4 d-flex align-items-end">
                    <Col md={4}>
                      <InputGroup>
                        <CustomSelectField
                          label="Claim Type"
                          name="claim_type"
                          formProps={formProps}
                          options={[
                            { name: "Quantity Claim", value: "quantity" },
                            { name: "Quality Claim", value: "quality" },
                          ]}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={4}>
                      <CustomSelectField
                        label="Claim Approved"
                        name="is_approved"
                        formProps={formProps}
                        options={[
                          { name: "Yes", value: 1 },
                          { name: "No", value: 0 },
                        ]}
                      />
                    </Col>
                    <Col md={4}>
                      <CustomSelectField
                        label="Claim Status"
                        name="status"
                        formProps={formProps}
                        options={[
                          { name: "Completed", value: 1 },
                          { name: "Pending", value: 0 },
                        ]}
                      />
                    </Col>
                  </Row>

                  <Row className="form-group d-flex align-items-end">
                    <Col md={4}>
                      <CustomCheckbox
                        formProps={formProps}
                        name="is_settled"
                        label="Claim Settled"
                      />
                    </Col>
                    {formProps.values?.is_settled == 1 ? (
                      <>
                        <Col md={4}>
                          <CustomTextField
                            label="Claim Settled Amount"
                            name="settled_amount"
                            formProps={formProps}
                          />
                        </Col>
                        <Col md={4}>
                          <Label className="label">Date</Label>
                          <CustomTextField
                            type="date"
                            name="settled_date"
                            formProps={formProps}
                          />
                        </Col>
                      </>
                    ) : (
                      ""
                    )}
                  </Row>

                  <Row className="form-group">
                    <Col md={6}>
                      <CustomSelectField
                        label="Payment Type"
                        name="claim_status_2"
                        formProps={formProps}
                        options={[
                          { name: "Cash/Bank", value: "Cash/Bank" },
                          { name: "Against invoice", value: "Against invoice" },
                          { name: "Settled", value: "Settled" },
                        ]}
                      />
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

                  <Row className="form-group">
                    <Col md={12}>
                      <InputGroup>
                        <CustomTextField
                          name="remark"
                          label="Remark"
                          formProps={formProps}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Label className="mb-4">
                    Note: Quality Matching Id is required
                  </Label>

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
          {(props.importClaim.isUpdateLoading ||
            props.importClaim.isPostLoading) && <LinerLoader />}
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
export default connect(mapStateToProps, mapDispatchToProps)(ImportClaim);
