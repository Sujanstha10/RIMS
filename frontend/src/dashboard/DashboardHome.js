//src/dashboard/dashboardhome.js
import React, { useState } from "react";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import Headerstats from "./components/Headerstats";





const DashboardHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  return (
    <>
      <Headerstats />
      <div className='w-full h-[65vh] mt-20 flex gap-8'>
        <BarChartComponent />
        <BarChartComponenti />


      </div>
    </>
  );
};

export default DashboardHome;


const BarChartComponent = () => {
  const data = [
    { name: 'Category 1', value: 10 },
    { name: 'Category 2', value: 20 },
    { name: 'Category 3', value: 15 },
    { name: 'Category 4', value: 5 },
  ];

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
      <Bar dataKey="value" fill="#82ca9d" />
    </BarChart>
  );
}

const BarChartComponenti = () => {
  const data = [
    { name: 'Category 1', value: 1 },
    { name: 'Category 2', value: 20 },
    { name: 'Category 3', value: 15 },
    { name: 'Category 4', value: 91 },
    { name: 'Category 4', value: 24 },
    { name: 'Category 4', value: 5 },
  ];

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
      <Bar dataKey="value" fill="#82ca9d" />
    </BarChart>
  );
}