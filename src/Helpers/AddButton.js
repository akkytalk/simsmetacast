import React from "react";

import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";

function AddButton(props) {
  async function addMethod() {
    props.onClick();
  }
  return (
    // <Button color="danger p-1" size="sm" onClick={addMethod}>
    //   <i className="fa fa-trash" />
    // </Button>
    <IconButton aria-label="add" color="success" onClick={props.onClick}>
      <AddBoxIcon fontSize="medium" />
    </IconButton>
  );
}

export default AddButton;
