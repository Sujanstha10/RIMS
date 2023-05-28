import React from "react";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
