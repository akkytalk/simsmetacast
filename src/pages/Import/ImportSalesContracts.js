/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Label,
  InputGroup,
  CardFooter,
  FormGroup,
  Table,
} from "reactstrap";
import * as Yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";
import { connect } from "react-redux";
import * as actions from "store/creators";
import { useParams } from "react-router-dom";
import MenuButton from "components/MenuButton/MenuButton";
import CustomTextField from "../../components/MuiComponents/CustomTextField";
import CustomSelectField from "../../components/MuiComponents/CustomSelectField";
import { TextField } from "@material-ui/core";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import CustomInput from "views/Views/CustomInput";
import DeleteButton from "Helpers/DeleteButton";
import "../../css/main.css";
import MButton from "@mui/material/Button";
import AddButton from "./../../Helpers/AddButton";
import LinerLoader from "components/Loaders/LinerLoader";
import { arrayFilterByKey } from "Helpers/helper";
import { isEmpty } from "Helpers/helper";

function ImportSalesContracts(props) {
  const options = [
    // { name: "Add Sales Contract", page: "import/add-sales-contract" },
    { name: "Add Loading Details", page: "import/add-loading-details" },
    { name: "Add Advance Details", page: "import/add-advance-details" },
    { name: "Bill of Entry", page: "import/bill" },
    { name: "Quality Match", page: "import/quality-match" },
  ];

  const { id } = useParams();

  const currentFinder = () => {
    console.log("this filter runs sales contract");
    return arrayFilterByKey(
      props.importSalesContract.importSalesContract,
      "id",
      id
    )[0];
  };

  const currentImportSalesContract = useMemo(
    () => currentFinder(),
    [props.importSalesContract.importSalesContract, id]
  );

  let data = {
    token: props.login?.login?.token,
    id: id,
  };

  useEffect(() => {
    props.onQuantityUnitGetData(data);
  }, []);

  // const currentImportSalesContract = arrayFilterByKey(
  //   props.importSalesContract.importSalesContract,
  //   "sales_confirmation_id",
  //   id
  // )[0];

  const toggle = () => {};

  console.log("currentImportSalesContract", currentImportSalesContract);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in sales contract:", values);
    setSubmitting(true);

    const user = new FormData();

    user.append(
      "sales_confirmation_id",
      currentImportSalesContract.sales_confirmation_id
    );
    user.append("contract_no", values.contract_no);
    user.append("contract_date", values.contract_date);
    user.append("contract_file", values.contract_file);
    user.append("quantity", values.quantity);
    user.append("quality", values.quality);
    user.append("remarks", values.remarks);
    user.append("price_status", values.price_status);
    user.append("amount", values.amount);
    user.append("percent", values.percent);
    user.append("operator", values.operator);
    user.append("amount_unit", values.amount_unit);
    user.append("price_unit", values.price_unit);
    user.append("provisional_price", values.provisional_price);
    user.append("price_name", values.price_name);
    user.append("price_name", values.price_name);
    user.append("lme_rates", JSON.stringify(values.lme_rates));
    user.append(
      "saleContractDetails",
      JSON.stringify(values.saleContractDetails)
    );
    user.append(
      "deleteSaleContractDetails",
      JSON.stringify(values.deleteSaleContractDetails)
    );

    props.updateImportSalesContractData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card>
      <div className="p-1 d-flex justify-content-end align-items-center">
        <span className="font-weight-bold mr-2">Navigation</span>
        <i className="ni ni-bold-right" />
        <MenuButton index={id} options={options} />
      </div>
      <CardBody>
        <Formik
          initialValues={{
            contract_no: currentImportSalesContract?.contract_no ?? "",
            contract_date: currentImportSalesContract?.contract_date ?? "",
            contract_file: currentImportSalesContract?.contract_file ?? "",
            quantity: currentImportSalesContract?.quantity ?? "",
            quality: currentImportSalesContract?.quality ?? "",
            remarks: currentImportSalesContract?.remarks ?? "",
            price_status: currentImportSalesContract?.price_status ?? 0,
            amount: currentImportSalesContract?.price?.amount ?? "",
            percent: currentImportSalesContract?.price?.percent ?? "",
            operator: currentImportSalesContract?.price?.operator ?? "",
            amount_unit: currentImportSalesContract?.price?.amount_unit ?? "",
            price_unit: currentImportSalesContract?.price?.price_unit ?? "",
            provisional_price:
              currentImportSalesContract?.price?.provisional_price ?? "",
            price_name: currentImportSalesContract?.price?.price_name ?? "",
            lme_rates: !isEmpty(currentImportSalesContract?.price?.lme_rates)
              ? currentImportSalesContract.price?.lme_rates
              : [],
            saleContractDetails: !isEmpty(
              currentImportSalesContract?.sale_contract_details
            )
              ? currentImportSalesContract?.sale_contract_details
              : [
                  {
                    date: "",
                    amount: 0,
                    amount_type: "USD",
                    pending: 0,
                    remark: "",
                    pending_type: "USD",
                  },
                ],
            deleteSaleContractDetails: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            contract_no: Yup.string().required("required"),
            contract_date: Yup.string().required("required"),
            quantity: Yup.string().required("required"),
          })}
        >
          {(formProps) => (
            <Form>
              {console.log("formProps.values", formProps.values)}

              <Row className="form-group d-flex align-items-end">
                <Col md={6}>
                  <InputGroup>
                    <CustomTextField
                      name="contract_no"
                      label="Contract Number"
                      formProps={formProps}
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <Label className="label">Contact Date *</Label>
                  <InputGroup>
                    <CustomTextField
                      name="contract_date"
                      type="date"
                      formProps={formProps}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className="form-group d-flex align-items-end">
                <Col md={6}>
                  <Label className="label">Upload</Label>
                  <InputGroup>
                    {/* <CustomTextField
                      type="file"
                      name="file"
                      formProps={formProps}
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "file",
                          event.currentTarget.files[0]
                        );
                      }}
                    /> */}
                    <TextField
                      fullWidth
                      variant="standard"
                      id="contract_file"
                      type="file"
                      name="contract_file"
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "contract_file",
                          event.currentTarget.files[0]
                        );
                      }}
                      error={
                        formProps.touched.contract_file &&
                        Boolean(formProps.errors.contract_file)
                      }
                      helperText={
                        formProps.touched.contract_file &&
                        formProps.errors.contract_file
                      }
                    ></TextField>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <CustomTextField
                    formProps={formProps}
                    name="quantity"
                    label="Quantity"
                    type="number"
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={6}>
                  <CustomTextField
                    name="quality"
                    label="Quality"
                    formProps={formProps}
                  />
                </Col>
                <Col md={6}>
                  <CustomTextField
                    name="remarks"
                    label="Remarks"
                    formProps={formProps}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={12}>
                  <Label>Price *</Label>

                  <RadioGroup
                    aria-label="price_status"
                    name={`price_status`}
                    onChange={formProps.handleChange}
                    value={formProps.values.price_status}
                  >
                    <Row className="form-group">
                      <Col md={4}>
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label={
                            formProps.values.quantity_unit == 3
                              ? `Fixed (PMT Price is: ${(
                                  2.20462 *
                                  1000 *
                                  formProps.values.amount
                                ).toFixed(2)})`
                              : "Fixed"
                          }
                        />
                      </Col>
                      <Col md={4}>
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label="LME"
                        />
                      </Col>
                      <Col md={4}>
                        <FormControlLabel
                          value={2}
                          control={<Radio />}
                          label="LLME"
                        />
                      </Col>
                    </Row>
                  </RadioGroup>

                  {formProps.values.price_status == 0 ? (
                    <Row className="form-group">
                      <Col md={4}>
                        <CustomTextField
                          name="amount"
                          label="Amount"
                          formProps={formProps}
                          required={formProps.values.price_status == 0}
                        />
                      </Col>

                      <Col md={4}>
                        <CustomSelectField
                          formProps={formProps}
                          name="amount_unit"
                          label="Select Unit"
                          options={props.quantityUnit}
                          optionValue="name"
                          required={formProps.values.price_status == 0}
                        />
                      </Col>
                      <Col md={4} className="">
                        <CustomSelectField
                          formProps={formProps}
                          name="price_unit"
                          label="Select price"
                          required={formProps.values.price_status == 0}
                          options={[
                            {
                              value: "USD",
                              name: "USD",
                            },
                            {
                              value: "Euro",
                              name: "Euro",
                            },
                          ]}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <>
                      <Row className="form-group">
                        <Col md={4} className="">
                          <CustomTextField
                            formProps={formProps}
                            name="percent"
                            label="Percent"
                            required={
                              formProps.values.price_status == 1 ||
                              formProps.values.price_status == 2
                            }
                          />
                        </Col>

                        <Col md={4} className="">
                          <CustomSelectField
                            formProps={formProps}
                            name="operator"
                            label="Select Operator"
                            required={
                              formProps.values.price_status == 1 ||
                              formProps.values.price_status == 2
                            }
                            options={[
                              {
                                value: "+",
                                name: "+",
                              },
                              {
                                value: "-",
                                name: "-",
                              },
                            ]}
                          />
                        </Col>
                        <Col md={4} className="">
                          <CustomSelectField
                            formProps={formProps}
                            name="amount_unit"
                            label="Select price"
                            required={formProps.values.price_status == 0}
                            options={[
                              {
                                value: "USD",
                                name: "USD",
                              },
                              {
                                value: "Euro",
                                name: "Euro",
                              },
                            ]}
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col md={3} className="">
                          <CustomTextField
                            formProps={formProps}
                            name="provisional_price"
                            label="Provisional Price"
                          />
                        </Col>
                        <Col md={3} className="">
                          <CustomTextField
                            formProps={formProps}
                            name="price_name"
                            label="Price Name"
                          />
                        </Col>
                        <Col md={6}>
                          <Label>LME Rate *</Label>
                          <FieldArray
                            name={`lme_rates`}
                            render={(lmeArrayHelper) => {
                              return (
                                <>
                                  {(formProps.values.price_status == 1 ||
                                    formProps.values.price_status == 2) && (
                                    <AddButton
                                      onClick={() => {
                                        lmeArrayHelper.push({
                                          product_name: "",
                                          percent: "",
                                        });
                                      }}
                                    />
                                  )}
                                  <Table className="table">
                                    <thead className="bg-black text-white">
                                      <tr>
                                        <th scope="col" className="analysis-th">
                                          Commodity
                                        </th>
                                        <th scope="col" className="analysis-th">
                                          Percentage
                                        </th>
                                        <th
                                          scope="col"
                                          className="analysis-th"
                                        ></th>
                                      </tr>
                                    </thead>
                                    {formProps.values.lme_rates?.map(
                                      (lme, lmeIndex) => {
                                        return (
                                          <tbody
                                            className="bg-white analysis-body"
                                            key={lmeIndex}
                                          >
                                            <tr>
                                              <td className="analysis-td">
                                                <Field
                                                  component={CustomInput}
                                                  className="bg-white"
                                                  id={`lme_rates.${lmeIndex}.product_name`}
                                                  placeholder="Commodity"
                                                  name={`lme_rates.${lmeIndex}.product_name`}
                                                />
                                              </td>
                                              <td className="analysis-td">
                                                <Field
                                                  className="bg-white"
                                                  component={CustomInput}
                                                  id={`lme_rates.${lmeIndex}.percent`}
                                                  placeholder="Percentage"
                                                  name={`lme_rates.${lmeIndex}.percent`}
                                                />
                                              </td>
                                              <td className="analysis-td d-flex align-items-center">
                                                {formProps.values.lme_rates
                                                  ?.length ===
                                                  lmeIndex + 1 && (
                                                  <AddButton
                                                    onClick={() => {
                                                      lmeArrayHelper.push({
                                                        product_name: "",
                                                        percent: "",
                                                      });
                                                    }}
                                                  />
                                                )}
                                                {formProps.values.lme_rates
                                                  ?.length > 1 && (
                                                  <DeleteButton
                                                    deleteFunction={() =>
                                                      lmeArrayHelper.remove(
                                                        lmeIndex
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
                      </Row>
                    </>
                  )}
                </Col>
              </Row>

              <Col md={12} className="p-0">
                <Label>Advance Details</Label>
                <FieldArray
                  name="saleContractDetails"
                  render={(arrayHelpers) => (
                    <div className="">
                      {formProps.values.saleContractDetails.map(
                        (detail, index) => {
                          return (
                            <Card
                              className="address-container mb-3"
                              key={`${index}`}
                            >
                              <div className="address-line">
                                <Row className="form-group d-flex align-items-end">
                                  <Col md={4}>
                                    <Label>Date *</Label>
                                    <CustomTextField
                                      type="date"
                                      name={`saleContractDetails.${index}.date`}
                                      formProps={formProps}
                                      value={
                                        formProps?.values.saleContractDetails[
                                          index
                                        ].date
                                      }
                                    />
                                  </Col>

                                  <Col md={4}>
                                    <CustomTextField
                                      name={`saleContractDetails.${index}.amount`}
                                      formProps={formProps}
                                      label="Amount"
                                      value={
                                        formProps?.values.saleContractDetails[
                                          index
                                        ].amount
                                      }
                                    />
                                  </Col>

                                  <Col md={4}>
                                    <CustomSelectField
                                      name={`saleContractDetails.${index}.amount_type`}
                                      disabled
                                      label="Amount Type"
                                      formProps={formProps}
                                      options={[
                                        { name: "USD", value: "USD" },
                                        { name: "%", value: "%" },
                                      ]}
                                      value={
                                        formProps?.values.saleContractDetails[
                                          index
                                        ].amount_type
                                      }
                                    />
                                  </Col>
                                </Row>
                                <Row className="form-group d-flex align-items-end">
                                  <Col md={4}>
                                    <CustomTextField
                                      name={`saleContractDetails.${index}.pending`}
                                      formProps={formProps}
                                      label="Pending Amount"
                                      disabled
                                      value={
                                        formProps?.values.saleContractDetails[
                                          index
                                        ].pending
                                      }
                                    />
                                  </Col>

                                  <Col md={4}>
                                    <CustomTextField
                                      name={`saleContractDetails.${index}.remark`}
                                      formProps={formProps}
                                      label="Remark"
                                      value={
                                        formProps?.values.saleContractDetails[
                                          index
                                        ].remark
                                      }
                                    />
                                  </Col>
                                  <Col md={4}>
                                    <CustomSelectField
                                      name={`saleContractDetails.${index}.pending_type`}
                                      disabled
                                      label="Pending Amount Type"
                                      formProps={formProps}
                                      options={[
                                        { name: "USD", value: "USD" },
                                        { name: "%", value: "%" },
                                      ]}
                                      value={
                                        formProps?.values.saleContractDetails[
                                          index
                                        ].pending_type
                                      }
                                    />
                                  </Col>
                                </Row>
                              </div>

                              <CardFooter className="d-flex justify-content-end align-items-center p-2 pb-0">
                                {formProps.values.saleContractDetails.filter(
                                  (detail) => detail.remark !== -1
                                )?.length ===
                                  index + 1 && (
                                  <AddButton
                                    onClick={() => {
                                      arrayHelpers.push({
                                        date: "",
                                        amount: 0,
                                        amount_type: "USD",
                                        pending: "",
                                        remark: "",
                                        pending_type: "USD",
                                      });
                                    }}
                                  />
                                )}

                                {formProps.values.saleContractDetails?.filter(
                                  (detail) => detail.remark !== -1
                                )?.length > 1 && (
                                  <DeleteButton
                                    deleteFunction={() => {
                                      arrayHelpers.remove(index);
                                      formProps.values.deleteSaleContractDetails.push(
                                        detail.id
                                      );
                                    }}
                                  />
                                )}
                              </CardFooter>
                            </Card>
                          );
                        }
                      )}
                    </div>
                  )}
                />
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
      <CardFooter>
        {props.importSalesContract.isUpdateLoading && <LinerLoader />}
      </CardFooter>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    import: state.entities.importer.import,
    login: state.login,
    client: state.entities.client.client,
    quantityUnit: state.entities.master.quantityUnit.quantityUnit,
    importSalesContract: state.entities.importer.importSalesContract,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuantityUnitGetData: (data) =>
      dispatch(actions.quantityUnitGetData(data)),
    importSalesContractGetData: (data) =>
      dispatch(actions.importSalesContractGetData(data)),
    deleteImportSalesContract: (id, data) =>
      dispatch(actions.deleteImportSalesContract(id, data)),
    postImportSalesContractData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postImportSalesContractData(data, user, toggle, setSubmitting)
      ),
    updateImportSalesContractData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateImportSalesContractData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportSalesContracts);
