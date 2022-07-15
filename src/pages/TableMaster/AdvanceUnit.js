import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Card, CardHeader, CardBody, Button } from "reactstrap";

function AdvanceUnit() {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const { data } = useDemoData({
    dataSet: "AdvanceUnit",
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <Card style={{ height: 600, width: "100%" }} className="p-3 w-100">
      <CardHeader className="bg-gradient-info p-2 text-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong className="pl-2">Advance Unit Details</strong>
          <div>
            <Button
              className="btn-success p-2"
              onClick={() => {
                toggle();
              }}
            >
              <i className="fa fa-plus text-white mr-2" />
              Add New
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <DataGrid
          // rows={rows}
          // autoPageSize
          // columns={columns}
          // pageSize={10}
          // rowsPerPageOptions={[10]}
          {...data}
          components={{
            Toolbar: GridToolbar,
          }}
          // checkboxSelection
        />
      </CardBody>
    </Card>
  );
}

export default AdvanceUnit;
