import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { BsEyeFill } from 'react-icons/bs'
// import { ImUser } from 'react-icons/im'
// import axios from 'axios'
import { useFormik } from "formik";
import { loginSchmea } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../storage/admin/user/authAction";

const initialValues = {
  email: "superadmin@gmail.com",
  password: "Superadmin@123",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const { loading, userData, error } = useSelector((state) => state.auth);
  console.log(userData, "login userdata");
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      // validationSchema: loginSchmea,
      onSubmit: async (values, action) => {
        dispatch(userLogin(values));
      },
    });
  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userData) {
      navigate("/dashboard");
    }
  }, [userData]);

  return (
    <div name='login' className='flex flex-col w-screen h-screen b'>
      <form
        className='flex flex-col w-[80%] sm:w-2/3 md:w-[50rem]   m-auto min-h-auto border-2  p-10 gap-3 shadow-2xl  rounded-md'
        onSubmit={handleSubmit}
      >
        <section className='flex md:w-[95%] gap-[5rem] m-auto h-full'>
          <div className='  w-[50%] hidden  md:flex'>
            <img
              className='hidden md:flex'
              src='http://inmas-rangpur.org/Content/img/signin-image.jpg'
              alt='error404'
            />
          </div>

          <div className='md:w-[50%] w-full min-h-[60vh]'>
            <h1 className='text-[2.1rem] mx-auto font-[900] font-sans'>
              Log In
            </h1>

            <div className='flex flex-col space-y-[2rem] h-[8rem] '>
              <aside>
                <input
                  type='text'
                  placeholder='Your Name'
                  className=' border-b-2 border-[#908c8ca0]  w-[100%] h-[2rem] mt-[2rem] outline-none'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className='text-red-600'>{errors.email}</p>
                ) : null}
              </aside>

              <aside>
                <input
                  type='text'
                  placeholder='Password'
                  className=' border-b-2 border-[#908c8ca0] w-[100%] h-[2rem outline-none'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className='text-red-600'>{errors.password}</p>
                ) : null}
              </aside>

              {/* <p className='my-[1.4rem]'> <input type="checkbox" /> Remember me </p> */}
              <Link
                className='-mt-3 text-blue-900 hover:underline'
                to='/forgotpassword'
              >
                Forgot password?
              </Link>

              {/* {response.length !== 0 && <p className='text-red-600 mx-auto my-[-2px]'>{response}</p>} */}

              <button
                className='mx-auto w-full py-2 mt-[0.5rem] rounded-[0.5rem] text-white h-[3.4rem] border-2 bg-[#70abe6]'
                type='submit'
              >
                Log in
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Login;
