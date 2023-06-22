import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik, Form as FormikForm, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { SubCategoryFormValidation } from "../../../validation/CategoryFormValidation";
import FieldInput from "../../formInput/InputFields";
import { addSubCategory } from "../../../store/SubCategoryFormSlice";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

const SubCategoryForm = () => {
  const selector = useSelector((state) => state.category.category);
  const subSelector = useSelector((state) => state.subCategory.subCategory);

  const [selectCategory, setSelectCategory] = useState();

  const initialValues = {
    name: "",
    image: "",
    description: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
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
    data.category = selectCategory.id;

    const exist = subSelector.find(
      (e) => e.category === data.category && e.name === data.name
    );

    if (exist) return alert("Sub Category Name already exist");
    delete data["image-file"];
    dispatch(addSubCategory(data));
    navigate("/show-sub-category");
  };

  return (
    <div className="catFormContainer">
      <h1>Sub Category Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SubCategoryFormValidation}
        onSubmit={onSubmit}
      >
        <FormikForm className="errorText">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectCategory ? selectCategory.name : "Select Category"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {selector.map((e, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      setSelectCategory(e);
                    }}
                  >
                    {e.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <br></br>

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

export default SubCategoryForm;
