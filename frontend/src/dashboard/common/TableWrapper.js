import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const TableWrapper = ({
  error = "",
  success = "",
  title = "",
  addlink = "",
  method = "",
  handleBack,
  children,
  link,
}) => {
  return (
    <div className='relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-gray-50'>
      {error && toast.error(error)}
      {success && toast.success(`${title} ${method} sucessfully`)}
      <div className='px-6 py-6 mb-0 bg-white rounded-t'>
        <div className='flex justify-between text-center'>
          <h6 className='text-xl font-bold '>{title}</h6>
          <Link
            className='px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-400 rounded shadow outline-none active:bg-red-600 hover:shadow-md focus:outline-none'
            to={addlink}
          >
            {link}
          </Link>
        </div>
      </div>
      <div className='flex-auto px-6 py-10 pt-0 bg-white '>{children}</div>
    </div>
  );
};

export default TableWrapper;
