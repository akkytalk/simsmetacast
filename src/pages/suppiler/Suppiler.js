/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";

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
  ModalFooter,
} from "reactstrap";
import { FieldArray, Form, Formik } from "formik";
import { connect } from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "../../store/creators";
import "../../css/main.css";
import ActionClient from "./ActionSuppiler";
import DeleteButton from "Helpers/DeleteButton";
import AddButton from "./../../Helpers/AddButton";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function Client(props) {
  const [pageSize, setPageSize] = React.useState(10);

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.create == 1
      ? true
      : false;

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "created_date",
      headerName: "Created Date",
      flex: 1,
    },

    { field: "group_name", headerName: "Group Name", flex: 1 },
    { field: "company_name", headerName: "Company Name", flex: 1 },
    { field: "mobile_number", headerName: "Phone Number", flex: 1 },
    { field: "iec_no", headerName: "IEC Number", flex: 1 },
    { field: "customer_type", headerName: "Customer Type", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableExport: true,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <ActionClient data={params.row} index={params.row.id} />;
      },
    },
  ];

  const rows = props.client?.isLoading ? [] : props.client.client;

  let data2 = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onClientGetData(data2);
    props.cityGetData(data2);
    props.countryGetData(data2);
    props.stateGetData(data2);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };
  // const { data } = useDemoData({
  //   dataSet: "Client",
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Client:", values);

    let user = {
      customer_type: values.customer_type,
      company_name: values.company_name,
      group_name: values.group_name,
      mobile_number: values.phone.toString(),
      iec_no: values.iec_no,
      contact_person: values.contact_person,
      contact_number: values.contact_number,
      psic_cost: values.psic_cost,
      psic_type: values.psic_type,
      details: values.address,
    };

    console.log("Data of Client:", user);
    props.onPostClientData(data2, user, toggle, setSubmitting);
    setSubmitting(true);
    return;
  };

  return (
    <Card className="p-3 w-100">
      <CardHeader className="bg-gradient-yellow p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Clients Details</strong>
          <div>
            {createStatus && (
              <Button
                className="btn-success p-2"
                onClick={() => {
                  toggle();
                }}
              >
                <i className="fa fa-plus text-white mr-2" />
                Add New
              </Button>
            )}
          </div>
        </div>
        <Modal
          className="modal-xl"
          backdrop="static"
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add New Client
          </ModalHeader>

          {props.client?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                customer_type: "",
                company_name: "",
                group_name: "",
                phone: "",
                iec_no: "",
                contact_person: "",
                contact_number: "",
                psic_cost: "",
                psic_type: "",
                default_address: "",

                address: [
                  {
                    address_1: "",
                    address_2: "",
                    country_id: "",
                    state_id: "",
                    city_id: "",
                    pincode: "",
                    pan_number: "",
                    gst_number: "",
                    vat: "",
                    email: "",
                    set_as_default: 1,
                    default_bank: "",
                    bank: [
                      {
                        bank_name: "",
                        phone: "",
                        bank_contact_person: "",
                        account_no: "",
                        ifsc_code: "",
                        branch_name: "",
                        swift_no: "",
                        iban_number: "",
                        set_as_default: 1,
                      },
                    ],
                  },
                ],
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                customer_type: Yup.string().required("required"),
                company_name: Yup.string().required("required"),
                // group_name: Yup.string().required("required"),
                phone: Yup.string().required("required"),
                // iec_no: Yup.string().required("required"),
                // address: Yup.string().required("required"),
                // contact_number: Yup.string().required("required"),
              })}
            >
              {(formProps) => {
                return (
                  <Form>
                    {console.log(`formProps.values`, formProps.values)}
                    <Row className="form-group ">
                      <Col md={4}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            select
                            variant="standard"
                            size="small"
                            id="customer_type"
                            label="Select Customer Type *"
                            name="customer_type"
                            value={formProps.values.customer_type}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.customer_type &&
                              Boolean(formProps.errors.customer_type)
                            }
                            helperText={
                              formProps.touched.customer_type &&
                              formProps.errors.customer_type
                            }
                          >
                            <MenuItem value="">Select Customer Type</MenuItem>
                            <MenuItem value="Customer">Customer</MenuItem>
                            <MenuItem value="Client">Client</MenuItem>
                            <MenuItem value="Both">Both</MenuItem>
                          </TextField>
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group pt-4">
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="group_name"
                            label="Group Name"
                            name="group_name"
                            value={formProps.values.group_name}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.group_name &&
                              Boolean(formProps.errors.group_name)
                            }
                            helperText={
                              formProps.touched.group_name &&
                              formProps.errors.group_name
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="company_name"
                            label="Company Name *"
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
                          />
                        </InputGroup>
                      </Col>
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="phone"
                            label="Phone No *"
                            name="phone"
                            value={formProps.values.phone}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.phone &&
                              Boolean(formProps.errors.phone)
                            }
                            helperText={
                              formProps.touched.phone && formProps.errors.phone
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="iec_no"
                            label="IEC NO"
                            name="iec_no"
                            value={formProps.values.iec_no}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.iec_no &&
                              Boolean(formProps.errors.iec_no)
                            }
                            helperText={
                              formProps.touched.iec_no &&
                              formProps.errors.iec_no
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="form-group pt-2">
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="contact_person"
                            label="Contact Person"
                            name="contact_person"
                            value={formProps.values.contact_person}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.contact_person &&
                              Boolean(formProps.errors.contact_person)
                            }
                            helperText={
                              formProps.touched.contact_person &&
                              formProps.errors.contact_person
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={3}>
                        {/* <Label for="size">Name</Label> */}
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="contact_number"
                            label="Contact Number"
                            name="contact_number"
                            value={formProps.values.contact_number}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.contact_number &&
                              Boolean(formProps.errors.contact_number)
                            }
                            helperText={
                              formProps.touched.contact_number &&
                              formProps.errors.contact_number
                            }
                          />
                        </InputGroup>
                      </Col>
                      {(formProps.values.customer_type === "Client" ||
                        formProps.values.customer_type === "Both") && (
                        <>
                          <Col md={3}>
                            {/* <Label for="size">Name</Label> */}
                            <InputGroup>
                              <TextField
                                fullWidth
                                variant="standard"
                                size="small"
                                type="text"
                                id="psic_cost"
                                label="PSIC Cost"
                                name="psic_cost"
                                value={formProps.values.psic_cost}
                                onChange={formProps.handleChange}
                                error={
                                  formProps.touched.psic_cost &&
                                  Boolean(formProps.errors.psic_cost)
                                }
                                helperText={
                                  formProps.touched.psic_cost &&
                                  formProps.errors.psic_cost
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col md={3}>
                            <InputGroup>
                              <TextField
                                fullWidth
                                select
                                variant="standard"
                                size="small"
                                id="psic_type"
                                label="PSIC Type"
                                name="psic_type"
                                value={formProps.values.psic_type}
                                onChange={formProps.handleChange}
                                error={
                                  formProps.touched.psic_type &&
                                  Boolean(formProps.errors.psic_type)
                                }
                                helperText={
                                  formProps.touched.psic_type &&
                                  formProps.errors.psic_type
                                }
                              >
                                <MenuItem value="PMT">PMT</MenuItem>
                                <MenuItem value="FCL">FCL</MenuItem>
                              </TextField>
                            </InputGroup>
                          </Col>
                        </>
                      )}
                      {/* {formProps.values.customer_type === "Both" && (
                        <Col md={3}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              select
                              variant="standard"
                              size="small"
                              id="psic_type"
                              label="PSIC Type"
                              name="psic_type"
                              value={formProps.values.psic_type}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.psic_type &&
                                Boolean(formProps.errors.psic_type)
                              }
                              helperText={
                                formProps.touched.psic_type &&
                                formProps.errors.psic_type
                              }
                            >
                              <MenuItem value="PMT">PMT</MenuItem>
                              <MenuItem value="FCL">FCL</MenuItem>
                            </TextField>
                          </InputGroup>
                        </Col>
                      )} */}
                    </Row>
                    <Col md={12}>
                      <FieldArray
                        name="address"
                        render={(arrayHelpers) => (
                          <div className="address">
                            {console.log("values", formProps?.values?.address)}

                            {formProps.values.address?.map((addr, index) => {
                              return (
                                <Card
                                  className="address-container mb-4"
                                  key={index}
                                >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <Label className="font-weight-600 text-black">
                                      Address {index + 1}
                                    </Label>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          defaultChecked
                                          sx={{
                                            "& .MuiSvgIcon-root": {
                                              fontSize: 25,
                                            },
                                          }}
                                          name={`address.${index}.set_as_default`}
                                          id={`address.${index}.set_as_default`}
                                          checked={
                                            formProps.values.address[index]
                                              .set_as_default == 1
                                              ? true
                                              : false
                                          }
                                          onChange={(event) => {
                                            formProps.setFieldValue(
                                              `default_address`,
                                              index
                                            );
                                            formProps.setFieldValue(
                                              `address.${index}.set_as_default`,
                                              event.target.value
                                            );

                                            formProps.values.address?.length >
                                              0 &&
                                              formProps.values.address?.map(
                                                (add, i) => {
                                                  if (
                                                    formProps.values
                                                      .default_address !== i
                                                  ) {
                                                    console.log(`code working`);
                                                    formProps.setFieldValue(
                                                      `address.${i}.set_as_default`,
                                                      0
                                                    );
                                                  }

                                                  return add;
                                                }
                                              );
                                          }}
                                          value={
                                            formProps.values.address[index]
                                              .set_as_default == 1
                                              ? 0
                                              : 1
                                          }
                                        />
                                      }
                                      label="Set as Default"
                                    />
                                    {/* <FormControl component="fieldset">
                                      <RadioGroup
                                        defaultValue={0}
                                        id={`address.${index}.set_as_default`}
                                        name={`address.${index}.set_as_default`}
                                        onChange={formProps.handleChange}
                                        value={
                                          formProps.values.address[index]
                                            .set_as_default
                                        }
                                      >
                                        <FormControlLabel
                                          value={1}
                                          control={
                                            <Radio
                                              onChange={(event) => {
                                                formProps.setFieldValue(
                                                  `default_address`,
                                                  index
                                                );
                                              }}
                                            />
                                          }
                                          label="Set as Default"
                                        />
                                      </RadioGroup>
                                    </FormControl> */}
                                  </div>
                                  <div className="address-line">
                                    <Row className="form-group">
                                      <Col md={3}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          id={`address.${index}.address_1`}
                                          name={`address.${index}.address_1`}
                                          label="Address line 1"
                                          value={
                                            formProps.values.address[index]
                                              .address_1
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>

                                      <Col md={3}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          // size="small"
                                          id={`address.${index}.address_2`}
                                          label="Address line 2"
                                          name={`address.${index}.address_2`}
                                          value={
                                            formProps.values.address[index]
                                              .address_2
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>

                                      <Col md={2}>
                                        <TextField
                                          fullWidth
                                          select
                                          variant="standard"
                                          id={`address.${index}.country_id`}
                                          label="Select Country"
                                          name={`address.${index}.country_id`}
                                          value={
                                            formProps.values.address[index]
                                              ?.country_id
                                          }
                                          onChange={formProps.handleChange}
                                        >
                                          {!props.country?.isLoading &&
                                            props.country?.country?.map((c) => {
                                              return (
                                                <MenuItem
                                                  value={c.id}
                                                  key={c.id}
                                                >
                                                  {c.name}
                                                </MenuItem>
                                              );
                                            })}
                                        </TextField>
                                      </Col>
                                      <Col md={2}>
                                        <TextField
                                          fullWidth
                                          select
                                          variant="standard"
                                          id={`address.${index}.state_id`}
                                          label="select State"
                                          name={`address.${index}.state_id`}
                                          value={
                                            formProps.values.address[index]
                                              .state_id
                                          }
                                          onChange={formProps.handleChange}
                                        >
                                          {!props.state?.isLoading &&
                                            props.state?.state.map((s) => {
                                              if (
                                                s.country_id ==
                                                formProps.values.address[index]
                                                  ?.country_id
                                              )
                                                return (
                                                  <MenuItem
                                                    value={s.id}
                                                    key={s.id}
                                                  >
                                                    {s.name}
                                                  </MenuItem>
                                                );
                                            })}
                                        </TextField>
                                      </Col>
                                      <Col md={2}>
                                        <TextField
                                          fullWidth
                                          select
                                          variant="standard"
                                          id={`address.${index}.city_id`}
                                          label="select City"
                                          name={`address.${index}.city_id`}
                                          value={
                                            formProps.values.address[index]
                                              .city_id
                                          }
                                          onChange={formProps.handleChange}
                                        >
                                          {!props.city?.isLoading &&
                                            props.city?.city?.map((c) => {
                                              if (
                                                c.state_id ==
                                                formProps.values.address[index]
                                                  ?.state_id
                                              )
                                                return (
                                                  <MenuItem
                                                    value={c.id}
                                                    key={c.id}
                                                  >
                                                    {c.name}
                                                  </MenuItem>
                                                );
                                            })}
                                        </TextField>
                                      </Col>
                                    </Row>
                                    <Row className="form-group">
                                      <Col md={3}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          id={`address.${index}.pincode`}
                                          label="Pincode"
                                          name={`address.${index}.pincode`}
                                          value={
                                            formProps.values.address[index]
                                              .pincode
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>

                                      <Col md={3}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          id={`address.${index}.pan_number`}
                                          label="PAN NO"
                                          name={`address.${index}.pan_number`}
                                          value={
                                            formProps.values.address[index]
                                              .pan_number
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>

                                      <Col md={2}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          id={`address.${index}.gst_number`}
                                          label="GST NO"
                                          name={`address.${index}.gst_number`}
                                          value={
                                            formProps.values.address[index]
                                              .gst_number
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={2}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          id={`address.${index}.vat`}
                                          label="VAT"
                                          name={`address.${index}.vat`}
                                          value={
                                            formProps.values.address[index].vat
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={2}>
                                        <TextField
                                          fullWidth
                                          variant="standard"
                                          id={`address.${index}.email`}
                                          label="email address"
                                          name={`address.${index}.email`}
                                          value={
                                            formProps.values.address[index]
                                              .email
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                    </Row>
                                  </div>
                                  <Col md={12}>
                                    <FieldArray
                                      name={`address.${index}.bank`}
                                      render={(bankArrayHelper) => {
                                        return addr.bank?.map(
                                          (bank, BIndex) => {
                                            return (
                                              <Card
                                                className="bank-container mb-2"
                                                key={BIndex}
                                              >
                                                <CardBody className="p-0">
                                                  <div className="d-flex justify-content-between align-items-center">
                                                    <Label className="font-weight-600 text-black">
                                                      Bank Details {BIndex + 1}
                                                    </Label>
                                                    <FormControlLabel
                                                      control={
                                                        <Checkbox
                                                          defaultChecked
                                                          sx={{
                                                            "& .MuiSvgIcon-root":
                                                              {
                                                                fontSize: 25,
                                                              },
                                                          }}
                                                          name={`address.${index}.bank.${BIndex}.set_as_default`}
                                                          id={`address.${index}.bank.${BIndex}.set_as_default`}
                                                          checked={
                                                            formProps.values
                                                              .address[index]
                                                              ?.bank[BIndex]
                                                              ?.set_as_default ==
                                                            1
                                                              ? true
                                                              : false
                                                          }
                                                          onChange={(event) => {
                                                            formProps.setFieldValue(
                                                              `address.${index}.default_bank`,
                                                              BIndex
                                                            );
                                                            formProps.setFieldValue(
                                                              `address.${index}.bank.${BIndex}.set_as_default`,
                                                              event.target.value
                                                            );

                                                            addr.bank?.length >
                                                              1 &&
                                                              addr.bank?.map(
                                                                (b, i) => {
                                                                  if (
                                                                    formProps
                                                                      .values
                                                                      .address[
                                                                      index
                                                                    ]
                                                                      ?.default_bank !==
                                                                    i
                                                                  ) {
                                                                    formProps.setFieldValue(
                                                                      `address.${index}.bank.${i}.set_as_default`,
                                                                      0
                                                                    );
                                                                  }

                                                                  return b;
                                                                }
                                                              );
                                                          }}
                                                          value={
                                                            formProps.values
                                                              .address[index]
                                                              .bank[BIndex]
                                                              .set_as_default ==
                                                            1
                                                              ? 0
                                                              : 1
                                                          }
                                                        />
                                                      }
                                                      label="Set as Default"
                                                    />
                                                  </div>
                                                  <div className="bank-details">
                                                    <Row className="form-group">
                                                      <Col md={2}>
                                                        <TextField
                                                          fullWidth
                                                          variant="standard"
                                                          id={`address.${index}.bank.${BIndex}.bank_name`}
                                                          label="Bank Name *"
                                                          name={`address.${index}.bank.${BIndex}.bank_name`}
                                                          value={
                                                            formProps.values
                                                              .address[index]
                                                              .bank[BIndex]
                                                              .bank_name
                                                          }
                                                          onChange={
                                                            formProps.handleChange
                                                          }
                                                        />
                                                      </Col>
                                                      <Col md={2}>
                                                        <TextField
                                                          fullWidth
                                                          variant="standard"
                                                          id={`address.${index}.bank.${BIndex}.phone`}
                                                          label="Phone No"
                                                          name={`address.${index}.bank.${BIndex}.phone`}
                                                          value={
                                                            formProps.values
                                                              .address[index]
                                                              .bank[BIndex]
                                                              .phone
                                                          }
                                                          onChange={
                                                            formProps.handleChange
                                                          }
                                                        />
                                                      </Col>
                                                      <Col md={3}>
                                                        <TextField
                                                          fullWidth
                                                          variant="standard"
                                                          id={`address.${index}.bank.${BIndex}.bank_contact_person`}
                                                          label="Bank Contact Person"
                                                          name={`address.${index}.bank.${BIndex}.bank_contact_person`}
                                                          value={
                                                            formProps.values
                                                              .address[index]
                                                              .bank[BIndex]
                                                              .bank_contact_person
                                                          }
                                                          onChange={
                                                            formProps.handleChange
                                                          }
                                                        />
                                                      </Col>
                                                      <Col md={2}>
                                                        <TextField
                                                          fullWidth
                                                          variant="standard"
                                                          id={`address.${index}.bank.${BIndex}.account_no`}
                                                          label="Account No *"
                                                          name={`address.${index}.bank.${BIndex}.account_no`}
                                                          value={
                                                            formProps.values
                                                              .address[index]
                                                              .bank[BIndex]
                                                              .account_no
                                                          }
                                                          onChange={
                                                            formProps.handleChange
                                                          }
                                                        />
                                                      </Col>
                                                      <Col md={3}>
                                                        <TextField
                                                          fullWidth
                                                          variant="standard"
                                                          id={`address.${index}.bank.${BIndex}.ifsc_code`}
                                                          label="IFSC Code"
                                                          name={`address.${index}.bank.${BIndex}.ifsc_code`}
                                                          value={
                                                            formProps.values
                                                              .address[index]
                                                              .bank[BIndex]
                                                              .ifsc_code
                                                          }
                                                          onChange={
                                                            formProps.handleChange
                                                          }
                                                        />
                                                      </Col>
                                                    </Row>
                                                    <Row className="form-group">
                                                      <Col md={2}>
                                                        <TextField
                                                          fullWidth
                                                          variant="standard"
                                                          id={`address.${index}.bank.${BIndex}.branch_name`}
                                                          label="Branch Address"
                                                          name={`address.${index}.bank.${BIndex}.branch_name`}
                                                          value={
                                                            formProps.values
                                                              .address[index]
                                                              .bank[BIndex]
                                                              .branch_name
                                                          }
                                                          onChange={
                                                            formProps.handleChange
                                                          }
                                                        />
                                                      </Col>
                                                      <Col md={2}>
                                                        <TextField
                                                          fullWidth
                                                          variant="standard"
                                                          id={`address.${index}.bank.${BIndex}.iban_number`}
                                                          label="IBAN No"
                                                          name={`address.${index}.bank.${BIndex}.iban_number`}
                                                          value={
                                                            formProps.values
                                                              .address[index]
                                                              .bank[BIndex]
                                                              .iban_number
                                                          }
                                                          onChange={
                                                            formProps.handleChange
                                                          }
                                                        />
                                                      </Col>
                                                      <Col md={2}>
                                                        <TextField
                                                          fullWidth
                                                          variant="standard"
                                                          id={`address.${index}.bank.${BIndex}.swift_no`}
                                                          label="Swift No"
                                                          name={`address.${index}.bank.${BIndex}.swift_no`}
                                                          value={
                                                            formProps.values
                                                              .address[index]
                                                              .bank[BIndex]
                                                              .swift_no
                                                          }
                                                          onChange={
                                                            formProps.handleChange
                                                          }
                                                        />
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                  <div className="d-flex justify-content-end align-items-center p-1">
                                                    {/* {console.log(
                                                  `bank length`,
                                                  formProps.values.address[
                                                    index
                                                  ]?.bank.length
                                                )} */}
                                                    {addr.bank.length ===
                                                      BIndex + 1 && (
                                                      <AddButton
                                                        onClick={() => {
                                                          bankArrayHelper.push({
                                                            bank_name:
                                                              formProps.values
                                                                .address[index]
                                                                .bank[BIndex]
                                                                .bank_name ??
                                                              "",
                                                            phone:
                                                              formProps.values
                                                                .address[index]
                                                                .bank[BIndex]
                                                                .phone ?? "",
                                                            bank_contact_person:
                                                              formProps.values
                                                                .address[index]
                                                                .bank[BIndex]
                                                                .bank_contact_person ??
                                                              "",
                                                            account_no:
                                                              formProps.values
                                                                .address[index]
                                                                .bank[BIndex]
                                                                .account_no ??
                                                              "",
                                                            ifsc_code:
                                                              formProps.values
                                                                .address[index]
                                                                .bank[BIndex]
                                                                .ifsc_code ??
                                                              "",
                                                            branch_name:
                                                              formProps.values
                                                                .address[index]
                                                                .bank[BIndex]
                                                                .branch_name ??
                                                              "",
                                                            swift_no:
                                                              formProps.values
                                                                .address[index]
                                                                .bank[BIndex]
                                                                .swift_no ?? "",
                                                            iban_number:
                                                              formProps.values
                                                                .address[index]
                                                                .bank[BIndex]
                                                                .iban_number ??
                                                              "",
                                                            set_as_default: 0,
                                                          });
                                                        }}
                                                      />
                                                    )}

                                                    {addr.bank?.length > 1 && (
                                                      <DeleteButton
                                                        deleteFunction={() =>
                                                          bankArrayHelper.remove(
                                                            BIndex
                                                          )
                                                        }
                                                      />
                                                    )}
                                                  </div>
                                                </CardBody>
                                              </Card>
                                            );
                                          }
                                        );
                                      }}
                                    />
                                  </Col>

                                  <CardFooter className="d-flex justify-content-end align-items-center p-2 pb-0">
                                    {formProps.values.address.length ===
                                      index + 1 && (
                                      <AddButton
                                        onClick={() => {
                                          arrayHelpers.push({
                                            address_1:
                                              formProps.values.address[index]
                                                .address_1 ?? "",
                                            address_2:
                                              formProps.values.address[index]
                                                .address_2 ?? "",
                                            country_id:
                                              formProps.values.address[index]
                                                .country_id ?? "",
                                            state_id:
                                              formProps.values.address[index]
                                                .state_id ?? "",
                                            city_id:
                                              formProps.values.address[index]
                                                .city_id ?? "",
                                            pincode:
                                              formProps.values.address[index]
                                                .pincode ?? "",
                                            pan_number:
                                              formProps.values.address[index]
                                                .pan_number ?? "",
                                            gst_number:
                                              formProps.values.address[index]
                                                .gst_number ?? "",
                                            vat:
                                              formProps.values.address[index]
                                                .vat ?? "",
                                            email:
                                              formProps.values.address[index]
                                                .email ?? "",
                                            default_bank: "",
                                            set_as_default: 0,
                                            bank: [
                                              {
                                                bank_name:
                                                  formProps.values.address[
                                                    index
                                                  ].bank[0].bank_name ?? "",
                                                phone:
                                                  formProps.values.address[
                                                    index
                                                  ].bank[0].phone ?? "",
                                                bank_contact_person:
                                                  formProps.values.address[
                                                    index
                                                  ].bank[0]
                                                    .bank_contact_person ?? "",
                                                account_no:
                                                  formProps.values.address[
                                                    index
                                                  ].bank[0].account_no ?? "",
                                                ifsc_code:
                                                  formProps.values.address[
                                                    index
                                                  ].bank[0].ifsc_code ?? "",
                                                branch_name:
                                                  formProps.values.address[
                                                    index
                                                  ].bank[0].branch_name ?? "",
                                                swift_no:
                                                  formProps.values.address[
                                                    index
                                                  ].bank[0].swift_no ?? "",
                                                iban_number:
                                                  formProps.values.address[
                                                    index
                                                  ].bank[0].iban_number ?? "",
                                                set_as_default: 1,
                                              },
                                            ],
                                          });
                                        }}
                                      />
                                    )}

                                    {formProps.values.address?.length > 1 && (
                                      <DeleteButton
                                        deleteFunction={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      />
                                      // <Button
                                      //   color="danger p-1"
                                      //   size="sm"
                                      //   onClick={() =>
                                      //     arrayHelpers.remove(index)
                                      //   }
                                      // >
                                      //   <i className="fa fa-trash" />
                                      // </Button>
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
            {props.client?.isPostLoading && <LinerLoader />}
          </ModalFooter>
        </Modal>
      </CardHeader>
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // {...data}
          loading={props.client?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
          // isRowSelectable={(params) => params.row.size < 50}

          // autoPageSize
          autoHeight
        />
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    client: state.entities.client,
    city: state.entities.address.city,
    country: state.entities.address.country,
    state: state.entities.address.state,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClientGetData: (data) => dispatch(actions.clientGetData(data)),
    cityGetData: (data) => dispatch(actions.cityGetData(data)),
    countryGetData: (data) => dispatch(actions.countryGetData(data)),
    stateGetData: (data) => dispatch(actions.stateGetData(data)),
    onDeleteClient: (id, data) => dispatch(actions.deleteClient(id, data)),
    onPostClientData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postClientData(data, user, toggle, setSubmitting)),
    updateClientData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateClientData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Client);
