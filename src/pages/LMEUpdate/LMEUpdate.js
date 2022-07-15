/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { useDemoData } from "@mui/x-data-grid-generator";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  InputGroup,
  // CardFooter,
} from "reactstrap";
import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import dateFormat from "dateformat";

import LinerLoader from "components/Loaders/LinerLoader";
import * as actions from "../../redux/creators";
import TextField from "@material-ui/core/TextField";
// import MenuItem from "@mui/material/MenuItem";
import "../../css/main.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  // GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import CustomInput from "views/Views/CustomInput";
import EditLMEUpdate from "./EditLMEUpdate";
import { DateFormat } from "components/DateFormat/DateFormat";
import ExportCSV from "components/ExcelFile/ExportCSV";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  );
}
function LMEUpdate(props) {
  const [csv, setCsv] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [pageSize, setPageSize] = React.useState(5);

  // const viewStatus =
  //   props.login?.login?.user?.role == "admin"
  //     ? true
  //     : props.login?.login.user?.actions?.length > 0 &&
  //       props.login?.login.user?.actions[4]?.view == 1
  //     ? true
  //     : false;

  // const deleteStatus =
  //   props.login?.login?.user?.role == "admin"
  //     ? true
  //     : props.login?.login.user?.actions?.length > 0 &&
  //       props.login?.login.user?.actions[4]?.delete == 1
  //     ? true
  //     : false;

  // const updateStatus =
  //   props.login?.login?.user?.role == "admin"
  //     ? true
  //     : props.login?.login.user?.actions?.length > 0 &&
  //       props.login?.login.user?.actions[4]?.update == 1
  //     ? true
  //     : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[4]?.create == 1
      ? true
      : false;

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        return <DateFormat data={params.row?.date} />;
      },
    },
    { field: "al", headerName: "AL", flex: 1 },
    { field: "cu", headerName: "CU", flex: 1 },
    { field: "pb", headerName: "PB", flex: 1 },
    { field: "ni", headerName: "PB", flex: 1 },
    { field: "sn", headerName: "SN", flex: 1 },
    { field: "zn", headerName: "ZN", flex: 1 },
    { field: "us", headerName: "US$/INR", flex: 1 },
    { field: "eur", headerName: "$/EUR", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <EditLMEUpdate data={params.row} index={params.row.id} />;
      },
    },
  ];

  const rows = props.LMEUpdate?.isLoading
    ? []
    : startDate && endDate
    ? props.LMEUpdate.LMEUpdate.filter((user) => {
        return user.date >= startDate && user.date <= endDate;
      })
    : props.LMEUpdate.LMEUpdate;

  let data2 = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.onLMEUpdateGetData(data2);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (startDate && endDate) {
      props.LMEUpdate.LMEUpdate.filter((user) => {
        return user.date >= startDate && user.date <= endDate;
      }).map((user, index) =>
        csv?.push({
          Date: dateFormat(user.date, "dd-mm-yyyy"),
          AL: user.al,
          CU: user.cu,
          PB: user.pb,
          NI: user.ni,
          SN: user.sn,
          ZN: user.zn,
          "US INR": user.us,
          EUR: user.eur,
        })
      );
    }
  }, [startDate && endDate]);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in LMEUpdate:", values);
    setSubmitting(true);

    let user = {
      date: values.date,
      is_holiday: values.is_holiday,
      al: values.al,
      cu: values.cu,
      pb: values.pb,
      ni: values.ni,
      sn: values.sn,
      zn: values.zn,
      us: values.us,
      eur: values.eur,
    };

    console.log("Data of LMEUpdate:", user);
    props.onPostLMEUpdateData(data2, user, toggle, setSubmitting);
    return;
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <Formik
            initialValues={{
              start_date: "",
              end_date: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              start_date: Yup.string().required("required"),
              end_date: Yup.string().required("required"),
            })}
          >
            {(formProps) => {
              setStartDate(formProps.values.start_date);
              setEndDate(formProps.values.end_date);
              return (
                <Form>
                  <Row className="form-group d-flex">
                    <Col md={2}>
                      <Label className="label">Start At</Label>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={formProps.values.start_date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.start_date &&
                          Boolean(formProps.errors.start_date)
                        }
                        helperText={
                          formProps.touched.start_date &&
                          formProps.errors.start_date
                        }
                      />
                    </Col>
                    <Col md={2}>
                      <Label className="label">End At</Label>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={formProps.values.end_date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.end_date &&
                          Boolean(formProps.errors.end_date)
                        }
                        helperText={
                          formProps.touched.end_date &&
                          formProps.errors.end_date
                        }
                      />
                    </Col>
                    <Col md={2} className="align-self-end">
                      <ExportCSV
                        csvData={csv}
                        setCsv={setCsv}
                        fileName={`lme_list-${dateFormat(
                          startDate,
                          "dd-mm-yyyy"
                        )}-${dateFormat(endDate, "dd-mm-yyyy")}`}
                      />
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </div>
        {createStatus && (
          <Button
            className="btn-success p-2 float-right"
            onClick={() => {
              toggle();
            }}
          >
            <i className="fa fa-plus text-white mr-2" />
            Add LME
          </Button>
        )}

        <Modal
          className="modal-xl"
          backdrop="static"
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle} className="d-flex align-items-center">
            Add New LME
          </ModalHeader>

          {props.LMEUpdate?.isPostLoading && <LinerLoader />}
          <ModalBody className="">
            <Formik
              initialValues={{
                date: "",
                is_holiday: 0,
                al: "",
                cu: "",
                pb: "",
                ni: "",
                sn: "",
                zn: "",
                us: "",
                eur: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                date: Yup.string().required("required"),
                al: Yup.string().required("required"),
                cu: Yup.string().required("required"),
                pb: Yup.string().required("required"),
                ni: Yup.string().required("required"),
              })}
            >
              {(formProps) => {
                return (
                  <Form>
                    {console.log(`formProps.values`, formProps.values)}
                    <Row className="form-group d-flex justify-content-center align-items-center">
                      <Col md={3}>
                        <Label className="label">Date</Label>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          type="date"
                          id="date"
                          name="date"
                          value={formProps.values.date}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.date &&
                            Boolean(formProps.errors.date)
                          }
                          helperText={
                            formProps.touched.date && formProps.errors.date
                          }
                        />
                        <Col md={5}>
                          <Field
                            component={CustomInput}
                            type="checkbox"
                            name="is_holiday"
                            size="medium"
                            id="is_holiday"
                            checked={
                              formProps.values.is_holiday == 1 ? true : false
                            }
                            onChange={(event) => {
                              formProps.setFieldValue(
                                `is_holiday`,
                                event.target.value
                              );
                              if (event.target.value == 1) {
                                formProps.setFieldValue("al", 0.0);
                                formProps.setFieldValue("cu", 0.0);
                                formProps.setFieldValue("pb", 0.0);
                                formProps.setFieldValue("ni", 0.0);
                                formProps.setFieldValue("sn", 0.0);
                                formProps.setFieldValue("zn", 0.0);
                                formProps.setFieldValue("us", 0.0);
                                formProps.setFieldValue("eur", 0.0);
                              } else {
                                formProps.setFieldValue("al", "");
                                formProps.setFieldValue("cu", "");
                                formProps.setFieldValue("pb", "");
                                formProps.setFieldValue("ni", "");
                                formProps.setFieldValue("sn", "");
                                formProps.setFieldValue("zn", "");
                                formProps.setFieldValue("us", "");
                                formProps.setFieldValue("eur", "");
                              }
                            }}
                            value={formProps.values.is_holiday == 1 ? 0 : 1}
                          />
                          <Label>Holiday</Label>
                        </Col>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={3}>
                        <InputGroup>
                          <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="al"
                            label="AL"
                            name="al"
                            value={formProps.values.al}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.al &&
                              Boolean(formProps.errors.al)
                            }
                            helperText={
                              formProps.touched.al && formProps.errors.al
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
                            id="cu"
                            label="CU"
                            name="cu"
                            value={formProps.values.cu}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.cu &&
                              Boolean(formProps.errors.cu)
                            }
                            helperText={
                              formProps.touched.cu && formProps.errors.cu
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
                            id="pb"
                            label="PB"
                            name="pb"
                            value={formProps.values.pb}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.pb &&
                              Boolean(formProps.errors.pb)
                            }
                            helperText={
                              formProps.touched.pb && formProps.errors.pb
                            }
                          />
                        </InputGroup>
                      </Col>
                      <Col md={3}>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          id="ni"
                          label="NI"
                          name="ni"
                          value={formProps.values.ni}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.ni && Boolean(formProps.errors.ni)
                          }
                          helperText={
                            formProps.touched.ni && formProps.errors.ni
                          }
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Col md={3}>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          type="text"
                          id="sn"
                          label="SN"
                          name="sn"
                          value={formProps.values.sn}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.price_unit &&
                            Boolean(formProps.errors.price_unit)
                          }
                          helperText={
                            formProps.touched.price_unit &&
                            formProps.errors.price_unit
                          }
                        />
                      </Col>
                      <Col md={3}>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          id="zn"
                          label="ZN"
                          name="zn"
                          value={formProps.values.zn}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.zn && Boolean(formProps.errors.zn)
                          }
                          helperText={
                            formProps.touched.zn && formProps.errors.zn
                          }
                        />
                      </Col>

                      <Col md={3}>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          type="text"
                          id="us"
                          label="US$/INR"
                          name="us"
                          value={formProps.values.us}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.us && Boolean(formProps.errors.us)
                          }
                          helperText={
                            formProps.touched.us && formProps.errors.us
                          }
                        />
                      </Col>
                      <Col md={3}>
                        <TextField
                          fullWidth
                          variant="standard"
                          size="small"
                          type="text"
                          id="eur"
                          label="$/EUR"
                          name="eur"
                          value={formProps.values.eur}
                          onChange={formProps.handleChange}
                          error={
                            formProps.touched.eur &&
                            Boolean(formProps.errors.eur)
                          }
                          helperText={
                            formProps.touched.eur && formProps.errors.eur
                          }
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
        </Modal>
      </CardHeader>
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props.LMEUpdate?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
          // isRowSelectable={(params) => params.row.size < 50}

          // autoPageSize
          autoHeight
        />
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    LMEUpdate: state.LMEUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLMEUpdateGetData: (data) => dispatch(actions.LMEUpdateGetData(data)),
    cityGetData: (data) => dispatch(actions.cityGetData(data)),
    countryGetData: (data) => dispatch(actions.countryGetData(data)),
    stateGetData: (data) => dispatch(actions.stateGetData(data)),
    onDeleteLMEUpdate: (id, data) =>
      dispatch(actions.deleteLMEUpdate(id, data)),
    onPostLMEUpdateData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postLMEUpdateData(data, user, toggle, setSubmitting)),
    updateLMEUpdateData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateLMEUpdateData(data, user, toggle, setSubmitting)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LMEUpdate);
