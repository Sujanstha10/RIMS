import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Sidebar from "./sidebar/Sidebar";
import Dashboardnavbar from "./navbar/Dashboardnavbar";
import Headerstats from "./components/Headerstats";
import User from "./sidebar/User/User";
import Product from "./sidebar/Products/Product";
import AddProduct from "./sidebar/Products/AddProduct";
import DashboardHome from "./DashboardHome";
import EditProduct from "./sidebar/Products/EditProduct";

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className=''>
      <div className=''>
        <Sidebar />
        <div className='relative md:ml-64 bg-blueGray-100'>
          <Dashboardnavbar />
          {/* Header */}
          <Headerstats />
          <div className='w-full px-4 mx-auto -m-24 md:px-10'>
            <Routes>
              <Route path='/' element={<DashboardHome />} />
              <Route path='/users' element={<User />} />
              <Route path='/products' element={<Product />} />
              <Route path='/products/add' element={<AddProduct />} />
              <Route path='/products/edit/:id' element={<EditProduct />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
