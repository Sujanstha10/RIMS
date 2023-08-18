import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Http from "../../../Helper/Http";
// import Spinner from "../../../Helper/Spinner";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { supplierAll } from "../../../redux/features/Supplier/supplierAction";
// import { clearFields } from "../../../redux/features/Supplier/supplierSlice";

const OrderTable = ({ color }) => {

    const [order, setOrder] = useState([])
    const fetchDatas = async () => {

        const response = await Http.get('/order')
        console.log(response);
        setOrder(response.data.ordersWithGrandTotal)



    }

    useEffect(() => {
        fetchDatas()

    }, [])
    console.log(order);


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
                            Customer's Name
                        </th>





                        <th
                            className={
                                "px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                        >
                            Order details
                        </th>

                        <th
                            className={
                                "px-6 align-middle  w-10   border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                        >
                            Grand Total
                        </th>


                    </tr>
                </thead>
                <tbody>
                    {order && order.length !== 0 ? (
                        order?.map((order, i) => {
                            return (
                                <tr key={order?.id} className="">
                                    <td className='items-center p-4 px-6  align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap text-center'>
                                        {i + 1}
                                    </td>


                                    <td className='items-center px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                        <div className='flex'>
                                            {order?.customer?.name}
                                        </div>
                                    </td>



                                    <td className='items-center p-4 px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                        <div className='flex gap-5 flex-wrap'>
                                            {order?.productOrders?.map((prod) =>
                                                <div className=" px-2">
                                                    <p>
                                                        {prod?.product.productName}
                                                    </p>


                                                    <p className="flex gap-2 text-sm">

                                                        <span>
                                                            Rs {prod?.unitPrice}
                                                        </span>
                                                        <span>
                                                            x {prod?.quantity}
                                                        </span>
                                                    </p>
                                                    <p className="flex gap-2 text-sm">
                                                        Total
                                                        <span>
                                                            Rs {prod?.total}
                                                        </span>
                                                    </p>


                                                </div>




                                            )}
                                        </div>
                                    </td>

                                    <td className='items-center px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                        <div className='flex'>
                                            <span className="font-semibold text-red-600">
                                                Rs.
                                            </span> {order?.grandTotal}
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

}
export default OrderTable
