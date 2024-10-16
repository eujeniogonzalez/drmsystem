import './header-logo.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_START_ROUTE, AppRoutes } from '../../../const/router-const';
import { useAppSelector } from '../../../hooks';
import { getAuthorizationStatus, getLanguageCode } from '../../../store/processes/user-process/user-selectors';
import { AuthStatuses, COMPANY_NAME } from '../../../const/common-const';

function HeaderLogo() {
  const languageCode = useAppSelector(getLanguageCode);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const logoLink = authStatus === AuthStatuses.Auth ? APP_START_ROUTE : AppRoutes.Main;

  return (
    <div className='header-logo'>
      <Link to={logoLink} className='light-link header-logo-link'>{COMPANY_NAME[languageCode]}</Link>
    </div>
  );
}

export default HeaderLogo;
