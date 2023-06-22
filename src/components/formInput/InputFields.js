import { ErrorMessage } from "formik";
import Form from "react-bootstrap/Form";
import React, { useEffect } from "react";

export default function FieldInput({ field, form, ...props }) {
  const { type } = props;
  const { setFieldValue } = form;
  const { name, onChange } = field;

  return (
    <div>
      <Form.Control
        {...props}
        {...field}
        onChange={(e) => {
          const { files } = e.target;
          onChange(e);
          type === "file" && setFieldValue(`${name}-file`, files?.[0]);
        }}
      />
      <ErrorMessage name={name} />
      {type === "file" && <ErrorMessage name={`${name}-file`} />}
    </div>
  );
}
