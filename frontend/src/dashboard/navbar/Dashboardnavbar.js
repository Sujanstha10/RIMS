//src/dashboard/navbar/Dashboardnavbar.js
import React, { useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { logout } from "../../storage/admin/user/authSlice";
const Dashboardnavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userData, error } = useSelector((state) => state.auth);
  const { pathname } = useLocation()
  const [nav, setNav] = useState(false)
  // console.log(userData, "dispatch logged in user");
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (pathname === '/dashboard') {
      // console.log(pathname);
      setNav(true)

    }
    else {

      setNav(false)
    }

  }, [pathname])

  return (
    <>
      {/* Navbar */}
      <nav className={`top-0 left-0 z-10 flex items-center w-full p-4 shadow-md  md:flex-row md:flex-nowrap md:justify-start duration-300 ${nav === true ? ' bg-[rgb(135,212,221)!important] ' : ' shadow-md border-b-2 bg-gray-100'} `}>
        <div className='flex flex-wrap items-center justify-between w-full px-4 mx-autp md:flex-nowrap md:px-10  '>
          {/* Brand */}
          <Link
            className='hidden text-3xl tracking-wide font-semibold text-gray-800  lg:inline-block '
            to='/dashboard'
          >
            Overview
          </Link>
          {/* Form */}
          <form className='flex-row flex-wrap items-center hidden mr-3 md:flex w-2/3 ml-auto justify-around gap-20  '>
            <div className='relative flex flex-wrap items-stretch w-full'>
              <span className='absolute z-10 items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-blueGray-300'>
                <i className='fas fa-search'></i>
              </span>
              <div className='flex '>

                <form className="w-[400px]">
                  <label for="default-search" className="mb-2 text-sm font-medium  sr-only text-white ">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-gray-700 pr-2 rounded-l-md">
                      <svg aria-hidden="true" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" className="block w-[90%] p-2 pl-14 text-sm  text-gray-900 border border-gray-400 rounded-md shadow-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search here.." />
                  </div>
                </form>

                <img
                  src='../sujan.jpg'
                  alt=''
                  className='w-10 h-10 ml-2 mr-1 rounded-full'
                />

                <Menu as='div' className='text-left '>
                  <div>
                    <Menu.Button className='inline-flex justify-center w-full py-2 text-base font-medium rounded-md text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                      {userData.name}
                      {/* {userInfo} */}
                      <ChevronDownIcon
                        className='w-5 h-5 ml-2 -mr-1 text-slate-900 '
                        aria-hidden='true'
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 w-48 mt-2 origin-top-right divide-y divide-gray-300 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div className='px-1 py-1 rounded hover:bg-black hover:text-white'>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${active ? "bg-black text-white" : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </form>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
};

export default Dashboardnavbar;
