import './header-user-block.scss';
import React from 'react';
import Loader from '../loader/loader';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const/router-const';
import { AuthStatuses } from '../../../const/common-const';
import { logoutUserAction } from '../../../store/api-actions/user-api-actions';
import { LoaderColors, LoaderSizes } from '../../../const/classnames-const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { UI_NAMES } from '../../../const/ui-const';
import { APIActions } from '../../../const/api-const';

import {
  getAuthorizationStatus,
  getIsUserRequestInProgress,
  getLanguageCode,
  getUserActionType
} from '../../../store/processes/user-process/user-selectors';


function HeaderUserBlock() {
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector(getLanguageCode);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isUserRequestInProgress = useAppSelector(getIsUserRequestInProgress);
  const userActionType = useAppSelector(getUserActionType);
  const isLogoutAction = userActionType === APIActions.Logout;
  const isLoading = isUserRequestInProgress && isLogoutAction;
  const isAuth = authStatus === AuthStatuses.Auth;
  
  // Handlers
  const logoutLinkClickHandler = () => {
    dispatch(logoutUserAction());
  };

  // Renders
  const renderLoader = () => <Loader size={LoaderSizes.Micro} color={LoaderColors.White} />;

  const renderEnterLink = () => (
    <Link to={AppRoutes.Login} className='light-link header-login-link'>
      {UI_NAMES.ENTER[languageCode]}
    </Link>
  );

  const renderLogoutLink = () => (
    <span className='light-link header-logout-link' onClick={logoutLinkClickHandler}>
      {isLoading ? renderLoader() : UI_NAMES.LOGOUT[languageCode]}
    </span>
  );

  return (
    <div className='header-user-block'>
      {isAuth ? renderLogoutLink() : renderEnterLink()}
    </div>
  );
}

export default HeaderUserBlock;
