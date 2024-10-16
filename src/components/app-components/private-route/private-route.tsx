import React from 'react';
import Header from '../../page-components/header/header';
import Footer from '../../page-components/footer/footer';
import Content from '../../page-components/content/content';
import Loader from '../../page-components/loader/loader';
import { LoaderColors, LoaderSizes } from '../../../const/classnames-const';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../const/router-const';
import { AuthStatuses } from '../../../const/common-const';
import { useAppSelector } from '../../../hooks';

import {
  getAuthorizationStatus,
  getIsUserRequestInProgress
} from '../../../store/processes/user-process/user-selectors';

type PrivateRoutePropsType = {
  children: JSX.Element
}

function PrivateRoute(props: PrivateRoutePropsType) {
  const { children } = props;
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isUserRequestInProgress = useAppSelector(getIsUserRequestInProgress);
  
  const loadingPage = (
    <>
      <Header />
      <Content>
        <Loader size={LoaderSizes.Large} color={LoaderColors.Grey} />
      </Content>
      <Footer />
    </>
  );

  useEffect(() => {
    if (authStatus !== AuthStatuses.Auth && !isUserRequestInProgress) {
      navigate(AppRoutes.Login);
    }
  }, [authStatus]);

  return authStatus === AuthStatuses.Auth ? children : loadingPage;
}

export default PrivateRoute;
