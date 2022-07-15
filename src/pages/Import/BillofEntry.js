import { Form, Formik } from "formik";
import React, { useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import CustomTextField from "../../components/MuiComponents/CustomTextField";
import MenuButton from "components/MenuButton/MenuButton";
import { useParams } from "react-router-dom";
import * as actions from "store/creators";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { arrayFilterByKey } from "Helpers/helper";
import LinerLoader from "components/Loaders/LinerLoader";
import { isEmpty } from "Helpers/helper";

const options = [
  { name: "Add Sales Contract", page: "import/add-sales-contract" },
  { name: "Add Loading Details", page: "import/add-loading-details" },
  { name: "Add Advance Details", page: "import/add-advance-details" },
  { name: "Quanlity Match", page: "import/quality-match" },
];

function BillofEntry(props) {
  const { id } = useParams();

  const currentImportSalesContract = useMemo(
    () =>
      arrayFilterByKey(
        props.importSalesContract.importSalesContract,
        "id",
        id
      )[0],
    [props.importSalesContract.importSalesContract, id]
  );

  const currentIBillofEntry = useMemo(
    () =>
      arrayFilterByKey(
        props.billofEntry.billofEntry,
        "sale_contract_id",
        id
      )[0] ?? "",
    [props.billofEntry.billofEntry, id]
  );

  let data = {
    token: props.login?.login?.token,
    id: currentIBillofEntry?.id || "",
  };

  const toggle = () => {};

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Invoice:", values);
    setSubmitting(false);

    if (!isEmpty(currentIBillofEntry?.id)) {
      const user = new FormData();

      values.files?.map((file, index) => {
        // console.log("files", file);
        return user.append(`files[${index}]`, file);
      });
      user.append("id", currentIBillofEntry?.id);

      user.append("sale_contract_id", currentIBillofEntry.sale_contract_id);
      user.append(
        "sales_confirmation_id",
        currentIBillofEntry.sales_confirmation_id
      );
      user.append("number", values.number);
      user.append("date", values.date);
      user.append("passing_date", values.passing_date);
      user.append("duty", values.duty);
      user.append("license_details", values.license_details);
      user.append("duty_paid", values.duty_paid);
      user.append("total_duty", values.total_duty);
      user.append("paid_date", values.paid_date);
      user.append("quantity_used", values.quantity_used);
      user.append("quantity_pending", values.quantity_pending);
      user.append("quantity_date", values.quantity_date);
      user.append("amount", values.amount);

      console.log("Data of Invoice:", user);
      props.updateBillofEntryData(data, user, toggle, setSubmitting);
      return;
    }

    const user = new FormData();

    // values.files?.map((file, index) => {
    //   return user.append(`files[${index}]`, file);
    // });
    user.append("sale_contract_id", id);
    user.append(
      "sales_confirmation_id",
      currentImportSalesContract.sales_confirmation_id
    );
    user.append("number", values.number);
    user.append("date", values.date);
    user.append("passing_date", values.passing_date);
    user.append("duty", values.duty);
    user.append("license_details", values.license_details);
    user.append("duty_paid", values.duty_paid);
    user.append("total_duty", values.total_duty);
    user.append("paid_date", values.paid_date);
    user.append("quantity_used", values.quantity_used);
    user.append("quantity_pending", values.quantity_pending);
    user.append("quantity_date", values.quantity_date);
    user.append("amount", values.amount);

    console.log("Data of Invoice:", user);
    props.postBillofEntryData(data, user, toggle, setSubmitting);

    return;
  };

  console.log("currentIBillofEntry", currentIBillofEntry);

  return (
    <>
      <div className="p-1 d-flex justify-content-end align-items-center">
        <span className="font-weight-bold mr-2">Navigation </span>
        <i className="ni ni-bold-right" />
        <MenuButton index={id} options={options} />
      </div>
      <Card className="m-4">
        <CardHeader className="bg-gradient-yellow p-2 text-white">
          <strong className="pl-2">Bill of Entry</strong>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              number: currentIBillofEntry?.number || "",
              date: currentIBillofEntry?.date || "",
              passing_date: currentIBillofEntry?.passing_date || "",
              duty: currentIBillofEntry?.duty || "",
              license_details: currentIBillofEntry?.license_details || "",
              duty_paid: currentIBillofEntry?.duty_paid || "",
              paid_date: currentIBillofEntry?.paid_date || "",
              total_duty: currentIBillofEntry?.total_duty || "",
              files: currentIBillofEntry.files || [],
              quantity_used: currentIBillofEntry?.quantity_used || "",
              quantity_pending: currentIBillofEntry?.quantity_pending || "",
              quantity_date: currentIBillofEntry?.quantity_date || "",
              amount: currentIBillofEntry?.amount || "",
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => {
              return (
                <Form>
                  {console.log(`formProps.values`, formProps.values)}
                  <Row className="form-group pt-4 d-flex align-items-end">
                    <Col md={4}>
                      <InputGroup>
                        <CustomTextField
                          name="number"
                          type="number"
                          label="Number"
                          formProps={formProps}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={4}>
                      <Label className="label">Date </Label>
                      <InputGroup>
                        <CustomTextField
                          name="date"
                          type="date"
                          formProps={formProps}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={4}>
                      <Label className="label">Passing Date </Label>
                      <InputGroup>
                        <CustomTextField
                          name="passing_date"
                          type="date"
                          formProps={formProps}
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col md={4}>
                      <InputGroup>
                        <CustomTextField
                          formProps={formProps}
                          name="duty"
                          label="Duty"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={4}>
                      <InputGroup>
                        <CustomTextField
                          formProps={formProps}
                          name="license_details"
                          label="License Details"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={4}>
                      <InputGroup>
                        <CustomTextField
                          formProps={formProps}
                          name="duty_paid"
                          label="Duty Paid"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="form-group d-flex align-items-end">
                    <Col md={4}>
                      <InputGroup>
                        <CustomTextField
                          formProps={formProps}
                          name="total_duty"
                          label="Total Duty"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={4}>
                      <Label className="label">Duty Paid Date</Label>
                      <InputGroup>
                        <CustomTextField
                          formProps={formProps}
                          name="paid_date"
                          type={"date"}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={4}>
                      <Label for="file">Upload Mutliple Files</Label>
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
                  </Row>

                  <Card className="address-container border-dark mb-4 p-4">
                    <Label>Show license used details</Label>
                    <Row className="form-group d-flex align-items-end">
                      <Col md={3}>
                        <CustomTextField
                          name="quantity_used"
                          formProps={formProps}
                          label="Quantity Used"
                        />
                      </Col>
                      <Col md={3}>
                        <CustomTextField
                          name="quantity_pending"
                          formProps={formProps}
                          label="Quantity Pending"
                        />
                      </Col>
                      <Col md={3}>
                        <Label className="label">Date</Label>
                        <CustomTextField
                          name="quantity_date"
                          formProps={formProps}
                          type="date"
                        />
                      </Col>
                      <Col md={3}>
                        <CustomTextField
                          name="amount"
                          formProps={formProps}
                          label="Amount"
                        />
                      </Col>
                    </Row>
                  </Card>

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
        </CardBody>
        <CardFooter>
          {(props.billofEntry.isUpdateLoading ||
            props.billofEntry.isPostLoading) && <LinerLoader />}
        </CardFooter>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    import: state.entities.importer.import,
    login: state.login,
    client: state.entities.client.client,
    quantityUnit: state.entities.master.quantityUnit.quantityUnit,
    importSalesContract: state.entities.importer.importSalesContract,
    billofEntry: state.entities.importer.billofEntry,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuantityUnitGetData: (data) =>
      dispatch(actions.quantityUnitGetData(data)),
    billofEntryGetData: (data) => dispatch(actions.billofEntryGetData(data)),
    deleteBillofEntry: (id, data) =>
      dispatch(actions.deleteBillofEntry(id, data)),
    postBillofEntryData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postBillofEntryData(data, user, toggle, setSubmitting)),
    updateBillofEntryData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateBillofEntryData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BillofEntry);
