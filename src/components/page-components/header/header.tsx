import './header.scss';
import React from 'react';
import HeaderUserBlock from '../header-user-block/header-user-block';
import HeaderLogo from '../header-logo/header-logo';
import LanguageSwitcher from '../language-switcher/language-switcher';

function Header() {  
  return (
    <header>
      <div className='header-limiter'>
        <HeaderLogo />
        <div className='header-right-side'>
          <LanguageSwitcher />
          <HeaderUserBlock />
        </div>
      </div>
    </header>
  );
}

export default Header;
