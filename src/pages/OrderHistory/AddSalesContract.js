/* eslint-disable eqeqeq */
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Label,
  InputGroup,
} from "reactstrap";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import * as actions from "../../redux/creators";
import { useParams } from "react-router-dom";
import WordDocSalesContract from "../wordDocuments/WordDocSalesContract2";
import MenuButton from "components/MenuButton/MenuButton";

const options = [
  { name: "Edit Exports", page: "edit-purchase-indents" },
  { name: "Create/Edit Sales Indents", page: "edit-create-sales-indents" },
  // { name: "Add Sales Contract", page: "add-sales-contract" },
  { name: "Add Advance Details", page: "add-advance-details" },
  { name: "Add Loading Details", page: "add-loading-details" },
  { name: "LME Fixation", page: "lme-fixation" },
  { name: "Manage Files", page: "manages-files" },
  { name: "User History", page: "new-order-history" },
];

function AddSalesContract(props) {
  const { id } = useParams();

  const purchaseSalesIndentData = [];
  // props.purchaseSalesIndent.purchaseSalesIndent.filter(
  //   (sale) => sale.id == id
  // );
  let data = {
    token: props.login?.login?.token,
    id: purchaseSalesIndentData[0]?.bpo?.id,
  };

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
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in sales contract:", values);
    setSubmitting(true);

    let user = {
      contract_number: values.contract_number,
      contract_date: values.date,
      customer_id: purchaseSalesIndentData[0]?.bpo?.customer_id,
      booking_date: purchaseSalesIndentData[0]?.bpo?.booking_date,
      supplier_id: purchaseSalesIndentData[0]?.bpo?.supplier_id,
      quantity: purchaseSalesIndentData[0]?.bpo?.quantity,
      quantity_type: purchaseSalesIndentData[0]?.bpo?.quantity_type,
      quality: purchaseSalesIndentData[0]?.bpo?.quality,
      price: purchaseSalesIndentData[0]?.bpo?.price,
      price_type: purchaseSalesIndentData[0]?.bpo?.price_type,
      commission: purchaseSalesIndentData[0]?.bpo?.commission,
      commission_type: purchaseSalesIndentData[0]?.bpo?.commission_type,
      remarks: purchaseSalesIndentData[0]?.bpo?.remarks,
      no_purchase_orders: purchaseSalesIndentData[0]?.bpo?.no_purchase_orders,
      subject: purchaseSalesIndentData[0]?.bpo?.subject,
      email_date: purchaseSalesIndentData[0]?.bpo?.email_date,
      sent_to: purchaseSalesIndentData[0]?.bpo?.sent_to,
    };

    console.log("Data of sales contract:", user);
    props.updatePurchaseOrderData(data, user, toggle, setSubmitting);
    return;
  };

  console.log(`ipurchaseSalesIndentData`, purchaseSalesIndentData);
  return (
    <Card>
      <div className="p-1 d-flex justify-content-end align-items-center">
        <span className="font-weight-bold mr-2">Navigation </span>
        <i className="ni ni-bold-right" />
        <MenuButton index={id} options={options} />
      </div>
      <CardBody>
        <Formik
          initialValues={{
            contract_number: purchaseSalesIndentData[0]?.bpo?.contract_number,
            date: purchaseSalesIndentData[0]?.bpo?.contract_date,
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            contract_number: Yup.string().required("required"),
            date: Yup.string().required("required"),
          })}
        >
          {(formProps) => (
            <Form>
              <Row className="form-group d-flex align-items-end">
                <Col md={6}>
                  <InputGroup>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      id="contract_number"
                      label="Contract Number *"
                      name="contract_number"
                      value={formProps.values.contract_number}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.contract_number &&
                        Boolean(formProps.errors.contract_number)
                      }
                      helperText={
                        formProps.touched.contract_number &&
                        formProps.errors.contract_number
                      }
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <Label className="label">Contact Date *</Label>
                  <InputGroup>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      id="date"
                      type="date"
                      name="date"
                      value={formProps.values.date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.date && Boolean(formProps.errors.date)
                      }
                      helperText={
                        formProps.touched.date && formProps.errors.date
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Row style={{ justifyContent: "center", marginTop: "120px" }}>
                <Col md={2}>
                  <Button type="reset" color="danger" block>
                    <b>Reset</b>
                  </Button>
                </Col>
                <Col md={2}>
                  <WordDocSalesContract
                    print
                    purchaseSalesIndentData={purchaseSalesIndentData[0]}
                    ref_no={purchaseSalesIndentData[0]?.ref_no}
                    supplier={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.company_name ??
                      ""
                    }
                    contract_details={
                      purchaseSalesIndentData[0]?.bpo?.contract_details
                        ?.length > 0
                        ? purchaseSalesIndentData[0]?.bpo?.contract_details
                        : []
                    }
                    advance={
                      purchaseSalesIndentData[0]?.payment_advance_type == "%"
                        ? Number(
                            purchaseSalesIndentData[0]?.payment_advance
                          ).toFixed(2) + " %"
                        : Number(
                            purchaseSalesIndentData[0]?.payment_advance
                          ).toFixed(2) + " USD"
                    }
                    bank_name={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)[0]
                        ?.filter((add) => add.set_as_default == 1)[0]?.bank_name
                    }
                    bank_address={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)[0]
                        ?.filter((add) => add.set_as_default == 1)[0]
                        ?.branch_name
                    }
                    account_no={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)[0]
                        ?.filter((add) => add.set_as_default == 1)[0]
                        ?.account_no
                    }
                    swift_no={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)[0]
                        ?.filter((add) => add.set_as_default == 1)[0]?.swift_no
                    }
                    ifsc_code={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)[0]
                        ?.filter((add) => add.set_as_default == 1)[0]?.ifsc_code
                    }
                    iban_no={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)[0]
                        ?.filter((add) => add.set_as_default == 1)[0]
                        ?.iban_number
                    }
                    contact_person={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)[0]
                        ?.filter((add) => add.set_as_default == 1)[0]
                        ?.bank_contact_person
                    }
                    phone_no={
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)?.length > 0 &&
                      purchaseSalesIndentData[0]?.bpo?.supplier?.address
                        ?.filter((add) => add.set_as_default == 1)
                        ?.map((add) => add.banks)[0]
                        ?.filter((add) => add.set_as_default == 1)[0]?.phone
                    }
                    ctt_no={purchaseSalesIndentData[0]?.bpo?.contract_number}
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
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    purchaseSalesIndent: state.purchaseSalesIndent,
    login: state.login,
    purchaseOrder: state.purchaseOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(AddSalesContract);
