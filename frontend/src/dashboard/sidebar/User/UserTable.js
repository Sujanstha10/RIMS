import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../../common/Delete";
import { useDispatch, useSelector } from "react-redux";
// import { userAll } from "../../../redux/features/User/authActions";
import Spinner from "../../../Helper/Spinner";
import toast from "react-hot-toast";
// import Searchbar from "../../common/Searchbar";

// const base_url = "http://localhost:5000/";

const UserTable = () => {
  const users = [
    {
      id: 1,
      name: "Aashish",
      email: "aashish@gmail.com",
      contact: "874748",
      gender: "male",
      role: "admin",
    },
    {
      id: 2,
      name: "Aashish",
      email: "aashish@gmail.com",
      contact: "874748",
      gender: "male",
      role: "admin",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  // const { loading, userInfo, users, error } = useSelector(
  //   (state) => state.auth
  // );

  // useEffect(() => {
  //   dispatch(userAll());
  // }, [page, filter]);

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
              Role
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
          {users && users.length !== 0 ? (
            users?.map((user, i) => {
              return (
                <tr key={user.id}>
                  <td className='items-center p-4 px-6 align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    <div className='flex justify-center'>
                      {/* {user.image && (
                        <img
                          src={`${base_url}${user.image}`}
                          className='w-12 h-12 bg-white border rounded-full'
                          alt={user.id}
                        ></img>
                      )}{" "} */}
                      {user.name}
                    </div>
                  </td>
                  <td className='items-center p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    {user.email}
                  </td>

                  <td className='items-center p-4 px-6 text-center align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap'>
                    {user.role}
                  </td>
                  <td className='p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                    <div className='flex justify-center'>
                      <Link to={`/admin/user/edit/${user.id}`}>
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
