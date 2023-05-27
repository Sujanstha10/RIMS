import * as Yup from 'yup';




export const loginSchmea = Yup.object({
    email: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Username can only contain alphabetical characters.')
        .min(4, 'Username must be at least 4 characters long.')
        .max(15, 'Username cannot be longer than 15 characters.')
        .required('Username is required.'),


    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long.')

        .required('Password is required.'),



})




