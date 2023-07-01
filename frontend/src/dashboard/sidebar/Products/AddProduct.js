import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import { ValidateBikeAdd } from "../../../Validation/Validation";
import AddEditWrapper from "../../common/AddEditWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../../redux/features/Products/productAction";
import { clearFields } from "../../../redux/features/Products/productSlice";
import Spinner from "../../../Helper/Spinner";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState();

  const onImageChange = (event, setFieldValue) => {
    setFieldValue("image", event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const { loading, error, success } = useSelector((state) => state.products);

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [success]);

  const handleBack = async () => {
    navigate(-1);
  };

  return (
    <AddEditWrapper
      title='Product'
      error={error}
      method='create'
      success={success}
      handleBack={handleBack}
      backlink='/dashboard/products'
    >
      <Formik
        initialValues={{
          productName: "",
          quantity: "",
          unitPrice: "",
          image: null,
        }}
        validationSchema={ValidateBikeAdd}
        onSubmit={async (values) => {
          let formdata = new FormData();
          formdata.append("productName", values.productName);
          formdata.append("quantity", parseInt(values.quantity));
          formdata.append("image", values.image);
          formdata.append("unitPrice", parseInt(values.unitPrice));
          console.log(values);
          await dispatch(addProduct(formdata));
          await dispatch(clearFields());
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className='bg-transparent'>
            <h6 className='mt-3 mb-6 text-sm font-bold text-black uppercase'>
              Product Information
            </h6>
            <div className='flex flex-wrap'>
              <div className='w-full px-4 lg:w-6/12'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                    htmlFor='grid-password'
                  >
                    Product Name
                  </label>
                  <input
                    type='text'
                    className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring'
                    name='productName'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.productName || ""}
                  />
                </div>
                <span className='text-red-500 error'>
                  <ErrorMessage name='productName' />
                </span>
              </div>
              <div className='w-full px-4 lg:w-6/12'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                    htmlFor='grid-password'
                  >
                    Quantity
                  </label>
                  <input
                    type='text'
                    className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring'
                    name='quantity'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.quantity || ""}
                  />
                </div>
                <span className='text-red-500 error'>
                  <ErrorMessage name='quantity' />
                </span>
              </div>
              <div className='w-full px-4 mt-4 lg:w-6/12'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                    htmlFor='grid-password'
                  >
                    Price
                  </label>
                  <input
                    type='text'
                    className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring'
                    name='unitPrice'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.unitPrice || ""}
                  />
                </div>
                <span className='text-red-500 error'>
                  <ErrorMessage name='unitPrice' />
                </span>
              </div>

              <div className='w-full px-3 py-3 lg:w-3/12'>
                <div className='relative w-full mb-3 '>
                  <label
                    className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                    htmlFor='grid-password'
                  >
                    Image
                  </label>
                  <input
                    type='file'
                    accept='image/*'
                    className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring'
                    onChange={(event) =>
                      onImageChange(event, props.setFieldValue)
                    }
                    onBlur={props.handleBlur}
                    autoComplete='off'
                  />
                </div>
                <span className='text-red-500 error'>
                  <ErrorMessage name='image' />
                </span>
              </div>
              <div className='px-4 lg:w-3/12'>
                {selectedImage && (
                  <div className='relative mt-4 border w-28 h-28'>
                    <img
                      src={selectedImage}
                      className='object-cover w-full '
                      alt='Thumb'
                    />
                  </div>
                )}
              </div>
            </div>
            <hr className='mt-6 border-b-1 border-blueGray-300' />
            <div className='w-full px-3 py-3 lg:w-6/12'>
              <div className='relative w-full mt-3 mb-3'>
                {loading ? (
                  <Spinner />
                ) : (
                  <button
                    type='submit'
                    className='px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-orange active:bg-lightBlue-600 hover:shadow-md focus:outline-none'
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

export default AddProduct;
