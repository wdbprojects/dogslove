import React from "react";
import styled from "styled-components";
import { Box, TextField } from "@mui/material";
import { useField, ErrorMessage } from "formik";
import ErrorIcon from "@mui/icons-material/Error";

const InputTextSmall = ({ bottom, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Wrapper>
      {meta.touched && meta.error && !bottom ? (
        <div className="input_error">
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
        </div>
      ) : null}
      <Box className="inputContainer">
        <TextField
          variant="outlined"
          error={meta.touched && meta.error ? true : false}
          label={field.label}
          type={field.type}
          name={field.name}
          fullWidth
          size="small"
          {...field}
          {...props}
          inputProps={{
            form: { autoComplete: "off" },
          }}
        />
        {meta.touched && meta.error && <ErrorIcon sx={{ color: "#b94a48" }} />}
      </Box>

      {meta.touched && meta.error && bottom ? (
        <div className="input_error">
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
        </div>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  .input_error {
    background-color: #b94a48;
    position: relative;
    font-size: 13px;
    margin: 0.25rem 0px;
    padding: 0.5rem;
    color: #ffffff;
    border-radius: 4px;
  }
  label {
    padding-top: 1px;
    color: #cccccc;
    font-size: 0.9rem;
    text-align: center;
  }
  .inputContainer {
    position: relative;
    svg {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%) scale(0.8);
    }
  }
`;

export default InputTextSmall;
