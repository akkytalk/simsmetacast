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
  Table,
} from "reactstrap";
import { Field, FieldArray, Form, Formik } from "formik";
import { connect } from "react-redux";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "../../store/creators";
import TextField from "@material-ui/core/TextField";
import "../../css/main.css";

import DeleteButton from "../../Helpers/DeleteButton";
import CustomTextField from "../../components/MuiComponents/CustomTextField";
import CustomAutoComplete from "../../components/MuiComponents/CustomAutoComplete";
import CustomInput from "views/Views/CustomInput";
import CustomSelectField from "../../components/MuiComponents/CustomSelectField";
import MenuButton from "components/MenuButton/MenuButton";
import AddButton from "Helpers/AddButton";

const options = [
  { name: "Add Sales Contract", page: "sales-confirmation/sales-contract" },
];

function EditSalesConfirmation(props) {
  let data = {
    token: props.login?.login?.token,
    id: props.data?.id,
  };
  const [modal, setModal] = useState(false);

  const defaultProps = {
    options: props.client,
    getOptionLabel: (option) => option.company_name,
  };

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.create == 1
      ? true
      : false;

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const user = new FormData();
    user.append("user_id", props.login?.login?.user?.id);
    user.append("customer_id", values.company_name);
    user.append("partner_name", values.partner_name);
    user.append("email", values.email);
    user.append("telephone_no", values.telephone_no);
    user.append("gst_no", values.gst_no);
    user.append("iec_no", values.iec_no);
    user.append("pan_no", values.pan_no);
    user.append("bank_name", values.bank_name);
    user.append("bank_ac_no", values.bank_ac_no);
    user.append("bank_address", values.bank_address);
    user.append("bank_telephone_no", values.bank_telephone_no);
    user.append("swift_code", values.swift_code);
    user.append("rtgs_code", values.rtgs_code);
    user.append("desc", values.desc);
    user.append("destination_port", values.destination_port);
    user.append("select_final_destination", values.select_final_destination);
    user.append("advance_amount", values.advance_amount);
    user.append("is_highsea", values.is_highsea);
    user.append("highsea_file", values.highsea_file);
    user.append("address", values.address);
    user.append(
      "commodity_analysis",
      JSON.stringify(values.commodity_analysis_id)
    );
    user.append("sc_id", "");

    console.log("Data of Sales Confirmation:", user);
    props.updateSalesConfirmationData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <div className="d-flex">
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
          deleteFunction={() =>
            props.deleteSalesConfirmation(props.data.id, data)
          }
        />
      )}
      <MenuButton data={props.data} index={props.data.id} options={options} />

      <Modal
        className="modal-xl"
        backdrop="static"
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit Sales Confirmation
        </ModalHeader>

        {props.salesConfirmation?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              company_name: props.data?.customer_id ?? "",
              partner_name: props.data?.partner_name ?? "",
              email: props.data?.email ?? "",
              telephone_no: props.data?.telephone_no ?? "",
              address: props.data?.address ?? "",
              gst_no: props.data?.gst_no ?? "",
              iec_no: props.data?.iec_no ?? "",
              pan_no: props.data?.pan_no ?? "",
              bank_name: props.data?.bank_name ?? "",
              bank_address: props.data?.bank_address ?? "",
              bank_telephone_no: props.data?.bank_telephone_no ?? "",
              swift_code: props.data?.swift_code ?? "",
              rtgs_code: props.data?.rtgs_code ?? "",
              bank_ac_no: props.data?.bank_ac_no ?? "",
              desc: props.data?.desc ?? "",
              destination_port: props.data?.destination_port ?? "",
              select_final_destination:
                props.data?.select_final_destination ?? "",
              advance_amount: props.data?.advance_amount ?? "",
              is_highsea: props.data?.is_highsea ?? "",
              highsea_file: props.data?.highsea_file ?? "",
              commodity_analysis_id: props.data?.commodity_analysis ?? [],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({})}
          >
            {(formProps) => (
              <Form>
                {console.log(`formProps.values`, formProps.values)}
                <Row className="form-group">
                  <Col md={3} className="">
                    <InputGroup>
                      <CustomAutoComplete
                        name="company_name"
                        formProps={formProps}
                        defaultProps={defaultProps}
                        defaultValue={props.data?.customer}
                        label="Company Name"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={3} className="">
                    <CustomTextField
                      formProps={formProps}
                      name="partner_name"
                      label="Partner Name"
                    />
                  </Col>

                  <Col md={3}>
                    <InputGroup>
                      <CustomTextField
                        name="telephone_no"
                        type="tel"
                        formProps={formProps}
                        label="Telephone No"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <InputGroup>
                      <CustomTextField
                        name="email"
                        type="email"
                        formProps={formProps}
                        label="Email Address"
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={6}>
                    <InputGroup>
                      <CustomTextField
                        label="Address"
                        name="address"
                        formProps={formProps}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <CustomTextField
                      label="GST NO"
                      name="gst_no"
                      formProps={formProps}
                    />
                  </Col>
                  <Col md={3}>
                    <CustomTextField
                      label="IEC No"
                      name="iec_no"
                      formProps={formProps}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={3}>
                    <CustomTextField
                      label="PAN No"
                      name="pan_no"
                      formProps={formProps}
                    />
                  </Col>
                  <Col md={3}>
                    <CustomTextField
                      label="Bank Name"
                      name="bank_name"
                      formProps={formProps}
                    />
                  </Col>

                  <Col md={6}>
                    <CustomTextField
                      label="Bank Address"
                      name="bank_address"
                      formProps={formProps}
                    />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={3}>
                    <CustomTextField
                      label="Bank Telphone No"
                      name="bank_telephone_no"
                      type="tel"
                      formProps={formProps}
                    />
                  </Col>
                  <Col md={3}>
                    <CustomTextField
                      label="Swift Code"
                      name="swift_code"
                      formProps={formProps}
                    />
                  </Col>
                  <Col md={3}>
                    <CustomTextField
                      label="RTGS Code"
                      name="rtgs_code"
                      formProps={formProps}
                    />
                  </Col>
                  <Col md={3}>
                    <CustomTextField
                      label="Bank A/C No"
                      name="bank_ac_no"
                      formProps={formProps}
                    />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={3}>
                    <CustomTextField
                      label="Description"
                      name="desc"
                      formProps={formProps}
                    />
                  </Col>
                  <Col md={3}>
                    <CustomTextField
                      label="Advance Amount"
                      name="advance_amount"
                      formProps={formProps}
                    />
                  </Col>
                  <Col md={3}>
                    <CustomTextField
                      label="Select Destination Port"
                      name="destination_port"
                      formProps={formProps}
                    />
                  </Col>

                  <Col md={3}>
                    <CustomTextField
                      label="Select Final Destination"
                      name="select_final_destination"
                      formProps={formProps}
                    />
                  </Col>
                </Row>
                <Row className="form-group mb-50">
                  <Col md={6}>
                    <FieldArray
                      name={`commodity_analysis_id`}
                      render={(analysisArrayHelper) => {
                        return (
                          <>
                            <Table className="table">
                              <thead className="bg-black text-white">
                                <tr>
                                  <th scope="col" className="analysis-th">
                                    Commodity
                                  </th>
                                  <th scope="col" className="analysis-th">
                                    Analysis
                                  </th>
                                  <th scope="col" className="analysis-th"></th>
                                </tr>
                              </thead>
                              {formProps.values.commodity_analysis_id?.map(
                                (ana, analysisIndex) => {
                                  return (
                                    <tbody className="bg-white analysis-body">
                                      <tr>
                                        <td className="analysis-td">
                                          <Field
                                            fullWidth
                                            component={CustomInput}
                                            className="bg-white"
                                            id={`commodity_analysis_id.${analysisIndex}.product_name`}
                                            placeholder="Commodity"
                                            name={`commodity_analysis_id.${analysisIndex}.product_name`}
                                          />
                                        </td>
                                        <td className="analysis-td">
                                          <Field
                                            className="bg-white"
                                            component={CustomInput}
                                            id={`commodity_analysis_id.${analysisIndex}.analysis`}
                                            placeholder="Analysis"
                                            name={`commodity_analysis_id.${analysisIndex}.analysis`}
                                          />
                                        </td>
                                        <td className="analysis-td">
                                          {formProps.values
                                            ?.commodity_analysis_id?.length ===
                                            analysisIndex + 1 && (
                                            <AddButton
                                              className="btn-success p-1 f-8"
                                              onClick={() => {
                                                analysisArrayHelper.push({
                                                  id: "",
                                                  product_name: "",
                                                  analysis: "",
                                                });
                                              }}
                                            />
                                          )}
                                          {formProps.values
                                            ?.commodity_analysis_id?.length >
                                            1 && (
                                            <DeleteButton
                                              deleteFunction={() =>
                                                analysisArrayHelper.remove(
                                                  analysisIndex
                                                )
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  );
                                }
                              )}
                            </Table>
                          </>
                        );
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <CustomSelectField
                      name={`is_highsea`}
                      label="Select Highsea Status"
                      formProps={formProps}
                      options={[
                        { name: "Yes", value: 1 },
                        { name: "No", value: 0 },
                      ]}
                      value={formProps?.values.is_highsea}
                    />
                  </Col>
                  <Col md={3}>
                    {formProps?.values.is_highsea === 1 && (
                      <InputGroup>
                        <Label className="label">File Upload</Label>
                        <TextField
                          fullWidth
                          variant="standard"
                          id="highsea_file"
                          type="file"
                          name="highsea_file"
                          onChange={(event) => {
                            formProps.setFieldValue(
                              "highsea_file",
                              event.currentTarget.files[0]
                            );
                          }}
                          error={
                            formProps.touched.highsea_file &&
                            Boolean(formProps.errors.highsea_file)
                          }
                          helperText={
                            formProps.touched.highsea_file &&
                            formProps.errors.highsea_file
                          }
                        ></TextField>
                      </InputGroup>
                    )}
                  </Col>
                </Row>

                <Row className="form-group d-flex align-items-end"></Row>

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
    client: state.entities.client.client,
    city: state.entities.address.city,
    country: state.entities.address.country,
    state: state.entities.address.state,
    login: state.login,
    salesConfirmation: state.entities.salesConfirmation,
    commissionUnit: state.entities.master.commissionUnit.commissionUnit,
    priceUnit: state.entities.master.priceUnit.priceUnit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSalesConfirmationData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateSalesConfirmationData(data, user, toggle, setSubmitting)
      ),
    deleteSalesConfirmation: (id, data) =>
      dispatch(actions.deleteSalesConfirmation(id, data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSalesConfirmation);
