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
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[0-9a-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
      "Password must contain at least one number and one special character."
    )
    .required("*Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("*Confirm password required"),
  email: Yup.string()
    .email("*Must be in email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must have '@' followed by '.com'."
    )
    .required("Email is required."),
});
export const ValidateBikeAdd = Yup.object().shape({
  productName: Yup.string().required("*Product name is required"),
  quantity: Yup.number().required("*Quantity is required"),
  unitPrice: Yup.number().required("*Price is required"),
  image: Yup.mixed().required("Image selection is required"),
});
