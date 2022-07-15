/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Label,
  InputGroup,
  CardFooter,
} from "reactstrap";
import * as Yup from "yup";
import { FieldArray, Form, Formik } from "formik";
import { connect } from "react-redux";
import * as actions from "redux/creators";
import { useParams } from "react-router-dom";
import MenuButton from "components/MenuButton/MenuButton";
import CustomTextField from "../../components/MuiComponents/CustomTextField";
import { MenuItem, TextField } from "@mui/material";

const options = [
  { name: "Add Sales Contract", page: "import-add-sales-contract" },
  { name: "Add Loading Dlocationils", page: "import-add-loading-dlocationils" },
  { name: "Upload Document", page: "import-upload-doc" },
  // { name: "Highseas", page: "import-highseas" },
  { name: "Quanlity Match", page: "import-quality-match" },
];

function HighSea(props) {
  const { id } = useParams();

  const purchaseSalesIndentData = [];
  // props.purchaseSalesIndent.purchaseSalesIndent.filter(
  //   (sale) => sale.id == id
  // );
  let data = {
    token: props.login?.login?.token,
    id: purchaseSalesIndentData[0]?.bpo?.id,
  };

  useEffect(() => {
    props.onContainerSizeGetData(data);
  }, []);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in sales contract:", values);
    setSubmitting(true);

    let user = {
      name: values.name,
      contract_email: values.email,
      customer_id: purchaseSalesIndentData[0]?.bpo?.customer_id,
      booking_email: purchaseSalesIndentData[0]?.bpo?.booking_email,
      supplier_id: purchaseSalesIndentData[0]?.bpo?.supplier_id,
      container_size: purchaseSalesIndentData[0]?.bpo?.container_size,
      container_size_type: purchaseSalesIndentData[0]?.bpo?.container_size_type,
      address: purchaseSalesIndentData[0]?.bpo?.address,
      price: purchaseSalesIndentData[0]?.bpo?.price,
      price_type: purchaseSalesIndentData[0]?.bpo?.price_type,
      commission: purchaseSalesIndentData[0]?.bpo?.commission,
      commission_type: purchaseSalesIndentData[0]?.bpo?.commission_type,
      location: purchaseSalesIndentData[0]?.bpo?.location,
      no_purchase_orders: purchaseSalesIndentData[0]?.bpo?.no_purchase_orders,
      subject: purchaseSalesIndentData[0]?.bpo?.subject,
      email_email: purchaseSalesIndentData[0]?.bpo?.email_email,
      sent_to: purchaseSalesIndentData[0]?.bpo?.sent_to,
    };

    console.log("Data of sales contract:", user);
    // props.upemailPurchaseOrderData(data, user, toggle, setSubmitting);
    return;
  };

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
            name: "",
            email: "",
            address: "",
            phone: "",
            // location: "",
            // city: "",
            // state: "",
            // country: "",
            // pincode: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("required"),
            email: Yup.string().required("required"),
          })}
        >
          {(formProps) => (
            <Form>
              {console.log("formProps.values", formProps.values)}
              <Row className="form-group d-flex align-items-end">
                <Col md={6}>
                  <InputGroup>
                    <CustomTextField
                      name="name"
                      label="Name"
                      formProps={formProps}
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <CustomTextField
                      name="email"
                      type="email"
                      label="Email"
                      formProps={formProps}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className="form-group d-flex align-items-end">
                <Col md={6}>
                  <InputGroup>
                    <CustomTextField
                      name="address"
                      label="Address"
                      formProps={formProps}
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <CustomTextField
                      name="phone"
                      label="Mobile No"
                      formProps={formProps}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Row style={{ justifyContent: "center", marginTop: "50px" }}>
                <Col md={2}>
                  <Button type="reset" color="danger" block>
                    <b>Reset</b>
                  </Button>
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
    containerSize: state.containerSize.containerSize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onContainerSizeGetData: (data) =>
      dispatch(actions.containerSizeGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HighSea);
