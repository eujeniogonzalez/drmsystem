import React from 'react';
import Header from '../../components/page-components/header/header';
import Footer from '../../components/page-components/footer/footer';
import Content from '../../components/page-components/content/content';
import Loader from '../../components/page-components/loader/loader';
import { META } from '../../const/meta-const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getLanguageCode } from '../../store/processes/user-process/user-selectors';
import { Navigate } from 'react-router-dom';
import { APP_START_ROUTE, AppRoutes } from '../../const/router-const';
import { AuthStatuses } from '../../const/common-const';
import { LoaderColors, LoaderSizes } from '../../const/classnames-const';

function MainPage() {
  const languageCode = useAppSelector(getLanguageCode);
  const authStatus = useAppSelector(getAuthorizationStatus);

  document.title = META.TITLE.MAIN[languageCode];

  // Renders
  const renderPageContent = () => {
    switch (authStatus) {
      case AuthStatuses.Auth:
        return <Navigate to={APP_START_ROUTE} />

      case AuthStatuses.NoAuth:
        return <Navigate to={AppRoutes.Login} />

      default:
        return <Loader size={LoaderSizes.Large} color={LoaderColors.Grey} />;
    }
  }

  return (
    <>
      <Header />
      <Content>
        {renderPageContent()}
      </Content>
      <Footer />
    </>
  );
}

export default MainPage;
