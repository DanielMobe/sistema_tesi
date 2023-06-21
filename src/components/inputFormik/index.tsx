import { OutlinedTextFieldProps, TextField } from "@mui/material";
import { FormikProps } from "formik";
import React, { FC } from "react";

interface IFormikInput extends OutlinedTextFieldProps {
  formik: FormikProps<any>;
  name: string;
  noBorder?: boolean;
}

type IInputProps = Partial<IFormikInput> &
  Pick<IFormikInput, "formik" | "name"> & {
    label: string;
    placeholder?: string;
    isPassword?: boolean;
  };

const InputFormik: FC<IInputProps> = ({ formik, ...props }) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[props.name]}
      error={formik.touched[props.name] && Boolean(formik.errors[props.name])}
      helperText={formik.touched[props.name] && formik.errors[props.name]}
    >
      {props.children}
    </TextField>
  );
};

export default InputFormik;
