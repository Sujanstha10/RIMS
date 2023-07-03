import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage } from "formik";
// import { editCustomerById, getCustomerById } from "../../../redux/features/User/authActions";
// import { clearFields } from "../../../redux/features/User/authSlice";
// import {  } from "../../common/Validation";

import { useParams } from 'react-router-dom';
import { editCustomerById, getCustomerById } from "../../../redux/features/Customer/customerAction";
import AddEditWrapper from "../../common/AddEditWrapper";
import Spinner from "../../../Helper/Spinner";
import { clearFields } from "../../../redux/features/Customer/customerSlice";
import { toast } from "react-hot-toast";
const base_url = "http://localhost:5000/";
function EditUser() {
  let { id } = useParams();
  const navigate = useNavigate();



  const dispatch = useDispatch();
  const { loading, error, success, customerById } = useSelector((state) => state.customers);


  useEffect(() => {
    dispatch(getCustomerById(id))
  }, [id])

  const handleBack = async () => {
    // await dispatch(clearFields());
    // navigate(-1);
  }


  return (
    <>
      {
        customerById ? (
          <AddEditWrapper title="User" error={error} method="update" success={success} backlink="/admin/user" handleBack={handleBack}>
            <Formik
              initialValues={{
                name: customerById ? customerById.name : "",
                email: customerById ? customerById.email : "",
                phone: customerById ? customerById.phone : "",
                address: customerById ? customerById.address : "",
              }}
              // validationSchema={}
              onSubmit={async (values, actions) => {



                let data = {
                  id: id,
                  values: values
                }
                // console.log("data", data, values);
                // return;


                try {
                  await dispatch(editCustomerById(data)).unwrap()
                  navigate(-1)

                }
                catch (error) {
                  toast.error(error.message)
                }
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>

                  <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
                    User Information
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full px-3 py-3 lg:w-6/12">
                      <div className="relative w-full mb-3">
                        <label
                          className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                          htmlFor="grid-password"
                        >
                          Full name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                          name="name"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.name || ""}
                        />
                      </div>
                      <span className="error text-red-500">
                        <ErrorMessage name="name" />
                      </span>
                    </div>
                    <div className="w-full px-3 py-3 lg:w-6/12">
                      <div className="relative w-full mb-3">
                        <label
                          className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                          htmlFor="grid-password"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                          name="email"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.email || ""}
                        />
                      </div>
                      <span className="error text-red-500">
                        <ErrorMessage name="email" />
                      </span>
                    </div>
                    <div className="w-full px-3 py-3 lg:w-6/12">
                      <div className="relative w-full mb-3">
                        <label
                          className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                          htmlFor="grid-password"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                          name="address"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.address || ""}
                        />
                        <span className="error text-red-500">
                          <ErrorMessage name="address" />
                        </span>
                      </div>
                    </div>

                    <div className="w-full px-3 py-3 lg:w-6/12">
                      <div className="relative w-full mb-3">
                        <label
                          className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                          htmlFor="grid-password"
                        >
                          Contact Number
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                          name="phone"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.phone || ""}
                        />
                        <span className="error text-red-500">
                          <ErrorMessage name="phone" />
                        </span>
                      </div>
                    </div>


                    <div className="w-full px-3 py-3 lg:w-6/12">

                      <span className="error text-red-500">
                        <ErrorMessage name="role" />
                      </span>
                    </div>
                  </div>
                  <div className="w-full px-3 py-3 lg:w-6/12">
                    <div className="relative mt-3 w-full mb-3">
                      <button disabled={loading} type="submit" className="px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 bg-blue-700 hover:shadow-md focus:outline-none">
                        {loading ? <Spinner /> : 'Submit'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </AddEditWrapper>
        ) : <> </>
      }


    </>
  );
}

export default EditUser;
