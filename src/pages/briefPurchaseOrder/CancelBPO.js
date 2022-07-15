/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import dateFormat from "dateformat";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Form, Formik } from "formik";
import { connect } from "react-redux";

import * as actions from "../../redux/creators";
import TextField from "@material-ui/core/TextField";
import "../../css/main.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { DateFormat } from "components/DateFormat/DateFormat";

import MenuButton from "../../components/MenuButton/MenuButton";
import ExportCSV from "components/ExcelFile/ExportCSV";
import "../../css/main.css";
import { useHistory } from "react-router-dom";
import DeleteButton from "../../Helpers/DeleteButton";
import CreateShipper from "./CreateShipper";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const options = [
  { name: "Edit Sales Contract", page: "edit-sales-confirmation" },
  { name: "Create Purchase Order", page: "create-sales-confirmation" },
];

function CancelBPO(props) {
  const history = useHistory();

  const [csv, setCsv] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [pageSize, setPageSize] = React.useState(10);

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[10]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[10]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[10]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[10]?.create == 1
      ? true
      : false;

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        if (updateStatus || deleteStatus)
          return params.row?.no_purchase_orders <= params.row.psi_count ? (
            <>
              {updateStatus && (
                <Button
                  className="bg-gradient-yellow p-1"
                  onClick={() =>
                    history.push(
                      `/admin/edit-sales-confirmation/${params.row?.id}`
                    )
                  }
                >
                  <i className="fa fa-edit" />
                </Button>
              )}

              {/* {deleteStatus && (
                <DeleteButton
                  deleteFunction={() =>
                    props.onDeletePurchaseOrder(params.row.id, data2)
                  }
                />
              )} */}
              {updateStatus && (
                <CreateShipper data={params.row} index={params.row.id} />
              )}
            </>
          ) : (
            <>
              {updateStatus && (
                <MenuButton
                  data={params.row}
                  index={params.row.id}
                  options={options}
                />
              )}

              {updateStatus && (
                <CreateShipper data={params.row} index={params.row.id} />
              )}
            </>
          );
        else {
          return null;
        }
      },
    },
    { field: "id", headerName: "ID", flex: 1 },
    { field: "ref_no", headerName: "Ref No", flex: 1 },
    {
      field: "booking_date",
      headerName: "Booking Date",
      flex: 1,
      renderCell: (params) => {
        return <DateFormat data={params.row?.booking_date} />;
      },
    },
    {
      field: "customer.company_name",
      headerName: "Customer",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.customer?.company_name}</div>;
      },
    },
    {
      field: "supplier.company_name",
      headerName: "Supplier",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.supplier?.company_name}</div>;
      },
    },
    { field: "quality", headerName: "Quality", flex: 1 },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "no_purchase_orders", headerName: "No Purchase Order", flex: 1 },
    {
      field: "no_purchase_orders2",
      headerName: "Pending PSI",
      flex: 1,

      renderCell: (params) => {
        return (
          <div>
            {Number(params.row.no_purchase_orders) -
              Number(params?.row?.psi_count)}
          </div>
        );
      },
    },
  ];

  const rows = props.purchaseOrder?.isLoading
    ? []
    : startDate && endDate
    ? props.purchaseOrder.purchaseOrder.filter((user) => {
        return user.booking_date >= startDate && user.booking_date <= endDate;
      })
    : props.purchaseOrder.purchaseOrder;

  const cancelled = {
    cancelled: true,
  };

  let data2 = {
    token: props.login?.login?.token,
    cancelled: cancelled,
  };
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    props.onQuantityUnitGetData(data2);
    props.onCommissionUnitGetData(data2);
    props.onPriceUnitGetData(data2);
    props.onSupplierGetData(data2);
    props.onPurchaseOrderGetData(data2);
    props.onPurchaseSalesIndentGetData(data2);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      props.purchaseOrder.purchaseOrder
        .filter((user) => {
          return user.booking_date >= startDate && user.booking_date <= endDate;
        })
        .map((user, index) =>
          csv?.push({
            "Sr No": index + 1,
            "Book Date": dateFormat(user.booking_date, "dd-mm-yyyy"),
            "Customer Name": user.customer?.company_name,
            "Supplier Name": user.supplier?.company_name,
            "No of Purchase Order": user.no_purchase_orders,
            Quantity: user.quantity,
            Commission: user.quality,
            Remark: user.remarks,
          })
        );
    }
  }, [startDate && endDate]);
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    let user = {
      user_id: props.login?.login?.user?.id,
      customer_id: values.customer_id,
      booking_date: values.booking_date,
      supplier_id: values.supplier_id,
      quantity: values.quantity,
      quantity_type: values.unit,
      quality: values.quality,
      price: values.price,
      price_type: values.price_unit,
      usd: values.usd,
      remarks: values.remark,
      no_purchase_orders: values.no_purchase_order,
      subject: values.email_subject,
      email_date: values.email_date,
      sent_to: values.sent_to,
      commission_from_supplier: values.commission_from_supplier,
      commission_from_supplier_type: values.commission_from_supplier_type,
      commission_from_customer: values.commission_from_customer,
      commission_from_customer_type: values.commission_from_customer_type,
      commission_to_customer: values.commission_to_customer,
      commission_to_customer_type: values.commission_to_customer_type,
      shipper_name: values.shipper_name,
      is_fixed: values.is_fixed,
      operator: values.operator,
      value: values.value,
    };

    console.log("Data of BPO:", user);
    props.onPostPurchaseOrderData(data2, user, toggle, setSubmitting);
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
                  <Row className="form-group d-flex align-items-end">
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
                        fileName={`purchase_order-${dateFormat(
                          startDate,
                          "dd-mm-yyyy"
                        )}-${dateFormat(endDate, "dd-mm-yyyy")}`}
                      />
                      {/* <Button
                        type="submit"
                        disabled={formProps.isSubmitting}
                        className="bg-gradient-info text-white"
                      >
                        Download
                      </Button> */}
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </div>
      </CardHeader>
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowClassName={(params) => {
            if (params.row.no_purchase_orders == params?.row?.psi_count) {
              return "bg-green-2";
            } else if (
              Number(Math.round(params.row.no_purchase_orders / 2)) ==
              Number(params?.row?.psi_count)
            ) {
              return "bg-orange-2";
            }
            // else if (params.row.no_purchase_orders < params?.row?.psi_count) {
            //   return "bg-yellow-2";
            // }
            else {
              return "bg-white";
            }
          }}
          loading={props.purchaseOrder?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
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
    suppiler: state.suppiler.suppiler,
    city: state.city.city,
    country: state.country.country,
    states: state.state.state,
    login: state.login,
    purchaseOrder: state.purchaseOrder,
    commissionUnit: state.commissionUnit.commissionUnit,
    priceUnit: state.priceUnit.priceUnit,
    quantityUnit: state.quantityUnit.quantityUnit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuantityUnitGetData: (data) =>
      dispatch(actions.quantityUnitGetData(data)),
    onPriceUnitGetData: (data) => dispatch(actions.priceUnitGetData(data)),
    onCommissionUnitGetData: (data) =>
      dispatch(actions.commissionUnitGetData(data)),
    onSupplierGetData: (data) => dispatch(actions.suppilerGetData(data)),
    onPurchaseSalesIndentGetData: (data) =>
      dispatch(actions.purchaseSalesIndentGetData(data)),
    onPurchaseOrderGetData: (data) =>
      dispatch(actions.purchaseOrderGetData(data)),
    cityGetData: (data) => dispatch(actions.cityGetData(data)),
    countryGetData: (data) => dispatch(actions.countryGetData(data)),
    stateGetData: (data) => dispatch(actions.stateGetData(data)),
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
export default connect(mapStateToProps, mapDispatchToProps)(CancelBPO);
