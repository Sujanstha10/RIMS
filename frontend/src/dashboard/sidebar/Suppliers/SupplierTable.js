import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../Helper/Spinner";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { supplierAll } from "../../../redux/features/Supplier/supplierAction";
import { clearFields } from "../../../redux/features/Supplier/supplierSlice";

const SupplierTable = ({ color }) => {
    const [showModal, setShowModal] = useState(false);
    const [bikeId, setBikeId] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(supplierAll()).then((res) => {
            // console.log(res);
        }).then(() => {

            dispatch(clearFields())


        })
    }, [dispatch]);

    const { loading, suppliers, error } = useSelector((state) => state.suppliers);
    const base_url = "http://localhost:4000/";
    const handleDeleteClick = (id) => {
        setBikeId(id);
        setShowModal(true);
    };
    return (
        <>
            <table className='items-center w-full mx-auto bg-white border-collapse '>
                <thead className="">
                    <tr className="">
                        <th
                            className={
                                "px-6 border flex  items-center justify-center border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                        >
                            SN
                        </th>


                        <th
                            className={
                                "px-6 align-middle  border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                        >
                            Supplier's Name
                        </th>


                        <th
                            className={
                                "px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                        >
                            Shop Name
                        </th>

                        <th
                            className={
                                "px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                        >
                            Contact Number
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
                    {suppliers && suppliers.length !== 0 ? (
                        suppliers?.map((product, i) => {
                            return (
                                <tr key={product.id} className="">
                                    <td className='items-center p-4 px-6  align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap text-center'>
                                        {i + 1}
                                    </td>


                                    <td className='items-center px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                        <div className='flex'>
                                            {product.supplierName}
                                        </div>
                                    </td>

                                    <td className='items-center p-4 px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                        <div className='flex'>
                                            {product.contactPerson}
                                        </div>
                                    </td>

                                    <td className='items-center p-4 px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                        <div className='flex'>
                                            {product.contacNumber}
                                        </div>
                                    </td>


                                    <td className='p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap '>
                                        <div className='flex justify-center gap-3 font-semibold items-center'>
                                            Edit
                                            <Link to={`/dashboard/suppliers/edit/${product.id}`}>

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
        </>
    );
};

export default SupplierTable;
