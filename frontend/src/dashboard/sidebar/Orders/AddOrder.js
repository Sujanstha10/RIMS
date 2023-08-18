import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Spinner from "../../../Helper/Spinner";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ProductAll } from "../../../redux/features/Products/productAction";
import { getCustomerById } from "../../../redux/features/Customer/customerAction";
import { placeOrder } from "../../../redux/features/Order/orderAction";

const AddOrder = ({ color }) => {
    const dispatch = useDispatch();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('customer');
    const [selectedItems, setSelectedItems] = useState([]);
    const { customerById } = useSelector(state => state.customers)



    useEffect(() => {
        dispatch(getCustomerById(id))
        dispatch(ProductAll()).then((res) => {
            // console.log(res);
        });
    }, []);

    const { loading, products, error } = useSelector((state) => state.products);

    const handleQuantityChange = (selectedProduct, quantity) => {
        setSelectedItems(prevSelected => {
            const updatedItems = [...prevSelected];
            const itemIndex = updatedItems.findIndex(item => item.productId === selectedProduct.id);

            if (itemIndex !== -1) {
                if (selectedProduct.quantity < quantity) {
                    updatedItems[itemIndex].qtyError = `${selectedProduct.quantity} remaining`
                }
                else if (selectedProduct.quantity === 0) {
                    updatedItems[itemIndex].qtyError = `Out of stock`
                }

                else {
                    updatedItems[itemIndex].qtyError = ""; // Clear the error message if quantity is valid
                }

                updatedItems[itemIndex].quantity = parseFloat(quantity) || 0;
            }

            return updatedItems;
        });
    };




    const handlePriceChange = (selectedProduct, unitPrice) => {
        console.log('hi');
        console.log(selectedProduct);
        setSelectedItems(prevSelected => {
            const updatedItems = [...prevSelected];
            const itemIndex = updatedItems.findIndex(item => item.productId === selectedProduct.id);
            console.log(updatedItems);
            if (itemIndex !== -1) {
                updatedItems[itemIndex].unitPrice = parseFloat(unitPrice) || 0;
            }
            if (itemIndex !== -1) {
                updatedItems[itemIndex].unitPrice = parseFloat(unitPrice) || 0;
            }
            return updatedItems;
        });
    };




    const handleProductSelect = (selectedProduct) => {
        const isSelected = selectedItems.some(item => item.productId === selectedProduct.id);
        console.log(isSelected);

        if (isSelected) {
            setSelectedItems(prevSelected => prevSelected.filter(item => item.productId !== selectedProduct.id));
        } else {
            const newItem = { productId: selectedProduct.id, quantity: 0, unitPrice: 0 };
            console.log(newItem);
            setSelectedItems(prevSelected => [...prevSelected, newItem]);
        }
    };

    const handleOrder = () => {

        // console.log(selectedItems);
        if (selectedItems.length === 0) {
            toast.error("Please select at least one product.")
            return
        }

        const filterOrderItems = selectedItems.some((item) => {
            console.log(item);
            return item.qtyError?.length > 0
        }
        )
        console.log(filterOrderItems);
        if (filterOrderItems) {
            toast.error("No order placed.")
            return
        }
        const data = {
            customerId: id,
            items: selectedItems
        }

        const filterOrderItemss = selectedItems.some((item) => {
            console.log(item);
            return item.unitPrice <= 0
        }
        )
        console.log(filterOrderItemss);
        if (filterOrderItemss) {
            toast.error("Please select price.")
            return
        }
        dispatch(placeOrder(data))
        console.log(data);


    }


    return (
        <div className=" pb-15">
            <h6 className=' mb-6 text-lg ml-16 mt-5 font-bold uppercase text-blueGray-400'>
                Customer Information
            </h6>

            <div className='w-full py-3 lg:w-full flex justify-evenly gap-10 px-10'>
                <div className='relative w-full mb-3'>
                    <label
                        className='block mb-2 text-xs font-bold uppercase text-blueGray-600 '
                        htmlFor='grid-password'
                    >
                        Full Name
                    </label>

                    <div className='w-full px-3 py-2 text-sm border border-gray-300 transition-all duration-150 ease-linear bg-white rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring' >
                        {customerById?.name}

                    </div>

                </div >


                <div className='relative w-full mb-3'>
                    <label
                        className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                        htmlFor='grid-password'
                    >
                        Phone Number
                    </label>

                    <div className='w-full px-3 py-2 text-sm border border-gray-300 transition-all duration-150 ease-linear bg-white rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring' >
                        {customerById?.phone}


                    </div>

                </div >
                <div className='relative w-full mb-3'>
                    <label
                        className='block mb-2 text-xs font-bold uppercase text-blueGray-600'
                        htmlFor='grid-password'
                    >
                        Address
                    </label>

                    <div className='w-full px-3 py-2 text-sm border border-gray-300 transition-all duration-150 ease-linear bg-white rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring' >
                        {customerById?.address}

                    </div>

                </div >

                <div className='relative w-2/3 mb-3 flex items-center '>

                    <button className="bg-blue-500 px-5 py-2 text-white font-semibold rounded-md hover:bg-blue-400 mt-3 cursor-pointer" onClick={handleOrder}>
                        Place Order
                    </button>


                </div >
            </div>

            <table table className='items-center w-full bg-white border-collapse ' >
                <thead>
                    <tr>
                        <th
                            className={
                                "px-6  border flex items-center justify-center border-solid py-3 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                        >
                            SN
                        </th>

                        <th
                            className={
                                "px-6  align-middle border border-solid py-3 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                        >
                            Product Name
                        </th>

                        <th
                            className={
                                "px-6 text-center align-middle border border-solid py-3 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold  " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                        >
                            Price
                        </th>
                        <th
                            className={
                                "px-6  align-middle border border-solid py-3 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }
                        >
                            Quantity
                        </th>
                        <th
                            className={
                                "px-6  align-middle border border-solid py-3 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                (color === "light"
                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                            }

                        >
                            Select
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
                                    <td className='items-center p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                        {i + 1}
                                    </td>


                                    <td className='items-center p-4 px-6 text-left align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                        <div className='flex'>{product.productName}</div>
                                    </td>

                                    <td className='items-center p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                        <span className="p-2 font-semibold">Rs.</span>
                                        <input type="text" className="w-16 px-2 text-center border border-gray-300 rounded-md" value={selectedItems.find(item => item.productId === product.id)?.unitPrice || ""}
                                            onChange={(e) => handlePriceChange(product, e.target.value)} />

                                    </td>
                                    <td className='items-center p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                        <span className="p-2 font-bold">x</span>
                                        <input
                                            type="number"
                                            className="w-16 text-center px-2 border border-gray-300 "
                                            value={selectedItems.find(item => item.productId === product.id)?.quantity || ""}
                                            onChange={(e) => handleQuantityChange(product, e.target.value)}
                                        />
                                        {selectedItems.find(item => item.productId === product.id)?.qtyError && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {selectedItems.find(item => item.productId === product.id)?.qtyError}
                                            </div>
                                        )}
                                    </td>

                                    <td className="flex items-center gap-3 justify-center p-4 ">
                                        <input type="checkbox" className="w-4 h-4"
                                            checked={selectedItems.some(item => item.productId === product.id)}
                                            onChange={() => handleProductSelect(product)}
                                        />
                                        Check
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
            </table >
        </div>
    );
};

export default AddOrder;
