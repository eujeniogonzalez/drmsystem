import './left-sidebar.scss'
import React from 'react';
import LeftNavigation from "../left-navigation/left-navigation";

const LeftSidebar = () => {
  return (
    <aside className='left-sidebar'>
      <LeftNavigation />
    </aside>
  );
};

export default LeftSidebar;