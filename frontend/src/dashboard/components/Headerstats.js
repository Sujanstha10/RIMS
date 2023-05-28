import React from "react";
import CardStats from "./CardStats";

const Headerstats = () => {
  return (
    <>
      {/* Header */}
      <div className='relative pt-12 pb-32 bg-orange md:pt-32'>
        <div className='w-full px-4 mx-auto md:px-10'>
          <div>
            {/* Card stats */}
            <div className='flex flex-wrap'>
              <div className='w-full px-4 lg:w-6/12 xl:w-3/12'>
                <CardStats
                  statSubtitle='Users'
                  statTitle='250'
                  statArrow='up'
                  statPercent='3.48'
                  statPercentColor='text-emerald-500'
                  statDescripiron='Since last month'
                  statIconName='far fa-chart-bar'
                  statIconColor='bg-red-500'
                />
              </div>
              <div className='w-full px-4 lg:w-6/12 xl:w-3/12'>
                <CardStats
                  statSubtitle='Total Bikes'
                  statTitle='50'
                  statArrow='down'
                  statPercent='3.48'
                  statPercentColor='text-red-500'
                  statDescripiron='Since last week'
                  statIconName='fas fa-chart-pie'
                  statIconColor='bg-cyan-900'
                />
              </div>
              <div className='w-full px-4 lg:w-6/12 xl:w-3/12'>
                <CardStats
                  statSubtitle='Available Bikes'
                  statTitle='20'
                  statArrow='down'
                  statPercent='1.10'
                  statPercentColor='text-orange-500'
                  statDescripiron='Since yesterday'
                  statIconName='fas fa-users'
                  statIconColor='bg-pink-500'
                />
              </div>
              <div className='w-full px-4 lg:w-6/12 xl:w-3/12'>
                <CardStats
                  statSubtitle='Categories'
                  statTitle='3'
                  statArrow='up'
                  statPercent='12'
                  statPercentColor='text-emerald-500'
                  statDescripiron='Since last month'
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
