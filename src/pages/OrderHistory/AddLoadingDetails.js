/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
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
  CardFooter,
  Table,
  ModalFooter,
} from "reactstrap";
import LinerLoader from "components/Loaders/LinerLoader";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { Field, FieldArray, Form, Formik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import "../../css/main.css";
import { connect } from "react-redux";
import * as actions from "../../redux/creators";
import { useParams } from "react-router-dom";
import CircularLoader from "components/Loaders/CircularLoader";
import EditLoadingDetail from "./Edit/EditLoadingDetail";
import Swal from "sweetalert2";
import DeleteButton from "Helpers/DeleteButton";
import Claims from "./Claim/Claims";
import Invoice from "./Invoice/Invoice";
import Couriers from "./Couriers/Couriers";
import WordDocLoadingDetails from "../wordDocuments/WordDocLoadingDetails";
import MenuButton from "components/MenuButton/MenuButton";

import { DateFormat } from "../../components/DateFormat/DateFormat";

const options = [
  { name: "Edit Exports", page: "edit-purchase-indents" },
  { name: "Create/Edit Sales Indents", page: "edit-create-sales-indents" },
  { name: "Add Sales Contract", page: "add-sales-contract" },
  { name: "Add Advance Details", page: "add-advance-details" },
  // { name: "Add Loading Details", page: "add-loading-details" },
  { name: "LME Fixation", page: "lme-fixation" },
  { name: "Manage Files", page: "manages-files" },
  { name: "User History", page: "new-order-history" },
];

function AddLoadingDetails(props) {
  const [minimize, setMinimize] = useState(false);

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
    // props.onPurchaseSalesIndentGetData(data);
    props.onCommodityGetData(data);
    props.onPriceUnitGetData(data);
    props.onQuantityUnitGetData(data);
    props.onContainerSizeGetData(data);
    props.onPortLoadingGetData(data);
    props.onPortDeliveryGetData(data);
    props.onPortDischargeGetData(data);
  }, []);

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

  const quantity = purchaseSalesIndentData[0]?.bpo?.quantity;

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in LoadingDetail:", values);
    setSubmitting(true);

    let user = {
      loading_date: values.loading_date,
      vessel_name: values.vessel_name,
      etd: values.etd,
      eta_at_port: values.eta_at_port,
      eta_at_icd: values.eta_at_icd,
      container_status: values.container_status,
      bi_no: values.bi_no,
      shipping_company: values.shipping_company,
      psic_number: values.psic_number,
      details: values.details,
      order_id: purchaseSalesIndentData[0]?.bpo?.id,
    };

    console.log("Data of LoadingDetail:", user);
    props.onPostLoadingDetailData(data, user, toggle, setSubmitting);
    return;
  };

  console.log(`purchaseSalesIndentData`, purchaseSalesIndentData);

  return (
    <>
      <div className="p-1 d-flex justify-content-end align-items-center">
        <span className="font-weight-bold mr-2">Navigation </span>
        <i className="ni ni-bold-right" />
        <MenuButton index={id} options={options} />
      </div>
      <Card className="m-2 p-1">
        <CardHeader>
          <div className="d-flex justify-content-between">
            <Label>Brief Summary</Label>

            <Button
              className="btn-success p-2 mr-3"
              onClick={() => {
                toggle();
              }}
            >
              <i className="fa fa-plus text-white mr-2" />
              Add Loding Details
            </Button>
          </div>

          <Modal className="modal-xl" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} className="d-flex align-items-center">
              Add Loading Details
            </ModalHeader>

            <ModalBody className="">
              <Formik
                initialValues={{
                  loading_date: "",
                  vessel_name: "",
                  etd: "",
                  eta_at_port: "",
                  eta_at_icd: "",
                  container_status: "",
                  bi_no: "",
                  shipping_company: "",
                  psic_number: "",

                  details: [
                    {
                      container_no: "",
                      order_id: purchaseSalesIndentData[0]?.bpo?.id,
                      seal_no: "",
                      commodity_id:
                        purchaseSalesIndentData[0]?.commodity_details[0]
                          ?.indent_details[0]?.commodity_id ?? "",
                      quantity: "",
                      price:
                        purchaseSalesIndentData[0]?.commodity_details[0]
                          ?.indent_details[0]?.price?.is_lme == 0
                          ? purchaseSalesIndentData[0]?.commodity_details[0]
                              ?.indent_details[0]?.price?.amount
                          : purchaseSalesIndentData[0]?.commodity_details[0]
                              ?.indent_details[0]?.price?.provisional_price,
                      commodity: [
                        {
                          commodity:
                            purchaseSalesIndentData[0]?.commodity_details[0]
                              ?.indent_details[0]?.commodity_id ?? "",
                          quantity: "",
                          quantity_unit:
                            purchaseSalesIndentData[0]?.commodity_details[0]
                              ?.indent_details[0]?.quantity_unit,
                          price:
                            purchaseSalesIndentData[0]?.commodity_details[0]
                              ?.indent_details[0]?.price?.is_lme == 0
                              ? purchaseSalesIndentData[0]?.commodity_details[0]
                                  ?.indent_details[0]?.price?.amount
                              : purchaseSalesIndentData[0]?.commodity_details[0]
                                  ?.indent_details[0]?.price?.provisional_price,
                          price_unit:
                            purchaseSalesIndentData[0]?.commodity_details[0]
                              ?.indent_details[0]?.price?.amount_unit,
                        },
                      ],
                    },
                  ],
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  loading_date: Yup.string().required("required"),
                  vessel_name: Yup.string().required("required"),
                })}
              >
                {(formProps) => {
                  return (
                    <Form>
                      {console.log(`formProps.values`, formProps.values)}
                      <Row className="form-group pt-4 d-flex align-items-end">
                        <Col md={4}>
                          <Label for="size">Loading Date *</Label>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              type="date"
                              id="loading_date"
                              name="loading_date"
                              value={formProps.values.loading_date}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.loading_date &&
                                Boolean(formProps.errors.loading_date)
                              }
                              helperText={
                                formProps.touched.loading_date &&
                                formProps.errors.loading_date
                              }
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Col md={12} className="p-0">
                        <FieldArray
                          name="details"
                          render={(arrayHelpers) => (
                            <div className="">
                              {console.log(
                                "values",
                                formProps?.values?.details
                              )}

                              {formProps.values.details?.map(
                                (detail, index) => {
                                  return (
                                    <Card className="address-container mb-4">
                                      <Label className="font-weight-600 text-black d-flex justify-content-end">
                                        quantity should not be more than{" "}
                                        {quantity}
                                      </Label>
                                      <div className="address-line">
                                        <Row className="form-group d-flex align-items-end">
                                          <Col md={4}>
                                            <TextField
                                              fullWidth
                                              variant="standard"
                                              id={`details.${index}.container_no`}
                                              name={`details.${index}.container_no`}
                                              label="Container No. *"
                                              value={
                                                formProps.values.details[index]
                                                  .container_no
                                              }
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>

                                          <Col md={3}>
                                            <TextField
                                              fullWidth
                                              variant="standard"
                                              id={`details.${index}.seal_no`}
                                              label="Seal No *"
                                              name={`details.${index}.seal_no`}
                                              value={
                                                formProps.values.details[index]
                                                  .seal_no
                                              }
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                        </Row>

                                        <FieldArray
                                          name={`details.${index}.commodity`}
                                          render={(commArrayHelper) => {
                                            return (
                                              <>
                                                {formProps.values?.details[
                                                  index
                                                ]?.commodity?.map(
                                                  (c, cindex) => {
                                                    return (
                                                      <Row className="form-group d-flex align-items-end">
                                                        <Col md={2}>
                                                          <TextField
                                                            fullWidth
                                                            select
                                                            disabled
                                                            variant="standard"
                                                            id={`details.${index}.commodity.${cindex}.commodity`}
                                                            label="Commodity"
                                                            name={`details.${index}.commodity.${cindex}.commodity`}
                                                            value={
                                                              formProps.values
                                                                .details[index]
                                                                .commodity[
                                                                cindex
                                                              ].commodity
                                                            }
                                                            onChange={
                                                              formProps.handleChange
                                                            }
                                                          >
                                                            {props.commodity?.map(
                                                              (com) => (
                                                                <MenuItem
                                                                  value={com.id}
                                                                >
                                                                  {com.name}
                                                                </MenuItem>
                                                              )
                                                            )}
                                                          </TextField>
                                                        </Col>
                                                        <Col md={2}>
                                                          <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            id={`details.${index}.quantity`}
                                                            label="Quantity *"
                                                            name={`details.${index}.quantity`}
                                                            type="number"
                                                            inputProps={{
                                                              min: 0,
                                                              max: quantity,
                                                            }}
                                                            value={
                                                              formProps.values
                                                                .details[index]
                                                                .quantity
                                                            }
                                                            onChange={
                                                              formProps.handleChange
                                                            }
                                                          />
                                                        </Col>
                                                        <Col md={2}>
                                                          <TextField
                                                            fullWidth
                                                            select
                                                            disabled
                                                            variant="standard"
                                                            id={`details.${index}.commodity.${cindex}.quantity_unit`}
                                                            label="quantity unit"
                                                            name={`details.${index}.commodity.${cindex}.quantity_unit`}
                                                            value={
                                                              formProps.values
                                                                .details[index]
                                                                .commodity[
                                                                cindex
                                                              ].quantity_unit
                                                            }
                                                            onChange={
                                                              formProps.handleChange
                                                            }
                                                          >
                                                            {props.quantityUnit?.map(
                                                              (unit) => (
                                                                <MenuItem
                                                                  value={
                                                                    unit.id
                                                                  }
                                                                >
                                                                  {unit.name}
                                                                </MenuItem>
                                                              )
                                                            )}
                                                          </TextField>
                                                        </Col>
                                                        <Col md={2}>
                                                          <TextField
                                                            fullWidth
                                                            disabled
                                                            variant="standard"
                                                            id={`details.${index}.commodity.${cindex}.price`}
                                                            label="Price"
                                                            name={`details.${index}.commodity.${cindex}.price`}
                                                            value={
                                                              formProps.values
                                                                .details[index]
                                                                .commodity[
                                                                cindex
                                                              ].price
                                                            }
                                                            onChange={
                                                              formProps.handleChange
                                                            }
                                                          />
                                                        </Col>
                                                        <Col md={2}>
                                                          <TextField
                                                            fullWidth
                                                            select
                                                            disabled
                                                            variant="standard"
                                                            id={`details.${index}.commodity.${cindex}.price_unit`}
                                                            label="Price Unit"
                                                            name={`details.${index}.commodity.${cindex}.price_unit`}
                                                            value={
                                                              formProps.values
                                                                .details[index]
                                                                .commodity[
                                                                cindex
                                                              ].price_unit
                                                            }
                                                            onChange={
                                                              formProps.handleChange
                                                            }
                                                          >
                                                            <option value="">
                                                              Select price
                                                            </option>
                                                            <option value="USD">
                                                              USD
                                                            </option>
                                                            <option value="Euro">
                                                              Euro
                                                            </option>
                                                          </TextField>
                                                        </Col>
                                                        <Col md={2}>
                                                          <Button
                                                            color="danger p-1"
                                                            size="sm"
                                                            onClick={() =>
                                                              commArrayHelper.remove(
                                                                cindex
                                                              )
                                                            }
                                                          >
                                                            <i className="fa fa-trash" />
                                                          </Button>
                                                        </Col>
                                                      </Row>
                                                    );
                                                  }
                                                )}
                                              </>
                                            );
                                          }}
                                        />
                                      </div>

                                      <CardFooter className="d-flex justify-content-end align-items-center p-2 pb-0">
                                        {formProps.values.details.length ===
                                          index + 1 && (
                                          <Button
                                            className="btn-success p-1 "
                                            onClick={() => {
                                              arrayHelpers.push({
                                                container_no: "",
                                                seal_no: "",
                                                order_id:
                                                  purchaseSalesIndentData[0]
                                                    ?.bpo?.id,

                                                commodity_id:
                                                  purchaseSalesIndentData[0]
                                                    ?.commodity_details[0]
                                                    ?.indent_details[0]
                                                    ?.commodity_id,
                                                quantity: "",
                                                price:
                                                  purchaseSalesIndentData[0]
                                                    ?.commodity_details[0]
                                                    ?.indent_details[0]?.price
                                                    ?.amount,
                                                commodity: [
                                                  {
                                                    commodity:
                                                      purchaseSalesIndentData[0]
                                                        ?.commodity_details[0]
                                                        ?.indent_details[0]
                                                        ?.commodity_id,
                                                    quantity:
                                                      purchaseSalesIndentData[0]
                                                        ?.commodity_details[0]
                                                        ?.indent_details[0]
                                                        ?.quantity,
                                                    quantity_unit:
                                                      purchaseSalesIndentData[0]
                                                        ?.commodity_details[0]
                                                        ?.indent_details[0]
                                                        ?.quantity_unit,
                                                    price:
                                                      purchaseSalesIndentData[0]
                                                        ?.commodity_details[0]
                                                        ?.indent_details[0]
                                                        ?.price?.amount,
                                                    price_unit:
                                                      purchaseSalesIndentData[0]
                                                        ?.commodity_details[0]
                                                        ?.indent_details[0]
                                                        ?.price?.amount_unit,
                                                  },
                                                ],
                                              });
                                            }}
                                          >
                                            <i className="fa fa-plus" />
                                          </Button>
                                        )}

                                        {formProps.values.details?.length >
                                          1 && (
                                          <Button
                                            color="danger p-1"
                                            size="sm"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
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

                      <Row className="form-group">
                        <Col md={3}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              label="Vessel Name *"
                              id="vessel_name"
                              name="vessel_name"
                              value={formProps.values.vessel_name}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.vessel_name &&
                                Boolean(formProps.errors.vessel_name)
                              }
                              helperText={
                                formProps.touched.vessel_name &&
                                formProps.errors.vessel_name
                              }
                            />
                          </InputGroup>
                        </Col>
                        <Col md={3}>
                          <Label className="label">ETD </Label>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              type="date"
                              id="etd"
                              name="etd"
                              value={formProps.values.etd}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.etd &&
                                Boolean(formProps.errors.etd)
                              }
                              helperText={
                                formProps.touched.etd && formProps.errors.etd
                              }
                            />
                          </InputGroup>
                        </Col>
                        <Col md={3}>
                          <Label className="label">ETA AT PORT </Label>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              type="date"
                              id="eta_at_port"
                              name="eta_at_port"
                              value={formProps.values.eta_at_port}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.eta_at_port &&
                                Boolean(formProps.errors.eta_at_port)
                              }
                              helperText={
                                formProps.touched.eta_at_port &&
                                formProps.errors.eta_at_port
                              }
                            />
                          </InputGroup>
                        </Col>
                        <Col md={3}>
                          <Label className="label">ETA AT ICD </Label>

                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              size="small"
                              type="date"
                              id="eta_at_icd"
                              name="eta_at_icd"
                              value={formProps.values.eta_at_icd}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.eta_at_icd &&
                                Boolean(formProps.errors.eta_at_icd)
                              }
                              helperText={
                                formProps.touched.eta_at_icd &&
                                formProps.errors.eta_at_icd
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
                              label="Container Status"
                              id="container_status"
                              name="container_status"
                              value={formProps.values.container_status}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.container_status &&
                                Boolean(formProps.errors.container_status)
                              }
                              helperText={
                                formProps.touched.container_status &&
                                formProps.errors.container_status
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
                              label="BL No."
                              id="bi_no"
                              name="bi_no"
                              value={formProps.values.bi_no}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.bi_no &&
                                Boolean(formProps.errors.bi_no)
                              }
                              helperText={
                                formProps.touched.bi_no &&
                                formProps.errors.bi_no
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
                              label="Shipping Company"
                              id="shipping_company"
                              name="shipping_company"
                              value={formProps.values.shipping_company}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.shipping_company &&
                                Boolean(formProps.errors.shipping_company)
                              }
                              helperText={
                                formProps.touched.shipping_company &&
                                formProps.errors.shipping_company
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
                              label="PSIC Number"
                              id="psic_number"
                              name="psic_number"
                              value={formProps.values.psic_number}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.psic_number &&
                                Boolean(formProps.errors.psic_number)
                              }
                              helperText={
                                formProps.touched.psic_number &&
                                formProps.errors.psic_number
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
              {props.loadingDetail?.isPostLoading && <LinerLoader />}
            </ModalFooter>
          </Modal>
        </CardHeader>
        <CardBody>
          <Col md={12} style={{ overflow: "scroll" }}>
            <Table className="table table-sm m-2">
              <thead>
                <tr>
                  <th scope="col">Supplier</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Total Advance</th>
                  <th scope="col">Advance Received</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {" "}
                    {purchaseSalesIndentData[0]?.bpo?.supplier?.company_name}
                  </td>
                  <td>
                    {" "}
                    {purchaseSalesIndentData[0]?.bpo?.customer?.company_name}
                  </td>
                  <td>
                    {" "}
                    {purchaseSalesIndentData[0]?.payment_advance_type == "%"
                      ? (Number(total_price) / 100) *
                        Number(purchaseSalesIndentData[0]?.payment_advance)
                      : Number(purchaseSalesIndentData[0]?.payment_advance)}
                  </td>
                  <td>
                    {purchaseSalesIndentData[0]?.bpo?.contract_details
                      .filter((l) => l.amount)
                      .reduce((a, v) => (a = Number(a) + Number(v.amount)), 0)}
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
                        <td>
                          {i.price?.is_lme == 0
                            ? i.price?.amount
                            : i.price?.provisional_price}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Col>
        </CardBody>
      </Card>

      <Card className="m-4 p-2">
        <CardBody>
          {props.loadingDetail.isLoading ? (
            <CircularLoader />
          ) : props.loadingDetail?.loadingDetail?.length > 0 ? (
            props.loadingDetail.loadingDetail
              .filter(
                (load) => load.order_id == purchaseSalesIndentData[0]?.bpo?.id
              )
              .map((load, index) => {
                return (
                  <div className="m-4" key={load.id}>
                    <div className="d-flex justify-content-between">
                      <h5>
                        Part Order {index + 1}: {load.quantity_sum}
                      </h5>
                      <div>
                        <Claims
                          purchaseSalesIndentData={purchaseSalesIndentData}
                          data={load}
                          key={load.id}
                        />

                        <Invoice
                          purchaseSalesIndentData={purchaseSalesIndentData}
                          data={load}
                          key={load.id}
                        />

                        <WordDocLoadingDetails
                          purchaseSalesIndentData={purchaseSalesIndentData[0]}
                          ref_no={purchaseSalesIndentData[0]?.ref_no}
                          load={load}
                          container={load.container_details}
                          etd={load.etd}
                          vessel_name={load.vessel_name}
                          eta={load.eta_at_port}
                          bl_no={load.bi_no}
                          shipping_line={load.shipping_company}
                          ctt_no={
                            purchaseSalesIndentData[0]?.bpo?.contract_number
                          }
                          quantity={
                            Number(purchaseSalesIndentData[0]?.bpo?.quantity) -
                            Number(load.quantity_sum)
                          }
                          total_qty={load.quantity_sum}
                          loading_port={
                            props.portLoading?.filter(
                              (d) =>
                                d.id ==
                                purchaseSalesIndentData[0].country_loading_id
                            )[0]?.name
                          }
                          discharge={
                            props.portDischarge?.filter(
                              (d) =>
                                d.id ==
                                purchaseSalesIndentData[0].port_discharge_id
                            )[0]?.name
                          }
                          delivery={
                            props.portDelivery?.filter(
                              (d) =>
                                d.id ==
                                purchaseSalesIndentData[0].delivery_port_id
                            )[0]?.name
                          }
                          commodity={purchaseSalesIndentData[0].commodities}
                        />
                        <EditLoadingDetail
                          data={load}
                          purchaseSalesIndentData={purchaseSalesIndentData}
                        />
                        <DeleteButton
                          id={load.id}
                          deleteFunction={() =>
                            props.onDeleteLoadingDetail(id, data)
                          }
                        />

                        <Button
                          className="p-1"
                          onClick={() => setMinimize(!minimize)}
                        >
                          {minimize ? (
                            <i className="fa fa-chevron-up" />
                          ) : (
                            <i className="fa fa-chevron-down" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {minimize ? (
                      <div className="mt-4 pt-3">
                        <Formik
                          initialValues={{
                            loading_date: load.loading_date ?? "",
                            vessel_name: load.vessel_name ?? "",
                            etd: load.etd ?? "",
                            eta_at_port: load.eta_at_port ?? "",
                            eta_at_icd: load.eta_at_icd ?? "",
                            container_status: load.container_status ?? "",
                            bi_no: load.bi_no ?? "",
                            shipping_company: load.shipping_company ?? "",
                            psic_number: load.psic_number ?? "",
                          }}
                        >
                          {(formProps) => {
                            return (
                              <Form>
                                <Row className="form-group">
                                  <Col md={2}>
                                    <InputGroup>
                                      <TextField
                                        disabled
                                        fullWidth
                                        variant="standard"
                                        size="small"
                                        label="Vessel Name"
                                        id="vessel_name"
                                        name="vessel_name"
                                        value={formProps.values.vessel_name}
                                        onChange={formProps.handleChange}
                                        error={
                                          formProps.touched.vessel_name &&
                                          Boolean(formProps.errors.vessel_name)
                                        }
                                        helperText={
                                          formProps.touched.vessel_name &&
                                          formProps.errors.vessel_name
                                        }
                                      />
                                    </InputGroup>
                                  </Col>
                                  <Col md={2}>
                                    <Label className="label">ETD</Label>

                                    <InputGroup>
                                      <TextField
                                        fullWidth
                                        disabled
                                        variant="standard"
                                        size="small"
                                        type="date"
                                        id="etd"
                                        name="etd"
                                        value={formProps.values.etd}
                                        onChange={formProps.handleChange}
                                        error={
                                          formProps.touched.etd &&
                                          Boolean(formProps.errors.etd)
                                        }
                                        helperText={
                                          formProps.touched.etd &&
                                          formProps.errors.etd
                                        }
                                      />
                                    </InputGroup>
                                  </Col>
                                  <Col md={2}>
                                    <Label className="label">ETA AT PORT</Label>

                                    <InputGroup>
                                      <TextField
                                        fullWidth
                                        disabled
                                        variant="standard"
                                        size="small"
                                        type="date"
                                        id="eta_at_port"
                                        name="eta_at_port"
                                        value={formProps.values.eta_at_port}
                                        onChange={formProps.handleChange}
                                        error={
                                          formProps.touched.eta_at_port &&
                                          Boolean(formProps.errors.eta_at_port)
                                        }
                                        helperText={
                                          formProps.touched.eta_at_port &&
                                          formProps.errors.eta_at_port
                                        }
                                      />
                                    </InputGroup>
                                  </Col>
                                  <Col md={2}>
                                    <Label className="label">ETA AT ICD</Label>

                                    <InputGroup>
                                      <TextField
                                        fullWidth
                                        disabled
                                        variant="standard"
                                        size="small"
                                        type="date"
                                        id="eta_at_icd"
                                        name="eta_at_icd"
                                        value={formProps.values.eta_at_icd}
                                        onChange={formProps.handleChange}
                                        error={
                                          formProps.touched.eta_at_icd &&
                                          Boolean(formProps.errors.eta_at_icd)
                                        }
                                        helperText={
                                          formProps.touched.eta_at_icd &&
                                          formProps.errors.eta_at_icd
                                        }
                                      />
                                    </InputGroup>
                                  </Col>
                                  <Col md={2}>
                                    <InputGroup>
                                      <TextField
                                        fullWidth
                                        disabled
                                        variant="standard"
                                        size="small"
                                        label="Container Status"
                                        id="container_status"
                                        name="container_status"
                                        value={
                                          formProps.values.container_status
                                        }
                                        onChange={formProps.handleChange}
                                        error={
                                          formProps.touched.container_status &&
                                          Boolean(
                                            formProps.errors.container_status
                                          )
                                        }
                                        helperText={
                                          formProps.touched.container_status &&
                                          formProps.errors.container_status
                                        }
                                      />
                                    </InputGroup>
                                  </Col>
                                  <Col md={2}>
                                    <InputGroup>
                                      <TextField
                                        fullWidth
                                        disabled
                                        variant="standard"
                                        size="small"
                                        label="Bill No."
                                        id="bi_no"
                                        name="bi_no"
                                        value={formProps.values.bi_no}
                                        onChange={formProps.handleChange}
                                        error={
                                          formProps.touched.bi_no &&
                                          Boolean(formProps.errors.bi_no)
                                        }
                                        helperText={
                                          formProps.touched.bi_no &&
                                          formProps.errors.bi_no
                                        }
                                      />
                                    </InputGroup>
                                  </Col>
                                </Row>

                                <Row className="form-group d-flex align-items-end">
                                  <Col md={2}>
                                    <InputGroup>
                                      <TextField
                                        fullWidth
                                        disabled
                                        variant="standard"
                                        size="small"
                                        label="Shipping Company"
                                        id="shipping_company"
                                        name="shipping_company"
                                        value={
                                          formProps.values.shipping_company
                                        }
                                        onChange={formProps.handleChange}
                                        error={
                                          formProps.touched.shipping_company &&
                                          Boolean(
                                            formProps.errors.shipping_company
                                          )
                                        }
                                        helperText={
                                          formProps.touched.shipping_company &&
                                          formProps.errors.shipping_company
                                        }
                                      />
                                    </InputGroup>
                                  </Col>
                                  <Col md={2}>
                                    <InputGroup>
                                      <TextField
                                        fullWidth
                                        variant="standard"
                                        size="small"
                                        label="PSIC Number"
                                        id="psic_number"
                                        name="psic_number"
                                        value={formProps.values.psic_number}
                                        onChange={formProps.handleChange}
                                        error={
                                          formProps.touched.psic_number &&
                                          Boolean(formProps.errors.psic_number)
                                        }
                                        helperText={
                                          formProps.touched.psic_number &&
                                          formProps.errors.psic_number
                                        }
                                      />
                                    </InputGroup>
                                  </Col>
                                  <Col md={2}>
                                    <Label for="size">Create At</Label>
                                    <InputGroup>
                                      <TextField
                                        fullWidth
                                        variant="standard"
                                        disabled
                                        size="small"
                                        type="date"
                                        id="loading_date"
                                        name="loading_date"
                                        value={formProps.values.loading_date}
                                        onChange={formProps.handleChange}
                                        error={
                                          formProps.touched.loading_date &&
                                          Boolean(formProps.errors.loading_date)
                                        }
                                        helperText={
                                          formProps.touched.loading_date &&
                                          formProps.errors.loading_date
                                        }
                                      />
                                    </InputGroup>
                                  </Col>
                                </Row>
                              </Form>
                            );
                          }}
                        </Formik>
                        <Col md={12} style={{ overflow: "scroll" }}>
                          <Table className="table table-sm m-2">
                            <thead>
                              <tr>
                                <th scope="col">Container Number</th>
                                <th scope="col">Commodity </th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {load.container_details?.length > 0
                                ? load.container_details.map(
                                    (container, index) => {
                                      return (
                                        <tr>
                                          <td> {container.container_no}</td>
                                          <td>
                                            {
                                              purchaseSalesIndentData[0]
                                                ?.commodities
                                            }
                                          </td>
                                          <td>{container.quantity}</td>
                                          <td>{container.price}</td>
                                        </tr>
                                      );
                                    }
                                  )
                                : null}
                            </tbody>
                          </Table>
                        </Col>

                        <div className="mt-4">
                          <Couriers
                            data={load}
                            key={load.id}
                            purchaseSalesIndentData={purchaseSalesIndentData}
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
          ) : (
            ""
          )}
        </CardBody>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    purchaseSalesIndent: state.purchaseSalesIndent,
    login: state.login,
    purchaseOrder: state.purchaseOrder,
    loadingDetail: state.loadingDetail,
    priceUnit: state.priceUnit.priceUnit,
    commodity: state.commodity.commodity,
    quantityUnit: state.quantityUnit.quantityUnit,
    portDelivery: state.portDelivery.portDelivery,
    portDischarge: state.portDischarge.portDischarge,
    portLoading: state.portLoading.portLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPortLoadingGetData: (data) => dispatch(actions.portLoadingGetData(data)),
    onPortDeliveryGetData: (data) =>
      dispatch(actions.portDeliveryGetData(data)),
    onPortDischargeGetData: (data) =>
      dispatch(actions.portDischargeGetData(data)),
    onPriceUnitGetData: (data) => dispatch(actions.priceUnitGetData(data)),
    onQuantityUnitGetData: (data) =>
      dispatch(actions.quantityUnitGetData(data)),
    onCommodityGetData: (data) => dispatch(actions.commodityGetData(data)),
    onPurchaseSalesIndentGetData: (data) =>
      dispatch(actions.purchaseSalesIndentGetData(data)),
    loadingDetailGetData: (data) =>
      dispatch(actions.loadingDetailGetData(data)),
    onDeleteLoadingDetail: (id, data) =>
      dispatch(actions.deleteLoadingDetail(id, data)),
    onPostLoadingDetailData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postLoadingDetailData(data, user, toggle, setSubmitting)
      ),
    updateLoadingDetailData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateLoadingDetailData(data, user, toggle, setSubmitting)
      ),
    onContainerSizeGetData: (data) =>
      dispatch(actions.containerSizeGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddLoadingDetails);
