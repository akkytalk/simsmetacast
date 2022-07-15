/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Label,
  InputGroup,
  CardFooter,
  Table,
  FormGroup,
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import WordsDocsEditCreateSalesIndents from "../wordDocuments/WordsDocsEditCreateSalesIndents";
import * as actions from "../../redux/creators";
import "../../css/main.css";
import CustomInput from "views/Views/CustomInput";
import EmailRef from "../../components/EmailReference/EmailRef";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { DateFormat } from "components/DateFormat/DateFormat";
import LoaderLiner from "components/Loaders/LoaderLiner";
import DeleteButton from "Helpers/DeleteButton";
import MenuButton from "components/MenuButton/MenuButton";
import dateFormat from "dateformat";

const options = [
  { name: "Edit Exports", page: "edit-purchase-indents" },
  // { name: "Create/Edit Sales Indents", page: "edit-create-sales-indents" },
  { name: "Add Sales Contract", page: "add-sales-contract" },
  { name: "Add Advance Details", page: "add-advance-details" },
  { name: "Add Loading Details", page: "add-loading-details" },
  { name: "LME Fixation", page: "lme-fixation" },
  { name: "Manage Files", page: "manages-files" },
  { name: "User History", page: "new-order-history" },
];

function EditCreateSalesIndents(props) {
  const { id } = useParams();

  let data = {
    token: props.login?.login?.token,
    id: id,
  };

  const purchaseSalesIndentData = [];
  // props.purchaseSalesIndent.purchaseSalesIndent.filter(
  //   (sale) => sale.id == id
  // );

  useEffect(() => {
    props.onSupplierGetData(data);
    props.onContainerSizeGetData(data);
    props.onCommodityAnalysisGetData(data);
    props.onCommodityGetData(data);
    props.onPortDeliveryGetData(data);
    props.onCommodityGetData(data);
    props.onPortDischargeGetData(data);
    props.onPortDeliveryGetData(data);
    props.onQuantityUnitGetData(data);
    props.onPortLoadingGetData(data);
    props.onCommissionUnitGetData(data);
    // props.onPurchaseSalesIndentGetData(data);
  }, []);

  const customer_id = purchaseSalesIndentData[0]?.bpo?.customer_id ?? "";

  const customerData =
    props.suppiler?.filter((s) => s.id == customer_id)?.length > 0
      ? props.suppiler?.filter((s) => s.id == customer_id)[0]
      : {};

  const customer_default_address = customerData?.default_address ?? "";
  const customer_city_id = customer_default_address?.city_id ?? "";
  const customer_state_id = customer_default_address?.state_id ?? "";
  const customer_country_id = customer_default_address?.country_id ?? "";

  const customer_cityData =
    props.city?.filter((s) => s.id == customer_city_id).length > 0
      ? props.city?.filter((s) => s.id == customer_city_id)[0]?.name
      : "";
  const customer_stateData =
    props.states?.filter((s) => s.id == customer_state_id)?.length > 0
      ? props.states?.filter((s) => s.id == customer_state_id)[0]?.name
      : "";
  const customer_countryData =
    props.country?.filter((s) => s.id == customer_country_id)?.length > 0
      ? props.country?.filter((s) => s.id == customer_country_id)[0]?.name
      : "";

  const customer_main_Address =
    customer_default_address?.address_1 +
    " " +
    customer_default_address?.address_2 +
    " " +
    customer_cityData +
    " " +
    customer_stateData +
    " " +
    customer_countryData;

  // console.log("customer_main_Address", customer_main_Address);

  const quantity = purchaseSalesIndentData[0]?.bpo?.quantity;

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Purchase Sales Indent:", values);
    setSubmitting(true);

    let user = {
      ref_no: values.ref_no,
      booking_date: values.booking_date,
      company_name: values.company_name,
      supplier_id: values.supplier_id,
      customer_id: values.customer_id,
      customer_address: values.customer_address,
      customer_bank: values.customer_bank,
      shipment_from: values.shipment_from,
      shipment_to: values.shipment_to,
      port_discharge_id: values.port_discharge_id,
      country_loading_id: values.country_loading_id,
      delivery_port_id: values.delivery_port_id,
      shipment_remark: values.shipment_remark,
      payment_advance: values.payment_advance,
      payment_advance_type: values.payment_advance_type,
      customer_balance_payment: values.customer_balance_payment,
      commission_from_customer: values.commission_from_customer,
      commission_to_customer: values.commission_to_customer,
      commission_from_customer_type: values.commission_from_customer_type,
      commission_to_customer_type: values.commission_to_customer_type,
      commission_type:
        purchaseSalesIndentData[0]?.commission_from_supplier_type ?? "",
      commodity_details: values.commodity_details,
      document_details: values.document_details,
    };

    console.log("Data of Purchase Sales Indent:", user);
    props.updatePurchaseSalesIndentData(data, user, setSubmitting);
    return;
  };

  // console.log(
  //   "bank_name",
  //   purchaseSalesIndentData[0]?.bpo?.customer?.address?.length > 0 &&
  //     purchaseSalesIndentData[0]?.bpo?.customer?.address
  //       ?.filter((add) => add.set_as_default == 1)
  //       ?.map((add) => add.banks)?.length > 0 &&
  //     purchaseSalesIndentData[0]?.bpo?.customer?.address
  //       ?.filter((add) => add.set_as_default == 1)
  //       ?.map((add) => add.banks)[0]
  //       ?.filter((add) => add.set_as_default == 1)[0]?.bank_name
  // );

  console.log(`purchaseSalesIndentData`, purchaseSalesIndentData);

  return (
    <Card className="m-3">
      <div className="p-1 d-flex justify-content-end align-items-center">
        <span className="font-weight-bold mr-2">Navigation </span>
        <i className="ni ni-bold-right" />
        <MenuButton
          // data={props.data}
          index={id}
          options={options}
        />
      </div>
      <CardBody>
        <div style={{ overflow: "scroll" }}>
          <Table className="bg-white table">
            <thead>
              <tr>
                <th scope="col">Ref. No.</th>
                <th scope="col">Booking Date</th>
                <th scope="col">Customer</th>
                <th scope="col">Supplier</th>
                <th scope="col">Remark</th>
                <th scope="col">Quality/Quantity/Price</th>
                <th scope="col">Commission</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{purchaseSalesIndentData[0]?.bpo?.ref_no}</td>
                <td>
                  <DateFormat
                    data={purchaseSalesIndentData[0]?.bpo?.booking_date}
                  />{" "}
                </td>
                <td>
                  {purchaseSalesIndentData[0]?.bpo?.customer?.company_name}
                </td>
                <td>
                  {purchaseSalesIndentData[0]?.bpo?.supplier?.company_name}
                </td>
                <td>{purchaseSalesIndentData[0]?.bpo?.remarks}</td>
                <td>
                  {purchaseSalesIndentData[0]?.bpo?.quality}/
                  {purchaseSalesIndentData[0]?.bpo?.quantity}/
                  {purchaseSalesIndentData[0]?.bpo?.price}
                </td>

                <td>{purchaseSalesIndentData[0]?.commission_from_customer}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <hr />
        <Formik
          initialValues={{
            ref_no: purchaseSalesIndentData[0]?.ref_no ?? "",
            supplier_id: purchaseSalesIndentData[0]?.bpo?.supplier_id ?? "",
            customer_id: purchaseSalesIndentData[0]?.bpo?.customer_id ?? "",
            booking_date: purchaseSalesIndentData[0]?.bpo?.booking_date ?? "",
            company_name: purchaseSalesIndentData[0]?.company_name ?? "",
            customer_name:
              purchaseSalesIndentData[0]?.bpo?.customer?.company_name ?? "",
            customer_booking_date: "",
            suppiler:
              purchaseSalesIndentData[0]?.bpo?.supplier?.company_name ?? "",
            customer_address:
              purchaseSalesIndentData[0]?.customer_address ?? "",
            customer_bank: purchaseSalesIndentData[0]?.customer_bank ?? "",
            shipment_from: purchaseSalesIndentData[0]?.shipment_from ?? "",
            shipment_to: purchaseSalesIndentData[0]?.shipment_to ?? "",
            port_discharge_id:
              purchaseSalesIndentData[0]?.port_discharge_id ?? "",
            country_loading_id:
              purchaseSalesIndentData[0]?.country_loading_id ?? "",
            delivery_port_id:
              purchaseSalesIndentData[0]?.delivery_port_id ?? "",
            shipment_remark: purchaseSalesIndentData[0]?.shipment_remark ?? "",
            payment_advance: purchaseSalesIndentData[0]?.payment_advance ?? "",
            payment_advance_type:
              purchaseSalesIndentData[0]?.payment_advance_type ?? "",
            customer_balance_payment:
              purchaseSalesIndentData[0]?.customer_balance_payment ?? "",
            commission_from_customer:
              purchaseSalesIndentData[0]?.bpo?.commission_from_customer ?? "",
            commission_from_customer_type:
              purchaseSalesIndentData[0]?.bpo?.commission_from_customer_type ??
              "",
            commission_to_customer:
              purchaseSalesIndentData[0]?.bpo?.commission_to_customer ?? "",
            commission_to_customer_type:
              purchaseSalesIndentData[0]?.bpo?.commission_to_customer_type ??
              "",

            email_ref: false,
            psic:
              purchaseSalesIndentData[0]?.documents[0]?.document_name == "psic"
                ? 1
                : 1,
            psic_detail:
              purchaseSalesIndentData[0]?.documents[0]?.by_supplier == 1
                ? "by_supplier"
                : purchaseSalesIndentData[0]?.documents[0]?.by_metalscrap == 1
                ? "by_metalscrap"
                : purchaseSalesIndentData[0]?.documents[0]
                    ?.by_metalscrap_cost == 1
                ? "by_metalscrap_cost"
                : "",
            insurance:
              purchaseSalesIndentData[0]?.documents[1]?.document_name ==
              "insurance"
                ? 1
                : 1,
            insurance_detail:
              purchaseSalesIndentData[0]?.documents[1]?.by_supplier == 1
                ? "by_supplier"
                : purchaseSalesIndentData[0]?.documents[1]?.by_metalscrap == 1
                ? "by_metalscrap"
                : purchaseSalesIndentData[0]?.documents[1]
                    ?.by_metalscrap_cost == 1
                ? "by_metalscrap_cost"
                : "",
            form9:
              purchaseSalesIndentData[0]?.documents[2]?.document_name == "form9"
                ? 1
                : 1,
            form9_detail:
              purchaseSalesIndentData[0]?.documents[2]?.by_supplier == 1
                ? "by_supplier"
                : purchaseSalesIndentData[0]?.documents[2]?.by_metalscrap == 1
                ? "by_metalscrap"
                : purchaseSalesIndentData[0]?.documents[2]
                    ?.by_metalscrap_cost == 1
                ? "by_metalscrap_cost"
                : "",
            form6:
              purchaseSalesIndentData[0]?.documents[3]?.document_name == "form6"
                ? 1
                : 1,
            form6_detail:
              purchaseSalesIndentData[0]?.documents[3]?.by_supplier == 1
                ? "by_supplier"
                : purchaseSalesIndentData[0]?.documents[3]?.by_metalscrap == 1
                ? "by_metalscrap"
                : purchaseSalesIndentData[0]?.documents[3]
                    ?.by_metalscrap_cost == 1
                ? "by_metalscrap_cost"
                : "",

            document_details:
              // purchaseSalesIndentData[0]?.documents.length > 0
              //   ? purchaseSalesIndentData[0]?.documents
              //   :
              [
                {
                  id: purchaseSalesIndentData[0]?.documents[0]?.id ?? "",
                  document_name:
                    purchaseSalesIndentData[0]?.documents[0]?.document_name ??
                    "psic",
                  by_supplier:
                    purchaseSalesIndentData[0]?.documents[0]?.by_supplier ?? 0,
                  by_metalscrap:
                    purchaseSalesIndentData[0]?.documents[0]?.by_metalscrap ??
                    0,
                  by_metalscrap_cost:
                    purchaseSalesIndentData[0]?.documents[0]
                      ?.by_metalscrap_cost ?? 0,
                  amount:
                    purchaseSalesIndentData[0]?.documents[0]?.amount ?? 0.0,
                  amount_unit:
                    purchaseSalesIndentData[0]?.documents[0]?.amount_unit ?? "",
                  amount_type:
                    purchaseSalesIndentData[0]?.documents[0]?.amount_type ?? "",
                  remark:
                    purchaseSalesIndentData[0]?.documents[0]?.remark ?? "",
                },
                {
                  id: purchaseSalesIndentData[0]?.documents[1]?.id ?? "",
                  document_name:
                    purchaseSalesIndentData[0]?.documents[1]?.document_name ??
                    "insurance",
                  by_supplier:
                    purchaseSalesIndentData[0]?.documents[1]?.by_supplier ?? 0,
                  by_metalscrap:
                    purchaseSalesIndentData[0]?.documents[1]?.by_metalscrap ??
                    0,
                  by_metalscrap_cost:
                    purchaseSalesIndentData[0]?.documents[1]
                      ?.by_metalscrap_cost ?? 0,
                  amount:
                    purchaseSalesIndentData[0]?.documents[1]?.amount ?? 0.0,
                  amount_unit:
                    purchaseSalesIndentData[0]?.documents[1]?.amount_unit ?? "",
                  amount_type:
                    purchaseSalesIndentData[0]?.documents[1]?.amount_type ?? "",
                  remark:
                    purchaseSalesIndentData[0]?.documents[1]?.remark ?? "",
                },
                {
                  id: purchaseSalesIndentData[0]?.documents[2]?.id ?? "",
                  document_name:
                    purchaseSalesIndentData[0]?.documents[2]?.document_name ??
                    "form9",
                  by_supplier:
                    purchaseSalesIndentData[0]?.documents[2]?.by_supplier ?? 0,
                  by_metalscrap:
                    purchaseSalesIndentData[0]?.documents[2]?.by_metalscrap ??
                    0,
                  by_metalscrap_cost:
                    purchaseSalesIndentData[0]?.documents[2]
                      ?.by_metalscrap_cost ?? 0,
                  amount:
                    purchaseSalesIndentData[0]?.documents[2]?.amount ?? 0.0,
                  amount_unit:
                    purchaseSalesIndentData[0]?.documents[2]?.amount_unit ?? "",
                  amount_type:
                    purchaseSalesIndentData[0]?.documents[2]?.amount_type ?? "",
                  remark:
                    purchaseSalesIndentData[0]?.documents[2]?.remark ?? "",
                },
                {
                  id: purchaseSalesIndentData[0]?.documents[3]?.id ?? "",
                  document_name:
                    purchaseSalesIndentData[0]?.documents[3]?.document_name ??
                    "form6",
                  by_supplier:
                    purchaseSalesIndentData[0]?.documents[3]?.by_supplier ?? 0,
                  by_metalscrap:
                    purchaseSalesIndentData[0]?.documents[3]?.by_metalscrap ??
                    0,
                  by_metalscrap_cost:
                    purchaseSalesIndentData[0]?.documents[3]
                      ?.by_metalscrap_cost ?? 0,
                  amount:
                    purchaseSalesIndentData[0]?.documents[3]?.amount ?? 0.0,
                  amount_unit:
                    purchaseSalesIndentData[0]?.documents[3]?.amount_unit ?? "",
                  amount_type:
                    purchaseSalesIndentData[0]?.documents[3]?.amount_type ?? "",
                  remark:
                    purchaseSalesIndentData[0]?.documents[3]?.remark ?? "",
                },
              ],
            commodity_details:
              purchaseSalesIndentData[0]?.commodity_details.length > 0
                ? purchaseSalesIndentData[0]?.commodity_details
                : [
                    {
                      document_desc: "",
                      hs_code: "",
                      container_no: "",
                      container_size: "",
                      indent_details: [
                        {
                          commodity_id: "",
                          commodity_analysis_id: [
                            // {
                            //   id: "",
                            //   product_name: "",
                            //   analysis: "",
                            // },
                          ],
                          quantity: "",
                          quantity_unit: "",
                          price: {
                            is_lme: 0,
                            amount: "",
                            percent: "",
                            operator: "",
                            amount_unit: "",
                            quantity_unit_id: "",
                            provisional_price: "",
                            price_name: "",
                            price_analysis: [
                              // {
                              //   id: "",
                              //   product_name: "",
                              //   analysis: "",
                              // },
                            ],
                          },
                        },
                      ],
                    },
                  ],
          }}
          onSubmit={handleSubmit}
          // validationSchema={Yup.object().shape({})}
        >
          {(formProps) => {
            console.log(`formProps.vaslues`, formProps.values);
            return (
              <Form className="">
                <Row className="form-group p-2 d-flex align-items-end">
                  <Col md={3}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      id="ref_no"
                      label="Ref No"
                      name="ref_no"
                      disabled
                      value={formProps.values.ref_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.ref_no &&
                        Boolean(formProps.errors.ref_no)
                      }
                      helperText={
                        formProps.touched.ref_no && formProps.errors.ref_no
                      }
                    />
                  </Col>
                  <Col md={3}>
                    <Label className="label">Booking Date</Label>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      type="date"
                      disabled
                      id="booking_date"
                      name="booking_date"
                      value={formProps.values.booking_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.booking_date &&
                        Boolean(formProps.errors.booking_date)
                      }
                      helperText={
                        formProps.touched.booking_date &&
                        formProps.errors.booking_date
                      }
                    />
                  </Col>
                  <Col md={3}>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      id="suppiler"
                      label="Supplier"
                      name="suppiler"
                      value={formProps.values.suppiler}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.suppiler &&
                        Boolean(formProps.errors.suppiler)
                      }
                      helperText={
                        formProps.touched.suppiler && formProps.errors.suppiler
                      }
                    />
                  </Col>
                  <Col md={3}>
                    <TextField
                      fullWidth
                      select
                      variant="standard"
                      size="small"
                      id="company_name"
                      label="Company Name"
                      name="company_name"
                      value={formProps.values.company_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.company_name &&
                        Boolean(formProps.errors.company_name)
                      }
                      helperText={
                        formProps.touched.company_name &&
                        formProps.errors.company_name
                      }
                    >
                      <MenuItem>Select Company</MenuItem>
                      {props.suppiler?.map((company) => {
                        if (
                          company.group_name ==
                          purchaseSalesIndentData[0]?.bpo?.customer?.group_name
                        )
                          return (
                            <MenuItem value={company.company_name}>
                              {company.company_name}
                            </MenuItem>
                          );
                      })}
                    </TextField>
                  </Col>
                </Row>
                <hr />
                <div className="p-2">
                  <Label className="font-weight-bold">Customer Details</Label>
                  <Row className="form-group d-flex align-items-end">
                    <Col md={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="customer_name"
                        label="Customer"
                        name="customer_name"
                        disabled
                        value={formProps.values.customer_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.customer_name &&
                          Boolean(formProps.errors.customer_name)
                        }
                        helperText={
                          formProps.touched.customer_name &&
                          formProps.errors.customer_name
                        }
                      />
                    </Col>
                    <Col md={3}>
                      <Label className="label">Customer Booking Date *</Label>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        type="date"
                        id="customer_booking_date"
                        name="customer_booking_date"
                        value={formProps.values.customer_booking_date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.customer_booking_date &&
                          Boolean(formProps.errors.customer_booking_date)
                        }
                        helperText={
                          formProps.touched.customer_booking_date &&
                          formProps.errors.customer_booking_date
                        }
                      />
                    </Col>
                    <Col md={3}>
                      <TextField
                        fullWidth
                        select
                        variant="standard"
                        size="small"
                        label="Address *"
                        id="customer_address"
                        name="customer_address"
                        value={formProps.values.customer_address}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.customer_address &&
                          Boolean(formProps.errors.customer_address)
                        }
                        helperText={
                          formProps.touched.customer_address &&
                          formProps.errors.customer_address
                        }
                      >
                        {purchaseSalesIndentData[0]?.bpo?.customer?.address?.map(
                          (addr) => {
                            return (
                              <MenuItem value={addr.id} key={addr.id}>
                                {addr.address_1} {addr.address_2} {addr.pincode}
                              </MenuItem>
                            );
                          }
                        )}
                      </TextField>
                    </Col>
                    <Col md={3}>
                      <TextField
                        fullWidth
                        select
                        variant="standard"
                        size="small"
                        label="Bank *"
                        id="customer_bank"
                        name="customer_bank"
                        value={formProps.values.customer_bank}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.customer_bank &&
                          Boolean(formProps.errors.customer_bank)
                        }
                        helperText={
                          formProps.touched.customer_bank &&
                          formProps.errors.customer_bank
                        }
                      >
                        {purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter(
                            (addr) =>
                              addr.id == formProps.values.customer_address
                          )
                          .map((addr) => {
                            return addr.banks?.map((bank) => {
                              return (
                                <MenuItem value={bank.id} key={bank.id}>
                                  {bank.bank_name}
                                </MenuItem>
                              );
                            });
                          })}
                      </TextField>
                    </Col>
                  </Row>
                </div>
                <hr />
                <div className="commodity">
                  <Col md={12} className="p-0">
                    <FieldArray
                      name="commodity_details"
                      render={(arrayHelpers) => (
                        <div className="">
                          {formProps.values.commodity_details?.map(
                            (comm, index) => {
                              if (comm.container_no !== 0)
                                return (
                                  <Card className="pt-3 pl-3 pr-3 test mb-3 pb-0">
                                    <div className="d-flex justify-content-between">
                                      <Label className="font-weight-600 text-black">
                                        Commodity Details
                                      </Label>
                                      <Label className="font-weight-600 text-black">
                                        quantity should not be more than{" "}
                                        {quantity}
                                      </Label>
                                    </div>
                                    <Row className="form-group">
                                      <Col md={3}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          id={`commodity_details.${index}.document_desc`}
                                          label="Document Description *"
                                          name={`commodity_details.${index}.document_desc`}
                                          value={
                                            formProps.values.commodity_details[
                                              index
                                            ].document_desc
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>

                                      <Col md={3}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          id={`commodity_details.${index}.hs_code`}
                                          label="HS Code"
                                          name={`commodity_details.${index}.hs_code`}
                                          value={
                                            formProps.values.commodity_details[
                                              index
                                            ].hs_code
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>

                                      <Col md={3}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          type="number"
                                          id={`commodity_details.${index}.container_no`}
                                          label="Number of Container *"
                                          name={`commodity_details.${index}.container_no`}
                                          value={
                                            formProps.values.commodity_details[
                                              index
                                            ].container_no
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={3}>
                                        <TextField
                                          fullWidth
                                          select
                                          variant="standard"
                                          id={`commodity_details.${index}.container_size`}
                                          label="Container Size *"
                                          name={`commodity_details.${index}.container_size`}
                                          value={
                                            formProps.values.commodity_details[
                                              index
                                            ].container_size
                                          }
                                          onChange={formProps.handleChange}
                                        >
                                          {props.containerSize?.map((size) => (
                                            <MenuItem
                                              value={size.id}
                                              key={size.id}
                                            >
                                              {size.size}'
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                      </Col>
                                    </Row>
                                    <Col md={12} className="p-0">
                                      <FieldArray
                                        name={`commodity_details.${index}.indent_details`}
                                        render={(commidtyArrayHelper) => (
                                          <Card>
                                            {formProps.values.commodity_details[
                                              index
                                            ]?.indent_details?.map(
                                              (commod, commidtyIndex) => {
                                                // let loopBreak = false;
                                                // if (
                                                //   commod.commodity_analysis_id !==
                                                //     "" &&
                                                //   purchaseSalesIndentData[0]
                                                //     ?.commodity_details.length >
                                                //     0 &&
                                                //   loopBreak == false &&
                                                //   commod.commodity_analysis_id
                                                //     .length <= 0
                                                // ) {
                                                //   const data = JSON.parse(
                                                //     commod.commodity_analysis_id
                                                //   );
                                                //   console.log(`data`, data);

                                                //   commod.commodity_analysis_id =
                                                //     data ?? [];
                                                //   loopBreak = true;
                                                // }
                                                // console.log(
                                                //   `formProps.values`,
                                                //   formProps.values
                                                // );
                                                return (
                                                  <>
                                                    <CardBody className="bank-container mb-4">
                                                      <Row className="form-group">
                                                        <Col md={2}>
                                                          <TextField
                                                            fullWidth
                                                            select
                                                            variant="standard"
                                                            id={`commodity_details.${index}.indent_details.${commidtyIndex}.commodity_id`}
                                                            label="Commodity *"
                                                            name={`commodity_details.${index}.indent_details.${commidtyIndex}.commodity_id`}
                                                            value={
                                                              formProps.values
                                                                .commodity_details[
                                                                index
                                                              ].indent_details[
                                                                commidtyIndex
                                                              ].commodity_id
                                                            }
                                                            onChange={
                                                              formProps.handleChange
                                                            }
                                                          >
                                                            {props.commodity?.map(
                                                              (com) => (
                                                                <MenuItem
                                                                  value={com.id}
                                                                  key={com.id}
                                                                >
                                                                  {com.name}
                                                                </MenuItem>
                                                              )
                                                            )}
                                                          </TextField>
                                                        </Col>
                                                        <Col md={3}>
                                                          <Label>
                                                            Analysis *
                                                          </Label>

                                                          <FieldArray
                                                            name={`commodity_details.${index}.indent_details.${commidtyIndex}.commodity_analysis_id`}
                                                            render={(
                                                              analysisArrayHelper
                                                            ) => {
                                                              return (
                                                                <>
                                                                  <Button
                                                                    className="btn-success p-1 f-8 ml-3"
                                                                    onClick={() => {
                                                                      props.commodityAnalysis.find(
                                                                        (
                                                                          o,
                                                                          i
                                                                        ) => {
                                                                          if (
                                                                            formProps
                                                                              .values
                                                                              .commodity_details[
                                                                              index
                                                                            ]
                                                                              .indent_details[
                                                                              commidtyIndex
                                                                            ]
                                                                              .commodity_id ==
                                                                            o.commodity_id
                                                                          )
                                                                            return analysisArrayHelper.push(
                                                                              {
                                                                                id: o.id,
                                                                                product_name:
                                                                                  o.product_name,
                                                                                analysis:
                                                                                  o.analysis,
                                                                              }
                                                                            );
                                                                        }
                                                                      );
                                                                    }}
                                                                  >
                                                                    <i className="fa fa-plus " />
                                                                  </Button>
                                                                  <Table className="table">
                                                                    <thead className="bg-black text-white">
                                                                      <tr>
                                                                        <th
                                                                          scope="col"
                                                                          className="analysis-th"
                                                                        >
                                                                          Commodity
                                                                        </th>
                                                                        <th
                                                                          scope="col"
                                                                          className="analysis-th"
                                                                        >
                                                                          Analysis
                                                                        </th>
                                                                        <th
                                                                          scope="col"
                                                                          className="analysis-th"
                                                                        ></th>
                                                                      </tr>
                                                                    </thead>
                                                                    {commod?.commodity_analysis_id?.map(
                                                                      (
                                                                        ana,
                                                                        analysisIndex
                                                                      ) => {
                                                                        return (
                                                                          <tbody className="bg-white analysis-body">
                                                                            <tr>
                                                                              <td className="analysis-td">
                                                                                <Field
                                                                                  fullWidth
                                                                                  component={
                                                                                    CustomInput
                                                                                  }
                                                                                  className="bg-white"
                                                                                  id={`commodity_details.${index}.indent_details.${commidtyIndex}.commodity_analysis_id.${analysisIndex}.product_name`}
                                                                                  placeholder="Commodity"
                                                                                  name={`commodity_details.${index}.indent_details.${commidtyIndex}.commodity_analysis_id.${analysisIndex}.product_name`}
                                                                                />
                                                                              </td>
                                                                              <td className="analysis-td">
                                                                                <Field
                                                                                  className="bg-white"
                                                                                  component={
                                                                                    CustomInput
                                                                                  }
                                                                                  id={`commodity_details.${index}.indent_details.${commidtyIndex}.commodity_analysis_id.${analysisIndex}.analysis`}
                                                                                  placeholder="Analysis"
                                                                                  name={`commodity_details.${index}.indent_details.${commidtyIndex}.commodity_analysis_id.${analysisIndex}.analysis`}
                                                                                />
                                                                              </td>
                                                                              <td className="analysis-td">
                                                                                {commod
                                                                                  ?.commodity_analysis_id
                                                                                  ?.length ===
                                                                                  analysisIndex +
                                                                                    1 && (
                                                                                  <Button
                                                                                    className="btn-success p-1 f-8"
                                                                                    onClick={() => {
                                                                                      analysisArrayHelper.push(
                                                                                        {
                                                                                          id: "",
                                                                                          product_name:
                                                                                            "",
                                                                                          analysis:
                                                                                            "",
                                                                                        }
                                                                                      );
                                                                                    }}
                                                                                  >
                                                                                    <i className="fa fa-plus " />
                                                                                  </Button>
                                                                                )}
                                                                                {commod
                                                                                  ?.commodity_analysis_id
                                                                                  ?.length >
                                                                                  1 && (
                                                                                  <DeleteButton
                                                                                    deleteFunction={() =>
                                                                                      analysisArrayHelper.remove(
                                                                                        commidtyIndex
                                                                                      )
                                                                                    }
                                                                                  />
                                                                                  // <Button
                                                                                  //   color="danger p-1 f-8"
                                                                                  //   size="sm"
                                                                                  //   onClick={() =>
                                                                                  //     analysisArrayHelper.remove(
                                                                                  //       commidtyIndex
                                                                                  //     )
                                                                                  //   }
                                                                                  // >
                                                                                  //   <i className="fa fa-trash" />
                                                                                  // </Button>
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
                                                        <Col
                                                          md={3}
                                                          className=""
                                                        >
                                                          <Row className="form-group">
                                                            <Col md={6}>
                                                              <TextField
                                                                fullWidth
                                                                variant="standard"
                                                                id={`commodity_details.${index}.indent_details.${commidtyIndex}.quantity`}
                                                                label="Quantity *"
                                                                name={`commodity_details.${index}.indent_details.${commidtyIndex}.quantity`}
                                                                value={
                                                                  formProps
                                                                    .values
                                                                    .commodity_details[
                                                                    index
                                                                  ]
                                                                    .indent_details[
                                                                    commidtyIndex
                                                                  ].quantity
                                                                }
                                                                type="number"
                                                                inputProps={{
                                                                  min: 0,
                                                                  max: quantity,
                                                                }}
                                                                onChange={
                                                                  formProps.handleChange
                                                                }
                                                              />
                                                              {formProps.values
                                                                .commodity_details[
                                                                index
                                                              ].indent_details[
                                                                commidtyIndex
                                                              ].quantity_unit ==
                                                                3 && (
                                                                <div>
                                                                  Pound{" "}
                                                                  {
                                                                    formProps
                                                                      .values
                                                                      .commodity_details[
                                                                      index
                                                                    ]
                                                                      .indent_details[
                                                                      commidtyIndex
                                                                    ].quantity
                                                                  }
                                                                </div>
                                                              )}
                                                            </Col>
                                                            <Col md={6}>
                                                              <TextField
                                                                fullWidth
                                                                select
                                                                variant="standard"
                                                                id={`commodity_details.${index}.indent_details.${commidtyIndex}.quantity_unit`}
                                                                label="unit *"
                                                                name={`commodity_details.${index}.indent_details.${commidtyIndex}.quantity_unit`}
                                                                value={
                                                                  formProps
                                                                    .values
                                                                    .commodity_details[
                                                                    index
                                                                  ]
                                                                    .indent_details[
                                                                    commidtyIndex
                                                                  ]
                                                                    .quantity_unit
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
                                                                      {
                                                                        unit.name
                                                                      }
                                                                    </MenuItem>
                                                                  )
                                                                )}
                                                              </TextField>
                                                              {formProps.values
                                                                .commodity_details[
                                                                index
                                                              ].indent_details[
                                                                commidtyIndex
                                                              ].quantity_unit ==
                                                                3 && (
                                                                <div>
                                                                  MT{" "}
                                                                  {(
                                                                    formProps
                                                                      .values
                                                                      .commodity_details[
                                                                      index
                                                                    ]
                                                                      .indent_details[
                                                                      commidtyIndex
                                                                    ].quantity *
                                                                    0.000453592
                                                                  ).toFixed(4)}
                                                                </div>
                                                              )}
                                                            </Col>
                                                          </Row>
                                                        </Col>
                                                        <Col md={4}>
                                                          <Col md={12}>
                                                            <Label>
                                                              Price *
                                                            </Label>

                                                            <FormGroup>
                                                              <InputGroup>
                                                                <RadioGroup
                                                                  aria-label="psic"
                                                                  name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.is_lme`}
                                                                  onChange={
                                                                    formProps.handleChange
                                                                  }
                                                                  value={
                                                                    formProps
                                                                      .values
                                                                      .commodity_details[
                                                                      index
                                                                    ]
                                                                      .indent_details[
                                                                      commidtyIndex
                                                                    ].price
                                                                      .is_lme
                                                                  }
                                                                >
                                                                  <FormControlLabel
                                                                    value={0}
                                                                    control={
                                                                      <Radio />
                                                                    }
                                                                    label={
                                                                      formProps
                                                                        .values
                                                                        .commodity_details[
                                                                        index
                                                                      ]
                                                                        .indent_details[
                                                                        commidtyIndex
                                                                      ]
                                                                        .quantity_unit ==
                                                                      3
                                                                        ? `Fixed (PMT Price is: ${(
                                                                            2.20462 *
                                                                            1000 *
                                                                            formProps
                                                                              .values
                                                                              .commodity_details[
                                                                              index
                                                                            ]
                                                                              .indent_details[
                                                                              commidtyIndex
                                                                            ]
                                                                              .price
                                                                              .amount
                                                                          ).toFixed(
                                                                            2
                                                                          )})`
                                                                        : "Fixed"
                                                                    }
                                                                  />
                                                                  <Row className="form-group ">
                                                                    <Col
                                                                      md={4}
                                                                      className=""
                                                                    >
                                                                      <Field
                                                                        component={
                                                                          CustomInput
                                                                        }
                                                                        className=""
                                                                        id={`commodity_details.${index}.indent_details.${commidtyIndex}.price.amount`}
                                                                        label="Amount"
                                                                        name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.amount`}
                                                                        placeholder="Amount"
                                                                      />
                                                                      {commod
                                                                        ?.price
                                                                        ?.is_lme ==
                                                                        0 && (
                                                                        <span>
                                                                          *
                                                                        </span>
                                                                      )}
                                                                    </Col>

                                                                    <Col
                                                                      md={4}
                                                                      className=""
                                                                    >
                                                                      <Field
                                                                        component={
                                                                          CustomInput
                                                                        }
                                                                        className=""
                                                                        type="select"
                                                                        id={`commodity_details.${index}.indent_details.${commidtyIndex}.price.quantity_unit_id`}
                                                                        label="Amount"
                                                                        name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.quantity_unit_id`}
                                                                      >
                                                                        <option>
                                                                          Select
                                                                          Unit
                                                                        </option>
                                                                        {props.quantityUnit?.map(
                                                                          (
                                                                            unit
                                                                          ) => (
                                                                            <option
                                                                              value={
                                                                                unit.id
                                                                              }
                                                                            >
                                                                              {
                                                                                unit.name
                                                                              }
                                                                            </option>
                                                                          )
                                                                        )}
                                                                      </Field>
                                                                      {commod
                                                                        ?.price
                                                                        ?.is_lme ==
                                                                        0 && (
                                                                        <span>
                                                                          *
                                                                        </span>
                                                                      )}
                                                                    </Col>
                                                                    <Col
                                                                      md={4}
                                                                      className=""
                                                                    >
                                                                      <Field
                                                                        component={
                                                                          CustomInput
                                                                        }
                                                                        className=""
                                                                        type="select"
                                                                        id={`commodity_details.${index}.indent_details.${commidtyIndex}.price.amount_unit`}
                                                                        label="Amount"
                                                                        name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.amount_unit`}
                                                                      >
                                                                        <option value="">
                                                                          Select
                                                                          price
                                                                        </option>
                                                                        <option value="USD">
                                                                          USD
                                                                        </option>
                                                                        <option value="Euro">
                                                                          Euro
                                                                        </option>
                                                                      </Field>
                                                                      {commod
                                                                        ?.price
                                                                        ?.is_lme ==
                                                                        0 && (
                                                                        <span>
                                                                          *
                                                                        </span>
                                                                      )}
                                                                    </Col>
                                                                  </Row>
                                                                  <FormControlLabel
                                                                    value={1}
                                                                    control={
                                                                      <Radio />
                                                                    }
                                                                    label="LME"
                                                                  />
                                                                  <FormControlLabel
                                                                    value={2}
                                                                    control={
                                                                      <Radio />
                                                                    }
                                                                    label="LLME"
                                                                  />
                                                                  <Row className="form-group ">
                                                                    <Col
                                                                      md={4}
                                                                      className=""
                                                                    >
                                                                      <Field
                                                                        component={
                                                                          CustomInput
                                                                        }
                                                                        className=""
                                                                        id={`commodity_details.${index}.indent_details.${commidtyIndex}.price.percent`}
                                                                        name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.percent`}
                                                                        placeholder="LME %"
                                                                      />
                                                                      {(commod
                                                                        ?.price
                                                                        ?.is_lme ==
                                                                        1 ||
                                                                        2) && (
                                                                        <span>
                                                                          *
                                                                        </span>
                                                                      )}
                                                                    </Col>

                                                                    <Col
                                                                      md={4}
                                                                      className=""
                                                                    >
                                                                      <Field
                                                                        component={
                                                                          CustomInput
                                                                        }
                                                                        className=""
                                                                        type="select"
                                                                        id={`commodity_details.${index}.indent_details.${commidtyIndex}.price.operator`}
                                                                        label="Amount"
                                                                        name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.operator`}
                                                                      >
                                                                        <option value="">
                                                                          Select
                                                                        </option>
                                                                        <option value="+">
                                                                          +
                                                                        </option>
                                                                        <option value="-">
                                                                          -
                                                                        </option>
                                                                      </Field>
                                                                      {(commod
                                                                        ?.price
                                                                        ?.is_lme ==
                                                                        1 ||
                                                                        2) && (
                                                                        <span>
                                                                          *
                                                                        </span>
                                                                      )}
                                                                    </Col>
                                                                    <Col
                                                                      md={4}
                                                                      className=""
                                                                    >
                                                                      <Field
                                                                        component={
                                                                          CustomInput
                                                                        }
                                                                        className=""
                                                                        type="select"
                                                                        id={`commodity_details.${index}.indent_details.${commidtyIndex}.price.amount_unit`}
                                                                        label="Amount"
                                                                        name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.amount_unit`}
                                                                      >
                                                                        <option value="">
                                                                          Select
                                                                          price
                                                                        </option>
                                                                        <option value="USD">
                                                                          USD
                                                                        </option>
                                                                        <option value="Euro">
                                                                          Euro
                                                                        </option>
                                                                      </Field>
                                                                      {(commod
                                                                        ?.price
                                                                        ?.is_lme ==
                                                                        1 ||
                                                                        2) && (
                                                                        <span>
                                                                          *
                                                                        </span>
                                                                      )}
                                                                    </Col>
                                                                  </Row>
                                                                  <Row className="form-group">
                                                                    <Col
                                                                      md={6}
                                                                      className=""
                                                                    >
                                                                      <Field
                                                                        component={
                                                                          CustomInput
                                                                        }
                                                                        className=""
                                                                        id={`commodity_details.${index}.indent_details.${commidtyIndex}.price.provisional_price`}
                                                                        name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.provisional_price`}
                                                                        placeholder="Provisional Price"
                                                                      />
                                                                    </Col>
                                                                    <Col
                                                                      md={6}
                                                                      className=""
                                                                    >
                                                                      <Field
                                                                        component={
                                                                          CustomInput
                                                                        }
                                                                        className=""
                                                                        id={`commodity_details.${index}.indent_details.${commidtyIndex}.price.price_name`}
                                                                        name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.price_name`}
                                                                        placeholder="Price Name"
                                                                      />
                                                                    </Col>
                                                                  </Row>
                                                                </RadioGroup>
                                                              </InputGroup>
                                                            </FormGroup>
                                                          </Col>
                                                          <Col md={12}>
                                                            <Label>
                                                              LME Rate{" "}
                                                              {commod?.price
                                                                ?.is_lme ==
                                                                1 && (
                                                                <span>*</span>
                                                              )}
                                                            </Label>
                                                            <FieldArray
                                                              name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.price_analysis`}
                                                              render={(
                                                                lmeArrayHelper
                                                              ) => {
                                                                return (
                                                                  <>
                                                                    {commod
                                                                      ?.price
                                                                      ?.is_lme ==
                                                                      1 && (
                                                                      <Button
                                                                        className="btn-success p-1 f-8 ml-3"
                                                                        onClick={() => {
                                                                          props.commodityAnalysis.find(
                                                                            (
                                                                              o,
                                                                              i
                                                                            ) => {
                                                                              if (
                                                                                formProps
                                                                                  .values
                                                                                  .commodity_details[
                                                                                  index
                                                                                ]
                                                                                  .indent_details[
                                                                                  commidtyIndex
                                                                                ]
                                                                                  .commodity_id ==
                                                                                o.commodity_id
                                                                              )
                                                                                return lmeArrayHelper.push(
                                                                                  {
                                                                                    id: o.id,
                                                                                    product_name:
                                                                                      o.product_name,
                                                                                    percent:
                                                                                      o.analysis,
                                                                                    commodity_id:
                                                                                      o.commodity_id,
                                                                                  }
                                                                                );
                                                                            }
                                                                          );
                                                                        }}
                                                                      >
                                                                        <i className="fa fa-plus " />
                                                                      </Button>
                                                                    )}
                                                                    <Table className="table">
                                                                      <thead className="bg-black text-white">
                                                                        <tr>
                                                                          <th
                                                                            scope="col"
                                                                            className="analysis-th"
                                                                          >
                                                                            Commodity
                                                                          </th>
                                                                          <th
                                                                            scope="col"
                                                                            className="analysis-th"
                                                                          >
                                                                            Percentage
                                                                          </th>
                                                                          <th
                                                                            scope="col"
                                                                            className="analysis-th"
                                                                          ></th>
                                                                        </tr>
                                                                      </thead>
                                                                      {commod?.price?.price_analysis?.map(
                                                                        (
                                                                          lme,
                                                                          lmeIndex
                                                                        ) => {
                                                                          return (
                                                                            <tbody className="bg-white analysis-body">
                                                                              <tr>
                                                                                <td className="analysis-td">
                                                                                  <Field
                                                                                    component={
                                                                                      CustomInput
                                                                                    }
                                                                                    className="bg-white"
                                                                                    id={`commodity_details.${index}.indent_details.${commidtyIndex}.price.price_analysis.${lmeIndex}.product_name`}
                                                                                    placeholder="Commodity"
                                                                                    name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.price_analysis.${lmeIndex}.product_name`}
                                                                                  />
                                                                                </td>
                                                                                <td className="analysis-td">
                                                                                  <Field
                                                                                    className="bg-white"
                                                                                    component={
                                                                                      CustomInput
                                                                                    }
                                                                                    id={`commodity_details.${index}.indent_details.${commidtyIndex}.price.price_analysis.${lmeIndex}.percent`}
                                                                                    placeholder="Percentage"
                                                                                    name={`commodity_details.${index}.indent_details.${commidtyIndex}.price.price_analysis.${lmeIndex}.percent`}
                                                                                  />
                                                                                </td>
                                                                                <td className="analysis-td d-flex align-items-center">
                                                                                  {commod
                                                                                    ?.price
                                                                                    ?.price_analysis
                                                                                    ?.length ===
                                                                                    lmeIndex +
                                                                                      1 && (
                                                                                    <Button
                                                                                      className="btn-success p-1 f-8"
                                                                                      onClick={() => {
                                                                                        lmeArrayHelper.push(
                                                                                          {
                                                                                            id: "",
                                                                                            product_name:
                                                                                              "",
                                                                                            percent:
                                                                                              "",
                                                                                          }
                                                                                        );
                                                                                      }}
                                                                                    >
                                                                                      <i className="fa fa-plus" />
                                                                                    </Button>
                                                                                  )}
                                                                                  {commod
                                                                                    ?.price
                                                                                    ?.price_analysis
                                                                                    ?.length >
                                                                                    1 && (
                                                                                    <DeleteButton
                                                                                      deleteFunction={() =>
                                                                                        lmeArrayHelper.remove(
                                                                                          commidtyIndex
                                                                                        )
                                                                                      }
                                                                                    />
                                                                                    // <Button
                                                                                    //   color="danger p-1 f-8"
                                                                                    //   size="sm"
                                                                                    //   onClick={() =>
                                                                                    //     lmeArrayHelper.remove(
                                                                                    //       commidtyIndex
                                                                                    //     )
                                                                                    //   }
                                                                                    // >
                                                                                    //   <i className="fa fa-trash" />
                                                                                    // </Button>
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
                                                        </Col>
                                                      </Row>
                                                    </CardBody>

                                                    <CardFooter className="d-flex justify-content-end align-items-center p-2 pb-0">
                                                      {comm.indent_details
                                                        ?.length ===
                                                        commidtyIndex + 1 && (
                                                        <Button
                                                          className="btn-success p-1 "
                                                          onClick={() => {
                                                            commidtyArrayHelper.push(
                                                              {
                                                                commodity_id:
                                                                  "",
                                                                commodity_analysis_id:
                                                                  [
                                                                    // {
                                                                    //   id: "",
                                                                    //   product_name:
                                                                    //     "",
                                                                    //   analysis:
                                                                    //     "",
                                                                    // },
                                                                  ],
                                                                quantity: "",
                                                                quantity_unit:
                                                                  "",
                                                                price: {
                                                                  is_lme: 0,
                                                                  amount: "",
                                                                  percent: "",
                                                                  operator: "",
                                                                  amount_unit:
                                                                    "",
                                                                  quantity_unit_id:
                                                                    "",
                                                                  price_analysis:
                                                                    [
                                                                      // {
                                                                      //   id: "",
                                                                      //   product_name:
                                                                      //     "",
                                                                      //   analysis:
                                                                      //     "",
                                                                      // },
                                                                    ],
                                                                },
                                                              }
                                                            );
                                                          }}
                                                        >
                                                          <i className="fa fa-plus" />
                                                        </Button>
                                                      )}

                                                      {comm.indent_details
                                                        ?.length > 1 && (
                                                        <DeleteButton
                                                          deleteFunction={() =>
                                                            commidtyArrayHelper.remove(
                                                              commidtyIndex
                                                            )
                                                          }
                                                        />
                                                        // <Button
                                                        //   color="danger p-1"
                                                        //   size="sm"
                                                        //   onClick={() =>
                                                        //     commidtyArrayHelper.remove(
                                                        //       commidtyIndex
                                                        //     )
                                                        //   }
                                                        // >
                                                        //   <i className="fa fa-trash" />
                                                        // </Button>
                                                      )}
                                                    </CardFooter>
                                                  </>
                                                );
                                              }
                                            )}
                                          </Card>
                                        )}
                                      />
                                    </Col>
                                    <CardFooter className="d-flex justify-content-end align-items-center p-2 pb-0">
                                      {formProps.values.commodity_details
                                        .length ===
                                        index + 1 && (
                                        <Button
                                          className="btn-success p-1 "
                                          onClick={() => {
                                            arrayHelpers.push({
                                              document_desc: "",
                                              hs_code: "",
                                              container_no: "",
                                              container_size: "",
                                              indent_details: [
                                                {
                                                  commodity_id: "",
                                                  commodity_analysis_id: [
                                                    // {
                                                    //   id: "",
                                                    //   product_name: "",
                                                    //   analysis: "",
                                                    // },
                                                  ],
                                                  quantity: "",
                                                  quantity_unit: "",
                                                  price: {
                                                    is_lme: 0,
                                                    amount: "",
                                                    percent: "",
                                                    operator: "",
                                                    amount_unit: "",
                                                    quantity_unit_id: "",
                                                    price_analysis: [
                                                      // {
                                                      //   id: "",
                                                      //   product_name:
                                                      //     "",
                                                      //   analysis:
                                                      //     "",
                                                      // },
                                                    ],
                                                  },
                                                },
                                              ],
                                            });
                                          }}
                                        >
                                          <i className="fa fa-plus" />
                                        </Button>
                                      )}

                                      {formProps.values.commodity_details
                                        ?.length > 1 && (
                                        <DeleteButton
                                          deleteFunction={() =>
                                            formProps.setFieldValue(
                                              `commodity_details.${index}.container_no`,
                                              0
                                            )
                                          }
                                        />
                                        // <Button
                                        //   color="danger p-1"
                                        //   size="sm"
                                        //   onClick={
                                        //     () =>
                                        //       formProps.setFieldValue(
                                        //         `commodity_details.${index}.container_no`,
                                        //         0
                                        //       )
                                        //     // arrayHelpers.remove(index)
                                        //   }
                                        // >
                                        //   <i className="fa fa-trash" />
                                        // </Button>
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
                </div>
                <hr />
                <div className="p-2">
                  <Label className="font-weight-bold">Shipment Details</Label>
                  <Row className="form-group d-flex align-items-end">
                    <Col md={2}>
                      <Label className="label">Shipment Period From</Label>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        type="date"
                        id="shipment_from"
                        name="shipment_from"
                        value={formProps.values.shipment_from}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.shipment_from &&
                          Boolean(formProps.errors.shipment_from)
                        }
                        helperText={
                          formProps.touched.shipment_from &&
                          formProps.errors.shipment_from
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <Label className="label">Shipment Period To</Label>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        type="date"
                        id="shipment_to"
                        name="shipment_to"
                        value={formProps.values.shipment_to}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.shipment_to &&
                          Boolean(formProps.errors.shipment_to)
                        }
                        helperText={
                          formProps.touched.shipment_to &&
                          formProps.errors.shipment_to
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <TextField
                        fullWidth
                        select
                        variant="standard"
                        size="small"
                        label="Port of Discharge"
                        id="port_discharge_id"
                        name="port_discharge_id"
                        value={formProps.values.port_discharge_id}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.port_discharge_id &&
                          Boolean(formProps.errors.port_discharge_id)
                        }
                        helperText={
                          formProps.touched.port_discharge_id &&
                          formProps.errors.port_discharge_id
                        }
                      >
                        {props.portDischarge?.map((port) => (
                          <MenuItem value={port.id}>{port.name}</MenuItem>
                        ))}
                      </TextField>
                    </Col>
                    <Col md={2}>
                      <TextField
                        fullWidth
                        select
                        variant="standard"
                        size="small"
                        label="Country Loading"
                        id="country_loading_id"
                        name="country_loading_id"
                        value={formProps.values.country_loading_id}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.country_loading_id &&
                          Boolean(formProps.errors.country_loading_id)
                        }
                        helperText={
                          formProps.touched.country_loading_id &&
                          formProps.errors.country_loading_id
                        }
                      >
                        {props.portLoading.map((port) => (
                          <MenuItem value={port.id}>{port.name}</MenuItem>
                        ))}
                      </TextField>
                    </Col>
                    <Col md={2}>
                      <TextField
                        select
                        fullWidth
                        variant="standard"
                        size="small"
                        label="Final Port of Delivery"
                        id="delivery_port_id"
                        name="delivery_port_id"
                        value={formProps.values.delivery_port_id}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.delivery_port_id &&
                          Boolean(formProps.errors.delivery_port_id)
                        }
                        helperText={
                          formProps.touched.delivery_port_id &&
                          formProps.errors.delivery_port_id
                        }
                      >
                        {props.portDelivery?.map((port) => (
                          <MenuItem value={port.id}>{port.name}</MenuItem>
                        ))}
                      </TextField>
                    </Col>
                    <Col md={2}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        label="Shipment Remarks"
                        id="shipment_remark"
                        name="shipment_remark"
                        value={formProps.values.shipment_remark}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.shipment_remark &&
                          Boolean(formProps.errors.shipment_remark)
                        }
                        helperText={
                          formProps.touched.shipment_remark &&
                          formProps.errors.shipment_remark
                        }
                      />
                    </Col>
                  </Row>
                </div>
                <hr />
                <div className="p-2">
                  <Label className="font-weight-bold">Payment Terms</Label>
                  <Row className="form-group">
                    <Col md={1}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        label="Advance"
                        id="payment_advance"
                        name="payment_advance"
                        value={formProps.values.payment_advance}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.payment_advance &&
                          Boolean(formProps.errors.payment_advance)
                        }
                        helperText={
                          formProps.touched.payment_advance &&
                          formProps.errors.payment_advance
                        }
                      />
                    </Col>
                    <Col md={1}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        select
                        label="unit"
                        id="payment_advance_type"
                        name="payment_advance_type"
                        value={formProps.values.payment_advance_type}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.payment_advance_type &&
                          Boolean(formProps.errors.payment_advance_type)
                        }
                        helperText={
                          formProps.touched.payment_advance_type &&
                          formProps.errors.payment_advance_type
                        }
                      >
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="%">%</MenuItem>
                      </TextField>
                    </Col>
                    <Col md={2}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        label="Balance Payment"
                        id="customer_balance_payment"
                        name="customer_balance_payment"
                        value={formProps.values.customer_balance_payment}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.customer_balance_payment &&
                          Boolean(formProps.errors.customer_balance_payment)
                        }
                        helperText={
                          formProps.touched.customer_balance_payment &&
                          formProps.errors.customer_balance_payment
                        }
                      />
                    </Col>
                    <Col md={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        label="Commission from Customer"
                        id="commission_from_customer"
                        disabled
                        name="commission_from_customer"
                        value={formProps.values.commission_from_customer}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.commission_from_customer &&
                          Boolean(formProps.errors.commission_from_customer)
                        }
                        helperText={
                          formProps.touched.commission_from_customer &&
                          formProps.errors.commission_from_customer
                        }
                      />
                    </Col>
                    <Col md={1}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        select
                        label="Unit"
                        disabled
                        id="commission_from_customer_type"
                        name="commission_from_customer_type"
                        value={formProps.values.commission_from_customer_type}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.commission_from_customer_type &&
                          Boolean(
                            formProps.errors.commission_from_customer_type
                          )
                        }
                        helperText={
                          formProps.touched.commission_from_customer_type &&
                          formProps.errors.commission_from_customer_type
                        }
                      >
                        <MenuItem value="Per Pound">Per Pound</MenuItem>
                        <MenuItem value="PMT">PMT</MenuItem>
                      </TextField>
                    </Col>
                    <Col md={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        disabled
                        label="Commission to Customer"
                        id="commission_to_customer"
                        name="commission_to_customer"
                        value={formProps.values.commission_to_customer}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.commission_to_customer &&
                          Boolean(formProps.errors.commission_to_customer)
                        }
                        helperText={
                          formProps.touched.commission_to_customer &&
                          formProps.errors.commission_to_customer
                        }
                      />
                    </Col>
                    <Col md={1}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        select
                        disabled
                        label="Unit"
                        id="commission_to_customer_type"
                        name="commission_to_customer_type"
                        value={formProps.values.commission_to_customer_type}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.commission_to_customer_type &&
                          Boolean(formProps.errors.commission_to_customer_type)
                        }
                        helperText={
                          formProps.touched.commission_to_customer_type &&
                          formProps.errors.commission_to_customer_type
                        }
                      >
                        <MenuItem value="Per Pound">Per Pound</MenuItem>
                        <MenuItem value="PMT">PMT</MenuItem>
                      </TextField>
                    </Col>
                  </Row>
                </div>
                <hr />
                <div className="p-2 d-flex flex-column">
                  <Label>Documents Required*</Label>
                  <Label>Original Document required in bank</Label>
                  <div className="d-flex justify-content-between p-2">
                    <div className="d-flex flex-column">
                      <Label className="">
                        1. PSIC :{" "}
                        {formProps.values.psic_detail == "by_metalscrap_cost"
                          ? "By Metalscrap(Additional Cost borne by supplier)"
                          : formProps.values.psic_detail == "by_metalscrap"
                          ? "By Metalscrap(No additional cost)"
                          : formProps.values.psic_detail == "by_supplier"
                          ? "By Supplier"
                          : ""}
                      </Label>
                      {formProps.values.psic_detail == "by_metalscrap_cost" ? (
                        <div className="p-2 d-flex flex-column">
                          <Label>
                            {" "}
                            1.1. Additional Cost :{" "}
                            {formProps.values.document_details[0]?.amount}
                          </Label>
                          <Label>
                            {" "}
                            1.2. Currency :{" "}
                            {formProps.values.document_details[0]?.amount_unit}
                          </Label>
                          <Label>
                            {" "}
                            1.3. Price Type :{" "}
                            {formProps.values.document_details[0]?.amount_type}
                          </Label>
                          <Label>
                            {" "}
                            1.4. Price Remark :{" "}
                            {formProps.values.document_details[0]?.remark}
                          </Label>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="d-flex flex-column">
                      <Label className="">
                        2. Insurance :{" "}
                        {formProps.values.insurance_detail == "by_metalscrap"
                          ? "Metalscrap"
                          : formProps.values.insurance_detail == "by_supplier"
                          ? "Supplier"
                          : ""}
                      </Label>
                    </div>
                    <div className="d-flex flex-column">
                      <Label className="">
                        3. Form 9 :{" "}
                        {formProps.values.form9_detail == "by_metalscrap"
                          ? "Metalscrap"
                          : formProps.values.form9_detail == "by_supplier"
                          ? "Supplier"
                          : ""}
                      </Label>
                    </div>

                    <div className="d-flex flex-column">
                      <Label className="">
                        4. Form 6 :{" "}
                        {formProps.values.form6_detail == "by_metalscrap"
                          ? "Metalscrap"
                          : formProps.values.form6_detail == "by_supplier"
                          ? "Supplier"
                          : ""}
                      </Label>
                    </div>
                  </div>
                </div>
                <hr />
                <Card className="m-2 test">
                  <CardHeader className="email-ref">
                    <Label>Email Reference</Label>
                    <Button
                      className="btn float-right p-1"
                      onClick={(event) =>
                        formProps.setFieldValue(
                          `email_ref`,
                          !formProps.values.email_ref
                        )
                      }
                    >
                      <i className="fa fa-plus text-blue" />
                    </Button>
                  </CardHeader>
                  {formProps.values.email_ref && (
                    <CardBody className="email-ref">
                      <EmailRef
                        orderId={purchaseSalesIndentData[0]?.bpo?.id}
                        data={purchaseSalesIndentData[0]?.bpo}
                      />
                    </CardBody>
                  )}
                </Card>
                <Row style={{ justifyContent: "center" }}>
                  <Col md={2}>
                    <Button type="reset" color="danger" block>
                      <b>Reset</b>
                    </Button>
                  </Col>
                  <Col md={2}>
                    <WordsDocsEditCreateSalesIndents
                      print
                      purchaseSalesIndentData={purchaseSalesIndentData[0]}
                      ref_no={formProps.values.ref_no}
                      customer_name={
                        purchaseSalesIndentData[0]?.bpo?.customer
                          ?.company_name ?? ""
                      }
                      customer_address={customer_main_Address}
                      customer_pan={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.pan_number)[0]
                      }
                      customer_gst={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.gst_number)[0]
                      }
                      customer_iec={
                        purchaseSalesIndentData[0]?.bpo?.customer?.iec_no
                      }
                      customer_vat={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.vat)[0]
                      }
                      customer_email={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.email)[0]
                      }
                      bank_name={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)[0]
                          ?.filter((add) => add.set_as_default == 1)[0]
                          ?.bank_name
                      }
                      bank_address={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)[0]
                          ?.filter((add) => add.set_as_default == 1)[0]
                          ?.branch_name
                      }
                      account_no={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)[0]
                          ?.filter((add) => add.set_as_default == 1)[0]
                          ?.account_no
                      }
                      swift_no={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)[0]
                          ?.filter((add) => add.set_as_default == 1)[0]
                          ?.swift_no
                      }
                      ifsc_code={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)[0]
                          ?.filter((add) => add.set_as_default == 1)[0]
                          ?.ifsc_code
                      }
                      iban_no={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)[0]
                          ?.filter((add) => add.set_as_default == 1)[0]
                          ?.iban_number
                      }
                      contact_person={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)[0]
                          ?.filter((add) => add.set_as_default == 1)[0]
                          ?.bank_contact_person
                      }
                      phone_no={
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)?.length > 0 &&
                        purchaseSalesIndentData[0]?.bpo?.customer?.address
                          ?.filter((add) => add.set_as_default == 1)
                          ?.map((add) => add.banks)[0]
                          ?.filter((add) => add.set_as_default == 1)[0]?.phone
                      }
                      item_name={purchaseSalesIndentData[0]?.bpo?.quality}
                      bl_desc={
                        purchaseSalesIndentData[0]?.commodity_details?.length >
                          0 &&
                        purchaseSalesIndentData[0]?.commodity_details[0]
                          ?.document_desc
                      }
                      tonnage={`${
                        purchaseSalesIndentData[0]?.commodity_details.length >
                          0 &&
                        purchaseSalesIndentData[0]?.commodity_details[0]
                          ?.container_no
                      } FCL, ${purchaseSalesIndentData[0]?.bpo?.quantity} ${
                        props.quantityUnit
                          ?.filter(
                            (q) =>
                              q.id ==
                              purchaseSalesIndentData[0]?.bpo?.quantity_type
                          )
                          .map((q) => q.name)[0]
                      }`}
                      price={purchaseSalesIndentData[0]?.prices}
                      commission={`${purchaseSalesIndentData[0]?.bpo?.commission_from_customer} ${purchaseSalesIndentData[0]?.bpo?.commission_from_customer_type}`}
                      discharge={
                        props.portDischarge?.filter(
                          (d) => d.id == formProps.values.port_discharge_id
                        )[0]?.name
                      }
                      delivery={
                        props.portDelivery?.filter(
                          (d) => d.id == formProps.values.delivery_port_id
                        )[0]?.name
                      }
                      payment_advance={
                        purchaseSalesIndentData[0]?.payment_advance_type == "%"
                          ? Number(
                              purchaseSalesIndentData[0]?.payment_advance
                            ).toFixed(2) + " %"
                          : Number(
                              purchaseSalesIndentData[0]?.payment_advance
                            ).toFixed(2) + " USD"
                      }
                      balance={formProps.values.customer_balance_payment}
                      shipper_name={
                        purchaseSalesIndentData[0]?.bpo?.shipper_name ??
                        purchaseSalesIndentData[0]?.bpo?.supplier?.company_name
                      }
                      commodity={purchaseSalesIndentData[0]?.commodities}
                      hs_code={
                        purchaseSalesIndentData[0]?.commodity_details?.length >
                        0
                          ? purchaseSalesIndentData[0]?.commodity_details[0]
                              ?.hs_code
                          : ""
                      }
                      shipping_period={`${
                        formProps.values.shipment_from &&
                        dateFormat(formProps.values.shipment_from, "dd-mm-yyyy")
                      } - ${
                        formProps.values.shipment_to &&
                        dateFormat(formProps.values.shipment_to, "dd-mm-yyyy")
                      }`}
                      shippment_remark={formProps.values.shipment_remark}
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
        {props.purchaseSalesIndent?.isUpdateLoading && <LoaderLiner />}
      </CardFooter>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    portLoading: state.portLoading.portLoading,
    portDischarge: state.portDischarge.portDischarge,
    portDelivery: state.portDelivery.portDelivery,
    commodityAnalysis: state.commodityAnalysis.commodityAnalysis,
    commodity: state.commodity.commodity,
    containerSize: state.containerSize.containerSize,
    suppiler: state.suppiler.suppiler,
    city: state.city.city,
    country: state.country.country,
    states: state.state.state,
    login: state.login,
    purchaseOrder: state.purchaseOrder,
    commissionUnit: state.commissionUnit.commissionUnit,
    priceUnit: state.priceUnit.priceUnit,
    quantityUnit: state.quantityUnit.quantityUnit,
    purchaseSalesIndent: state.purchaseSalesIndent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCommissionUnitGetData: (data) =>
      dispatch(actions.commissionUnitGetData(data)),
    onPortDischargeGetData: (data) =>
      dispatch(actions.portDischargeGetData(data)),
    onQuantityUnitGetData: (data) =>
      dispatch(actions.quantityUnitGetData(data)),
    onPortLoadingGetData: (data) => dispatch(actions.portLoadingGetData(data)),
    onPortDeliveryGetData: (data) =>
      dispatch(actions.portDeliveryGetData(data)),
    onCommodityAnalysisGetData: (data) =>
      dispatch(actions.commodityAnalysisGetData(data)),
    onCommodityGetData: (data) => dispatch(actions.commodityGetData(data)),
    onContainerSizeGetData: (data) =>
      dispatch(actions.containerSizeGetData(data)),
    onSupplierGetData: (data) => dispatch(actions.suppilerGetData(data)),
    onPurchaseSalesIndentGetData: (data) =>
      dispatch(actions.purchaseSalesIndentGetData(data)),
    onDeletePurchaseSalesIndent: (id, data) =>
      dispatch(actions.deletePurchaseSalesIndent(id, data)),
    onPostPurchaseSalesIndentData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postPurchaseSalesIndentData(data, user, toggle, setSubmitting)
      ),
    updatePurchaseSalesIndentData: (data, user, setSubmitting) =>
      dispatch(
        actions.updatePurchaseSalesIndentData(data, user, setSubmitting)
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCreateSalesIndents);
