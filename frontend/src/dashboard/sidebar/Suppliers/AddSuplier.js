import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import { ValidateBikeAdd } from "../../../Validation/Validation";
import AddEditWrapper from "../../common/AddEditWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Helper/Spinner";
import { addSupplier } from "../../../redux/features/Supplier/supplierAction";
import { toast } from "react-hot-toast";
import { clearFields } from "../../../redux/features/Supplier/supplierSlice";

const AddSupplier = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState();

    const onImageChange = (event, setFieldValue) => {
        setFieldValue("image", event.target.files[0]);
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
    };

    const { loading, error, success } = useSelector((state) => state.suppliers);



    const handleBack = async () => {
        navigate(-1);
    };

    return (
        <AddEditWrapper
            title='Supplier'
            error={error}
            method='create'
            success={success}
            handleBack={handleBack}
            backlink='/dashboard/suppliers'
        >
            <Formik
                initialValues={{
                    supplierName: "",
                    contactPerson: "",
                    contacNumber: "",
                }}
                // validationSchema={ValidateBikeAdd}
                onSubmit={async (values, { resetForm }) => {
                    let formdata = new FormData();
                    if (values.supplierName.length === 0 || values.contacNumber.length === 0 || values.contactPerson.length === 0) {
                        toast.error("Please fill all the details.")
                        return;
                    }
                    formdata.append("supplierName", values.supplierName);
                    formdata.append("contactPerson", parseInt(values.contactPerson));
                    formdata.append("contacNumber", parseInt(values.contacNumber));
                    // console.log(values);
                    try {
                        await dispatch(addSupplier(values)).unwrap();
                        dispatch(clearFields())
                        resetForm(); // Reset the form fields
                    } catch (error) {
                        // Handle error if addSupplier was not successful
                    }

                    // await dispatch(clearFields());
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit} className='bg-transparent'>
                        <h6 className='mt-3 mb-6 text-sm font-bold text-black uppercase'>
                            Supplier Information
                        </h6>
                        <div className='flex flex-wrap'>
                            <div className='w-full px-4 lg:w-6/12'>
                                <div className='relative w-full mb-3'>
                                    <label
                                        className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                                        htmlFor='grid-password'
                                    >
                                        Supplier Name
                                    </label>
                                    <input
                                        type='text'
                                        className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring'
                                        name='supplierName'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.supplierName || ""}
                                    />
                                </div>
                                <span className='text-red-500 error'>
                                    <ErrorMessage name='supplierName' />
                                </span>
                            </div>
                            <div className='w-full px-4 lg:w-6/12'>
                                <div className='relative w-full mb-3'>
                                    <label
                                        className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                                        htmlFor='grid-password'
                                    >
                                        Supplier's Shop Name
                                    </label>
                                    <input
                                        type='text'
                                        className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring'
                                        name='contactPerson'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.contactPerson || ""}
                                    />
                                </div>
                                <span className='text-red-500 error'>
                                    <ErrorMessage name='contactPerson' />
                                </span>
                            </div>
                            <div className='w-full px-4 mt-4 lg:w-6/12'>
                                <div className='relative w-full mb-3'>
                                    <label
                                        className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                                        htmlFor='grid-password'
                                    >
                                        Contact Number
                                    </label>
                                    <input
                                        type='text'
                                        className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring'
                                        name='contacNumber'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.contacNumber || ""}
                                    />
                                </div>
                                <span className='text-red-500 error'>
                                    <ErrorMessage name='contacNumber' />
                                </span>
                            </div>


                        </div>
                        <hr className='mt-6 border-b-1 border-blueGray-300' />
                        <div className='w-full px-3 py-3 lg:w-6/12 '>
                            <div className='relative w-full mt-3 mb-3'>
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <button
                                        type='submit'
                                        className='px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-orange active:bg-lightBlue-600 hover:shadow-md focus:outline-none'
                                        disabled={loading}
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </AddEditWrapper>
    );
};

export default AddSupplier;
