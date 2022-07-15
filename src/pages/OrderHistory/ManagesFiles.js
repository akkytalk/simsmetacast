/* eslint-disable eqeqeq */
import { Form, Formik } from "formik";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  InputGroup,
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import classnames from "classnames";
import { connect } from "react-redux";
import * as actions from "../../redux/creators";
import { useParams } from "react-router-dom";
import UploadService from "../../services/FileUpload";
import Dropzone from "react-dropzone";
import LinerLoader from "components/Loaders/LinerLoader";
import MenuButton from "components/MenuButton/MenuButton";

const options = [
  { name: "Edit Exports", page: "edit-purchase-indents" },
  { name: "Create/Edit Sales Indents", page: "edit-create-sales-indents" },
  { name: "Add Sales Contract", page: "add-sales-contract" },
  { name: "Add Advance Details", page: "add-advance-details" },
  { name: "Add Loading Details", page: "add-loading-details" },
  { name: "LME Fixation", page: "lme-fixation" },
  // { name: "Manage Files", page: "manages-files" },
  { name: "User History", page: "new-order-history" },
];

function ManagesFiles(props) {
  const { id } = useParams();

  const [selectedFiles, setSelectedFiles] = useState("");
  const [currentFile, setCurrentFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  const purchaseSalesIndentData = [];
  // props.purchaseSalesIndent.purchaseSalesIndent.filter(
  //   (sale) => sale.id == id
  // );
  let data = {
    token: props.login?.login?.token,
    id: purchaseSalesIndentData[0]?.bpo?.id,
  };

  const [activeTab, setActiveTab] = useState("file");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const upload = () => {
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);

    const user = new FormData();
    user.append("order_id", purchaseSalesIndentData[0]?.bpo?.id);
    user.append("ref_no", purchaseSalesIndentData[0]?.bpo?.ref_no);
    user.append("file", currentFile);
    user.append(
      "contract_no",
      purchaseSalesIndentData[0]?.bpo?.contract_number
    );

    UploadService.upload(data, user, currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return UploadService.getFiles(data);
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile();
      });

    setSelectedFiles();
  };

  const onDrop = (files) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

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

  const handleSubmit2 = (values, { setSubmitting }) => {
    console.log("values in File Upload:", values);
    setSubmitting(true);

    const user = new FormData();
    user.append("order_id", values.order_id);
    user.append("ref_no", values.ref_no);
    user.append("file", values.file);
    user.append("contract_no", values.contract_number);

    console.log("Data of File Upload:", user);
    props.onPostFileUploadData(data, user, toggle, setSubmitting);
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
            contract_number: purchaseSalesIndentData[0]?.bpo?.contract_number,
          }}
          onSubmit={handleSubmit}
        >
          {(formProps) => (
            <Form>
              <Row className="form-group d-flex align-items-end">
                <Col md={4}>
                  <InputGroup>
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      id="contract_number"
                      label="Contract Number"
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
              </Row>

              <Row style={{ justifyContent: "left" }}>
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

        <Nav tabs className="mt-5">
          {/* <NavItem> */}
          <NavLink
            className={classnames({
              active: activeTab === "file",
            })}
            onClick={() => {
              toggle("file");
            }}
          >
            Upload Files
          </NavLink>
          {/* </NavItem> */}
          {/* <NavItem> */}
          <NavLink
            className={classnames({
              active: activeTab === "library",
            })}
            onClick={() => {
              toggle("library");
            }}
          >
            File Library
          </NavLink>
          {/* </NavItem> */}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="file" className="bg-white">
            <Row>
              <Col sm="12" className="p-3">
                <Formik
                  initialValues={{
                    order_id: purchaseSalesIndentData[0]?.bpo?.id,
                    ref_no: purchaseSalesIndentData[0]?.bpo?.ref_no,
                    file: "",
                    contract_number:
                      purchaseSalesIndentData[0]?.bpo?.contract_number,
                  }}
                  onSubmit={handleSubmit2}
                >
                  {(formProps) => (
                    <Form>
                      {/* <div>
                        {currentFile && (
                          <div className="progress mb-3">
                            <div
                              className="progress-bar progress-bar-info progress-bar-striped"
                              role="progressbar"
                              aria-valuenow={progress}
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: progress + "%" }}
                            >
                              {progress}%
                            </div>
                          </div>
                        )}

                        <Dropzone onDrop={onDrop} multiple={false}>
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                {selectedFiles && selectedFiles[0].name ? (
                                  <div className="selected-file">
                                    {selectedFiles && selectedFiles[0].name}
                                  </div>
                                ) : (
                                  "Drag and drop file here, or click to select file"
                                )}
                              </div>
                              <aside className="selected-file-wrapper">
                                <button
                                  className="btn btn-success"
                                  disabled={!selectedFiles}
                                  onClick={handleSubmit2}
                                >
                                  Upload
                                </button>
                              </aside>
                            </section>
                          )}
                        </Dropzone>

                        <div className="alert alert-light" role="alert">
                          {message}
                        </div>

                        {fileInfos.length > 0 && (
                          <div className="card">
                            <div className="card-header">List of Files</div>
                            <ul className="list-group list-group-flush">
                              {fileInfos.map((file, index) => (
                                <li className="list-group-item" key={index}>
                                  <a href={file.url}>{file.name}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div> */}
                      <Row className="form-group">
                        <Col md={3}>
                          <InputGroup>
                            <TextField
                              fullWidth
                              variant="standard"
                              id="file"
                              type="file"
                              name="file"
                              // value={formProps.values.file}
                              onChange={(event) => {
                                formProps.setFieldValue(
                                  "file",
                                  event.currentTarget.files[0]
                                );
                              }}
                              error={
                                formProps.touched.file &&
                                Boolean(formProps.errors.file)
                              }
                              helperText={
                                formProps.touched.file && formProps.errors.file
                              }
                            ></TextField>
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row style={{ justifyContent: "left" }}>
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
                <div>{props.fileUpload.isPostLoading && <LinerLoader />}</div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="library" className="bg-white">
            <Row>
              <Col sm="12" className="p-3">
                File Library
              </Col>
            </Row>
          </TabPane>
        </TabContent>
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
    fileUpload: state.fileUpload,
    commissionUnit: state.commissionUnit.commissionUnit,
    priceUnit: state.priceUnit.priceUnit,
    quantityUnit: state.quantityUnit.quantityUnit,
    purchaseSalesIndent: state.purchaseSalesIndent,

    purchaseOrder: state.purchaseOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFileUploadGetData: (data) => dispatch(actions.fileUploadGetData(data)),
    onDeleteFileUpload: (id, data) =>
      dispatch(actions.deleteFileUpload(id, data)),
    onPostFileUploadData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postFileUploadData(data, user, toggle, setSubmitting)),
    updateFileUploadData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateFileUploadData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManagesFiles);
