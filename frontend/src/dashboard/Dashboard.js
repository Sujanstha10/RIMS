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
import AddUser from "./sidebar/User/AddUser";

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className=''>
      <div className=''>
        <Sidebar />
        <div className='relative md:ml-64'>
          <Dashboardnavbar />
          {/* Header */}
          {/* <Headerstats /> */}
          <div className='w-full px-0 pt-20 mx-auto -mt-20 '>
            <Routes>
              <Route path='/' element={<DashboardHome />} />
              <Route path='/products' element={<Product />} />
              <Route path='/products/add' element={<AddProduct />} />
              <Route path='/products/edit/:id' element={<EditProduct />} />
              <Route path='/customers' element={<User />} />
              <Route path='/customers/add' element={<AddUser />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
