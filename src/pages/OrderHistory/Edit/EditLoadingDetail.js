import React, { useState } from "react";
import {
  Card,
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
import * as actions from "../../../redux/creators";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import LinerLoader from "components/Loaders/LinerLoader";
import { connect } from "react-redux";

function EditLoadingDetail({ purchaseSalesIndentData, ...props }) {
  let data = {
    token: props.login?.login?.token,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const quantity = purchaseSalesIndentData[0]?.bpo?.quantity;

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Loading Detail:", values);
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
    props.updateLoadingDetailData(data, user, toggle, setSubmitting);
    return;
  };
  console.log("purchaseSalesIndentData", purchaseSalesIndentData);
  return (
    <>
      <Button
        className="bg-gradient-yellow p-1"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-edit" />
      </Button>

      <Modal className="modal-xl" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit Loading Details
        </ModalHeader>

        <ModalBody className="">
          <Formik
            initialValues={{
              loading_date: props.data.loading_date,
              vessel_name: props.data.vessel_name,
              etd: props.data.etd,
              eta_at_port: props.data.eta_at_port,
              eta_at_icd: props.data.eta_at_icd,
              container_status: props.data.container_status,
              bi_no: props.data.bi_no,
              shipping_company: props.data.shipping_company,
              psic_number: props.data.psic_number,
              price_unit:
                purchaseSalesIndentData[0]?.commodity_details[0]
                  ?.indent_details[0]?.price?.amount_unit,
              quantity_unit:
                purchaseSalesIndentData[0]?.commodity_details[0]
                  ?.indent_details[0]?.quantity_unit,
              commodity_id:
                purchaseSalesIndentData[0]?.commodity_details[0]
                  ?.indent_details[0]?.commodity_id ?? "",
              price:
                purchaseSalesIndentData[0]?.commodity_details[0]
                  ?.indent_details[0]?.price?.amount,
              details:
                props.data.container_details.length > 0
                  ? props.data.container_details
                  : [
                      {
                        container_no: "",
                        seal_no: "",
                        order_id: purchaseSalesIndentData[0]?.bpo?.id,
                        commodity_id:
                          purchaseSalesIndentData[0]?.commodity_details[0]
                            ?.indent_details[0]?.commodity_id ?? "",
                        price:
                          purchaseSalesIndentData[0]?.commodity_details[0]
                            ?.indent_details[0]?.price?.amount,
                        quantity: "",

                        bpo: {
                          purchase_sale_indents: [
                            {
                              container_details: [
                                {
                                  commodity_id:
                                    purchaseSalesIndentData[0]
                                      ?.commodity_details[0]?.indent_details[0]
                                      ?.commodity_id ?? "",
                                  price:
                                    purchaseSalesIndentData[0]
                                      ?.commodity_details[0]?.indent_details[0]
                                      ?.price?.amount,
                                },
                              ],
                            },
                          ],
                        },
                      },
                    ],
            }}
            onSubmit={handleSubmit}
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
                          {console.log("values", formProps?.values?.details)}

                          {formProps.values.details?.map((detail, index) => {
                            if (detail.seal_no !== 0)
                              return (
                                <Card className="address-container mb-4">
                                  <Label className="font-weight-600 text-black d-flex justify-content-end">
                                    quantity should not be more than {quantity}
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
                                      name={`details.${index}.bpo.purchase_sale_indents`}
                                      render={(commArrayHelper) => {
                                        console.log(
                                          "remain quantity",
                                          quantity -
                                            formProps.values.details.reduce(
                                              (a, v) =>
                                                (a =
                                                  Number(a) +
                                                  Number(v.quantity)),
                                              0
                                            )
                                        );
                                        return (
                                          <>
                                            {formProps.values?.details[
                                              index
                                            ]?.bpo?.purchase_sale_indents?.map(
                                              (c, cindex) => {
                                                return (
                                                  <Row className="form-group d-flex align-items-end">
                                                    <Col md={2}>
                                                      <TextField
                                                        fullWidth
                                                        select
                                                        disabled
                                                        variant="standard"
                                                        id={`commodity_id`}
                                                        label="Commodity"
                                                        name={`commodity_id`}
                                                        value={
                                                          formProps.values
                                                            .commodity_id
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
                                                          // min: 0,
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
                                                        id="quantity_unit"
                                                        label="quantity unit"
                                                        name="quantity_unit"
                                                        value={
                                                          formProps.values
                                                            .quantity_unit
                                                        }
                                                        onChange={
                                                          formProps.handleChange
                                                        }
                                                      >
                                                        {props.quantityUnit?.map(
                                                          (unit) => (
                                                            <MenuItem
                                                              value={unit.id}
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
                                                        id={`price`}
                                                        label="Price"
                                                        name={`price`}
                                                        value={
                                                          formProps.values.price
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
                                                        id="price_unit"
                                                        label="Price Unit"
                                                        name="price_unit"
                                                        value={
                                                          formProps.values
                                                            .price_unit
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
                                              purchaseSalesIndentData[0]?.bpo
                                                ?.id,

                                            quantity: "",
                                            commodity_id:
                                              purchaseSalesIndentData[0]
                                                ?.commodity_details[0]
                                                ?.indent_details[0]
                                                ?.commodity_id ?? "",
                                            price:
                                              purchaseSalesIndentData[0]
                                                ?.commodity_details[0]
                                                ?.indent_details[0]?.price
                                                ?.amount,
                                            bpo: {
                                              purchase_sale_indents: [
                                                {
                                                  container_details: [
                                                    {
                                                      commodity_id:
                                                        purchaseSalesIndentData[0]
                                                          ?.commodity_details[0]
                                                          ?.indent_details[0]
                                                          ?.commodity_id ?? "",
                                                      price:
                                                        purchaseSalesIndentData[0]
                                                          ?.commodity_details[0]
                                                          ?.indent_details[0]
                                                          ?.price?.amount,
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          });
                                        }}
                                      >
                                        <i className="fa fa-plus" />
                                      </Button>
                                    )}

                                    {formProps.values.details?.length > 1 && (
                                      <Button
                                        color="danger p-1"
                                        size="sm"
                                        onClick={
                                          () =>
                                            formProps.setFieldValue(
                                              `details[${index}].seal_no`,
                                              Number(0)
                                            )
                                          //  arrayHelpers.remove(index)
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
                      <Label className="label">ETD</Label>
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
                      <Label className="label">ETA AT PORT</Label>
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
                      <Label className="label">ETA AT ICD</Label>

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
                            formProps.touched.bi_no && formProps.errors.bi_no
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
          {props.loadingDetail?.isUpdateLoading && <LinerLoader />}
        </ModalFooter>
      </Modal>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditLoadingDetail);
