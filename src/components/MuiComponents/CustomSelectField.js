import { MenuItem, TextField } from "@mui/material";
import React from "react";

function CustomSelectField({
  formProps,
  variant,
  size,
  id,
  label,
  disabled,
  name,
  value,
  onChange,
  type,
  options,
  optionValue,
  optionName,
  required,
  ...props
}) {
  return (
    <TextField
      fullWidth
      select
      variant={variant ?? "standard"}
      size={size ?? "small"}
      id={id ?? name ?? ""}
      label={label ?? ""}
      disabled={disabled ? true : false}
      name={name ?? ""}
      type={type ?? "text"}
      value={value ?? formProps?.values[name]}
      onChange={onChange ?? formProps.handleChange}
      error={formProps?.touched[name] && Boolean(formProps?.errors[name])}
      helperText={formProps?.touched[name] && formProps?.errors[name]}
      required={required ?? false}
    >
      {options.length > 0 &&
        options?.map((option) => (
          <MenuItem
            key={option[optionValue || "value"]}
            value={option[optionValue || "value"]}
          >
            {option[optionName || "name"]}
          </MenuItem>
        ))}
    </TextField>
  );
}

export default CustomSelectField;
