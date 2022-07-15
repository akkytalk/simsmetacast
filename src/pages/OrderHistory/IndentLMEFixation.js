/* eslint-disable eqeqeq */
import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  InputGroup,
  Label,
  Row,
  Table,
} from "reactstrap";
import LinerLoader from "components/Loaders/LinerLoader";

import * as actions from "../../redux/creators";
import * as Yup from "yup";
import "../../css/main.css";
import { FieldArray, Form, Formik } from "formik";
import MenuButton from "components/MenuButton/MenuButton";

const options = [
  { name: "Edit Exports", page: "edit-purchase-indents" },
  { name: "Create/Edit Sales Indents", page: "edit-create-sales-indents" },
  { name: "Add Sales Contract", page: "add-sales-contract" },
  { name: "Add Advance Details", page: "add-advance-details" },
  { name: "Add Loading Details", page: "add-loading-details" },
  // { name: "LME Fixation", page: "lme-fixation" },
  { name: "Manage Files", page: "manages-files" },
  { name: "User History", page: "new-order-history" },
];

function IndentLMEFixation(props) {
  const { id } = useParams();

  const purchaseSalesIndentData = [];
  // props.purchaseSalesIndent.purchaseSalesIndent.filter(
  //   (sale) => sale.id == id
  // );
  let data = {
    token: props.login?.login?.token,
    id: purchaseSalesIndentData[0]?.bpo?.id,
  };

  useEffect(() => {
    props.loadingDetailGetData(data);
    props.lmeOrderGetData(data);
  }, []);

  const lmeFixationData = props.lmeOrder?.lmeOrder?.filter(
    (lme) => lme.purchase_sale_indent_id == purchaseSalesIndentData[0]?.id
  );

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in LME Fixation:", values);
    setSubmitting(true);

    // let user = {
    //   // details: values.lme_fixation[0],
    //   date: values.lme_fixation[0]?.date,
    //   final_price: values.lme_fixation[0]?.final_price,
    //   container_no: values.lme_fixation[0]?.container_no,
    //   container_detail_id: values.lme_fixation[0]?.container_detail_id,
    //   purchase_sale_indent_id: values.lme_fixation[0]?.purchase_sale_indent_id,
    //   commodity: values.lme_fixation[0]?.commodity,
    //   additional: values.lme_fixation[0]?.additional,
    // };

    values.lme_fixation?.map((lme) => {
      if (lme.id) {
        let data2 = {
          token: props.login?.login?.token,
          id: lme.id,
        };
        let user = {
          id: lme.id,
          date: lme.date,
          final_price: lme.final_price,
          // container_no: lme.container_no,
          container_detail_id: lme.container_detail_id,
          purchase_sale_indent_id: lme.purchase_sale_indent_id,
          commodity: lme.commodity,
          additional: lme.additional,
        };
        return props.updateLmeOrderData(data2, user, setSubmitting);
      } else {
        let user = {
          date: lme.date,
          final_price: lme.final_price,
          // container_no: lme.container_no,
          container_detail_id: lme.container_detail_id,
          purchase_sale_indent_id: lme.purchase_sale_indent_id,
          commodity: lme.commodity,
          additional: lme.additional,
        };
        console.log("else Data of LME Fixation:", user);
        return props.onPostLmeOrderData(data, user, setSubmitting);
      }
    });

    // console.log("Data of LME Fixation:", user);
    // props.onPostLmeOrderData(data, user, setSubmitting);

    return;
  };

  // console.log("lmeOrder", props.lmeOrder);
  console.log("lmeFixationData", lmeFixationData);
  return (
    <>
      <Card className="m-4">
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
                  <th scope="col">Contract Number</th>
                  <th scope="col">Quality</th>
                  <th scope="col">Container</th>
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Customer Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{purchaseSalesIndentData[0]?.bpo?.contract_number}</td>
                  <td>{purchaseSalesIndentData[0]?.bpo?.quality}</td>
                  <td>{purchaseSalesIndentData[0]?.bpo?.quality}</td>

                  <td>
                    {purchaseSalesIndentData[0]?.bpo?.supplier?.company_name}
                  </td>
                  <td>
                    {purchaseSalesIndentData[0]?.bpo?.customer?.company_name}
                  </td>
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
              additional:
                purchaseSalesIndentData[0]?.commodity_details[0]
                  ?.indent_details[0]?.price?.amount_unit,
              commodity: purchaseSalesIndentData[0]?.commodities,
              container: 1,
              lme_fixation:
                lmeFixationData?.length > 0
                  ? lmeFixationData
                  : [
                      {
                        date: "",
                        final_price: "",
                        container_no: "",
                        container_detail_id: "",
                        purchase_sale_indent_id: purchaseSalesIndentData[0]?.id,
                        price_id: "",
                        // commodity: purchaseSalesIndentData[0]?.commodities,
                        // additional:
                        //   purchaseSalesIndentData[0]?.commodity_details[0]
                        //     ?.indent_details[0]?.price?.amount_unit,
                        lme_array:
                          purchaseSalesIndentData[0]?.commodity_details[0]
                            ?.indent_details[0]?.price?.price_analysis.length >
                          0
                            ? purchaseSalesIndentData[0]?.commodity_details[0]
                                ?.indent_details[0]?.price?.price_analysis
                            : [
                                {
                                  rate: "",
                                },
                              ],
                      },
                    ],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // contract_number: Yup.string().required("required"),
            })}
          >
            {(formProps) => (
              <Form>
                {console.log("formProps values", formProps?.values)}
                <div className="d-flex justify-content-end">
                  <Label for="size">
                    Pending LME Fixation:{" "}
                    {
                      purchaseSalesIndentData[0]?.commodity_details[0]
                        ?.container_no
                    }{" "}
                    FCL
                  </Label>
                </div>

                <Col md={12} className="p-0">
                  <FieldArray
                    name="lme_fixation"
                    render={(arrayHelpers) => (
                      <div className="">
                        {formProps.values.lme_fixation?.map((detail, index) => {
                          if (
                            detail.lme_array?.length == 0 ||
                            detail.lme_array == null
                          ) {
                            detail.lme_array = [
                              {
                                rate: "",
                              },
                            ];
                          }
                          if (detail?.lme_array[0]?.percent) {
                            detail.final_price = detail?.lme_array
                              ?.filter((l) => l.price)
                              .reduce((a, v) => (a = a + v.price), 0);
                          }

                          // detail.container_no =
                          //   props.loadingDetail?.filter(
                          //     (l) =>
                          //       l.order_id == purchaseSalesIndentData[0].bpo?.id
                          //   ).length > 0 &&
                          //   props.loadingDetail
                          //     ?.filter(
                          //       (l) =>
                          //         l.order_id ==
                          //         purchaseSalesIndentData[0].bpo?.id
                          //     )
                          //     .map((l, i) =>
                          //       l.container_details?.map((c, cIndex) => {
                          //         if (c.id == detail.container_detail_id)
                          //           return c.container_no;
                          //       })
                          //     )

                          return (
                            <Card className="address-container mb-4">
                              <div className="address-line">
                                <Row className="form-group d-flex align-items-end">
                                  <Col md={4}>
                                    <Label>Date</Label>
                                    <TextField
                                      fullWidth
                                      variant="standard"
                                      type="date"
                                      id={`lme_fixation.${index}.date`}
                                      name={`lme_fixation.${index}.date`}
                                      value={
                                        formProps.values.lme_fixation[index]
                                          .date
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>

                                  <Col md={4}>
                                    <TextField
                                      fullWidth
                                      variant="standard"
                                      id="container"
                                      label="Container"
                                      name="container"
                                      value={formProps.values.container}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>

                                  <Col md={4}>
                                    <TextField
                                      fullWidth
                                      disabled
                                      variant="standard"
                                      id={`lme_fixation.${index}.final_price`}
                                      label="Final Price"
                                      name={`lme_fixation.${index}.final_price`}
                                      value={
                                        formProps.values.lme_fixation[index]
                                          .final_price
                                      }
                                      onChange={formProps.handleChange}
                                    ></TextField>
                                  </Col>
                                </Row>
                                <Card className="p-4 bg-lightgray">
                                  <Row className="form-group">
                                    <Col md={4}>
                                      <TextField
                                        fullWidth
                                        variant="standard"
                                        select
                                        id={`lme_fixation.${index}.container_detail_id`}
                                        label="Container Number"
                                        name={`lme_fixation.${index}.container_detail_id`}
                                        value={
                                          formProps.values.lme_fixation[index]
                                            .container_detail_id
                                        }
                                        onChange={formProps.handleChange}
                                      >
                                        {props.loadingDetail?.filter(
                                          (l) =>
                                            l.order_id ==
                                            purchaseSalesIndentData[0].bpo?.id
                                        ).length > 0 &&
                                          props.loadingDetail
                                            ?.filter(
                                              (l) =>
                                                l.order_id ==
                                                purchaseSalesIndentData[0].bpo
                                                  ?.id
                                            )
                                            .map((l, i) =>
                                              l.container_details?.map(
                                                (c, cIndex) => {
                                                  return (
                                                    <MenuItem
                                                      value={c.id}
                                                      key={c.id}
                                                    >
                                                      {c.container_no}
                                                    </MenuItem>
                                                  );
                                                }
                                              )
                                            )}
                                      </TextField>
                                    </Col>
                                  </Row>
                                  <Row className="form-group">
                                    <Col md={2}>
                                      <TextField
                                        fullWidth
                                        disabled
                                        variant="standard"
                                        id="commodity"
                                        label="Commodity"
                                        name="commodity"
                                        value={formProps.values.commodity}
                                        onChange={formProps.handleChange}
                                      />
                                    </Col>
                                    <Col
                                      md={
                                        formProps.values.lme_fixation[index]
                                          ?.lme_array?.length * 2
                                      }
                                    >
                                      <FieldArray
                                        name={`lme_fixation.${index}.lme_array`}
                                        render={(lmeArrayHelper) => (
                                          <Row className="form-group">
                                            {(detail.lme_array?.length == 0 ||
                                              detail.lme_array) &&
                                              formProps.values.lme_fixation[
                                                index
                                              ]?.lme_array?.map(
                                                (lme, lmeIndex) => {
                                                  return (
                                                    <>
                                                      <Col
                                                        md={
                                                          formProps.values
                                                            .lme_fixation[index]
                                                            .lme_array?.[
                                                            lmeIndex
                                                          ]?.commodity_id
                                                            ? 6
                                                            : 12
                                                        }
                                                      >
                                                        <TextField
                                                          fullWidth
                                                          variant="standard"
                                                          id={`lme_fixation.${index}.lme_array.${lmeIndex}.rate`}
                                                          label={`lme ${
                                                            purchaseSalesIndentData[0]
                                                              ?.commodity_details[0]
                                                              ?.indent_details[0]
                                                              ?.price?.percent
                                                          }% ${
                                                            formProps.values
                                                              .lme_fixation[
                                                              index
                                                            ].lme_array[
                                                              lmeIndex
                                                            ]?.product_name ??
                                                            ""
                                                          } ${
                                                            formProps.values
                                                              .lme_fixation[
                                                              index
                                                            ].lme_array[
                                                              lmeIndex
                                                            ]?.percent
                                                              ? formProps.values
                                                                  .lme_fixation[
                                                                  index
                                                                ].lme_array[
                                                                  lmeIndex
                                                                ]?.percent + "%"
                                                              : ""
                                                          }`}
                                                          name={`lme_fixation.${index}.lme_array.${lmeIndex}.rate`}
                                                          value={
                                                            formProps.values
                                                              .lme_fixation[
                                                              index
                                                            ].lme_array[
                                                              lmeIndex
                                                            ]?.rate
                                                          }
                                                          onChange={(event) => {
                                                            formProps.setFieldValue(
                                                              `lme_fixation.${index}.lme_array.${lmeIndex}.rate`,
                                                              event.target.value
                                                            );

                                                            if (
                                                              formProps.values
                                                                .lme_fixation[
                                                                index
                                                              ].lme_array[
                                                                lmeIndex
                                                              ]?.percent
                                                            ) {
                                                              formProps.setFieldValue(
                                                                `lme_fixation.${index}.lme_array.${lmeIndex}.price`,
                                                                event.target
                                                                  .value *
                                                                  (Number(
                                                                    purchaseSalesIndentData[0]
                                                                      ?.commodity_details[0]
                                                                      ?.indent_details[0]
                                                                      ?.price
                                                                      ?.percent
                                                                  ) /
                                                                    100) *
                                                                  (Number(
                                                                    formProps
                                                                      .values
                                                                      .lme_fixation[
                                                                      index
                                                                    ].lme_array[
                                                                      lmeIndex
                                                                    ]?.percent
                                                                  ) /
                                                                    100)
                                                              );
                                                            } else {
                                                              formProps.setFieldValue(
                                                                `lme_fixation.${index}.final_price`,
                                                                event.target
                                                                  .value *
                                                                  (Number(
                                                                    purchaseSalesIndentData[0]
                                                                      ?.commodity_details[0]
                                                                      ?.indent_details[0]
                                                                      ?.price
                                                                      ?.percent
                                                                  ) /
                                                                    100)
                                                              );
                                                            }
                                                          }}
                                                        />
                                                        {
                                                          formProps.values
                                                            .lme_fixation[index]
                                                            .final_price
                                                        }
                                                      </Col>
                                                    </>
                                                  );
                                                }
                                              )}
                                          </Row>
                                        )}
                                      />
                                    </Col>
                                    <Col md={2}>
                                      <TextField
                                        fullWidth
                                        select
                                        disabled
                                        variant="standard"
                                        id="additional"
                                        label="Additional"
                                        name="additional"
                                        value={formProps.values.additional}
                                        onChange={formProps.handleChange}
                                      >
                                        <MenuItem value="USD">USD</MenuItem>
                                        <MenuItem value="%">Euro</MenuItem>
                                      </TextField>
                                    </Col>
                                    <Col md={2}>
                                      <TextField
                                        fullWidth
                                        variant="standard"
                                        disabled
                                        id={`lme_fixation.${index}.final_price`}
                                        label="Total Price"
                                        name={`lme_fixation.${index}.final_price`}
                                        value={
                                          formProps.values.lme_fixation[index]
                                            .final_price
                                        }
                                        onChange={formProps.handleChange}
                                      ></TextField>
                                    </Col>
                                  </Row>
                                </Card>
                              </div>

                              <CardFooter className="d-flex justify-content-end align-items-center p-2 pb-0">
                                {formProps.values.lme_fixation.length ===
                                  index + 1 && (
                                  <Button
                                    className="btn-success p-1 "
                                    onClick={() => {
                                      arrayHelpers.push({
                                        date: "",
                                        final_price: "",
                                        container_no: "",
                                        container_detail_id: "",
                                        purchase_sale_indent_id:
                                          purchaseSalesIndentData[0]?.id,
                                        price_id: "",
                                        // commodity: purchaseSalesIndentData[0]?.commodities,
                                        // additional:
                                        //   purchaseSalesIndentData[0]?.commodity_details[0]
                                        //     ?.indent_details[0]?.price?.amount_unit,
                                        lme_array:
                                          purchaseSalesIndentData[0]
                                            ?.commodity_details[0]
                                            ?.indent_details[0]?.price
                                            ?.price_analysis.length > 0
                                            ? purchaseSalesIndentData[0]
                                                ?.commodity_details[0]
                                                ?.indent_details[0]?.price
                                                ?.price_analysis
                                            : [
                                                {
                                                  rate: "",
                                                },
                                              ],
                                      });
                                    }}
                                  >
                                    <i className="fa fa-plus" />
                                  </Button>
                                )}

                                {formProps.values.lme_fixation?.length > 1 && (
                                  <Button
                                    color="danger p-1"
                                    size="sm"
                                    onClick={
                                      () =>
                                        formProps.setFieldValue(
                                          `lme_fixation.${index}.amount`,
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

                <Row style={{ justifyContent: "center" }}>
                  <Col md={2}>
                    <Button type="reset" color="danger" block>
                      <b>Reset</b>
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button type="reset" color="success" block>
                      <i className="fa fa-print" />
                      <b>Print</b>
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
          {props.lmeOrder?.isPostLoading && <LinerLoader />}
          {props.lmeOrder?.isUpdateLoading && <LinerLoader />}
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
    lmeOrder: state.lmeOrder,
    containerSize: state.containerSize.containerSize,
    loadingDetail: state.loadingDetail.loadingDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingDetailGetData: (data) =>
      dispatch(actions.loadingDetailGetData(data)),
    onPurchaseSalesIndentGetData: (data) =>
      dispatch(actions.purchaseSalesIndentGetData(data)),
    lmeOrderGetData: (data) => dispatch(actions.lmeOrderGetData(data)),
    onDeleteLmeOrder: (id, data) => dispatch(actions.deleteLmeOrder(id, data)),
    onPostLmeOrderData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postLmeOrderData(data, user, toggle, setSubmitting)),
    updateLmeOrderData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateLmeOrderData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(IndentLMEFixation);
