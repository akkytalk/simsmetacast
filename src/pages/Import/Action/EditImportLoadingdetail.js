/* eslint-disable eqeqeq */
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
import * as Yup from "yup";
import { FieldArray, Form, Formik } from "formik";
import * as actions from "store/creators";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import LinerLoader from "components/Loaders/LinerLoader";
import { connect } from "react-redux";
import CustomTextField from "components/MuiComponents/CustomTextField";
import DeleteButton from "Helpers/DeleteButton";
import AddButton from "Helpers/AddButton";
import CustomSelectField from "components/MuiComponents/CustomSelectField";
import CustomCheckbox from "components/MuiComponents/CustomCheckbox";
import { isEmpty } from "Helpers/helper";

function EditImportLoadingdetail({
  currentImportSalesContract,

  ...props
}) {
  let data = {
    token: props.login?.login?.token,
    id: props.data?.id,
  };

  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const form_total_quantity =
    props.data.container_details?.length > 0
      ? props.data.container_details?.reduce((acc, curr) => {
          return acc + Number(curr.quantity);
        }, 0)
      : 0;

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Loading Detail:", values);

    const local_total_quantity =
      values.details?.length > 0
        ? values.details?.reduce((acc, curr) => {
            return acc + Number(curr.quantity);
          }, 0)
        : 0;

    if (
      Number(local_total_quantity) >=
      Number(props.remainingQuantity) + Number(form_total_quantity)
    ) {
      setError("Total quantity is greater than remaining quantity");
      setSubmitting(false);
      return;
    }
    setError("");

    const user = new FormData();
    values.files?.map((file, index) => {
      return user.append(`files[${index}]`, file);
    });
    values.images?.map((file, index) => {
      return user.append(`images[${index}]`, file);
    });
    user.append("sale_contract_id", props.data.sale_contract_id);
    user.append("sales_confirmation_id", props.data?.sales_confirmation_id);
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
    props.updateImportLoadingdetailData(data, user, toggle, setSubmitting);
    return;
  };
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
              loading_date: props.data?.loading_date ?? "",
              vessel_name: props.data?.vessel_name ?? "",
              etd: props.data?.etd ?? "",
              eta_at_port: props.data?.eta_at_port ?? "",
              eta_at_icd: props.data?.eta_at_icd ?? "",
              container_status: props.data?.container_status ?? "",
              bl_no: props.data?.bl_no ?? "",
              shipping_company: props.data?.shipping_company ?? "",
              psic_number: props.data?.psic_number ?? "",
              images: [],
              files: [],
              drive_link: props.data?.drive_link ?? "",
              discharge_port: props.data?.discharge_port ?? "",
              loading_port: props.data?.loading_port ?? "",
              delivery_place: props.data?.delivery_place ?? "",
              shipper: props.data?.shipper ?? "",
              eta: props.data?.eta ?? "",
              container_size: props.data?.container_size ?? "",
              hs_code: props.data?.hs_code ?? "",
              free_days: props.data?.free_days ?? "",
              damage: props.data?.damage ?? "",
              bl_file: props.data?.bl_file ?? "",
              is_job_done: props.data?.is_job_done ?? "",
              pending_quantity: props.data?.pending_quantity ?? "",
              loaded_quantity: props.data?.loaded_quantity ?? "",
              job_no: props.data?.job_no ?? "",
              file_no: props.data?.file_no ?? "",
              is_dgft_done: props.data?.is_dgft_done ?? "",
              dgft_amount: props.data?.dgft_amount ?? "",
              is_da_done: props.data?.is_da_done ?? "",
              cha_name: props.data?.cha_name ?? "",
              da_date: props.data?.da_date ?? "",
              bl_type: props.data?.bl_type ?? "",
              license_type: props.data?.license_type ?? "",
              license_no: props.data?.license_no ?? "",
              duty_paid: props.data?.duty_paid ?? "",
              total_duty: props.data?.total_duty ?? "",
              quantity_used: props.data?.quantity_used ?? "",
              container_array: [
                {
                  commodity: "",
                  quantity: "",
                  price: "",
                  price_unit: "",
                  quantity_unit: "",
                },
              ],
              details: !isEmpty(props.data.container_details)
                ? props.data.container_details
                : [
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
                          {formProps.values.details?.map((detail, index) => {
                            return (
                              <Card className="address-container mb-4">
                                <Label className="font-weight-600 text-black d-flex justify-content-end">
                                  quantity should not be more than{" "}
                                  {Number(props.remainingQuantity) +
                                    Number(form_total_quantity)}
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
                                    name={`container_array`}
                                    render={(commArrayHelper) => {
                                      return (
                                        <>
                                          {formProps.values?.container_array?.map(
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
                                                          .details[index].price
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
                                                  ?.price?.provisional_price
                                              : "",
                                          price_unit:
                                            currentImportSalesContract?.price
                                              ?.amount_unit ?? "",

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

                                  {formProps.values.details?.length > 1 && (
                                    <DeleteButton
                                      deleteFunction={() =>
                                        arrayHelpers.remove(index)
                                      }
                                    />
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
                            formProps.touched.bl_no && formProps.errors.bl_no
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
                      <Label for="file">Upload Mutliple Image</Label>
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
                            formProps.touched.images && formProps.errors.images
                          }
                        />
                      </InputGroup>
                    </Col>
                    <Col md={4}>
                      <Label for="file">Upload Mutliple Docs</Label>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="standard"
                          id="files"
                          type="file"
                          name="files"
                          inputProps={{ multiple: true }}
                          onChange={(e) => {
                            formProps.setFieldValue("files", [
                              ...e.target.files,
                            ]);
                          }}
                          error={
                            formProps.touched.files &&
                            Boolean(formProps.errors.files)
                          }
                          helperText={
                            formProps.touched.files && formProps.errors.files
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
                          formProps.touched.shipper && formProps.errors.shipper
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
                          <MenuItem value={size.size}>{size.size}'</MenuItem>
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
                          formProps.touched.bl_file && formProps.errors.bl_file
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
          {props.importLoadingdetail?.isUpdateLoading && <LinerLoader />}

          {error && (
            <div className="text-center text-red font-weight-bold">{error}</div>
          )}
        </ModalFooter>
      </Modal>
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditImportLoadingdetail);
