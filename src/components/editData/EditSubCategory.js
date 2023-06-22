import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Form as FormikForm, Field } from "formik";
import FieldInput from "../formInput/InputFields";
import { useDispatch } from "react-redux";
import { EditSubCategoryFormValidation } from "../../validation/CategoryFormValidation";
import { editSubCategory } from "../../store/SubCategoryFormSlice";

function EditSubCategory(props) {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.subCategory);
  const storeData = selector[props.index];

  const initialValues = {
    name: storeData.name,
    description: storeData.description,
    image: "",
  };

  const onSubmit = (value) => {
    const data = { ...value, index: props.index };
    const imageFile = data["image-file"];
    console.log("imageFile", imageFile);
    if (imageFile) {
      const { name, size, type } = imageFile;
      data.image = {
        size,
        name,
        type,
        value: URL.createObjectURL(imageFile),
      };
      delete data["image-file"];
    } else data.image = storeData.image;
    dispatch(editSubCategory(data));
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Category {props.index}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={EditSubCategoryFormValidation}
        onSubmit={onSubmit}
      >
        {({ values, errors }) => (
          <FormikForm className="errorText">
            <Col>
              <Field
                name="name"
                value={initialValues.name}
                placeholder="Name"
                component={FieldInput}
              />
            </Col>
            <Form.Group
              className="mb-3 mt-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Col>
                <Field
                  name="description"
                  placeholder="description"
                  value={initialValues.description}
                  component={FieldInput}
                />
              </Col>
              {console.log({ values, errors })}
              <Col>
                <img
                  src={
                    values["image-file"]
                      ? URL.createObjectURL(values["image-file"])
                      : storeData.image.value
                  }
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
              Update
            </Button>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
}
export default EditSubCategory;
