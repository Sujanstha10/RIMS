import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage } from "formik";
// import { editCustomerById, getCustomerById } from "../../../redux/features/User/authActions";
// import { clearFields } from "../../../redux/features/User/authSlice";
// import {  } from "../../common/Validation";

import { useParams } from 'react-router-dom';
import AddEditWrapper from "../../common/AddEditWrapper";
import Spinner from "../../../Helper/Spinner";
import { toast } from "react-hot-toast";
import { editSupplierById, getSupplierById } from "../../../redux/features/Supplier/supplierAction";
import { clearFields, clearSupplierById } from "../../../redux/features/Supplier/supplierSlice";
const base_url = "http://localhost:5000/";
function EditSupplier() {
    let { id } = useParams();
    const navigate = useNavigate();



    const dispatch = useDispatch();
    const { loading, error, success, supplierById } = useSelector((state) => state.suppliers);


    useEffect(() => {
        dispatch(getSupplierById(id))
    }, [id, dispatch])


    const handleBack = async () => {
        dispatch(clearSupplierById())
        navigate(-1);


    }


    return (
        <>
            {
                supplierById ? (
                    <AddEditWrapper title="Edit Supplier" error={error} method="update" success={success} backlink="/dashboard/suppliers" handleBack={handleBack}>
                        <Formik
                            initialValues={{
                                supplierName: supplierById ? supplierById.supplierName : "",
                                contactPerson: supplierById ? supplierById.contactPerson : "",
                                contacNumber: supplierById ? supplierById.contacNumber : "",
                            }}
                            // validationSchema={}
                            onSubmit={async (values, actions) => {

                                console.log(values);

                                let data = {
                                    id: id,
                                    values: values
                                }




                                try {
                                    await dispatch(editSupplierById(data)).unwrap()
                                    // navigate(-1)
                                    dispatch(clearFields())


                                }
                                catch (error) {
                                    // toast.error(error.message)
                                }
                            }}
                        >
                            {(props) => (
                                <form onSubmit={props.handleSubmit}>

                                    <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
                                        Supplier Information
                                    </h6>
                                    <div className="flex flex-wrap">
                                        <div className="w-full px-3 py-3 lg:w-6/12">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                                                    htmlFor="grid-password"
                                                >
                                                    Supplier Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                                                    name="supplierName"
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.supplierName || ""}
                                                />
                                            </div>
                                            <span className="error text-red-500 ">
                                                <ErrorMessage name="name" />
                                            </span>
                                        </div>
                                        <div className="w-full px-3 py-3 lg:w-6/12">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                                                    htmlFor="grid-password"
                                                >
                                                    Shop Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                                                    name="contactPerson"
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.contactPerson || ""}
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
                                                    Contact Number
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                                                    name="contacNumber"
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.contacNumber || ""}
                                                />
                                                <span className="error text-red-500">
                                                    <ErrorMessage name="contacNumber" />
                                                </span>
                                            </div>
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

export default EditSupplier;
