import React from 'react'

const CustomerForm = () => {
    return (
        <AddEditWrapper
            title='User'
            error={error}
            method='create'
            success={success}
            handleBack={handleBack}
            backlink='/dashboards/customers'
        >
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                }}
                validationSchema={ValidateUser}
                onSubmit={async (values, actions) => {
                    let formdata = new FormData();
                    formdata.append("name", values.name);
                    formdata.append("phone", values.phone);
                    formdata.append("address", values.address);
                    formdata.append("email", values.email);
                    // console.log(FormData);
                    // console.log(values);
                    try {
                        await dispatch(customerRegister(values)).unwrap()
                        toast.success('Customer added successfully.')
                        navigate(-1)
                    }
                    catch (error) {
                        toast.error(error)
                    }
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <h6 className='mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400'>
                            Customer Information
                        </h6>
                        <div className='flex flex-wrap'>
                            <div className='w-full px-3 py-3 lg:w-6/12'>
                                <div className='relative w-full mb-3'>
                                    <label
                                        className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                                        htmlFor='grid-password'
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type='text'
                                        className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring'
                                        name='name'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.name || ""}
                                    />
                                </div>
                                <span className='text-red-500 error'>
                                    <ErrorMessage name='name' />
                                </span>
                            </div>
                            <div className='w-full px-3 py-3 lg:w-6/12'>
                                <div className='relative w-full mb-3'>
                                    <label
                                        className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                                        htmlFor='grid-password'
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type='email'
                                        className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring'
                                        name='email'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.email || ""}
                                    />
                                </div>
                                <span className='text-red-500 error'>
                                    <ErrorMessage name='email' />
                                </span>
                            </div>
                            <div className='w-full px-3 py-3 lg:w-6/12'>
                                <div className='relative w-full mb-3'>
                                    <label
                                        className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                                        htmlFor='grid-password'
                                    >
                                        Address
                                    </label>
                                    <input
                                        type='text'
                                        className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring'
                                        name='address'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.address || ""}
                                    />
                                </div>
                                <span className='text-red-500 error'>
                                    <ErrorMessage name='address' />
                                </span>
                            </div>
                            <div className='w-full px-3 py-3 lg:w-6/12'>
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
                                        name='phone'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.phone || ""}
                                    />
                                    <span className='text-red-500 error'>
                                        <ErrorMessage name='phone' />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr className='mt-6 border-b-1 border-blueGray-300' />
                        <div className='w-full px-3 py-3 lg:w-6/12'>
                            <div className='relative w-full mt-3 mb-3'>
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <button
                                        // disabled={loading}
                                        type='submit'
                                        className='px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-400 rounded shadow outline-none bg-lightBlue-500 hover:shadow-md focus:outline-none'
                                    >
                                        Register
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </AddEditWrapper>
    )
}

export default CustomerForm