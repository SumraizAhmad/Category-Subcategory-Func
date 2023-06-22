import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik, ErrorMessage, Form as FormikForm, Field } from "formik";
import "./CategoryForm.css";
import FieldInput from "../../formInput/InputFields";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { formValidation } from "../../../validation/CategoryFormValidation";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../../store/CategoryFormSlice";

const CategoryForm = () => {
  const selector = useSelector((state) => state.category.category);

  const initialValues = { name: "", image: "", description: "" };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    const result = selector.find((f) => f.name === values.name);
    if (result) return alert("Category Name already exist");

    const data = { ...values };
    const imageFile = data["image-file"];
    const { name, size, type } = imageFile;

    data.id = uuidv4();
    data.image = {
      size,
      name,
      type,
      value: URL.createObjectURL(imageFile),
    };
    delete data["image-file"];

    dispatch(addCategory(data));
    navigate("/show-category");
  };

  return (
    <div className="catFormContainer">
      <h1>Category Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidation}
        onSubmit={onSubmit}
      >
        <FormikForm className="errorText">
          <Col>
            <Field name="name" placeholder="Name" component={FieldInput} />
          </Col>
          <Form.Group
            className="mb-3 mt-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Col>
              <Field
                name="description"
                placeholder="description"
                component={FieldInput}
              />
            </Col>
            <Col>
              <Field
                type="file"
                name="image"
                className="mt-3"
                component={FieldInput}
              />
            </Col>
          </Form.Group>
          <Button variant="primary" className="submit" type="submit">
            Submit
          </Button>
        </FormikForm>
      </Formik>
    </div>
  );
};
export default CategoryForm;
