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
  Table,
} from "reactstrap";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { FieldArray, Form, Formik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import "../../css/main.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux/creators";
import LinerLoader from "components/Loaders/LinerLoader";
import WordDocAdvanceDetail from "../wordDocuments/WordDocAdvanceDetail";
import MenuButton from "components/MenuButton/MenuButton";

const options = [
  { name: "Edit Exports", page: "edit-purchase-indents" },
  { name: "Create/Edit Sales Indents", page: "edit-create-sales-indents" },
  { name: "Add Sales Contract", page: "add-sales-contract" },
  // { name: "Add Advance Details", page: "add-advance-details" },
  { name: "Add Loading Details", page: "add-loading-details" },
  { name: "LME Fixation", page: "lme-fixation" },
  { name: "Manage Files", page: "manages-files" },
  { name: "User History", page: "new-order-history" },
];

function AddAdvanceDetail(props) {
  const { id } = useParams();

  const purchaseSalesIndentData = [];
  // props.purchaseSalesIndent.purchaseSalesIndent.filter(
  //   (sale) => sale.id == id
  // );
  let data = {
    token: props.login?.login?.token,
    id: purchaseSalesIndentData[0]?.bpo?.id,
  };

  // useEffect(() => {
  //   props.onPurchaseSalesIndentGetData(data);
  // }, []);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const price_details =
    purchaseSalesIndentData[0]?.commodity_details?.filter(
      (c) => c.indent_details
    ).length > 0
      ? purchaseSalesIndentData[0]?.commodity_details?.filter(
          (c) => c.indent_details
        )
      : [];

  const total_price =
    price_details?.length > 0
      ? price_details?.reduce((acc, curr) => {
          return (
            acc +
            curr.indent_details?.reduce((ac, cur) => {
              return (
                ac + Number(Number(cur.price?.amount) * Number(cur?.quantity))
              );
            }, 0)
          );
        }, 0)
      : 0;

  const advanceAmountPaid =
    purchaseSalesIndentData[0]?.payment_advance_type == "%"
      ? (Number(total_price) / 100) *
        Number(purchaseSalesIndentData[0]?.payment_advance)
      : Number(purchaseSalesIndentData[0]?.payment_advance);

  // console.log("total_price", total_price);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Advance Detail:", values);
    setSubmitting(true);

    let user = {
      details: values.contract_details,
    };

    console.log("Data of Advance Detail:", user);
    props.onPostAdvanceDetailData(data, user, toggle, setSubmitting);
    return;
  };
  console.log(`purchaseSalesIndentData`, purchaseSalesIndentData);
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
              <tbody>
                <tr>
                  <td>
                    {purchaseSalesIndentData[0]?.bpo?.supplier?.company_name}
                  </td>
                  <td>
                    {purchaseSalesIndentData[0]?.bpo?.customer?.company_name}
                  </td>
                  <td>
                    {purchaseSalesIndentData[0]?.payment_advance_type == "%"
                      ? (
                          (Number(total_price) / 100) *
                          Number(purchaseSalesIndentData[0]?.payment_advance)
                        ).toFixed(2)
                      : Number(
                          purchaseSalesIndentData[0]?.payment_advance
                        ).toFixed(2)}{" "}
                  </td>
                  <td>{total_price}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={12} style={{ overflow: "scroll" }}>
            <Table className="table m-2">
              <thead>
                <tr>
                  <th scope="col">Commodity</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {price_details?.map((c) =>
                  c.indent_details?.map((i) => {
                    return (
                      <tr>
                        <td>{i.commodity?.name}</td>
                        <td>{i.quantity}</td>
                        <td>{i.price?.amount}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Col>
        </CardBody>
      </Card>
      <Card className="m-4">
        <CardBody>
          <Formik
            initialValues={{
              contract_number: purchaseSalesIndentData[0]?.bpo?.contract_number,
              contract_date: purchaseSalesIndentData[0]?.bpo?.contract_date,
              pending_amount: "",
              contract_details:
                purchaseSalesIndentData[0]?.bpo?.contract_details?.length > 0
                  ? purchaseSalesIndentData[0]?.bpo?.contract_details
                  : [
                      {
                        order_id: purchaseSalesIndentData[0]?.bpo?.id,
                        date: "",
                        amount: 0,
                        amount_type: "USD",
                        pending: Number(advanceAmountPaid) ?? 0,
                        remark: "",
                        pending_type: "USD",
                      },
                    ],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // contract_details: Yup.array().of(
              //   Yup.object().shape({
              //     date: Yup.string().required("Required"),
              //     amount: Yup.number().required("Required"),
              //   })
              // ),
            })}
          >
            {(formProps) => {
              // formProps.values.pending_amount =
              //   advanceAmountPaid -
              //   Number(
              //     formProps?.values?.contract_details
              //       ?.filter((l) => l.amount)
              //       .reduce((a, v) => (a = Number(a) + Number(v.amount)), 0)
              //   );

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
                          id="contract_number"
                          disabled
                          label="Sales Contract Number"
                          name="contract_number"
                          value={formProps.values.contract_number}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.contract_number &&
                            Boolean(formProps.errors.contract_number)
                          }
                          helperText={
                            formProps.touched.contract_number &&
                            formProps.errors.contract_number
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
                      name="contract_details"
                      render={(arrayHelpers) => (
                        <div className="">
                          {console.log(
                            "values",
                            formProps?.values?.contract_details
                          )}

                          {formProps.values.contract_details?.map(
                            (detail, index) => {
                              // detail.pending = formProps.values.pending_amount;

                              var pending = detail.pending ?? 0;
                              var amount = detail.amount ?? 0;

                              console.log("pending", pending);
                              formProps.values.contract_details[index].pending =
                                advanceAmountPaid -
                                Number(
                                  formProps?.values?.contract_details
                                    ?.filter((l) => l.amount)
                                    .reduce(
                                      (a, v) =>
                                        (a = Number(a) + Number(v.amount)),
                                      0
                                    )
                                );

                              // detail.pending = -detail.amount;

                              // console.log(
                              //   "detail.pending",
                              //   `${detail.pending}` - `${detail.amount}`
                              // );

                              // console.log("detail.amount", detail.amount);

                              if (detail.remark !== -1)
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
                                            id={`contract_details.${index}.date`}
                                            name={`contract_details.${index}.date`}
                                            value={
                                              formProps.values.contract_details[
                                                index
                                              ].date
                                            }
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched[
                                                `contract_details.${index}.date`
                                              ] &&
                                              Boolean(
                                                formProps.errors[
                                                  `contract_details.${index}.date`
                                                ]
                                              )
                                            }
                                            helperText={
                                              formProps.touched[
                                                `contract_details.${index}.date`
                                              ] &&
                                              formProps.errors[
                                                `contract_details.${index}.date`
                                              ]
                                            }
                                          />
                                        </Col>

                                        <Col md={4}>
                                          <TextField
                                            fullWidth
                                            variant="standard"
                                            id={`contract_details.${index}.amount`}
                                            label="Advance Amount *"
                                            name={`contract_details.${index}.amount`}
                                            value={
                                              formProps.values.contract_details[
                                                index
                                              ].amount
                                            }
                                            onChange={(e, newValue) => {
                                              formProps.setFieldValue(
                                                `contract_details.${index}.amount`,
                                                e.target.value
                                              );

                                              // formProps.setFieldValue(
                                              //   `contract_details.${index}.pending`,
                                              //   Number(detail.pending) -
                                              //     detail.amount
                                              // );
                                            }}
                                            error={
                                              formProps.touched[
                                                `contract_details.${index}.amount`
                                              ] &&
                                              Boolean(
                                                formProps.errors[
                                                  `contract_details.${index}.amount`
                                                ]
                                              )
                                            }
                                            helperText={
                                              formProps.touched[
                                                `contract_details.${index}.amount`
                                              ] &&
                                              formProps.errors[
                                                `contract_details.${index}.amount`
                                              ]
                                            }
                                          />
                                        </Col>

                                        <Col md={4}>
                                          <TextField
                                            fullWidth
                                            select
                                            variant="standard"
                                            id={`contract_details.${index}.amount_type`}
                                            label="Advance Amount Type"
                                            name={`contract_details.${index}.amount_type`}
                                            disabled
                                            value={
                                              formProps.values.contract_details[
                                                index
                                              ].amount_type
                                            }
                                            onChange={formProps.handleChange}
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
                                            id={`contract_details.${index}.pending`}
                                            label="Pending Amount"
                                            name={`contract_details.${index}.pending`}
                                            disabled
                                            value={
                                              formProps.values.contract_details[
                                                index
                                              ].pending
                                            }
                                            onChange={formProps.handleChange}
                                          />
                                        </Col>

                                        <Col md={4}>
                                          <TextField
                                            fullWidth
                                            variant="standard"
                                            id={`contract_details.${index}.remark`}
                                            label="Remark"
                                            name={`contract_details.${index}.remark`}
                                            value={
                                              formProps.values.contract_details[
                                                index
                                              ].remark
                                            }
                                            onChange={formProps.handleChange}
                                          />
                                        </Col>
                                        <Col md={4}>
                                          <TextField
                                            fullWidth
                                            select
                                            variant="standard"
                                            id={`contract_details.${index}.pending_type`}
                                            label="Pending Amount Type"
                                            disabled
                                            name={`contract_details.${index}.pending_type`}
                                            value={
                                              formProps.values.contract_details[
                                                index
                                              ].pending_type
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
                                      {formProps.values.contract_details
                                        .length ===
                                        index + 1 && (
                                        <Button
                                          className="btn-success p-1 "
                                          onClick={() => {
                                            arrayHelpers.push({
                                              order_id:
                                                purchaseSalesIndentData[0]?.bpo
                                                  ?.id,
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

                                      {formProps.values.contract_details
                                        ?.length > 1 && (
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
                      <WordDocAdvanceDetail
                        print
                        purchaseSalesIndentData={purchaseSalesIndentData[0]}
                        contract_details={formProps.values.contract_details}
                        ref_no={purchaseSalesIndentData[0]?.ref_no}
                        advance={`${advanceAmountPaid} ${formProps.values.contract_details[0]?.amount_type}`}
                        advance_date={
                          formProps.values.contract_details[
                            formProps.values.contract_details?.length - 1
                          ]?.date
                        }
                        advance_sent={`${formProps?.values?.contract_details
                          ?.filter((l) => l?.amount)
                          .reduce(
                            (a, v) => (a = Number(a) + Number(v?.amount)),
                            0
                          )} ${
                          formProps.values.contract_details[0]?.amount_type
                        }`}
                        contact_no={
                          purchaseSalesIndentData[0]?.bpo?.contract_number
                        }
                        balance_advance={`${formProps.values.contract_details[0]?.pending} ${formProps.values.contract_details[0]?.pending_type}`}
                      />
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
          {props.advanceDetail?.isPostLoading && <LinerLoader />}
        </CardFooter>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    purchaseSalesIndent: state.purchaseSalesIndent,
    login: state.login,
    purchaseOrder: state.purchaseOrder,
    advanceDetail: state.advanceDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseSalesIndentGetData: (data) =>
      dispatch(actions.purchaseSalesIndentGetData(data)),
    advanceDetailGetData: (data) =>
      dispatch(actions.advanceDetailGetData(data)),
    onDeleteAdvanceDetail: (id, data) =>
      dispatch(actions.deleteAdvanceDetail(id, data)),
    onPostAdvanceDetailData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postAdvanceDetailData(data, user, toggle, setSubmitting)
      ),
    updateAdvanceDetailData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateAdvanceDetailData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAdvanceDetail);
