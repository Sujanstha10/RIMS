import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import { ValidateAddStock } from "../../../Validation/Validation";
import AddEditWrapper from "../../common/AddEditWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addStock,
  ProductAll,
} from "../../../redux/features/Products/productAction";
import { supplierAll } from "../../../redux/features/Supplier/supplierAction";

import { clearFields } from "../../../redux/features/Products/productSlice";
import Spinner from "../../../Helper/Spinner";

const AddStock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, products } = useSelector(
    (state) => state.products
  );
  const {
    loading: supplierLoading,
    suppliers,
    error: supplierError,
  } = useSelector((state) => state.suppliers);

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [success]);

  const handleBack = async () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(ProductAll()).then((res) => {
      console.log(res.payload);
    });
    dispatch(supplierAll()).then((res) => {
      console.log(res.payload);
    });
  }, []);
  return (
    <AddEditWrapper
      title='Stock Information'
      error={error}
      method='create'
      success={success}
      handleBack={handleBack}
      backlink='/dashboard/products'
    >
      <Formik
        initialValues={{
          productId: "",
          supplierId: "",
          quantity: "",
        }}
        validationSchema={ValidateAddStock}
        onSubmit={async (values) => {
          let formdata = values;
          let data = {
            id: formdata.productId,
            formdata: { ...values },
          };
          console.log(data, "----------data");
          await dispatch(addStock(data));
          await dispatch(clearFields());
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className='bg-transparent'>
            <h6 className='mt-3 mb-6 text-sm font-bold text-black uppercase'>
              Add Stock
            </h6>
            <div className='flex flex-wrap'>
              <div className='w-full px-3 lg:w-6/12'>
                <div className='relative w-full mb-3'>
                  <label className='block mb-2 text-xs font-bold uppercase text-blueGray-600'>
                    Product's Name
                  </label>
                  <select
                    className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none'
                    name='productId'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.productId}
                    autoComplete='off'
                  >
                    <option value=''>Select</option>
                    {products.length !== 0 &&
                      products.map((item, i) => {
                        return (
                          <>
                            <option value={item.id}>{item.productName}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
                <div className='relative w-full mb-3'>
                  <label className='block mb-2 text-xs font-bold uppercase text-blueGray-600'>
                    Supplier's Name
                  </label>
                  <select
                    className='w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none'
                    name='supplierId'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.supplierId}
                    autoComplete='off'
                  >
                    <option value=''>Select</option>
                    {suppliers.length !== 0 &&
                      suppliers.map((item, i) => {
                        return (
                          <>
                            <option value={item.id}>{item.supplierName}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
                <span className='text-red-500 error'>
                  <ErrorMessage name='supplierId' />
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

export default AddStock;
