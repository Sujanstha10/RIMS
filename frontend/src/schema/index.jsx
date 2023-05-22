import * as Yup from 'yup';




export const loginSchmea = Yup.object({
    userName: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Username can only contain alphabetical characters.')
        .min(4, 'Username must be at least 4 characters long.')
        .max(15, 'Username cannot be longer than 15 characters.')
        .required('Username is required.'),


    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long.')
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[0-9a-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
            'Password must contain at least one number and one special character.')
        .required('Password is required.'),



})




