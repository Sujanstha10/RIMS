import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../Helper/Spinner";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ProductAll } from "../../../redux/features/Products/productAction";

const AddOrder = ({ color }) => {
    const [showModal, setShowModal] = useState(false);
    const [bikeId, setBikeId] = useState();
    const dispatch = useDispatch();

    // const [productDetails, setProductDetails] = useState({
    //     price: '',
    //     quantity: ''
    // })
    const [selectedItems, setSelectedItems] = useState([]);



    useEffect(() => {
        dispatch(ProductAll()).then((res) => {
            console.log(res);
        });
    }, []);

    const { loading, products, error } = useSelector((state) => state.products);

    const handleQuantityChange = (selectedProduct, quantity) => {
        console.log('hi');
        console.log(selectedProduct);
        setSelectedItems(prevSelected => {
            const updatedItems = [...prevSelected];
            const itemIndex = updatedItems.findIndex(item => item.productId === selectedProduct.id);
            console.log(updatedItems);
            if (itemIndex !== -1) {
                updatedItems[itemIndex].quantity = parseInt(quantity) || 0;
            }
            if (itemIndex !== -1) {
                updatedItems[itemIndex].quantity = parseInt(quantity) || 0;
            }
            return updatedItems;
        });
    };




    const handlePriceChange = (selectedProduct, price) => {
        console.log('hi');
        console.log(selectedProduct);
        setSelectedItems(prevSelected => {
            const updatedItems = [...prevSelected];
            const itemIndex = updatedItems.findIndex(item => item.productId === selectedProduct.id);
            console.log(updatedItems);
            if (itemIndex !== -1) {
                updatedItems[itemIndex].price = parseInt(price) || 0;
            }
            if (itemIndex !== -1) {
                updatedItems[itemIndex].price = parseInt(price) || 0;
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
            const newItem = { productId: selectedProduct.id, quantity: 1, price: 0 };
            console.log(newItem);
            setSelectedItems(prevSelected => [...prevSelected, newItem]);
        }
    };


    return (
        <>
            <AddOrder />

            <table className='items-center w-full bg-white border-collapse'>
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
                                        <input type="text" className="w-16 px-2 text-center border border-gray-300 rounded-md" value={selectedItems.find(item => item.productId === product.id)?.price || ""}
                                            onChange={(e) => handlePriceChange(product, e.target.value)} />

                                    </td>

                                    <td className='items-center p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                                        <span className="p-2 font-bold">x</span>
                                        <input type="text" className="w-12 border border-gray-300 rounded-md px-2 text-center " value={selectedItems.find(item => item.productId === product.id)?.quantity || ""}
                                            onChange={(e) => handleQuantityChange(product, e.target.value)} />

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
            </table>
        </>
    );
};

export default AddOrder;
