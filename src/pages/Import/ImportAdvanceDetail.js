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
  Table,
} from "reactstrap";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { FieldArray, Form, Formik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import "../../css/main.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/creators";
import LinerLoader from "components/Loaders/LinerLoader";
import WordDocAdvanceDetail from "../wordDocuments/WordDocAdvanceDetail";
import MenuButton from "components/MenuButton/MenuButton";
import AddButton from "./../../Helpers/AddButton";
import DeleteButton from "Helpers/DeleteButton";
import { arrayFilterByKey } from "Helpers/helper";
import { isEmpty } from "Helpers/helper";

function ImportAdvanceDetail(props) {
  const { id } = useParams();

  const currentImportSalesContract = useMemo(
    () =>
      arrayFilterByKey(
        props.importSalesContract.importSalesContract,
        "id",
        id
      )[0],
    [props.importSalesContract.importSalesContract, id]
  );

  let data = {
    token: props.login?.login?.token,
    id: currentImportSalesContract?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const options = [
    { name: "Add Sales Contract", page: "import/add-sales-contract" },
    { name: "Add Loading Details", page: "import/add-loading-details" },
    { name: "Bill of Entry", page: "import/bill" },
    { name: "Quality Match", page: "import/quality-match" },
  ];

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
    <>
      <Card className="m-4 p-2">
        <div className="p-1 d-flex justify-content-end align-items-center">
          <span className="font-weight-bold mr-2">Navigation </span>
          <i className="ni ni-bold-right" />
          <MenuButton index={id} options={options} />
        </div>
        <CardBody>
          <Label>Brief Summary</Label>
          <Col md={12} style={{ overflow: "scroll" }}>
            <Table className="table table-sm m-2">
              <thead>
                <tr>
                  <th scope="col">Supplier</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Advance</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </Col>
          <Col md={12} style={{ overflow: "scroll" }}>
            <Table className="table m-2">
              <thead>
                <tr>
                  <th scope="col">Commodity</th>
                  <th scope="col">Analysis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AL</td>
                  <td>40%</td>
                </tr>
                <tr>
                  <td>CU</td>
                  <td>10%</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </CardBody>
      </Card>
      <Card className="m-4">
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
              pending_amount: "",
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
              // saleContractDetails: Yup.array().of(
              //   Yup.object().shape({
              //     date: Yup.string().required("Required"),
              //     amount: Yup.number().required("Required"),
              //   })
              // ),
            })}
          >
            {(formProps) => {
              return (
                <Form>
                  <Label for="size">Sales Contract Number</Label>
                  <Row className="form-group pt-4 d-flex align-items-end">
                    <Col md={3}>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          id="contract_no"
                          disabled
                          label="Sales Contract Number"
                          name="contract_no"
                          value={formProps.values.contract_no}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.contract_no &&
                            Boolean(formProps.errors.contract_no)
                          }
                          helperText={
                            formProps.touched.contract_no &&
                            formProps.errors.contract_no
                          }
                        />
                      </InputGroup>
                    </Col>
                    <Col md={3}>
                      <Label for="size">Sales Contract Date</Label>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          type="date"
                          disabled
                          id="contract_date"
                          name="contract_date"
                          value={formProps.values.contract_date}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.contract_date &&
                            Boolean(formProps.errors.contract_date)
                          }
                          helperText={
                            formProps.touched.contract_date &&
                            formProps.errors.contract_date
                          }
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Col md={12} className="p-0">
                    <FieldArray
                      name="saleContractDetails"
                      render={(arrayHelpers) => (
                        <div className="">
                          {formProps.values.saleContractDetails?.map(
                            (detail, index) => {
                              // detail.pending = formProps.values.pending_amount;

                              var pending = detail.pending ?? 0;
                              var amount = detail.amount ?? 0;

                              console.log("pending", pending);

                              return (
                                <Card className="address-container mb-4">
                                  <div className="address-line">
                                    <Row className="form-group d-flex align-items-end">
                                      <Col md={4}>
                                        <Label>Date *</Label>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          type="date"
                                          id={`saleContractDetails.${index}.date`}
                                          name={`saleContractDetails.${index}.date`}
                                          value={
                                            formProps.values
                                              .saleContractDetails[index].date
                                          }
                                          onChange={formProps.handleChange}
                                          error={
                                            formProps.touched[
                                              `saleContractDetails.${index}.date`
                                            ] &&
                                            Boolean(
                                              formProps.errors[
                                                `saleContractDetails.${index}.date`
                                              ]
                                            )
                                          }
                                          helperText={
                                            formProps.touched[
                                              `saleContractDetails.${index}.date`
                                            ] &&
                                            formProps.errors[
                                              `saleContractDetails.${index}.date`
                                            ]
                                          }
                                        />
                                      </Col>

                                      <Col md={4}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          id={`saleContractDetails.${index}.amount`}
                                          label="Advance Amount *"
                                          name={`saleContractDetails.${index}.amount`}
                                          value={
                                            formProps.values
                                              .saleContractDetails[index].amount
                                          }
                                          onChange={(e, newValue) => {
                                            formProps.setFieldValue(
                                              `saleContractDetails.${index}.amount`,
                                              e.target.value
                                            );
                                          }}
                                          error={
                                            formProps.touched[
                                              `saleContractDetails.${index}.amount`
                                            ] &&
                                            Boolean(
                                              formProps.errors[
                                                `saleContractDetails.${index}.amount`
                                              ]
                                            )
                                          }
                                          helperText={
                                            formProps.touched[
                                              `saleContractDetails.${index}.amount`
                                            ] &&
                                            formProps.errors[
                                              `saleContractDetails.${index}.amount`
                                            ]
                                          }
                                        />
                                      </Col>

                                      <Col md={4}>
                                        <TextField
                                          fullWidth
                                          select
                                          variant="standard"
                                          id={`saleContractDetails.${index}.amount_type`}
                                          label="Advance Amount Type"
                                          name={`saleContractDetails.${index}.amount_type`}
                                          disabled={true}
                                          value={
                                            formProps.values
                                              .saleContractDetails[index]
                                              .amount_type
                                          }
                                          onChange={formProps.handleChange}
                                          SelectProps={{
                                            multiple: false,
                                            value: [],
                                          }}
                                        >
                                          <MenuItem value="USD">USD</MenuItem>
                                          <MenuItem value="%">%</MenuItem>
                                        </TextField>
                                      </Col>
                                    </Row>
                                    <Row className="form-group d-flex align-items-end">
                                      <Col md={4}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          id={`saleContractDetails.${index}.pending`}
                                          label="Pending Amount"
                                          name={`saleContractDetails.${index}.pending`}
                                          disabled
                                          value={
                                            formProps.values
                                              .saleContractDetails[index]
                                              .pending
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>

                                      <Col md={4}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          id={`saleContractDetails.${index}.remark`}
                                          label="Remark"
                                          name={`saleContractDetails.${index}.remark`}
                                          value={
                                            formProps.values
                                              .saleContractDetails[index].remark
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={4}>
                                        <TextField
                                          fullWidth
                                          select
                                          variant="standard"
                                          id={`saleContractDetails.${index}.pending_type`}
                                          label="Pending Amount Type"
                                          disabled={true}
                                          name={`saleContractDetails.${index}.pending_type`}
                                          value={
                                            formProps.values
                                              .saleContractDetails[index]
                                              .pending_type
                                          }
                                          onChange={formProps.handleChange}
                                        >
                                          <MenuItem value="USD">USD</MenuItem>
                                          <MenuItem value="%">%</MenuItem>
                                        </TextField>
                                      </Col>
                                    </Row>
                                  </div>

                                  <CardFooter className="d-flex justify-content-end align-items-center p-2 pb-0">
                                    {formProps.values.saleContractDetails
                                      .length ===
                                      index + 1 && (
                                      <AddButton
                                        onClick={() => {
                                          arrayHelpers.push({
                                            order_id: "",
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

                                    {formProps.values.saleContractDetails
                                      ?.length > 1 && (
                                      <DeleteButton
                                        deleteFunction={() => {
                                          arrayHelpers.remove(index);
                                          formProps.values.deleteSaleContractDetails.push(
                                            detail
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

                  <Row style={{ justifyContent: "center" }}>
                    <Col md={2}>
                      <Button type="reset" color="danger" block>
                        <b>Reset</b>
                      </Button>
                    </Col>
                    <Col md={2}>
                      <WordDocAdvanceDetail print />
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
              );
            }}
          </Formik>
        </CardBody>
        <CardFooter>
          {props.importSalesContract.isUpdateLoading && <LinerLoader />}
        </CardFooter>
      </Card>
    </>
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
    updateImportSalesContractData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateImportSalesContractData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportAdvanceDetail);
