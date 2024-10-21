import './left-sidebar.scss'
import React, { useEffect, useState } from 'react';
import LeftNavigation from "../left-navigation/left-navigation";

const LeftSidebar = () => {
    return (
        <aside className={'sidebar'}>
            <LeftNavigation/>
        </aside>
    )
}

export default LeftSidebar;