import React, { useEffect, useState } from 'react'
import Http from '../../../Helper/Http'
import moment from 'moment';



const ProductsSupplier = () => {
    let color = false


    const [data, setData] = useState([])
    const getDatas = async () => {
        const response = await Http.get('/stock')
        console.log(response);
        setData(response.data.result)


    }
    useEffect(() => {

        getDatas()
    }, [])

    console.log(data);

    const formatDate = (dateString) => {
        return moment(dateString).format('MMMM Do YYYY');
    };


    return (
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
                        Supplied By
                    </th>


                    <th
                        className={
                            "px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                            (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                    >
                        Product
                    </th>

                    <th
                        className={
                            "px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
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
                        Date
                    </th>
                </tr>
            </thead>
            <tbody>

                {data && data.length !== 0 ? (
                    data?.map((data, i) => {
                        return (
                            <tr key={data.id} className="">
                                <td className='items-center p-4 px-6  align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap text-center'>
                                    {i + 1}
                                </td>


                                <td className='items-center px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                    <div className='flex'>
                                        {data?.supplier.supplierName}
                                    </div>
                                </td>

                                <td className='items-center p-4 px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                    <div className='flex w-44'>
                                        {data.product.productName}
                                    </div>
                                </td>

                                <td className='items-center p-4 px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                    <div className='flex'>
                                        {data.remainingQuantity}
                                    </div>
                                </td>


                                <td className='p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap  text-center'>
                                    {formatDate(data.date)}


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
    )
}

export default ProductsSupplier