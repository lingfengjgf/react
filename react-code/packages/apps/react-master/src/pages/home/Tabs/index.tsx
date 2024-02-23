import * as React from 'react';
import { router } from '../../../router';
import { NavLink, Outlet } from 'react-router-dom';

type Props = {};

type tabChild = {
  path: string,
  title: string
}

const Tabs = (props: Props) => {
  const tabs = router[0].children;
  return (
    <div className='w-full'>
      <div className='flex mx-6 box-border'>
        {
          tabs.map((tab:tabChild, i:number) => <NavLink key={i} to={tab.path || ''} className={({ isActive }) => 
          " whitespace-nowrap py-4 px-4 text-base transition-all" + ( isActive ? " text-blue-600 font-bold" : " text-black hover:text-blue-900" )
        }> <div>{tab.title} </div> </NavLink>)
        }
      </div>
      <Outlet />
    </div>
  )
}

export default Tabs;