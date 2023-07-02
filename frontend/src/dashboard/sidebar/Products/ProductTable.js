import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../Helper/Spinner";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ProductAll } from "../../../redux/features/Products/productAction";
import { DeleteProduct } from "./DeleteProduct";

const ProductTable = ({ color }) => {
  const [showModal, setShowModal] = useState(false);
  const [bikeId, setBikeId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ProductAll()).then((res) => {
      console.log(res);
    })
  }, []);

  const { loading, products, error } = useSelector((state) => state.products);
  const base_url = "http://localhost:4000/";
  const handleDeleteClick = (id) => {
    setBikeId(id);
    setShowModal(true);
  };
  return (
    <>
      <table className='items-center w-full bg-white border-collapse'>
        <thead>
          <tr>
            <th
              className={
                "px-6 border flex items-center justify-center border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            >
              SN
            </th>


            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            >
              Image
            </th>

            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            >
              Product name
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            >
              Quantity
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            >
              Price
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && <Spinner />}
          {error && toast.error(error)}
          {products && products.length !== 0 ? (
            products.map((product, i) => {
              return (
                <tr key={product.id}>
                  <td className='items-center p-4 px-6  align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap text-center'>
                    {i + 1}
                  </td>
                  <td className='items-center p-4 px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    <div className='flex'>
                      {product.image && (
                        <img
                          src={`${base_url}${product.image}`}
                          className='w-12 h-12 bg-white border rounded-full'
                          alt={product.id}
                        ></img>
                      )}{" "}
                      {/* {product.productName} */}
                    </div>
                  </td>

                  <td className='items-center p-4 px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    <div className='flex'>
                      {product.productName}
                    </div>
                  </td>

                  <td className='items-center p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    {product.quantity}
                  </td>

                  <td className='items-center p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    {product.unitPrice}
                  </td>
                  <td className='p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                    <div className='flex justify-center gap-5'>
                      <Link to={`/dashboard/products/edit/${product.id}`}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          class='icon icon-tabler icon-tabler-edit'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='#00b341'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' />
                          <path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' />
                          <line x1='16' y1='5' x2='19' y2='8' />
                        </svg>
                      </Link>
                      <button
                        type='button'
                        onClick={() => {
                          handleDeleteClick(product.id);
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          class='icon icon-tabler icon-tabler-trash'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='#ff2825'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <line x1='4' y1='7' x2='20' y2='7' />
                          <line x1='10' y1='11' x2='10' y2='17' />
                          <line x1='14' y1='11' x2='14' y2='17' />
                          <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
                          <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className='text-center border'>
              <td colSpan={5} className='p-3 font-bold text-red-500'>
                No Data Found!!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && <DeleteProduct id={bikeId} setShowModal={setShowModal} />}
    </>
  );
};

export default ProductTable;
