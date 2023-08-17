import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../../common/Delete";
import { useDispatch, useSelector } from "react-redux";
// import { userAll } from "../../../redux/features/User/authActions";
import Spinner from "../../../Helper/Spinner";
import toast from "react-hot-toast";
import { customerAll } from "../../../redux/features/Customer/customerAction";
// import Searchbar from "../../common/Searchbar";
import { BsFillCartPlusFill } from 'react-icons/bs'


// const base_url = "http://localhost:5000/";

const UserTable = () => {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const { customers } = useSelector(state => state.customers)


  useEffect(() => {
    dispatch(customerAll())
  }, [])
  return (
    <>
      {/* {loading && <Spinner />}
      {error && toast.error(error)} */}
      {/* <Searchbar filter={filter} setFilter={setFilter} page={page} /> */}
      <table className='items-center w-full bg-transparent border-collapse'>
        <thead>
          <tr>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
              }
            >
              SN
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
              }
            >
              Name
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
              }
            >
              Email
            </th>

            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
              }
            >
              Address
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
              }
            >
              Phone_no
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
              }
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {customers && customers.length !== 0 ? (
            customers?.map((user, i) => {
              return (
                <tr key={user.id}>

                  <td className='items-center p-4 px-6 align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    <div className='flex justify-center'>

                      {user.id}
                    </div>
                  </td>
                  <td className='items-center p-4 px-6 align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    <div className='flex justify-center'>

                      {user.name}
                    </div>
                  </td>
                  <td className='items-center p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    {user.email}
                  </td>

                  <td className='items-center p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    {user.address}
                  </td>
                  <td className='items-center p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    {user.phone}
                  </td>
                  <td className='p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                    <div className='flex justify-center items-center gap-3'>
                      <Link to={`/dashboard/user/edit/${user.id}`}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          class='icon icon-tabler icon-tabler-edit'
                          width='28'
                          height='28'
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


                      <Link to={{ pathname: '/dashboard/order/add', search: `customer=${user.id}` }}>
                        <BsFillCartPlusFill className="text-red-500 text-2xl cursor-pointer" />
                      </Link>


                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className='text-center border'>
              <td colSpan={6} className='p-3 font-bold text-red-500'>
                No Data Found!!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* {showModal ? (
        <DeleteModal showModal={showModal} setShowModal={setShowModal} />
      ) : null} */}
    </>
  );
};

export default UserTable;
