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
  CardFooter,
} from "reactstrap";
import * as Yup from "yup";
import { FieldArray, Form, Formik } from "formik";
import { connect } from "react-redux";
import * as actions from "store/creators";
import { useParams } from "react-router-dom";
import MenuButton from "components/MenuButton/MenuButton";
import CustomTextField from "../../components/MuiComponents/CustomTextField";
import CustomSelectField from "../../components/MuiComponents/CustomSelectField";
import { TextField } from "@material-ui/core";
import ImportClaim from "./ImportClaim";
import { useMemo } from "react";
import { arrayFilterByKey, isEmpty } from "Helpers/helper";
import LinerLoader from "components/Loaders/LinerLoader";

const options = [
  { name: "Add Sales Contract", page: "import/add-sales-contract" },
  { name: "Add Loading Details", page: "import/add-loading-details" },
  { name: "Add Advance Details", page: "import/add-advance-details" },
  { name: "Bill of Entry", page: "import/bill" },
  // { name: "Quality Match", page: "import/quality-match" },
];

function QualityMatching(props) {
  const { id } = useParams();

  console.log("id", id);

  const currentImportSalesContract = useMemo(
    () =>
      arrayFilterByKey(
        props.importSalesContract.importSalesContract,
        "id",
        id
      )[0],
    [props.importSalesContract.importSalesContract, id]
  );

  const currentIQualityMatch = useMemo(
    () =>
      arrayFilterByKey(
        props.qualityMatch.qualityMatch,
        "sale_contract_id",
        id
      )[0] ?? "",
    [props.qualityMatch.qualityMatch, id]
  );

  let data = {
    token: props.login?.login?.token,
    id: currentIQualityMatch?.id || "",
  };

  const toggle = () => {};

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Invoice:", values);
    setSubmitting(false);

    if (!isEmpty(currentIQualityMatch?.id)) {
      const user = new FormData();

      user.append("id", currentIQualityMatch?.id);

      user.append("sale_contract_id", currentIQualityMatch.sale_contract_id);
      user.append(
        "sales_confirmation_id",
        currentIQualityMatch.sales_confirmation_id
      );
      user.append("file", values.file);
      user.append("claim_status", values.claim_status);

      console.log("Data of Invoice:", user);
      props.updateQualityMatchData(data, user, toggle, setSubmitting);
      return;
    }

    const user = new FormData();
    user.append("sale_contract_id", id);
    user.append(
      "sales_confirmation_id",
      currentImportSalesContract.sales_confirmation_id
    );
    user.append("file", values.file);
    user.append("claim_status", values.claim_status);

    console.log("Data of Invoice:", user);
    props.onPostQualityMatchData(data, user, toggle, setSubmitting);

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
            file: currentIQualityMatch?.file || "",
            claim_status: currentIQualityMatch.claim_status || 0,
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({})}
        >
          {(formProps) => (
            <Form>
              {console.log("formProps.values", formProps.values)}

              <Row className="form-group d-flex align-items-end">
                <Col md={5}>
                  <InputGroup>
                    <Label className="label">
                      Quality Matching (Sample Analysis Report)
                    </Label>
                    <TextField
                      fullWidth
                      variant="standard"
                      id="file"
                      type="file"
                      name="file"
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "file",
                          event.currentTarget.files[0]
                        );
                      }}
                      error={
                        formProps.touched.file && Boolean(formProps.errors.file)
                      }
                      helperText={
                        formProps.touched.file && formProps.errors.file
                      }
                    ></TextField>
                  </InputGroup>
                </Col>
                <Col md={5}>
                  <CustomSelectField
                    name={`claim_status`}
                    label="Select Claim Satus"
                    formProps={formProps}
                    options={[
                      { name: "Yes", value: 1 },
                      { name: "No", value: 0 },
                    ]}
                    value={formProps?.values.highsea}
                  />
                </Col>
                {formProps.values.claim_status == 1 ? (
                  <Col md={2}>
                    <ImportClaim data={currentIQualityMatch} />
                  </Col>
                ) : null}
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
      <CardFooter>
        {(props.qualityMatch.isUpdateLoading ||
          props.qualityMatch.isPostLoading) && <LinerLoader />}
      </CardFooter>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    importSalesContract: state.entities.importer.importSalesContract,
    qualityMatch: state.entities.importer.qualityMatch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteQualityMatch: (id, data) =>
      dispatch(actions.deleteQualityMatch(id, data)),
    onPostQualityMatchData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postQualityMatchData(data, user, toggle, setSubmitting)),
    updateQualityMatchData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateQualityMatchData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QualityMatching);
