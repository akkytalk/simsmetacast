/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Label,
  InputGroup,
  CardFooter,
} from "reactstrap";
import * as Yup from "yup";
import { FieldArray, Form, Formik } from "formik";
import { connect } from "react-redux";
import * as actions from "redux/creators";
import { useParams } from "react-router-dom";
import MenuButton from "components/MenuButton/MenuButton";
import CustomTextField from "../../components/MuiComponents/CustomTextField";
import { MenuItem, TextField } from "@mui/material";
import CustomSelectField from "components/MuiComponents/CustomSelectField";

const options = [
  { name: "Add Sales Contract", page: "import/add-sales-contract" },
  { name: "Add Loading Details", page: "import/add-loading-details" },
  // { name: "Upload Document", page: "import/upload-doc" },
  { name: "Highseas", page: "import/highseas" },
  { name: "Quality Match", page: "import/quality-match" },
];

function ImportUploadDocs(props) {
  const { id } = useParams();

  const purchaseSalesIndentData = [];
  // props.purchaseSalesIndent.purchaseSalesIndent.filter(
  //   (sale) => sale.id == id
  // );
  let data = {
    token: props.login?.login?.token,
    id: purchaseSalesIndentData[0]?.bpo?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in sales contract:", values);
    setSubmitting(true);

    let user = {
      unique_no: values.unique_no,
      contract_job_no: values.job_no,
      customer_id: purchaseSalesIndentData[0]?.bpo?.customer_id,
      booking_job_no: purchaseSalesIndentData[0]?.bpo?.booking_job_no,
      supplier_id: purchaseSalesIndentData[0]?.bpo?.supplier_id,
      cha: purchaseSalesIndentData[0]?.bpo?.cha,
      cha_type: purchaseSalesIndentData[0]?.bpo?.cha_type,
      shipping_line: purchaseSalesIndentData[0]?.bpo?.shipping_line,
      price: purchaseSalesIndentData[0]?.bpo?.price,
      price_type: purchaseSalesIndentData[0]?.bpo?.price_type,
      commission: purchaseSalesIndentData[0]?.bpo?.commission,
      commission_type: purchaseSalesIndentData[0]?.bpo?.commission_type,
      eta: purchaseSalesIndentData[0]?.bpo?.eta,
      no_purchase_orders: purchaseSalesIndentData[0]?.bpo?.no_purchase_orders,
      subject: purchaseSalesIndentData[0]?.bpo?.subject,
      email_job_no: purchaseSalesIndentData[0]?.bpo?.email_job_no,
      sent_to: purchaseSalesIndentData[0]?.bpo?.sent_to,
    };

    console.log("Data of sales contract:", user);
    // props.upjob_noPurchaseOrderData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card>
      <div className="p-1 d-flex justify-content-end align-items-center">
        <span className="font-weight-bold mr-2">Navigation </span>
        <i className="ni ni-bold-right" />
        <MenuButton index={id} options={options} />
      </div>
      <CardBody>
        <Formik
          initialValues={{
            file: "",
            job_no: "",
            cha: "",
            licence_details: [],
            highsea: "",
            contract_details: [
              {
                order_id: "",
                date: "",
                amount: 0,
                amount_type: "USD",
                pending: 0,
                remark: "",
                pending_type: "USD",
              },
            ],
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            unique_no: Yup.string().required("required"),
            job_no: Yup.string().required("required"),
            cha: Yup.string().required("required"),
          })}
        >
          {(formProps) => (
            <Form>
              {console.log("formProps.values", formProps.values)}
              <Row className="form-group d-flex align-items-end">
                <Col md={6}>
                  <InputGroup>
                    <Label className="label">File Upload</Label>
                    <TextField
                      fullWidth
                      variant="standard"
                      id="file"
                      type="file"
                      name="file"
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "file",
                          event.currentTarget.files[0]
                        );
                      }}
                      error={
                        formProps.touched.file && Boolean(formProps.errors.file)
                      }
                      helperText={
                        formProps.touched.file && formProps.errors.file
                      }
                    ></TextField>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <CustomTextField
                      name="job_no"
                      label="Job No"
                      formProps={formProps}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className="form-group d-flex align-items-end">
                <Col md={6}>
                  <TextField
                    fullWidth
                    variant="standard"
                    id={`cha`}
                    label="Cha"
                    name={`cha`}
                    value={formProps.values.cha}
                    onChange={formProps.handleChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomSelectField
                    name={`highsea`}
                    label="Select Highsea Status"
                    formProps={formProps}
                    options={[
                      { name: "Yes", value: 1 },
                      { name: "No", value: 0 },
                    ]}
                    value={formProps?.values.highsea}
                  />
                </Col>
              </Row>

              <Col md={12} className="p-0">
                <Label className="label">Advance Details</Label>
                <FieldArray
                  name="contract_details"
                  render={(arrayHelpers) => (
                    <div className="">
                      {formProps.values.contract_details
                        ?.filter((detail) => detail.remark !== -1)
                        .map((detail, index) => {
                          return (
                            <Card
                              className="address-container"
                              key={`${index}`}
                            >
                              <div className="address-line">
                                <Row className="form-group d-flex align-items-end">
                                  <Col md={4}>
                                    <Label>Date *</Label>
                                    <CustomTextField
                                      type="date"
                                      name={`contract_details.${index}.date`}
                                      formProps={formProps}
                                      value={
                                        formProps?.values.contract_details[
                                          index
                                        ].date
                                      }
                                    />
                                  </Col>

                                  <Col md={4}>
                                    <CustomTextField
                                      name={`contract_details.${index}.amount`}
                                      formProps={formProps}
                                      label="Amount"
                                      value={
                                        formProps?.values.contract_details[
                                          index
                                        ].amount
                                      }
                                    />
                                  </Col>

                                  <Col md={4}>
                                    <CustomSelectField
                                      name={`contract_details.${index}.amount_type`}
                                      disabled
                                      label="Amount Type"
                                      formProps={formProps}
                                      options={[
                                        { name: "USD", value: "USD" },
                                        { name: "%", value: "%" },
                                      ]}
                                      value={
                                        formProps?.values.contract_details[
                                          index
                                        ].amount_type
                                      }
                                    />
                                  </Col>
                                </Row>
                                <Row className="form-group d-flex align-items-end">
                                  <Col md={4}>
                                    <CustomTextField
                                      name={`contract_details.${index}.pending`}
                                      formProps={formProps}
                                      label="Pending Amount"
                                      disabled
                                      value={
                                        formProps?.values.contract_details[
                                          index
                                        ].pending
                                      }
                                    />
                                  </Col>

                                  <Col md={4}>
                                    <CustomTextField
                                      name={`contract_details.${index}.remark`}
                                      formProps={formProps}
                                      label="Remark"
                                      value={
                                        formProps?.values.contract_details[
                                          index
                                        ].remark
                                      }
                                    />
                                  </Col>
                                  <Col md={4}>
                                    <CustomSelectField
                                      name={`contract_details.${index}.pending_type`}
                                      disabled
                                      label="Pending Amount Type"
                                      formProps={formProps}
                                      options={[
                                        { name: "USD", value: "USD" },
                                        { name: "%", value: "%" },
                                      ]}
                                      value={
                                        formProps?.values.contract_details[
                                          index
                                        ].pending_type
                                      }
                                    />
                                  </Col>
                                </Row>
                              </div>

                              <CardFooter className="d-flex justify-content-end align-items-center p-2 pb-0">
                                {formProps.values.contract_details.filter(
                                  (detail) => detail.remark !== -1
                                )?.length ===
                                  index + 1 && (
                                  <Button
                                    className="btn-success p-1 "
                                    onClick={() => {
                                      arrayHelpers.push({
                                        order_id:
                                          purchaseSalesIndentData[0]?.bpo?.id,
                                        date: "",
                                        amount: 0,
                                        amount_type: "USD",
                                        pending: "",
                                        remark: "",
                                        pending_type: "USD",
                                      });
                                    }}
                                  >
                                    <i className="fa fa-plus" />
                                  </Button>
                                )}

                                {formProps.values.contract_details?.filter(
                                  (detail) => detail.remark !== -1
                                )?.length > 1 && (
                                  <Button
                                    color="danger p-1"
                                    size="sm"
                                    onClick={
                                      () =>
                                        formProps.setFieldValue(
                                          `contract_details.${index}.remark`,
                                          -1
                                        )
                                      // arrayHelpers.remove(index)
                                    }
                                  >
                                    <i className="fa fa-trash" />
                                  </Button>
                                )}
                              </CardFooter>
                            </Card>
                          );
                        })}
                    </div>
                  )}
                />
              </Col>
              <Col md={12} className="p-0">
                <Label className="label">Licence Details</Label>
              </Col>
              <Row style={{ justifyContent: "center", marginTop: "50px" }}>
                <Col md={2}>
                  <Button type="reset" color="danger" block>
                    <b>Reset</b>
                  </Button>
                </Col>

                <Col md={2}>
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
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    purchaseSalesIndent: state.purchaseSalesIndent,
    login: state.login,
    purchaseOrder: state.purchaseOrder,
    containerSize: state.containerSize.containerSize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onContainerSizeGetData: (data) =>
      dispatch(actions.containerSizeGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ImportUploadDocs);
