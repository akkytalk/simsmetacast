import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { connect } from "react-redux";
import LinerLoader from "components/Loaders/LinerLoader";
import TextField from "@material-ui/core/TextField";
import * as actions from "../../store/creators";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  InputGroup,
  CardFooter,
  Card,
  CardBody,
  Label,
  ModalFooter,
} from "reactstrap";
import { MenuItem } from "@mui/material";

function ActionClient(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in action client:", values);
    setSubmitting(true);

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

    console.log("Data of action supplier:", user);
    props.updateClientData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <div>
      <div>
        <Button
          className="bg-gradient-yellow p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-edit" aria-hidden="true"></i>
        </Button>
        <Button
          className="bg-gradient-danger text-white ml-3 p-1"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </Button>
      </div>

      <Modal className="modal-xl" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit Client
        </ModalHeader>
        {props.client?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              customer_type: props.data?.customer_type,
              company_name: props.data.company_name,
              group_name: props.data.group_name,
              phone: props.data.mobile_number,
              iec_no: props.data.iec_no,
              contact_person: props.data.contact_person,
              contact_number: props.data.contact_number,
              psic_cost: props.data.psic_cost,
              psic_type: props.data.psic_type,
              address: props.data?.address
                ? props.data?.address
                : [
                    {
                      address_1: "",
                      address_2: "",
                      country: "",
                      state: "",
                      city: "",
                      pincode: "",
                      pan_number: "",
                      gst_number: "",
                      vat: "",
                      email: "",
                      set_as_default: 0,
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
                        },
                      ],
                    },
                  ],
              // address: [
              //   {
              //     address_1: "",
              //     address_2: "",
              //     country: "",
              //     state: "",
              //     city: "",
              //     pincode: "",
              //     pan_number: "",
              //     gst_number: "",
              //     vat: "",
              //     email: "",
              //     set_as_default: 0,
              //     bank: [
              //       {
              //         bank_name: "",
              //         phone: "",
              //         bank_contact_person: "",
              //         account_no: "",
              //         ifsc_code: "",
              //         branch_name: "",
              //         swift_no: "",
              //         iban_number: "",
              //       },
              //     ],
              //   },
              // ],
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => (
              <Form>
                {console.log(`formprops action supppiler`, formProps.values)}
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
                        label="Select Customer Type"
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
                        label="Phone No"
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
                          formProps.touched.iec_no && formProps.errors.iec_no
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
                        {/* <Label for="size">Name</Label> */}
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
                </Row>
                <Col md={12}>
                  <FieldArray
                    name="address"
                    render={(arrayHelpers) => (
                      <div className="address">
                        {/* {console.log("values", formProps?.values?.address)} */}

                        {formProps.values.address?.map((addr, index) => {
                          return (
                            <Card
                              id={index}
                              className="address-container mb-4"
                              key={index}
                            >
                              <Label className="font-weight-600 text-black">
                                Address {index + 1}
                              </Label>
                              <div className="address-line">
                                <Row className="form-group">
                                  <Col md={3}>
                                    <TextField
                                      fullWidth
                                      variant="standard"
                                      // size="small"
                                      id={`address.${index}.address_1`}
                                      label="Address line 1"
                                      name={`address.${index}.address_1`}
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
                                      variant="standard"
                                      id={`address.${index}.country`}
                                      label="Select Country"
                                      name={`address.${index}.country`}
                                      value={
                                        formProps.values.address[index].country
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2}>
                                    <TextField
                                      fullWidth
                                      variant="standard"
                                      id={`address.${index}.state`}
                                      label="select state"
                                      name={`address.${index}.state`}
                                      value={
                                        formProps.values.address[index].state
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2}>
                                    <TextField
                                      fullWidth
                                      variant="standard"
                                      id={`address.${index}.city`}
                                      label="select city"
                                      name={`address.${index}.city`}
                                      value={
                                        formProps.values.address[index].city
                                      }
                                      onChange={formProps.handleChange}
                                    />
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
                                        formProps.values.address[index].pincode
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
                                        formProps.values.address[index].email
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                </Row>
                              </div>
                              <Col md={12}>
                                {/* {console.log(`addr?.banks`, addr?.banks)} */}
                                <FieldArray
                                  name={`address.${index}.banks`}
                                  render={(bankArrayHelper) => {
                                    return addr?.banks?.map((bank, BIndex) => {
                                      return (
                                        <Card
                                          className="bank-container mb-2"
                                          key={BIndex}
                                        >
                                          <CardBody className="p-0">
                                            <Label className="font-weight-600 text-black">
                                              Bank Details {BIndex + 1}
                                            </Label>
                                            <div className="bank-details">
                                              <Row className="form-group">
                                                <Col md={2}>
                                                  <TextField
                                                    fullWidth
                                                    variant="standard"
                                                    id={`address.${index}.banks.${BIndex}.bank_name`}
                                                    label="Bank Name"
                                                    name={`address.${index}.banks.${BIndex}.bank_name`}
                                                    value={
                                                      formProps.values.address[
                                                        index
                                                      ].banks[BIndex].bank_name
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
                                                    id={`address.${index}.banks.${BIndex}.phone`}
                                                    label="Phone No"
                                                    name={`address.${index}.banks.${BIndex}.phone`}
                                                    value={
                                                      formProps.values.address[
                                                        index
                                                      ].banks[BIndex].phone
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
                                                    id={`address.${index}.banks.${BIndex}.bank_contact_person`}
                                                    label="Bank Contact Person"
                                                    name={`address.${index}.banks.${BIndex}.bank_contact_person`}
                                                    value={
                                                      formProps.values.address[
                                                        index
                                                      ].banks[BIndex]
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
                                                    id={`address.${index}.banks.${BIndex}.account_no`}
                                                    label="Account No"
                                                    name={`address.${index}.banks.${BIndex}.account_no`}
                                                    value={
                                                      formProps.values.address[
                                                        index
                                                      ].banks[BIndex].account_no
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
                                                    id={`address.${index}.banks.${BIndex}.ifsc_code`}
                                                    label="IFSC Code"
                                                    name={`address.${index}.banks.${BIndex}.ifsc_code`}
                                                    value={
                                                      formProps.values.address[
                                                        index
                                                      ]?.banks[BIndex]
                                                        ?.ifsc_code
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
                                                    id={`address.${index}.banks.${BIndex}.branch_name`}
                                                    label="Branch Address"
                                                    name={`address.${index}.banks.${BIndex}.branch_name`}
                                                    value={
                                                      formProps.values.address[
                                                        index
                                                      ].banks[BIndex]
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
                                                    id={`address.${index}.banks.${BIndex}.iban_number`}
                                                    label="IBAN No"
                                                    name={`address.${index}.banks.${BIndex}.iban_number`}
                                                    value={
                                                      formProps.values.address[
                                                        index
                                                      ].banks[BIndex]
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
                                                    id={`address.${index}.banks.${BIndex}.swift_no`}
                                                    label="Swift No"
                                                    name={`address.${index}.banks.${BIndex}.swift_no`}
                                                    value={
                                                      formProps.values.address[
                                                        index
                                                      ].banks[BIndex].swift_no
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
                                                `bank action client`,
                                                formProps.values.address[index]
                                                  ?.banks
                                              )} */}
                                              {addr.banks.length ===
                                                BIndex + 1 && (
                                                <Button
                                                  className="btn-success p-1"
                                                  onClick={() => {
                                                    bankArrayHelper.push({
                                                      bank_name: "",
                                                      phone: "",
                                                      bank_contact_person: "",
                                                      account_no: "",
                                                      ifsc_code: "",
                                                      branch_name: "",
                                                      swift_no: "",
                                                      iban_number: "",
                                                    });
                                                  }}
                                                >
                                                  <i className="fa fa-plus" />
                                                </Button>
                                              )}

                                              {addr.banks?.length > 1 && (
                                                <Button
                                                  color="danger p-1"
                                                  size="sm"
                                                  onClick={() =>
                                                    bankArrayHelper.remove(
                                                      BIndex
                                                    )
                                                  }
                                                >
                                                  <i className="fa fa-trash" />
                                                </Button>
                                              )}
                                            </div>
                                          </CardBody>
                                        </Card>
                                      );
                                    });
                                  }}
                                />
                              </Col>

                              <CardFooter className="d-flex justify-content-end align-items-center p-2 pb-0">
                                {formProps.values.address.length ===
                                  index + 1 && (
                                  <Button
                                    className="btn-success p-1 "
                                    onClick={() => {
                                      arrayHelpers.push({
                                        address_1: "",
                                        address_2: "",
                                        country: "",
                                        state: "",
                                        city: "",
                                        pincode: "",
                                        pan_number: "",
                                        gst_number: "",
                                        vat: "",
                                        email: "",
                                        city_id: "",
                                        client_id: "",
                                        country_id: "",
                                        created_at: "",
                                        default_bank: "",
                                        deleted_at: "",
                                        set_as_default: "",
                                        state_id: "",
                                        updated_at: "",
                                        bank: [
                                          {
                                            account_no: "",
                                            address_id: "",
                                            bank_name: "",
                                            branch_name: "",
                                            client_id: "",
                                            created_at: "",
                                            deleted_at: "",
                                            iban_number: "",
                                            id: "",
                                            ifsc_code: "",
                                            set_as_default: "0",
                                            swift_no: "",
                                            updated_at: "",
                                          },
                                        ],
                                      });
                                    }}
                                  >
                                    <i className="fa fa-plus" />
                                  </Button>
                                )}

                                {formProps.values.address?.length > 1 && (
                                  <Button
                                    color="danger p-1"
                                    size="sm"
                                    onClick={() => arrayHelpers.remove(index)}
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
        <ModalFooter>
          {props.client?.isUpdateLoading && <LinerLoader />}
        </ModalFooter>
      </Modal>
    </div>
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
    onDeleteClient: (id, data) => dispatch(actions.deleteClient(id, data)),
    onPostClientData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postClientData(data, user, toggle, setSubmitting)),
    updateClientData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateClientData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ActionClient);
