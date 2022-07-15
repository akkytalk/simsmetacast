/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import LinerLoader from "components/Loaders/LinerLoader";
import TextField from "@material-ui/core/TextField";
import * as actions from "../../redux/creators";

import {
  Button,
  Row,
  Col,
  InputGroup,
  Card,
  CardBody,
  Label,
  CardHeader,
} from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";

import { MenuItem } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import EmailRef from "components/EmailReference/EmailRef";

function ActionBriefPurchaseOrder(props) {
  const { id } = useParams();
  const history = useHistory();

  const defaultProps = {
    options: props.suppiler?.filter(
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
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: id,
  };

  const purchaseOrderData = props.purchaseOrder.purchaseOrder.filter(
    (order) => order.id == id
  );

  const purchaseSalesIndentData =
    props.purchaseSalesIndent.purchaseSalesIndent.filter(
      (sale) => sale.id == id
    ).length > 0
      ? props.purchaseSalesIndent.purchaseSalesIndent.filter(
          (sale) => sale.order_id == id
        )
      : [];

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  // async function deleteSupplier(id) {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       props.onDeleteSupplier(id, data);
  //     }
  //   });
  // }

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in action purchaseOrder:", values);
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
      // commission: values.commission,
      // commission_type: values.commission_unit,
      remarks: values.remark,
      no_purchase_orders: values.no_purchase_order,
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

    console.log("Data of action Purchase Order:", user);
    props.updatePurchaseOrderData(data, user, toggle, setSubmitting);
    return;
  };

  console.log(`purchaseOrderData`, purchaseOrderData);
  console.log(`purchaseSalesIndentData`, purchaseSalesIndentData);

  return (
    <div>
      <Card className="m-4">
        <CardHeader>
          <Button
            className="bg-gradient-info float-right text-white"
            disabled={
              purchaseOrderData[0]?.no_purchase_orders <=
              purchaseOrderData[0].psi_count
            }
            onClick={() =>
              history.push(`/admin/create-sales-confirmation/${id}`)
            }
          >
            Create Purchase Order <i className="fa fa-plus ml-2" />{" "}
          </Button>
        </CardHeader>
        {props.purchaseOrder?.isUpdateLoading && <LinerLoader />}
        <CardBody>
          {purchaseOrderData ? (
            <Formik
              initialValues={{
                ref_no: purchaseOrderData[0].ref_no,
                customer_id: purchaseOrderData[0].customer_id ?? "",
                booking_date: purchaseOrderData[0].booking_date ?? "",
                supplier_id: purchaseOrderData[0].supplier_id ?? "",
                quantity: purchaseOrderData[0].quantity ?? "",
                unit: purchaseOrderData[0].quantity_type ?? "",
                quality: purchaseOrderData[0].quality ?? "",
                price: purchaseOrderData[0].price ?? "",
                price_unit: purchaseOrderData[0].price_type ?? "",
                // commission: purchaseOrderData[0].commission ?? "",
                // commission_unit: purchaseOrderData[0].commission_type ?? "",
                remark: purchaseOrderData[0].remarks ?? "",
                no_purchase_order:
                  purchaseOrderData[0].no_purchase_orders ?? "",
                commission_from_supplier:
                  purchaseOrderData[0]?.commission_from_supplier ?? 0,
                commission_from_supplier_type:
                  purchaseOrderData[0]?.commission_from_supplier_type ?? "PMT",
                commission_from_customer:
                  purchaseOrderData[0]?.commission_from_customer ?? 0,
                commission_from_customer_type:
                  purchaseOrderData[0]?.commission_from_customer_type ?? "PMT",
                commission_to_customer:
                  purchaseOrderData[0]?.commission_to_customer ?? 0,
                commission_to_customer_type:
                  purchaseOrderData[0]?.commission_to_customer_type ?? "PMT",
                shipper_name: purchaseOrderData[0]?.shipper_name ?? "",
                is_fixed: purchaseOrderData[0]?.is_fixed ?? "",
                operator: purchaseOrderData[0]?.operator ?? "",
                value: purchaseOrderData[0]?.value ?? "",
              }}
              onSubmit={handleSubmit}
            >
              {(formProps) => (
                <Form>
                  {console.log(`formProps.values`, formProps.values)}
                  <Row className="form-group d-flex  align-items-center">
                    <Col md={2}>
                      <InputGroup>
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
                      </InputGroup>
                    </Col>
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
                          defaultValue={purchaseOrderData[0].customer}
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
                              // value={formProps.values.customer_id}
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
                          defaultValue={purchaseOrderData[0].supplier}
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
                          id="unit *"
                          label="Select Unit"
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
                        Total Number Of Purchase Order :{" "}
                        {purchaseOrderData[0]?.psi_count}{" "}
                        {purchaseSalesIndentData?.map((p) => {
                          return (
                            <div>
                              Purchase Order Ref No.
                              <Link
                                rel="noopener noreferrer"
                                target="_blank"
                                to={`/admin/edit-purchase-indents/${p?.id}`}
                              >
                                {p.ref_no}
                              </Link>
                            </div>
                          );
                        })}
                      </Label>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      (Number Of Purchase Order{" "}
                      {Number(purchaseOrderData[0]?.psi_count)} of{" "}
                      {purchaseOrderData[0]?.no_purchase_orders ?? ""} pending)
                    </Col>
                    <Col md={6} style={{ display: "flex" }}>
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
                      <Col md={6}>
                        <Button type="reset" color="danger" block>
                          <b>Reset</b>
                        </Button>
                      </Col>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          ) : (
            <div>Something went wrong</div>
          )}
        </CardBody>
      </Card>
      <Card className="m-4">
        <EmailRef orderId={id} data={purchaseOrderData} />
      </Card>
    </div>
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
    purchaseSalesIndent: state.purchaseSalesIndent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePurchaseOrderData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updatePurchaseOrderData(data, user, toggle, setSubmitting)
      ),
    onDeletePurchaseOrder: (id, data) =>
      dispatch(actions.deletePurchaseOrder(id, data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionBriefPurchaseOrder);
