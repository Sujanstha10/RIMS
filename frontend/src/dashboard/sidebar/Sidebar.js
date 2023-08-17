/*eslint-disable*/
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import NotificationDropdown from "../../Components/Dropdowns/NotificationDropdown.js";
// import UserDropdown from "../../Components/Dropdowns/UserDropdown.js";
// import Spinner from "../../Helper/Spinner.js";
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { FaFirstOrder, FaPersonBooth } from 'react-icons/fa'

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const { userInfo } = useSelector((state) => state.auth);
  const [activePathname, setActivePathname] = React.useState("");

  //   if (userInfo) {
  const { pathname } = useLocation()


  useEffect(() => {

  }, [])

  return (
    <>
      <nav className='flex-wrap items-center justify-between px-6 py-4 text- shadow-xl relativeflex bg-[rgb(4,23,55)] text-white md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64'>
        <div className='flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap'>
          {/* Toggler */}
          <button
            className='px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden'
            type='button'
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className='fas fa-bars'></i>
          </button>
          {/* Brand */}
          <Link
            className='inline-block p-4 px-0 mr-0 text-2xl font-extrabold text-left text-blue-600 tracking-wider uppercase md:block md:pb-2 whitespace-nowrap'
            to='#'
          >
            RIMS
          </Link>
          <div
            className={
              "md:flex  md:flex-col md:items-stretch md:opacity-100 md:relative  md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className='block pb-2 mb-2 border-b border-solid md:min-w-full md:hidden border-blueGray-200'>
              <div className='flex flex-wrap'>
                <div className='w-6/12'>
                  <Link
                    className='inline-block px-0 mr-0 text-sm font-bold text-left text-orange uppercase md:block whitespace-nowrap'
                    to='/'
                  >
                    RIMS
                  </Link>
                </div>
                <div className='flex justify-end w-6/12'>
                  <button
                    type='button'
                    className='px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden'
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className='fas fa-times'></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className='mt-6 mb-4 md:hidden'>
              <div className='pt-0 mb-3'>
                <input
                  type='text'
                  placeholder='Search'
                  className='w-full h-12 px-3 py-2 text-base font-normal leading-snug bg-white border border-solid rounded shadow-none outline-none border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 focus:outline-none'
                />
              </div>
            </form>

            {/* Divider */}
            <hr className='my-4 md:min-w-full ' />
            {/* Heading */}
            <Link to='/dashboard' className='-ml-3 py-2 rounded-lg text-lg font-bold w-fit pl-5 pr-5 hover:opacity-80 bg-[rgb(57,99,173)] text-gray-200 no-underline   cursor-pointer mb-6 mt-2 flex items-center gap-2'>
              <MdOutlineDashboardCustomize size={25} className="text-white" />
              Dashboard
            </Link>

            {/* Navigation */}

            <ul className='flex flex-col list-none md:flex-col md:min-w-full md:mb-4 '>
              <li className='items-center hover:underline'>
                <Link
                  className='flex items-center py-3 text-sm font-bold uppercase'
                  to='/dashboard/customers'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-7 h-7 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                    />
                  </svg>
                  Customers
                </Link>
              </li>
            </ul>


            <ul className='flex flex-col list-none md:flex-col md:min-w-full md:mb-4  -ml-1'>
              <li className='items-center hover:underline'>
                <Link
                  className='flex items-center text-sm font-bold uppercase '
                  to='/dashboard/products'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-9 h-9 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  Inventory
                </Link>
              </li>
            </ul>

            <ul className='flex flex-col list-none md:flex-col md:min-w-full md:mb-4 mt-4'>
              <li className='items-center hover:underline px-[1px]'>
                <Link
                  className='flex items-center text-sm font-bold uppercase gap-3 '
                  to='/dashboard/suppliers'
                >
                  <FaPersonBooth className="text-3xl" />
                  Supplier
                </Link>
              </li>
            </ul>


            <ul className='flex flex-col list-none md:flex-col md:min-w-full md:mb-4 mt-4'>
              <li className='items-center hover:underline'>
                <Link
                  className='flex items-center text-sm font-bold uppercase gap-3'
                  to='/dashboard/orders'
                >

                  <FaFirstOrder className="text-3xl" />
                  Orders
                </Link>
              </li>
            </ul>


            {/* <ul className='flex flex-col list-none md:flex-col md:min-w-full md:mb-4 mt-2'>
              <li className='items-center hover:underline'>
                <Link
                  className='flex items-center text-sm font-bold uppercase'
                  to='/dashboard/products'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  Stocks
                </Link>
              </li>
            </ul> */}

          </div>
        </div>
      </nav>
    </>
  );
  //   } else {
  //     <Spinner />;
  //   }
}
