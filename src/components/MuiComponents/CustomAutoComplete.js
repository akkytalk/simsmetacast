import { TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import React from "react";

function CustomAutoComplete({
  defaultProps,
  formProps,
  variant,
  defaultValue,
  size,
  id,
  label,
  name,
  disabled,
  value,
  onChange,
  type,
  ...props
}) {
  return (
    <>
      <Autocomplete
        {...defaultProps}
        id={id ?? name ?? ""}
        disabled={disabled ? true : false}
        name={name ?? ""}
        onChange={(event, newValue) => {
          formProps.setFieldValue(`${name}`, newValue?.id ?? "");
        }}
        defaultValue={defaultValue}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label ?? ""}
            variant={variant ?? "standard"}
            size={size ?? "small"}
            id={id ?? name ?? ""}
            name={name ?? ""}
            error={formProps?.touched[name] && Boolean(formProps?.errors[name])}
            helperText={formProps?.touched[name] && formProps?.errors[name]}
          />
        )}
      />
    </>
  );
}

export default CustomAutoComplete;
