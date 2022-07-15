import React, { useState } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as actions from "../../../store/creators";
import LinerLoader from "components/Loaders/LinerLoader";
import TextField from "@material-ui/core/TextField";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  InputGroup,
} from "reactstrap";
import { MenuItem } from "@mui/material";

function EditCommodityAnalysisAnalysis(props) {
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
    console.log("values in CommodityAnalysis:", values);
    setSubmitting(true);

    let user = {
      commodity_id: values.commodity_id,
      product_name: values.product_name,
      analysis: values.analysis,
    };

    console.log("Data of CommodityAnalysis:", user);
    props.updateCommodityAnalysisData(data, user, toggle, setSubmitting);
    return;
  };

  return (
    <div>
      <Button
        className="bg-gradient-yellow p-1"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-edit" aria-hidden="true"></i>
      </Button>
      <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Edit CommodityAnalysis
        </ModalHeader>
        {props.commodityAnalysis?.isUpdateLoading && <LinerLoader />}
        <ModalBody className="">
          <Formik
            initialValues={{
              commodity_id: props.data.commodity_id ?? "",
              product_name: props.data.product_name ?? "",
              analysis: props.data.analysis ?? "",
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={12}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="outlined"
                        select
                        size="small"
                        id="commodity_id"
                        label="Select Commodity"
                        name="commodity_id"
                        value={formProps.values.commodity_id}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.commodity_id &&
                          Boolean(formProps.errors.commodity_id)
                        }
                        helperText={
                          formProps.touched.commodity_id &&
                          formProps.errors.commodity_id
                        }
                      >
                        {props.commodity?.map((comm) => {
                          return (
                            <MenuItem key={comm.id} value={comm.id}>
                              {comm.name}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={12}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="product_name"
                        label="Product Name"
                        name="product_name"
                        value={formProps.values.product_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.product_name &&
                          Boolean(formProps.errors.product_name)
                        }
                        helperText={
                          formProps.touched.product_name &&
                          formProps.errors.product_name
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={12}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="analysis"
                        label="Analysis"
                        name="analysis"
                        value={formProps.values.analysis}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.analysis &&
                          Boolean(formProps.errors.analysis)
                        }
                        helperText={
                          formProps.touched.analysis &&
                          formProps.errors.analysis
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
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    commodity: state.entities.master.commodity.commodity,
    commodityAnalysis: state.entities.master.commodityAnalysis,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCommodityAnalysisGetData: (data) =>
      dispatch(actions.commodityAnalysisGetData(data)),
    onDeleteCommodityAnalysis: (id, data) =>
      dispatch(actions.deleteCommodityAnalysis(id, data)),
    onPostCommodityAnalysisData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.postCommodityAnalysisData(data, user, toggle, setSubmitting)
      ),
    updateCommodityAnalysisData: (data, user, toggle, setSubmitting) =>
      dispatch(
        actions.updateCommodityAnalysisData(data, user, toggle, setSubmitting)
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCommodityAnalysisAnalysis);
