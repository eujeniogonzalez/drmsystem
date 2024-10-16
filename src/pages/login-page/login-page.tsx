import React from 'react';
import Header from '../../components/page-components/header/header';
import Footer from '../../components/page-components/footer/footer';
import Content from '../../components/page-components/content/content';
import LoginForm from '../../components/form-components/login-form/login-form';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getLanguageCode } from '../../store/processes/user-process/user-selectors';
import { AuthStatuses } from '../../const/common-const';
import { Navigate } from 'react-router-dom';
import { APP_START_ROUTE } from '../../const/router-const';
import { META } from '../../const/meta-const';

function LoginPage() {
  const languageCode = useAppSelector(getLanguageCode);
  const authStatus = useAppSelector(getAuthorizationStatus);

  document.title = META.TITLE.LOGIN[languageCode];

  // Renders
  const renderPageContent = () => {
    switch (true) {
      case authStatus === AuthStatuses.Auth:
        return <Navigate to={APP_START_ROUTE} />
    
      default:
        return <LoginForm />;
    }
  };

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

export default LoginPage;
