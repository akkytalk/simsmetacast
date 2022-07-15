/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import * as actions from "../../../redux/creators";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import {
  Button,
  Row,
  Col,
  Label,
  InputGroup,
  Card,
  CardBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import MenuItem from "@mui/material/MenuItem";
import { Checkbox, FormControlLabel } from "@mui/material";
import * as Yup from "yup";
import LinerLoader from "components/Loaders/LinerLoader";
import Form9 from "../../wordDocuments/Form9";
import Form6 from "../../wordDocuments/Form6";
import Frieght from "../../wordDocuments/Frieght";
import PrintOrigin from "../../wordDocuments/PrintOrigin";
import Psic from "../../wordDocuments/Psic";
import BillLoading from "../../wordDocuments/BillLoading";

function Couriers({ purchaseSalesIndentData, ...props }) {
  const invoiceData =
    props.invoice?.invoice?.filter((c) => c.loading_detail_id == props.data.id)
      .length > 0
      ? props.invoice?.invoice.filter(
          (c) => c.loading_detail_id == props.data.id
        )[0]
      : [];
  const courierData =
    props.courier?.courier?.filter((c) => c.invoice_id == invoiceData?.id)
      .length > 0
      ? props.courier?.courier.filter((c) => c.invoice_id == invoiceData?.id)[0]
      : [];
  const fileUploadData =
    props.fileUpload?.fileUpload?.filter(
      (c) => c.order_id == purchaseSalesIndentData[0]?.bpo?.id
    ).length > 0
      ? props.fileUpload?.fileUpload.filter(
          (c) => c.order_id == purchaseSalesIndentData[0]?.bpo?.id
        )
      : [];
  let data = {
    token: props.login?.login?.token,
    id: courierData?.id,
  };

  useEffect(() => {
    props.invoiceGetData(data);
    props.courierGetData(data);
    props.onFileUploadGetData(data);
  }, []);

  const price_details =
    purchaseSalesIndentData[0]?.commodity_details?.filter(
      (c) => c.indent_details
    ).length > 0
      ? purchaseSalesIndentData[0]?.commodity_details?.filter(
          (c) => c.indent_details
        )
      : [];

  const actual_quantity =
    price_details?.length > 0
      ? price_details?.reduce((acc, curr) => {
          return (
            acc +
            curr.indent_details?.reduce((ac, cur) => {
              return ac + Number(cur?.quantity);
            }, 0)
          );
        }, 0)
      : 0;

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

  const supplier_id = purchaseSalesIndentData[0]?.bpo?.supplier_id ?? "";

  const supplierData =
    props.suppiler?.filter((s) => s.id == supplier_id)?.length > 0
      ? props.suppiler?.filter((s) => s.id == supplier_id)[0]
      : {};

  const supplier_default_address = supplierData?.default_address ?? "";
  const supplier_city_id = supplier_default_address?.city_id ?? "";
  const supplier_state_id = supplier_default_address?.state_id ?? "";
  const supplier_country_id = supplier_default_address?.country_id ?? "";

  const supplier_cityData =
    props.city?.filter((s) => s.id == supplier_city_id).length > 0
      ? props.city?.filter((s) => s.id == supplier_city_id)[0]?.name
      : "";
  const supplier_stateData =
    props.states?.filter((s) => s.id == supplier_state_id)?.length > 0
      ? props.states?.filter((s) => s.id == supplier_state_id)[0]?.name
      : "";
  const supplier_countryData =
    props.country?.filter((s) => s.id == supplier_country_id)?.length > 0
      ? props.country?.filter((s) => s.id == supplier_country_id)[0]?.name
      : "";

  const supplier_main_Address =
    supplier_default_address?.address_1 +
    " " +
    supplier_default_address?.address_2 +
    " " +
    supplier_cityData +
    " " +
    supplier_stateData +
    " " +
    supplier_countryData;

  // console.log("customer_main_Address", customer_main_Address);
  // console.log("supplier_main_Address", supplier_main_Address);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Claims:", values);
    setSubmitting(true);

    let user =
      courierData.length > 0
        ? {
            invoice_id: values.invoice_id,
            courier_company: values.courier_company,
            courier_company_type: values.courier_company_type,
            airways_no: values.airways_no,
            payment_status: values.payment_status,
            packing_list: values.packing_list,
            coo: values.coo,
            insurance: values.insurance,
            freight_certificate: values.freight_certificate,
            paid_date: values.paid_date,
          }
        : {
            id: courierData?.id,
            invoice_id: values.invoice_id,
            courier_company: values.courier_company,
            courier_company_type: values.courier_company_type,
            airways_no: values.airways_no,
            payment_status: values.payment_status,
            packing_list: values.packing_list,
            coo: values.coo,
            insurance: values.insurance,
            freight_certificate: values.freight_certificate,
            paid_date: values.paid_date,
          };

    console.log("Data of Couriers:", user);
    props.onPostCourierData(data, user, setSubmitting);
    //   : props.updateCourierData(data, user, setSubmitting);
    return;
  };
  // console.log("fileUploadData", props.containerSize);

  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={{
            invoice_id: invoiceData?.id ?? "",
            courier_company: courierData?.courier_company ?? "",
            courier_company_type: courierData?.courier_company_type ?? "",
            airways_no: courierData?.airways_no ?? "",
            payment_status: courierData?.payment_status ?? "",
            paid_date: courierData?.paid_date ?? "",
            packing_list: courierData?.packing_list ?? 0,
            coo: courierData?.coo ?? 0,
            insurance: courierData?.insurance ?? 0,
            freight_certificate: courierData?.freight_certificate ?? 0,
          }}
          validationSchema={Yup.object().shape({
            courier_company: Yup.string().required("Required"),
            airways_no: Yup.string().required("Required"),
            payment_status: Yup.string().required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          {(formProps) => {
            return (
              <Form>
                {console.log(`formProps.values courier`, formProps.values)}
                <Label>Document:</Label>
                <Row className="form-group">
                  <Col md={3}>
                    <FormGroup>
                      <InputGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              sx={{
                                "& .MuiSvgIcon-root": { fontSize: 25 },
                              }}
                              name="packing_list"
                              id="packing_list"
                              checked={
                                formProps.values.packing_list == 1
                                  ? true
                                  : false
                              }
                              onChange={(event) => {
                                formProps.setFieldValue(
                                  `packing_list`,
                                  event.target.value
                                );
                              }}
                              value={formProps.values.packing_list == 1 ? 0 : 1}
                            />
                          }
                          label="Packing List"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>

                  <Col md={3}>
                    <FormGroup>
                      <InputGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              sx={{
                                "& .MuiSvgIcon-root": { fontSize: 25 },
                              }}
                              name="coo"
                              id="coo"
                              checked={formProps.values.coo == 1 ? true : false}
                              onChange={(event) => {
                                formProps.setFieldValue(
                                  `coo`,
                                  event.target.value
                                );
                              }}
                              value={formProps.values.coo == 1 ? 0 : 1}
                            />
                          }
                          label="Certificate of Origin"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <InputGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              sx={{
                                "& .MuiSvgIcon-root": { fontSize: 25 },
                              }}
                              name="insurance"
                              id="insurance"
                              checked={
                                formProps.values.insurance == 1 ? true : false
                              }
                              onChange={(event) => {
                                formProps.setFieldValue(
                                  `insurance`,
                                  event.target.value
                                );
                              }}
                              value={formProps.values.insurance == 1 ? 0 : 1}
                            />
                          }
                          label="Insurance"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <InputGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              sx={{
                                "& .MuiSvgIcon-root": { fontSize: 25 },
                              }}
                              name="freight_certificate"
                              id="freight_certificate"
                              checked={
                                formProps.values.freight_certificate == 1
                                  ? true
                                  : false
                              }
                              onChange={(event) => {
                                formProps.setFieldValue(
                                  `freight_certificate`,
                                  event.target.value
                                );
                              }}
                              value={
                                formProps.values.freight_certificate == 1
                                  ? 0
                                  : 1
                              }
                            />
                          }
                          label="Freight Certificate"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="form-group d-flex">
                  <BillLoading
                    data={props.data}
                    purchaseSalesIndentData={props.purchaseSalesIndentData}
                    ref_no={purchaseSalesIndentData[0]?.ref_no}
                    received_quantity={props.data?.quantity_sum}
                    bl_no={props.data?.bi_no}
                    shipping_line={props.data?.shipping_company}
                    supplier_name={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.company_name ??
                      ""
                    }
                    supplier_address={supplier_main_Address}
                    customer_name={
                      purchaseSalesIndentData[0]?.bpo?.customer?.company_name ??
                      ""
                    }
                    customer_address={customer_main_Address}
                    customer_iec={
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)[0]
                        ?.filter((add) => add.set_as_default == 1)[0]?.ifsc_code
                    }
                    doc_description={
                      purchaseSalesIndentData[0]?.commodity_details?.length >
                        0 &&
                      purchaseSalesIndentData[0]?.commodity_details[0]
                        ?.document_desc
                    }
                    hs_code={
                      purchaseSalesIndentData[0]?.commodity_details?.length > 0
                        ? purchaseSalesIndentData[0]?.commodity_details[0]
                            ?.hs_code
                        : ""
                    }
                    port_of_loading={
                      props.portLoading?.filter(
                        (d) =>
                          d.id == purchaseSalesIndentData[0].country_loading_id
                      )[0]?.name
                    }
                    discharge={
                      props.portDischarge?.filter(
                        (d) =>
                          d.id == purchaseSalesIndentData[0].port_discharge_id
                      )[0]?.name
                    }
                    delivery={
                      props.portDelivery?.filter(
                        (d) =>
                          d.id == purchaseSalesIndentData[0].delivery_port_id
                      )[0]?.name
                    }
                    container={props.data?.container_details}
                    ctn_size={
                      props.containerSize?.filter(
                        (d) =>
                          d.id ==
                          purchaseSalesIndentData[0]?.commodity_details[0]
                            ?.container_size
                      )[0]?.size
                    }
                  />
                  <Form9
                    data={props.data}
                    purchaseSalesIndentData={props.purchaseSalesIndentData}
                    ref_no={purchaseSalesIndentData[0]?.ref_no}
                    received_quantity={props.data?.quantity_sum}
                    bl_no={props.data?.bi_no}
                    shipping_line={props.data?.shipping_company}
                    customer_name={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.company_name ??
                      ""
                    }
                    customer_address={supplier_main_Address}
                    customer_contact_person={
                      purchaseSalesIndentData[0]?.bpo?.supplier
                        ?.contact_person ?? ""
                    }
                    customer_tel={
                      purchaseSalesIndentData[0]?.bpo?.supplier
                        ?.contact_number ?? ""
                    }
                    importer_name={
                      purchaseSalesIndentData[0]?.bpo?.customer?.company_name ??
                      ""
                    }
                    importer_contact_person={
                      purchaseSalesIndentData[0]?.bpo?.customer
                        ?.contact_person ?? ""
                    }
                    importer_address={customer_main_Address}
                    importer_ifsc={
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)[0]
                        ?.filter((add) => add.set_as_default == 1)[0]?.ifsc_code
                    }
                    importer_email={
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.email)[0]
                    }
                    doc_description={
                      purchaseSalesIndentData[0]?.commodity_details?.length >
                        0 &&
                      purchaseSalesIndentData[0]?.commodity_details[0]
                        ?.document_desc
                    }
                    hs_code={
                      purchaseSalesIndentData[0]?.commodity_details?.length > 0
                        ? purchaseSalesIndentData[0]?.commodity_details[0]
                            ?.hs_code
                        : ""
                    }
                    actual_quantity={actual_quantity}
                  />

                  <Form6
                    data={props.data}
                    purchaseSalesIndentData={props.purchaseSalesIndentData}
                    ref_no={purchaseSalesIndentData[0]?.ref_no}
                    received_quantity={props.data?.quantity_sum}
                    bl_no={props.data?.bi_no}
                    shipping_line={props.data?.shipping_company}
                    customer_name={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.company_name ??
                      ""
                    }
                    customer_address={supplier_main_Address}
                    customer_contact_person={
                      purchaseSalesIndentData[0]?.bpo?.supplier
                        ?.contact_person ?? ""
                    }
                    customer_tel={
                      purchaseSalesIndentData[0]?.bpo?.supplier
                        ?.contact_number ?? ""
                    }
                    importer_name={
                      purchaseSalesIndentData[0]?.bpo?.customer?.company_name ??
                      ""
                    }
                    importer_contact_person={
                      purchaseSalesIndentData[0]?.bpo?.customer
                        ?.contact_person ?? ""
                    }
                    importer_address={customer_main_Address}
                    importer_ifsc={
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)[0]
                        ?.filter((add) => add.set_as_default == 1)[0]?.ifsc_code
                    }
                    importer_email={
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.email)[0]
                    }
                    doc_description={
                      purchaseSalesIndentData[0]?.commodity_details?.length >
                        0 &&
                      purchaseSalesIndentData[0]?.commodity_details[0]
                        ?.document_desc
                    }
                    hs_code={
                      purchaseSalesIndentData[0]?.commodity_details?.length > 0
                        ? purchaseSalesIndentData[0]?.commodity_details[0]
                            ?.hs_code
                        : ""
                    }
                    actual_quantity={actual_quantity}
                    invoice_no={invoiceData?.id}
                  />

                  <PrintOrigin
                    ref_no={purchaseSalesIndentData[0]?.ref_no}
                    container={props.data?.container_details}
                    port_of_loading={
                      props.portLoading?.filter(
                        (d) =>
                          d.id == purchaseSalesIndentData[0].country_loading_id
                      )[0]?.name
                    }
                    delivery={
                      props.portDelivery?.filter(
                        (d) =>
                          d.id == purchaseSalesIndentData[0].delivery_port_id
                      )[0]?.name
                    }
                    actual_quantity={actual_quantity}
                    total_qty={props.data?.quantity_sum}
                    supplier_name={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.company_name ??
                      ""
                    }
                    customer_name={
                      purchaseSalesIndentData[0]?.bpo?.customer?.company_name ??
                      ""
                    }
                    customer_address={customer_main_Address}
                    customer_email={
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.email)[0]
                    }
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
                    etd={props.data?.etd}
                    vessel_name={props.data?.vessel_name}
                    eta={props.data?.eta_at_port}
                    bl_no={props.data?.bi_no}
                    contract_no={
                      purchaseSalesIndentData[0]?.bpo?.contract_number
                    }
                    invoice_no={invoiceData?.id}
                    ctn_size={
                      props.containerSize?.filter(
                        (d) =>
                          d.id ==
                          purchaseSalesIndentData[0]?.commodity_details[0]
                            ?.container_size
                      )[0]?.size
                    }
                    packageNo={
                      purchaseSalesIndentData[0]?.commodity_details?.length
                    }
                    doc_description={
                      purchaseSalesIndentData[0]?.commodity_details?.length >
                        0 &&
                      purchaseSalesIndentData[0]?.commodity_details[0]
                        ?.document_desc
                    }
                    no_of_container={
                      purchaseSalesIndentData[0]?.commodity_details?.length >
                        0 &&
                      purchaseSalesIndentData[0]?.commodity_details[0]
                        ?.container_no
                    }
                  />
                  <Frieght
                    ref_no={purchaseSalesIndentData[0]?.ref_no}
                    container={props.data?.container_details}
                    port_of_loading={
                      props.portLoading?.filter(
                        (d) =>
                          d.id == purchaseSalesIndentData[0].country_loading_id
                      )[0]?.name
                    }
                    delivery={
                      props.portDelivery?.filter(
                        (d) =>
                          d.id == purchaseSalesIndentData[0].delivery_port_id
                      )[0]?.name
                    }
                    actual_quantity={actual_quantity}
                    total_qty={props.data?.quantity_sum}
                    supplier_name={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.company_name ??
                      ""
                    }
                    customer_name={
                      purchaseSalesIndentData[0]?.bpo?.customer?.company_name ??
                      ""
                    }
                    customer_address={customer_main_Address}
                    customer_email={
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.email)[0]
                    }
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
                    etd={props.data?.etd}
                    vessel_name={props.data?.vessel_name}
                    eta={props.data?.eta_at_port}
                    bl_no={props.data?.bi_no}
                    contract_no={
                      purchaseSalesIndentData[0]?.bpo?.contract_number
                    }
                    invoice_no={invoiceData?.id}
                    ctn_size={
                      props.containerSize?.filter(
                        (d) =>
                          d.id ==
                          purchaseSalesIndentData[0]?.commodity_details[0]
                            ?.container_size
                      )[0]?.size
                    }
                    packageNo={
                      purchaseSalesIndentData[0]?.commodity_details?.length
                    }
                    doc_description={
                      purchaseSalesIndentData[0]?.commodity_details?.length >
                        0 &&
                      purchaseSalesIndentData[0]?.commodity_details[0]
                        ?.document_desc
                    }
                    no_of_container={
                      purchaseSalesIndentData[0]?.commodity_details?.length >
                        0 &&
                      purchaseSalesIndentData[0]?.commodity_details[0]
                        ?.container_no
                    }
                  />
                  <Psic
                    ref_no={purchaseSalesIndentData[0]?.ref_no}
                    customer_name={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.company_name ??
                      ""
                    }
                    customer_address={supplier_main_Address}
                    customer_tel={
                      purchaseSalesIndentData[0]?.bpo?.supplier
                        ?.contact_number ?? ""
                    }
                    customer_email={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.email)[0]
                    }
                    importer_name={
                      purchaseSalesIndentData[0]?.bpo?.customer?.company_name ??
                      ""
                    }
                    importer_iec={
                      purchaseSalesIndentData[0]?.bpo?.customer?.iec_no
                    }
                    importer_address={customer_main_Address}
                    importer_tel={
                      purchaseSalesIndentData[0]?.bpo?.customer
                        ?.contact_number ?? ""
                    }
                    importer_email={
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.customer?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.email)[0]
                    }
                    doc_description={
                      purchaseSalesIndentData[0]?.commodity_details?.length >
                        0 &&
                      purchaseSalesIndentData[0]?.commodity_details[0]
                        ?.document_desc
                    }
                    total_qty={props.data?.quantity_sum}
                    container={props.data?.container_details}
                  />
                </Row>
                <Row className="form-group">
                  {fileUploadData?.length > 0
                    ? fileUploadData?.map((data, index) => (
                        <a
                          href={`https://uniquetechsolution.co.in/metalscrap_revamped/storage/app/public/${data.ref_no}/${data.file}`}
                          alt=""
                          target={`_blank`}
                          className="mr-4"
                        >
                          {data.file}
                        </a>
                      ))
                    : ""}
                </Row>

                <Row className="form-group">
                  <Col md={4}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        label="Courier Company"
                        id="courier_company"
                        name="courier_company"
                        value={formProps.values.courier_company}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.courier_company &&
                          Boolean(formProps.errors.courier_company)
                        }
                        helperText={
                          formProps.touched.courier_company &&
                          formProps.errors.courier_company
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        select
                        variant="standard"
                        size="small"
                        label="Courier Company Type"
                        id="courier_company_type"
                        name="courier_company_type"
                        value={formProps.values.courier_company_type}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.courier_company_type &&
                          Boolean(formProps.errors.courier_company_type)
                        }
                        helperText={
                          formProps.touched.courier_company_type &&
                          formProps.errors.courier_company_type
                        }
                      >
                        <MenuItem value="">Select Type</MenuItem>
                        <MenuItem value="Domestic">Domestic</MenuItem>
                        <MenuItem value="International">International</MenuItem>
                        <MenuItem value="Hand Delivery">Hand Delivery</MenuItem>
                      </TextField>
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="form-group d-flex align-items-end">
                  <Col md={3}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        label="Airways BI. No."
                        id="airways_no"
                        name="airways_no"
                        value={formProps.values.airways_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.airways_no &&
                          Boolean(formProps.errors.airways_no)
                        }
                        helperText={
                          formProps.touched.airways_no &&
                          formProps.errors.airways_no
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col md={2}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        select
                        size="small"
                        label="Payment Status"
                        id="payment_status"
                        name="payment_status"
                        value={formProps.values.payment_status}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.payment_status &&
                          Boolean(formProps.errors.payment_status)
                        }
                        helperText={
                          formProps.touched.payment_status &&
                          formProps.errors.payment_status
                        }
                      >
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Not Paid">Not Paid</MenuItem>
                      </TextField>
                    </InputGroup>
                  </Col>
                  {formProps.values.payment_status == "Paid" && (
                    <Col md={3}>
                      <Label className="label">Paid Date</Label>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          type="date"
                          id="paid_date"
                          name="paid_date"
                          value={formProps.values.paid_date}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.paid_date &&
                            Boolean(formProps.errors.paid_date)
                          }
                          helperText={
                            formProps.touched.paid_date &&
                            formProps.errors.paid_date
                          }
                        />
                      </InputGroup>
                    </Col>
                  )}
                  <Col md={4}>
                    <Row>
                      <Col md={6}>
                        <Button type="reset" color="danger" block>
                          <b>Reset</b>
                        </Button>
                      </Col>
                      <Col md={6}>
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
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label>Note: Invoice is required for Courier</Label>
                </Row>
                <Row style={{ justifyContent: "center" }}></Row>
              </Form>
            );
          }}
        </Formik>
      </CardBody>
      <ModalFooter>
        {props.courier?.isPostLoading && <LinerLoader />}
        {props.courier?.isUpdateLoading && <LinerLoader />}
      </ModalFooter>
    </Card>
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
    invoice: state.invoice,
    courier: state.courier,
    suppiler: state.suppiler.suppiler,
    city: state.city.city,
    country: state.country.country,
    states: state.state.state,
    fileUpload: state.fileUpload,
    containerSize: state.containerSize.containerSize,
    portLoading: state.portLoading.portLoading,
    portDelivery: state.portDelivery.portDelivery,
    portDischarge: state.portDischarge.portDischarge,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFileUploadGetData: (data) => dispatch(actions.fileUploadGetData(data)),
    invoiceGetData: (data) => dispatch(actions.invoiceGetData(data)),
    courierGetData: (data) => dispatch(actions.courierGetData(data)),
    onDeleteCourier: (id, data) => dispatch(actions.deleteCourier(id, data)),
    onPostCourierData: (data, user, setSubmitting) =>
      dispatch(actions.postCourierData(data, user, setSubmitting)),
    updateCourierData: (data, user, setSubmitting) =>
      dispatch(actions.updateCourierData(data, user, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Couriers);
