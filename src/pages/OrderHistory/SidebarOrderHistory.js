/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import { Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../redux/creators";
import LinerLoader from "components/Loaders/LinerLoader";
import "../../css/main.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { DateFormat } from "components/DateFormat/DateFormat";

import MenuButton from "components/MenuButton/MenuButton";

const options = [
  { name: "Edit Exports", page: "edit-purchase-indents" },
  { name: "Create/Edit Sales Indents", page: "edit-create-sales-indents" },
  { name: "Add Sales Contract", page: "add-sales-contract" },
  { name: "Add Advance Details", page: "add-advance-details" },
  { name: "Add Loading Details", page: "add-loading-details" },
  { name: "LME Fixation", page: "lme-fixation" },
  { name: "Manage Files", page: "manages-files" },
  // { name: "User History", page: "new-order-history" },
];

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

function SidebarOrderHistory(props) {
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
    let user = {
      order_id: purchaseSalesIndentData[0]?.bpo?.id,
    };
    props.postUserHistoryData(data, user);
  }, []);

  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "No", headerName: "Name", flex: 1 },
    { field: "purchase_indent", headerName: "Export", flex: 1 },
    { field: "sale_indent", headerName: "Sale Indent", flex: 1 },
    { field: "user_name", headerName: "User Name", flex: 1 },
    { field: "type", headerName: "Type", width: 250 },
    { field: "commodity", headerName: "Commodity", flex: 1 },
    { field: "fields", headerName: "Fields", flex: 1 },
    { field: "old_value", headerName: "Old Value", flex: 1 },
    { field: "new_value", headerName: "New Value", flex: 1 },
    {
      field: "date",
      headerName: "New Value",
      flex: 1,
      renderCell: (params) => {
        return <DateFormat data={params.row.date} />;
      },
    },
  ];

  const rows = props.userHistory?.isPostLoading
    ? []
    : props.userHistory.userHistory;

  console.log(`data`, data);
  return (
    <Card className="p-3 w-100">
      <div className="p-1 d-flex justify-content-end align-items-center">
        <span className="font-weight-bold mr-2">Navigation </span>
        <i className="ni ni-bold-right" />
        <MenuButton index={id} options={options} />
      </div>
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props.userHistory?.isPostLoading ? true : false}
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
    suppiler: state.suppiler,
    login: state.login,
    purchaseSalesIndent: state.purchaseSalesIndent,
    userHistory: state.userHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postUserHistoryData: (data, user) =>
      dispatch(actions.postUserHistoryData(data, user)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarOrderHistory);
