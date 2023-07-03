import * as Yup from "yup";
export const ValidateUser = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Z]+$/,
      "Username can only contain alphabetical characters."
    )
    .min(5, "Username must be at least 5 characters long.")
    .max(15, "Username cannot be longer than 15 characters.")
    .required("*Name is required"),
  email: Yup.string()
    .email("*Must be in email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must have '@' followed by '.com'."
    )
    .required("Email is required."),
  phone: Yup.number()
    .typeError("Enter a valid phone number")
    .positive("Phone number can't start with a minus")
    .integer("Phone number can't include a decimal point")
    .min(8)
    .required("Phone number is required"),
});
export const ValidateBikeAdd = Yup.object().shape({
  productName: Yup.string().required("*Product name is required"),
  quantity: Yup.number().required("*Quantity is required"),
  unitPrice: Yup.number().required("*Price is required"),
  image: Yup.mixed().required("Image selection is required"),
});
