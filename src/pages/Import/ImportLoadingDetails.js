/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useMemo } from "react";
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
import * as actions from "../../store/creators";
import { useParams } from "react-router-dom";
import CircularLoader from "components/Loaders/CircularLoader";
import EditImportLoadingdetail from "./Action/EditImportLoadingdetail";
import Swal from "sweetalert2";
import DeleteButton from "Helpers/DeleteButton";
import Claims from "./claim/Claim";
import Invoice from "../OrderHistory/Invoice/Invoice";
import Couriers from "../OrderHistory/Couriers/Couriers";
import WordDocImportLoadingdetails from "../wordDocuments/WordDocLoadingDetails";
import MenuButton from "components/MenuButton/MenuButton";

import CustomTextField from "components/MuiComponents/CustomTextField";
import CustomCheckbox from "components/MuiComponents/CustomCheckbox";
import ImportInvoice from "./Invoice/ImportInvoice";

import CustomSelectField from "components/MuiComponents/CustomSelectField";
import AddButton from "./../../Helpers/AddButton";
import { arrayFilterByKey, isEmpty } from "Helpers/helper";
import { arrayTotalWithField } from "Helpers/helper";

function ImportImportLoadingdetails(props) {
  const options = [
    { name: "Add Sales Contract", page: "import/add-sales-contract" },
    // { name: "Add Loading Details", page: "import/add-loading-details" },
    { name: "Add Advance Details", page: "import/add-advance-details" },
    { name: "Bill of Entry", page: "import/bill" },
    { name: "Quality Match", page: "import/quality-match" },
  ];

  const [minimize, setMinimize] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

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
  };

  useEffect(() => {
    props.importLoadingdetailGetData(data);
    props.onCommodityGetData(data);
    props.onPriceUnitGetData(data);
    props.onQuantityUnitGetData(data);
    props.onContainerSizeGetData(data);
    props.onPortLoadingGetData(data);
    props.onPortDeliveryGetData(data);
    props.invoiceGetData(data);
    props.importClaimGetData(data);
    props.onPortDischargeGetData(data);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const total_price =
    Number(currentImportSalesContract?.price?.amount) *
    Number(currentImportSalesContract?.quantity);

  const commodityAnalysis = !isEmpty(
    currentImportSalesContract?.sales_confirmation?.commodity_analysis
  )
    ? currentImportSalesContract?.sales_confirmation?.commodity_analysis
    : [];

  const loadingData = !isEmpty(props.importLoadingdetail?.importLoadingdetail)
    ? arrayFilterByKey(
        props.importLoadingdetail?.importLoadingdetail,
        "sale_contract_id",
        id
      )
    : [];

  const LoadingContaierCommodities = !isEmpty(loadingData)
    ? loadingData.map((l) => l.container_details).flat(2)
    : [];

  const totalLoadedQuantity = arrayTotalWithField(
    LoadingContaierCommodities,
    "quantity"
  )?.toFixed(2);

  const quantity = currentImportSalesContract?.quantity;

  const remainingQuantity = (
    Number(quantity) - Number(totalLoadedQuantity)
  ).toFixed(2);

  console.log("remainingQuantity", remainingQuantity);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in ImportLoadingdetail:", values);

    const form_total_quantity =
      values.details?.length > 0
        ? values.details.reduce((acc, curr) => {
            return acc + Number(curr.quantity);
          }, 0)
        : "";

    if (Number(form_total_quantity) >= Number(remainingQuantity)) {
      setError("Total quantity is greater than remaining quantity");
      setSubmitting(false);
      return;
    }
    setError("");

    const user = new FormData();
    values.docs?.map((file, index) => {
      console.log(`docs[${index}]`, file);
      return user.append(`docs[${index}]`, file);
    });
    const images = values.images?.map((file, index) => {
      console.log("file", file);
      return file;
    });
    const image_name = values.images?.map((file, index) => {
      return file.name;
    });

    user.append("images", images);
    user.append("image_name", image_name);

    user.append("sale_contract_id", id);
    user.append(
      "sales_confirmation_id",
      currentImportSalesContract?.sales_confirmation_id
    );
    user.append("loading_date", values.loading_date);
    user.append("vessel_name", values.vessel_name);
    user.append("etd", values.etd);
    user.append("eta_at_port", values.eta_at_port);
    user.append("eta_at_icd", values.eta_at_icd);
    user.append("container_status", values.container_status);
    user.append("bl_no", values.bl_no);
    user.append("shipping_company", values.shipping_company);
    user.append("psic_number", values.psic_number);
    user.append("shipper", values.shipper);
    user.append("loading_port", values.loading_port);
    user.append("discharge_port", values.discharge_port);
    user.append("delivery_place", values.delivery_place);
    user.append("container_size", values.container_size);
    user.append("hs_code", values.hs_code);
    user.append("free_days", values.free_days);
    user.append("damage", values.damage);
    user.append("bl_file", values.bl_file);
    user.append("drive_link", values.drive_link);
    user.append("cha_name", values.cha_name);
    user.append("bl_type", values.bl_type);
    user.append("is_job_done", values.is_job_done);
    user.append("is_da_done", values.is_da_done);
    user.append("is_dgft_done", values.is_dgft_done);
    user.append("pending_quantity", values.pending_quantity);
    user.append("da_date", values.da_date);
    user.append("dgft_amount", values.dgft_amount);
    user.append("job_no", values.job_no);
    user.append("file_no", values.file_no);
    user.append("license_type", values.license_type);
    user.append("license_no", values.license_no);
    user.append("duty_paid", values.duty_paid);
    user.append("total_duty", values.total_duty);
    user.append("quantity_used", values.quantity_used);
    user.append("loaded_quantity", values.loaded_quantity);
    user.append("containerDetails", JSON.stringify(values.details));

    console.log("Data of ImportLoadingdetail:", user);
    props.onPostImportLoadingdetailData(data, user, toggle, setSubmitting);
    return;
  };

  // console.log("currentImportSalesContract", currentImportSalesContract);

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
                  bl_no: "",
                  shipping_company: "",
                  psic_number: "",
                  images: [],
                  docs: [],
                  drive_link: "",
                  discharge_port: "",
                  loading_port: "",
                  delivery_place: "",
                  shipper: "",
                  eta: "",
                  container_size: "",
                  hs_code: "",
                  free_days: "",
                  damage: "",
                  bl_file: "",
                  is_job_done: "",
                  pending_quantity: "",
                  loaded_quantity: "",
                  job_no: "",
                  file_no: "",
                  is_dgft_done: "",
                  dgft_amount: "",
                  is_da_done: "",
                  cha_name: "",
                  da_date: "",
                  bl_type: "",
                  license_type: "",
                  license_no: "",
                  duty_paid: "",
                  total_duty: "",
                  quantity_used: "",

                  details: [
                    {
                      container_no: "",
                      container_type: "",
                      seal_no: "",
                      commodity_id: "",
                      quantity: "",
                      price:
                        currentImportSalesContract?.price_status == 0
                          ? currentImportSalesContract?.price?.amount
                          : currentImportSalesContract?.price_status == 1 ||
                            currentImportSalesContract?.price_status == 2
                          ? currentImportSalesContract?.price?.provisional_price
                          : "",
                      price_unit:
                        currentImportSalesContract?.price?.amount_unit ?? "",

                      commodity: [
                        {
                          commodity: "",
                          quantity: "",
                          price: "",
                          price_unit: "",
                          quantity_unit: "",
                        },
                      ],
                    },
                  ],
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  loading_date: Yup.string().required("required"),
                  vessel_name: Yup.string().required("required"),
                  etd: Yup.string().required("required"),
                  eta_at_port: Yup.string().required("required"),
                  eta_at_icd: Yup.string().required("required"),
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
                            <CustomTextField
                              formProps={formProps}
                              type="date"
                              name="loading_date"
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Col md={12} className="p-0">
                        <FieldArray
                          name="details"
                          render={(arrayHelpers) => (
                            <div className="">
                              {formProps.values.details?.map(
                                (detail, index) => {
                                  return (
                                    <Card className="address-container mb-4">
                                      <Label className="font-weight-600 text-black d-flex justify-content-end">
                                        quantity should not be more than{" "}
                                        {remainingQuantity ?? quantity}
                                      </Label>
                                      <div className="address-line">
                                        <Row className="form-group d-flex align-items-end">
                                          <Col md={4}>
                                            <CustomTextField
                                              formProps={formProps}
                                              name={`details.${index}.container_no`}
                                              value={
                                                formProps.values.details[index]
                                                  .container_no
                                              }
                                              label="Container No."
                                              required
                                            />
                                          </Col>
                                          <Col md={4}>
                                            <CustomTextField
                                              formProps={formProps}
                                              name={`details.${index}.container_type`}
                                              value={
                                                formProps.values.details[index]
                                                  ?.container_type
                                              }
                                              label="Container Type"
                                            />
                                          </Col>

                                          <Col md={3}>
                                            <CustomTextField
                                              formProps={formProps}
                                              label="Seal No"
                                              name={`details.${index}.seal_no`}
                                              value={
                                                formProps.values.details[index]
                                                  .seal_no
                                              }
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
                                                        {/* <Col md={2}>
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
                                                        </Col> */}
                                                        <Col md={2}>
                                                          <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            id={`details.${index}.quantity`}
                                                            label="Quantity *"
                                                            name={`details.${index}.quantity`}
                                                            // type="number"
                                                            // inputProps={{
                                                            //   min: 0,
                                                            //   max: quantity,
                                                            // }}
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
                                                        {/* <Col md={2}>
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
                                                        </Col> */}
                                                        <Col md={2}>
                                                          <TextField
                                                            fullWidth
                                                            disabled
                                                            variant="standard"
                                                            id={`details.${index}.price`}
                                                            label="Price"
                                                            name={`details.${index}.price`}
                                                            value={
                                                              formProps.values
                                                                .details[index]
                                                                .price
                                                            }
                                                            onChange={
                                                              formProps.handleChange
                                                            }
                                                          />
                                                        </Col>
                                                        <Col md={2}>
                                                          <TextField
                                                            fullWidth
                                                            disabled
                                                            variant="standard"
                                                            id={`details.${index}.price_unit`}
                                                            label="Price Unit"
                                                            name={`details.${index}.price_unit`}
                                                            value={
                                                              formProps.values
                                                                .details[index]
                                                                .price_unit
                                                            }
                                                            onChange={
                                                              formProps.handleChange
                                                            }
                                                          />
                                                        </Col>
                                                        <Col md={2}>
                                                          <DeleteButton
                                                            deleteFunction={() =>
                                                              commArrayHelper.remove(
                                                                cindex
                                                              )
                                                            }
                                                          />
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
                                          <AddButton
                                            onClick={() => {
                                              arrayHelpers.push({
                                                container_no: "",
                                                container_type: "",
                                                seal_no: "",
                                                commodity_id: "",
                                                quantity: "",
                                                price:
                                                  currentImportSalesContract?.price_status ==
                                                  0
                                                    ? currentImportSalesContract
                                                        ?.price?.amount
                                                    : currentImportSalesContract?.price_status ==
                                                        1 ||
                                                      currentImportSalesContract?.price_status ==
                                                        2
                                                    ? currentImportSalesContract
                                                        ?.price
                                                        ?.provisional_price
                                                    : "",
                                                price_unit:
                                                  currentImportSalesContract
                                                    ?.price?.amount_unit ?? "",

                                                commodity: [
                                                  {
                                                    commodity: "",
                                                    quantity: "",
                                                    price: "",
                                                    price_unit: "",
                                                    quantity_unit: "",
                                                  },
                                                ],
                                              });
                                            }}
                                          />
                                        )}

                                        {formProps.values.details?.length >
                                          1 && (
                                          <DeleteButton
                                            deleteFunction={() =>
                                              arrayHelpers.remove(index)
                                            }
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

                      <Row className="form-group">
                        <Col md={3}>
                          <InputGroup>
                            <TextField
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
                              id="bl_no"
                              name="bl_no"
                              value={formProps.values.bl_no}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.bl_no &&
                                Boolean(formProps.errors.bl_no)
                              }
                              helperText={
                                formProps.touched.bl_no &&
                                formProps.errors.bl_no
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
                      <Row className="form-group d-flex align-items-end">
                        <Col md={4}>
                          <Label for="images">Upload Mutliple Image</Label>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              id="images"
                              type="file"
                              name="images"
                              inputProps={{ multiple: true }}
                              onChange={(e) => {
                                formProps.setFieldValue("images", [
                                  ...e.target.files,
                                ]);
                              }}
                              error={
                                formProps.touched.images &&
                                Boolean(formProps.errors.images)
                              }
                              helperText={
                                formProps.touched.images &&
                                formProps.errors.images
                              }
                            />
                          </InputGroup>
                        </Col>
                        <Col md={4}>
                          <Label for="docs">Upload Mutliple Docs</Label>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              id="docs"
                              type="file"
                              name="docs"
                              inputProps={{ multiple: true }}
                              onChange={(e) => {
                                formProps.setFieldValue("docs", [
                                  ...e.target.files,
                                ]);
                              }}
                              error={
                                formProps.touched.docs &&
                                Boolean(formProps.errors.docs)
                              }
                              helperText={
                                formProps.touched.docs && formProps.errors.docs
                              }
                            />
                          </InputGroup>
                        </Col>
                        <Col md={4}>
                          <CustomTextField
                            formProps={formProps}
                            label="Drive Link"
                            name="drive_link"
                          />
                        </Col>
                      </Row>

                      <Label>Shipping Line</Label>
                      <Row className="form-group">
                        <Col md={3}>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Shipper"
                            id="shipper"
                            name="shipper"
                            value={formProps.values.shipper}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.shipper &&
                              Boolean(formProps.errors.shipper)
                            }
                            helperText={
                              formProps.touched.shipper &&
                              formProps.errors.shipper
                            }
                          />
                        </Col>
                        <Col md={3}>
                          <TextField
                            fullWidth
                            select
                            variant="standard"
                            size="small"
                            label="Port of Loading"
                            id="loading_port"
                            name="loading_port"
                            value={formProps.values.loading_port}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.loading_port &&
                              Boolean(formProps.errors.loading_port)
                            }
                            helperText={
                              formProps.touched.loading_port &&
                              formProps.errors.loading_port
                            }
                          >
                            {props.portLoading.map((port) => (
                              <MenuItem value={port.name}>{port.name}</MenuItem>
                            ))}
                          </TextField>
                        </Col>
                        <Col md={3}>
                          <TextField
                            fullWidth
                            select
                            variant="standard"
                            size="small"
                            label="Port of Discharge"
                            id="discharge_port"
                            name="discharge_port"
                            value={formProps.values.discharge_port}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.discharge_port &&
                              Boolean(formProps.errors.discharge_port)
                            }
                            helperText={
                              formProps.touched.discharge_port &&
                              formProps.errors.discharge_port
                            }
                          >
                            {props.portDischarge?.map((port) => (
                              <MenuItem value={port.name}>{port.name}</MenuItem>
                            ))}
                          </TextField>
                        </Col>

                        <Col md={3}>
                          <TextField
                            select
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Place of delivery"
                            id="delivery_place"
                            name="delivery_place"
                            value={formProps.values.delivery_place}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.delivery_place &&
                              Boolean(formProps.errors.delivery_place)
                            }
                            helperText={
                              formProps.touched.delivery_place &&
                              formProps.errors.delivery_place
                            }
                          >
                            {props.portDelivery?.map((port) => (
                              <MenuItem value={port.name}>{port.name}</MenuItem>
                            ))}
                          </TextField>
                        </Col>
                      </Row>

                      <Row className="form-group d-flex align-items-end">
                        <Col md={3}>
                          <TextField
                            fullWidth
                            select
                            variant="standard"
                            id={`container_size`}
                            label="Container Size *"
                            name={`container_size`}
                            value={formProps.values.container_size}
                            onChange={formProps.handleChange}
                          >
                            {props.containerSize?.map((size) => (
                              <MenuItem value={size.size}>
                                {size.size}'
                              </MenuItem>
                            ))}
                          </TextField>
                        </Col>
                        <Col md={3}>
                          <CustomTextField
                            formProps={formProps}
                            name="hs_code"
                            label="HS Code"
                          />
                        </Col>
                        <Col md={3}>
                          <CustomTextField
                            formProps={formProps}
                            name="free_days"
                            label="Free Days"
                          />
                        </Col>
                        <Col md={3}>
                          <Label>ETA</Label>
                          <CustomTextField
                            formProps={formProps}
                            name="eta"
                            type="date"
                          />
                        </Col>
                      </Row>
                      <Row className="form-group d-flex align-items-end">
                        <Col md={3}>
                          <CustomTextField
                            formProps={formProps}
                            name="damage"
                            label="Damage"
                          />
                        </Col>
                        <Col md={3}>
                          <Label className="label">BL File Upload</Label>
                          <TextField
                            fullWidth
                            variant="standard"
                            type="file"
                            id="bl_file"
                            name="bl_file"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "bl_file",
                                event.currentTarget.files[0]
                              );
                            }}
                            error={
                              formProps.touched.bl_file &&
                              Boolean(formProps.errors.bl_file)
                            }
                            helperText={
                              formProps.touched.bl_file &&
                              formProps.errors.bl_file
                            }
                          ></TextField>
                        </Col>
                        <Col md={2}>
                          <CustomTextField
                            name="cha_name"
                            formProps={formProps}
                            label="CHA Name"
                          />
                        </Col>
                        <Col md={2}>
                          <CustomSelectField
                            name="bl_type"
                            formProps={formProps}
                            label="Select BL Type"
                            options={[
                              { name: "OBL", value: "OBL" },
                              { name: "Telex", value: "Telex" },
                              {
                                name: "Seaway bill(SWB)",
                                value: "Seaway bill(SWB)",
                              },
                            ]}
                          />
                        </Col>
                        <Col md={2} className="d-flex justify-content-center">
                          <CustomCheckbox
                            name="is_job_done"
                            label="Job Done"
                            formProps={formProps}
                          />
                          {/* <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                sx={{
                                  "& .MuiSvgIcon-root": { fontSize: 25 },
                                }}
                                name="is_job_done"
                                id="is_job_done"
                                checked={
                                  formProps.values.is_job_done == 1 ? true : false
                                }
                                onChange={(event) => {
                                  formProps.setFieldValue(
                                    `is_job_done`,
                                    event.target.value
                                  );
                                }}
                                value={formProps.values.is_job_done == 1 ? 0 : 1}
                              />
                            }
                            label="Job Done"
                          /> */}
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={3}>
                          <CustomTextField
                            name="pending_quantity"
                            formProps={formProps}
                            label="Pending Quantity"
                          />
                        </Col>
                        <Col md={3}>
                          <CustomTextField
                            name="loaded_quantity"
                            formProps={formProps}
                            label="Loaded Quantity"
                          />
                        </Col>
                        <Col md={3}>
                          <CustomSelectField
                            name="is_da_done"
                            label="DA"
                            formProps={formProps}
                            options={[
                              { name: "Yes", value: 1 },
                              { name: "No", value: 0 },
                            ]}
                          />
                        </Col>
                        {formProps.values.is_da_done == 1 && (
                          <Col md={3}>
                            <Label className="label">DA Date</Label>
                            <CustomTextField
                              formProps={formProps}
                              name="da_date"
                              type="date"
                            />
                          </Col>
                        )}
                      </Row>

                      <Row className="form-group">
                        <Col md={3}>
                          <CustomTextField
                            name="job_no"
                            formProps={formProps}
                            label="Job No"
                          />
                        </Col>
                        <Col md={3}>
                          <CustomTextField
                            name="file_no"
                            formProps={formProps}
                            label="File No"
                          />
                        </Col>
                        <Col md={3}>
                          <CustomSelectField
                            name="is_dgft_done"
                            label="DGFT"
                            formProps={formProps}
                            options={[
                              { name: "Done", value: 1 },
                              { name: "Not", value: 0 },
                            ]}
                          />
                        </Col>
                        {formProps.values.is_dgft_done == 1 && (
                          <Col md={3}>
                            <CustomTextField
                              formProps={formProps}
                              name="dgft_amount"
                              label="Amount"
                            />
                          </Col>
                        )}
                      </Row>

                      <Row className="form-group">
                        <Col md={3}>
                          <CustomTextField
                            name="license_type"
                            formProps={formProps}
                            label="License Type"
                          />
                        </Col>
                        <Col md={3}>
                          <CustomTextField
                            name="license_no"
                            formProps={formProps}
                            label="License Number"
                          />
                        </Col>
                        <Col md={3}>
                          <CustomTextField
                            name="duty_paid"
                            formProps={formProps}
                            label="Duty Paid"
                          />
                        </Col>
                      </Row>

                      <Row className="form-group">
                        <Col md={3}>
                          <CustomTextField
                            name="total_duty"
                            formProps={formProps}
                            label="Total Duty"
                          />
                        </Col>
                        <Col md={3}>
                          <CustomTextField
                            name="quantity_used"
                            formProps={formProps}
                            label="Quantity Used In License"
                          />
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
            <ModalFooter className="d-flex flex-column w-100 p-2">
              {props.importLoadingdetail?.isPostLoading && <LinerLoader />}

              {error && (
                <div className="text-center text-red font-weight-bold">
                  {error}
                </div>
              )}
            </ModalFooter>
          </Modal>
        </CardHeader>
        <CardBody>
          <Col md={12} style={{ overflow: "scroll" }}>
            <Table className="table table-sm m-2">
              <thead>
                <tr>
                  <th scope="col">Company Name</th>
                  <th scope="col">partner Name</th>
                  <th scope="col">Total Advance</th>
                  <th scope="col">Advance Received</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {" "}
                    {
                      currentImportSalesContract?.sales_confirmation?.customer
                        ?.company_name
                    }
                  </td>
                  <td>
                    {" "}
                    {
                      currentImportSalesContract?.sales_confirmation
                        ?.partner_name
                    }
                  </td>
                  <td>
                    {
                      currentImportSalesContract?.sales_confirmation
                        ?.advance_amount
                    }
                    {/* {" "}
                    {currentImportSalesContract?.payment_advance_type == "%"
                      ? (Number(total_price) / 100) *
                        Number(currentImportSalesContract?.payment_advance)
                      : Number(currentImportSalesContract?.payment_advance)} */}
                  </td>
                  <td>
                    {currentImportSalesContract?.sale_contract_details
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
                  <th scope="col">Analysis</th>
                </tr>
              </thead>
              <tbody>
                {commodityAnalysis?.map((commodity, index) => (
                  <tr key={index}>
                    <td>{commodity.product_name}</td>
                    <td>{commodity.analysis}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <div className="mt-4">
            <Row>
              <Col md={4}>
                <Label>Total Quantity : {quantity}</Label>
              </Col>
              <Col md={4}>
                <Label>Total Loaded : {totalLoadedQuantity}</Label>
              </Col>
              <Col md={4}>
                <Label>Remaining Quantity : {remainingQuantity}</Label>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>

      <Card className="m-4 p-2">
        <CardBody>
          {props.importLoadingdetail.isLoading ? (
            <CircularLoader />
          ) : props.importLoadingdetail?.importLoadingdetail?.length > 0 ? (
            props.importLoadingdetail.importLoadingdetail
              .filter(
                (load) =>
                  load.sale_contract_id == currentImportSalesContract?.id
              )
              .map((load, index) => {
                const quantity_sum = !isEmpty(load.container_details)
                  ? load.container_details.reduce(
                      (a, b) => a + Number(b.quantity),
                      0
                    )
                  : "";

                return (
                  <div className="m-4" key={load.id}>
                    <div className="d-flex justify-content-between">
                      <h5>
                        Part Order {index + 1}: {quantity_sum}
                      </h5>
                      <div>
                        <Claims
                          data={load}
                          key={load.id}
                          currentImportSalesContract={
                            currentImportSalesContract
                          }
                        />

                        <ImportInvoice
                          currentImportSalesContract={
                            currentImportSalesContract
                          }
                          data={load}
                          key={load?.id}
                          advance_amount={
                            currentImportSalesContract?.sales_confirmation
                              ?.advance_amount
                          }
                        />

                        <WordDocImportLoadingdetails />
                        <EditImportLoadingdetail
                          data={load}
                          currentImportSalesContract={
                            currentImportSalesContract
                          }
                          quantity={quantity}
                          totalLoadedQuantity={totalLoadedQuantity}
                          remainingQuantity={remainingQuantity}
                        />
                        <DeleteButton
                          id={load.id}
                          deleteFunction={() =>
                            props.onDeleteImportLoadingdetail(load.id, data)
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
                            bl_no: load.bl_no ?? "",
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
                                        id="bl_no"
                                        name="bl_no"
                                        value={formProps.values.bl_no}
                                        onChange={formProps.handleChange}
                                        error={
                                          formProps.touched.bl_no &&
                                          Boolean(formProps.errors.bl_no)
                                        }
                                        helperText={
                                          formProps.touched.bl_no &&
                                          formProps.errors.bl_no
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
                                {/* <th scope="col">Commodity </th> */}
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
                                          {/* <td>
                                            {
                                              purchaseSalesIndentData[0]
                                                ?.commodities
                                            }
                                          </td> */}
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
                          {/* <Couriers
                            data={load}
                            key={load.id}
                            purchaseSalesIndentData={purchaseSalesIndentData}
                          /> */}
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
    login: state.login,
    purchaseOrder: state.purchaseOrder,
    importLoadingdetail: state.entities.importer.importLoadingdetail,
    priceUnit: state.entities.master.priceUnit.priceUnit,
    commodity: state.entities.master.commodity.commodity,
    quantityUnit: state.entities.master.quantityUnit.quantityUnit,
    portDelivery: state.entities.master.portDelivery.portDelivery,
    portDischarge: state.entities.master.portDischarge.portDischarge,
    portLoading: state.entities.master.portLoading.portLoading,
    containerSize: state.entities.master.containerSize.containerSize,
    importSalesContract: state.entities.importer.importSalesContract,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    invoiceGetData: (data) => dispatch(actions.invoiceGetData(data)),
    importClaimGetData: (data) => dispatch(actions.importClaimGetData(data)),
    onPortLoadingGetData: (data) => dispatch(actions.portLoadingGetData(data)),
    onPortDeliveryGetData: (data) =>
      dispatch(actions.portDeliveryGetData(data)),
    onPortDischargeGetData: (data) =>
      dispatch(actions.portDischargeGetData(data)),
    onPriceUnitGetData: (data) => dispatch(actions.priceUnitGetData(data)),
    onQuantityUnitGetData: (data) =>
      dispatch(actions.quantityUnitGetData(data)),
    onCommodityGetData: (data) => dispatch(actions.commodityGetData(data)),

    importLoadingdetailGetData: (data) =>
      dispatch(actions.importLoadingdetailGetData(data)),
    onDeleteImportLoadingdetail: (id, data) =>
      dispatch(actions.deleteImportLoadingdetail(id, data)),
    onPostImportLoadingdetailData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postImportLoadingdetailData(data, user, toggle, setSubmitting)
      ),
    updateImportLoadingdetailData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateImportLoadingdetailData(data, user, toggle, setSubmitting)
      ),
    onContainerSizeGetData: (data) =>
      dispatch(actions.containerSizeGetData(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportImportLoadingdetails);
