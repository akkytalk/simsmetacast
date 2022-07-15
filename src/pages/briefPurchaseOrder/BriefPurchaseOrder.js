/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import dateFormat from "dateformat";

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
} from "reactstrap";
import { Form, Formik } from "formik";
import { connect } from "react-redux";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "../../redux/creators";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import "../../css/main.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  // GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import Autocomplete from "@mui/material/Autocomplete";
import { DateFormat } from "components/DateFormat/DateFormat";

import MenuButton from "../../components/MenuButton/MenuButton";
import ExportCSV from "components/ExcelFile/ExportCSV";
import "../../css/main.css";
import { useHistory } from "react-router-dom";
import DeleteButton from "../../Helpers/DeleteButton";
import CreateShipper from "./CreateShipper";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  );
}

const options = [
  { name: "Edit Sales Contract", page: "edit-sales-confirmation" },
  { name: "Create Purchase Order", page: "create-sales-confirmation" },
];

function BriefPurchaseOrder(props) {
  const history = useHistory();

  const defaultProps = {
    options: props.suppiler.filter(
      (s) => s.customer_type == "Customer" || s.customer_type == "Both"
    ),
    getOptionLabel: (option) => option.company_name,
  };

  const flatProps = {
    options: props.suppiler?.filter(
      (s) => s.customer_type == "Supplier" || s.customer_type == "Both"
    ),
    getOptionLabel: (option) => option.company_name,
  };
  const [csv, setCsv] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [pageSize, setPageSize] = React.useState(10);

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[2]?.create == 1
      ? true
      : false;

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        if (updateStatus || deleteStatus)
          return params.row?.no_purchase_orders <= params.row.psi_count ? (
            <>
              {updateStatus && (
                <Button
                  className="bg-gradient-yellow p-1"
                  onClick={() =>
                    history.push(
                      `/admin/edit-sales-confirmation/${params.row?.id}`
                    )
                  }
                >
                  <i className="fa fa-edit" />
                </Button>
              )}

              {deleteStatus && (
                <DeleteButton
                  deleteFunction={() =>
                    props.onDeletePurchaseOrder(params.row.id, data2)
                  }
                />
              )}
              {updateStatus && (
                <CreateShipper data={params.row} index={params.row.id} />
              )}
            </>
          ) : (
            <>
              {updateStatus && (
                <MenuButton
                  data={params.row}
                  index={params.row.id}
                  options={options}
                />
              )}
              {deleteStatus && (
                <DeleteButton
                  deleteFunction={() =>
                    props.onDeletePurchaseOrder(params.row.id, data2)
                  }
                />
              )}
              {updateStatus && (
                <CreateShipper data={params.row} index={params.row.id} />
              )}
            </>
          );
        else {
          return null;
        }
      },
    },
    { field: "id", headerName: "ID", flex: 1 },
    { field: "ref_no", headerName: "Ref No", flex: 1 },
    {
      field: "booking_date",
      headerName: "Booking Date",
      flex: 1,
      renderCell: (params) => {
        return <DateFormat data={params.row?.booking_date} />;
      },
    },
    {
      field: "customer.company_name",
      headerName: "Customer",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.customer?.company_name}</div>;
      },
    },
    {
      field: "supplier.company_name",
      headerName: "Supplier",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.supplier?.company_name}</div>;
      },
    },
    { field: "quality", headerName: "Quality", flex: 1 },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "no_purchase_orders", headerName: "No Purchase Order", flex: 1 },
    {
      field: "no_purchase_orders2",
      headerName: "Pending PSI",
      flex: 1,

      renderCell: (params) => {
        return (
          <div>
            {Number(params.row.no_purchase_orders) -
              Number(params?.row?.psi_count)}
          </div>
        );
      },
    },
  ];

  const rows = props.purchaseOrder?.isLoading
    ? []
    : startDate && endDate
    ? props.purchaseOrder.purchaseOrder.filter((user) => {
        return user.booking_date >= startDate && user.booking_date <= endDate;
      })
    : props.purchaseOrder.purchaseOrder;

  let data2 = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    props.onQuantityUnitGetData(data2);
    props.onCommissionUnitGetData(data2);
    props.onPriceUnitGetData(data2);
    props.onSupplierGetData(data2);
    props.onPurchaseOrderGetData(data2);
    props.onPurchaseSalesIndentGetData(data2);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      props.purchaseOrder.purchaseOrder
        .filter((user) => {
          return user.booking_date >= startDate && user.booking_date <= endDate;
        })
        .map((user, index) =>
          csv?.push({
            "Sr No": index + 1,
            "Book Date": dateFormat(user.booking_date, "dd-mm-yyyy"),
            "Customer Name": user.customer?.company_name,
            "Supplier Name": user.supplier?.company_name,
            "No of Purchase Order": user.no_purchase_orders,
            Quantity: user.quantity,
            Commission: user.quality,
            Remark: user.remarks,
          })
        );
    }
  }, [startDate && endDate]);
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    let user = {
      user_id: props.login?.login?.user?.id,
      customer_id: values.customer_id,
      booking_date: values.booking_date,
      supplier_id: values.supplier_id,
      quantity: values.quantity,
      quantity_type: values.unit,
      quality: values.quality,
      price: values.price,
      price_type: values.price_unit,
      usd: values.usd,
      // commission_type: values.commission_unit,
      remarks: values.remark,
      no_purchase_orders: values.no_purchase_order,
      subject: values.email_subject,
      email_date: values.email_date,
      sent_to: values.sent_to,
      commission_from_supplier: values.commission_from_supplier,
      commission_from_supplier_type: values.commission_from_supplier_type,
      commission_from_customer: values.commission_from_customer,
      commission_from_customer_type: values.commission_from_customer_type,
      commission_to_customer: values.commission_to_customer,
      commission_to_customer_type: values.commission_to_customer_type,
      shipper_name: values.shipper_name,
      is_fixed: values.is_fixed,
      operator: values.operator,
      value: values.value,
    };

    console.log("Data of BPO:", user);
    props.onPostPurchaseOrderData(data2, user, toggle, setSubmitting);
    return;
  };

  // console.log(`startDate`, startDate, "endDate", endDate);
  return (
    <Card>
      <CardHeader>
        <div>
          <Formik
            initialValues={{
              start_date: "",
              end_date: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              start_date: Yup.string().required("required"),
              end_date: Yup.string().required("required"),
            })}
          >
            {(formProps) => {
              setStartDate(formProps.values.start_date);
              setEndDate(formProps.values.end_date);
              return (
                <Form>
                  <Row className="form-group d-flex align-items-end">
                    <Col md={2}>
                      <Label className="label">Start At</Label>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={formProps.values.start_date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.start_date &&
                          Boolean(formProps.errors.start_date)
                        }
                        helperText={
                          formProps.touched.start_date &&
                          formProps.errors.start_date
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <Label className="label">End At</Label>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={formProps.values.end_date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.end_date &&
                          Boolean(formProps.errors.end_date)
                        }
                        helperText={
                          formProps.touched.end_date &&
                          formProps.errors.end_date
                        }
                      />
                    </Col>
                    <Col md={2} className="align-self-end">
                      <ExportCSV
                        csvData={csv}
                        setCsv={setCsv}
                        fileName={`purchase_order-${dateFormat(
                          startDate,
                          "dd-mm-yyyy"
                        )}-${dateFormat(endDate, "dd-mm-yyyy")}`}
                      />
                      {/* <Button
                        type="submit"
                        disabled={formProps.isSubmitting}
                        className="bg-gradient-info text-white"
                      >
                        Download
                      </Button> */}
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </div>
        {createStatus && (
          <Button
            className="btn-success p-2 float-right"
            onClick={() => {
              toggle();
            }}
          >
            <i className="fa fa-plus text-white mr-2" />
            Create Sales Contract
          </Button>
        )}

        <Modal
          className="modal-xl"
          backdrop="static"
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add New Sales Contract
          </ModalHeader>

          {props.purchaseOrder?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                customer_id: "",
                booking_date: "",
                supplier_id: "",
                quantity: "",
                unit: "",
                quality: "",
                price: "",
                price_unit: "",
                // usd: "",
                // commission_unit: "",
                remark: "",
                no_purchase_order: 0,
                email_subject: "",
                email_date: "",
                sent_to: "",
                commission_from_supplier: 0,
                commission_from_supplier_type: "PMT",
                commission_from_customer: 0,
                commission_from_customer_type: "PMT",
                commission_to_customer: 0,
                commission_to_customer_type: "PMT",
                shipper_name: "",
                is_fixed: "",
                operator: "",
                value: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                customer_id: Yup.string().required("required"),
                booking_date: Yup.string().required("required"),
                supplier_id: Yup.string().required("required"),
                quantity: Yup.string().required("required"),
                unit: Yup.string().required("required"),
                quality: Yup.string().required("required"),
                // price: Yup.string().required("required"),
                // price_unit: Yup.string().required("required"),
                no_purchase_order: Yup.string().required("required"),
                commission_from_supplier: Yup.string().required("required"),
                commission_from_supplier_type:
                  Yup.string().required("required"),
                commission_from_customer: Yup.string().required("required"),
                commission_from_customer_type:
                  Yup.string().required("required"),
                commission_to_customer: Yup.string().required("required"),
                commission_to_customer_type: Yup.string().required("required"),
                // email_subject: Yup.string().required("required"),
                // email_date: Yup.string().required("required"),
                // sent_to: Yup.string().required("required"),
              })}
            >
              {(formProps) => (
                <Form>
                  {console.log(`formProps.values`, formProps.values)}
                  <Row className="form-group d-flex  align-items-center">
                    <Col md={2} className="">
                      <Label className="label">Booking date *</Label>
                      <TextField
                        fullWidth
                        className="mb-3"
                        variant="standard"
                        size="small"
                        type="date"
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
                    <Col md={2} className="">
                      <InputGroup>
                        <Autocomplete
                          {...defaultProps}
                          id="customer_id"
                          name="customer_id"
                          onChange={(event, newValue) => {
                            formProps.setFieldValue(
                              `customer_id`,
                              newValue?.id ?? ""
                            );
                          }}
                          sx={{ width: "100%" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Customer Name *"
                              variant="standard"
                              name="customer_id"
                              error={
                                formProps.touched.customer_id &&
                                Boolean(formProps.errors.customer_id)
                              }
                              helperText={
                                formProps.touched.customer_id &&
                                formProps.errors.customer_id
                              }
                            />
                          )}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={2}>
                      <InputGroup>
                        <Autocomplete
                          {...flatProps}
                          id="supplier_id"
                          name="supplier_id"
                          onChange={(event, newValue) => {
                            formProps.setFieldValue(
                              `supplier_id`,
                              newValue?.id ?? ""
                            );
                          }}
                          sx={{ width: "100%" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Supplier Name *"
                              variant="standard"
                              name="supplier_id"
                              error={
                                formProps.touched.supplier_id &&
                                Boolean(formProps.errors.supplier_id)
                              }
                              helperText={
                                formProps.touched.supplier_id &&
                                formProps.errors.supplier_id
                              }
                            />
                          )}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={2}>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          type="number"
                          id="quantity"
                          label="Quantity *"
                          name="quantity"
                          value={formProps.values.quantity}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.quantity &&
                            Boolean(formProps.errors.quantity)
                          }
                          helperText={
                            formProps.touched.quantity &&
                            formProps.errors.quantity
                          }
                        />
                      </InputGroup>
                    </Col>
                    <Col md={2}>
                      <InputGroup>
                        <TextField
                          fullWidth
                          select
                          variant="standard"
                          size="small"
                          id="unit"
                          label="Select Unit *"
                          name="unit"
                          value={formProps.values.unit}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.unit &&
                            Boolean(formProps.errors.unit)
                          }
                          helperText={
                            formProps.touched.unit && formProps.errors.unit
                          }
                        >
                          {props.quantityUnit.map((unit) => {
                            return (
                              <MenuItem value={unit.id}>{unit.name}</MenuItem>
                            );
                          })}
                        </TextField>
                      </InputGroup>
                    </Col>
                    <Col md={2}>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          id="quality"
                          label="Quality *"
                          name="quality"
                          value={formProps.values.quality}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.quality &&
                            Boolean(formProps.errors.quality)
                          }
                          helperText={
                            formProps.touched.quality &&
                            formProps.errors.quality
                          }
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group pt-2">
                    <Col md={3}>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          id="price"
                          label="Price"
                          name="price"
                          value={formProps.values.price}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.price &&
                            Boolean(formProps.errors.price)
                          }
                          helperText={
                            formProps.touched.price && formProps.errors.price
                          }
                        />
                      </InputGroup>
                    </Col>

                    <Col md={2}>
                      <TextField
                        fullWidth
                        select
                        variant="standard"
                        size="small"
                        type="text"
                        id="price_unit"
                        label="Unit"
                        name="price_unit"
                        value={formProps.values.price_unit}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.price_unit &&
                          Boolean(formProps.errors.price_unit)
                        }
                        helperText={
                          formProps.touched.price_unit &&
                          formProps.errors.price_unit
                        }
                      >
                        {props.priceUnit.map((unit) => {
                          return (
                            <MenuItem value={unit.price_unit}>
                              {unit.price_unit}
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
                        size="small"
                        type="text"
                        id="is_fixed"
                        label="Select LME"
                        name="is_fixed"
                        value={formProps.values.is_fixed}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.is_fixed &&
                          Boolean(formProps.errors.is_fixed)
                        }
                        helperText={
                          formProps.touched.is_fixed &&
                          formProps.errors.is_fixed
                        }
                      >
                        <MenuItem value="">Select LME</MenuItem>
                        <MenuItem value={0}>Fixed</MenuItem>
                        <MenuItem value={1}>LME</MenuItem>
                        <MenuItem value={2}>LLME</MenuItem>
                      </TextField>
                    </Col>
                    <Col md={2}>
                      <TextField
                        fullWidth
                        select
                        variant="standard"
                        size="small"
                        type="text"
                        id="operator"
                        label="Select Operator"
                        name="operator"
                        value={formProps.values.operator}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.operator &&
                          Boolean(formProps.errors.operator)
                        }
                        helperText={
                          formProps.touched.operator &&
                          formProps.errors.operator
                        }
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="+">+</MenuItem>
                        <MenuItem value="-">-</MenuItem>
                      </TextField>
                    </Col>
                    <Col md={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="value"
                        label="LME Value"
                        name="value"
                        value={formProps.values.value}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.value &&
                          Boolean(formProps.errors.value)
                        }
                        helperText={
                          formProps.touched.value && formProps.errors.value
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={5}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="shipper_name"
                        label="Shipper Name"
                        name="shipper_name"
                        value={formProps.values.shipper_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.shipper_name &&
                          Boolean(formProps.errors.shipper_name)
                        }
                        helperText={
                          formProps.touched.shipper_name &&
                          formProps.errors.shipper_name
                        }
                      />
                    </Col>
                    <Col md={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        label="Commission from Supplier *"
                        id="commission_from_supplier"
                        name="commission_from_supplier"
                        value={formProps.values.commission_from_supplier}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.commission_from_supplier &&
                          Boolean(formProps.errors.commission_from_supplier)
                        }
                        helperText={
                          formProps.touched.commission_from_supplier &&
                          formProps.errors.commission_from_supplier
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        select
                        label="Unit *"
                        id="commission_from_supplier_type"
                        name="commission_from_supplier_type"
                        value={formProps.values.commission_from_supplier_type}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.commission_from_supplier_type &&
                          Boolean(
                            formProps.errors.commission_from_supplier_type
                          )
                        }
                        helperText={
                          formProps.touched.commission_from_supplier_type &&
                          formProps.errors.commission_from_supplier_type
                        }
                      >
                        {props.commissionUnit.map((unit) => (
                          <MenuItem value={unit.name}>{unit.name}</MenuItem>
                        ))}
                      </TextField>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        label="Commission from Customer *"
                        id="commission_from_customer"
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
                    <Col md={2}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        select
                        label="Unit *"
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
                        label="Commission to Customer *"
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
                    <Col md={2}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        select
                        label="Unit *"
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
                  <Row className="form-group">
                    <Col md={6}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="remark"
                        label="Remarks"
                        name="remark"
                        value={formProps.values.remark}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.remark &&
                          Boolean(formProps.errors.remark)
                        }
                        helperText={
                          formProps.touched.remark && formProps.errors.remark
                        }
                      />
                    </Col>

                    <Col md={4}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="no_purchase_order"
                        type="number"
                        label="No of Purchase Order"
                        name="no_purchase_order"
                        value={formProps.values.no_purchase_order}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.no_purchase_order &&
                          Boolean(formProps.errors.no_purchase_order)
                        }
                        helperText={
                          formProps.touched.no_purchase_order &&
                          formProps.errors.no_purchase_order
                        }
                      />
                      <Label className="label">
                        Total Number Of Purchase Order : 0
                      </Label>
                    </Col>
                  </Row>
                  <Label>Email Reference</Label>
                  <Row className="form-group d-flex align-items-end">
                    <Col md={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        id="email_subject"
                        label="Email Subject"
                        name="email_subject"
                        value={formProps.values.email_subject}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.email_subject &&
                          Boolean(formProps.errors.email_subject)
                        }
                        helperText={
                          formProps.touched.email_subject &&
                          formProps.errors.email_subject
                        }
                      />
                    </Col>

                    <Col md={3}>
                      <Label className="label">Email Date</Label>
                      <TextField
                        fullWidth
                        variant="standard"
                        id="email_date"
                        type="date"
                        name="email_date"
                        value={formProps.values.email_date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.email_date &&
                          Boolean(formProps.errors.email_date)
                        }
                        helperText={
                          formProps.touched.email_date &&
                          formProps.errors.email_date
                        }
                      />
                    </Col>

                    <Col md={3}>
                      <TextField
                        fullWidth
                        select
                        variant="standard"
                        id="sent_to"
                        label="Sent To"
                        type="email"
                        name="sent_to"
                        value={formProps.values.sent_to}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.sent_to &&
                          Boolean(formProps.errors.sent_to)
                        }
                        helperText={
                          formProps.touched.sent_to && formProps.errors.sent_to
                        }
                      >
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="supplier">Supplier</MenuItem>
                      </TextField>
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
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </CardHeader>
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowClassName={(params) => {
            if (params.row.no_purchase_orders == params?.row?.psi_count) {
              return "bg-green-2";
            } else if (
              Number(Math.round(params.row.no_purchase_orders / 2)) ==
              Number(params?.row?.psi_count)
            ) {
              return "bg-orange-2";
            }
            // else if (params.row.no_purchase_orders < params?.row?.psi_count) {
            //   return "bg-yellow-2";
            // }
            else {
              return "bg-white";
            }
          }}
          loading={props.purchaseOrder?.isLoading ? true : false}
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
    suppiler: state.suppiler.suppiler,
    city: state.city.city,
    country: state.country.country,
    states: state.state.state,
    login: state.login,
    purchaseOrder: state.purchaseOrder,
    commissionUnit: state.commissionUnit.commissionUnit,
    priceUnit: state.priceUnit.priceUnit,
    quantityUnit: state.quantityUnit.quantityUnit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuantityUnitGetData: (data) =>
      dispatch(actions.quantityUnitGetData(data)),
    onPriceUnitGetData: (data) => dispatch(actions.priceUnitGetData(data)),
    onCommissionUnitGetData: (data) =>
      dispatch(actions.commissionUnitGetData(data)),
    onSupplierGetData: (data) => dispatch(actions.suppilerGetData(data)),
    onPurchaseSalesIndentGetData: (data) =>
      dispatch(actions.purchaseSalesIndentGetData(data)),
    onPurchaseOrderGetData: (data) =>
      dispatch(actions.purchaseOrderGetData(data)),
    cityGetData: (data) => dispatch(actions.cityGetData(data)),
    countryGetData: (data) => dispatch(actions.countryGetData(data)),
    stateGetData: (data) => dispatch(actions.stateGetData(data)),
    onDeletePurchaseOrder: (id, data) =>
      dispatch(actions.deletePurchaseOrder(id, data)),
    onPostPurchaseOrderData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postPurchaseOrderData(data, user, toggle, setSubmitting)
      ),
    updatePurchaseOrderData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updatePurchaseOrderData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BriefPurchaseOrder);
