import './left-navigation.scss'
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const LeftNavigation = ()=> {
    return(
        <nav className={'navigation'}>
            <ul className={'navigation__list'}>
                <li className={'navigation__item'}>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>
        </nav>
    )
}
export default LeftNavigation;