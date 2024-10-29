import './left-navigation.scss'
import React from 'react';
import { NavLink  } from "react-router-dom";
import { AppRoutes } from '../../../const/router-const';

const LeftNavigation = ()=> {
  return (
    <nav className='navigation'>
      <ul className='navigation-list'>
        <li className='navigation-item'>
          <NavLink className={({ isActive }) => `navigation-link ${isActive ? 'active-link' : ''}`}
                   to={ AppRoutes.Dashboard }>Дашборд</NavLink >
        </li>
        <li className='navigation-item' >
          <NavLink className={({ isActive }) => `navigation-link ${isActive ? 'active-link' : ''}`}
                   to={ AppRoutes.Pets }>Животные</NavLink >
        </li>
        <li className='navigation-item'>
          <NavLink className={({ isActive }) => `navigation-link ${isActive ? 'active-link' : ''}`}
                   to={ AppRoutes.Finance }>Финансы</NavLink >
        </li>
        <li className='navigation-item'>
          <NavLink className={({ isActive }) => `navigation-link ${isActive ? 'active-link' : ''}`}
                   to={ AppRoutes.Fundraising }>Сборы</NavLink >
        </li>
        <li className='navigation-item'>
          <NavLink className={({ isActive }) => `navigation-link ${isActive ? 'active-link' : ''}`}
                   to={ AppRoutes.Team }>Команда</NavLink >
        </li>
      </ul>
    </nav>
  );
}

export default LeftNavigation;