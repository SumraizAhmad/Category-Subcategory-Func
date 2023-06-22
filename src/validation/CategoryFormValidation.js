import * as Yup from "yup";

const schema = {
  name: Yup.string().required("Required "),
  description: Yup.string().required("Required"),
  "image-file": Yup.mixed().test(
    "file size",
    "file size large, it must be between 1mb to 5mb",
    (values) => {
      if (!values) return true;
      return values.size <= 0.1 * 1024 * 1024;
    }
  ),
};

export const formValidation = Yup.object({
  ...schema,
  image: Yup.string().required("Required"),
});
export const editFormValidation = Yup.object(schema);

//////////
export const SubCategoryFormValidation = Yup.object({
  ...schema,
  image: Yup.string().required("Required"),
});
export const EditSubCategoryFormValidation = Yup.object(schema);
