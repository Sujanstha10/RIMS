import React, { useState } from "react";
import CardStats from "./CardStats";
import { useEffect } from "react";
import axios from "axios";
import Http from "../../Helper/Http";

const Headerstats = () => {
  const [count, setCount] = useState({})

  const fetchData = async () => {

    const response = await Http.get('/count')
    console.log('--------------------------------');
    // console.log(response);
    setCount(response.data)



  }
  console.log(count);
  useEffect(() => {
    fetchData()

  }, [])


  return (
    <>
      {/* Header */}
      <div className='relative pt-12 pb-30 bg-[rgb(135,212,221)] md:pt-12 w-full '>
        <div className='w-full px-4 mx-auto md:px-10'>
          <div>
            {/* Card stats */}
            <div className='flex flex-wrap'>
              <div className='w-full px-4 pb-10 lg:w-6/12 xl:w-3/12'>
                <CardStats
                  statSubtitle='Customers'
                  statTitle={count?.customerPercentage?.totalCount}
                  statArrow='up'
                  statPercent={count?.customerPercentage?.percentage?.toFixed(2)}
                  statPercentColor='text-emerald-500'
                  statDescripiron='Since last week'
                  statIconName='far fa-chart-bar'
                  statIconColor='bg-red-500'
                />
              </div>
              <div className='w-full px-4 lg:w-6/12 xl:w-3/12'>
                <CardStats
                  statSubtitle='Products '
                  statTitle={count?.productsPercentage?.totalCount}
                  statArrow='down'
                  statPercent={count?.productsPercentage?.percentage?.toFixed(2)}
                  statPercentColor='text-red-500'
                  statDescripiron='Since last week'
                  statIconName='fas fa-chart-pie'
                  statIconColor='bg-cyan-900'
                />
              </div>
              <div className='w-full px-4 lg:w-6/12 xl:w-3/12'>
                <CardStats
                  statSubtitle='Orders '
                  statTitle={count?.orderPercentage?.totalCount}
                  statArrow='down'
                  statPercent={count?.orderPercentage?.percentage?.toFixed(2)}
                  statPercentColor='text-orange-500'
                  statDescripiron='Since last week'
                  statIconName='fas fa-users'
                  statIconColor='bg-pink-500'
                />
              </div>
              <div className='w-full px-4 lg:w-6/12 xl:w-3/12'>
                <CardStats
                  statSubtitle='Suppliers'
                  statTitle={count?.supplierPercentage?.totalCount}
                  statPercent={count?.supplierPercentage?.percentage?.toFixed(2)}

                  statArrow='up'
                  statPercentColor='text-emerald-500'
                  statDescripiron='Since last week'
                  statIconName='fas fa-percent'
                  statIconColor='bg-teal-400'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headerstats;
