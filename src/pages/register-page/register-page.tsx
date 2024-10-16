import React, { useEffect }  from 'react';
import Header from '../../components/page-components/header/header';
import Footer from '../../components/page-components/footer/footer';
import Content from '../../components/page-components/content/content';
import RegisterForm from '../../components/form-components/register-form/register-form';
import Message from '../../components/page-components/message/message';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthStatuses, MessageTextColors, MessageTextSizes } from '../../const/common-const';
import { Navigate } from 'react-router-dom';
import { APP_START_ROUTE, AppRoutes } from '../../const/router-const';
import { META } from '../../const/meta-const';
import { APIActions } from '../../const/api-const';
import { resetUserStateAction } from '../../store/processes/user-process/user-process';
import { UI_NAMES } from '../../const/ui-const';

import {
  getAuthorizationStatus,
  getLanguageCode,
  getUserActionType,
  getUserResponseMessage,
  getIsUserResponseSuccess
} from '../../store/processes/user-process/user-selectors';

function RegisterPage() {
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector(getLanguageCode);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const userActionType = useAppSelector(getUserActionType);
  const isUserResponseSuccess = useAppSelector(getIsUserResponseSuccess);
  const userResponseMessage = useAppSelector(getUserResponseMessage);

  document.title = META.TITLE.REGISTER[languageCode];

  // Functions
  const checkRegisterSuccess = () => isUserResponseSuccess && userActionType === APIActions.Register;

  // Effects
  useEffect(() =>{
    if (userActionType && userActionType !== APIActions.Register) dispatch(resetUserStateAction());
  });

  // Renders
  const renderPageContent = () => {
    const isRegisterSuccess = checkRegisterSuccess();

    switch (true) {
      case authStatus === AuthStatuses.Auth:
        return <Navigate to={APP_START_ROUTE} />;
    
      case isRegisterSuccess:
        if (userResponseMessage) {
          return (
            <Message
              message={userResponseMessage}
              size={MessageTextSizes.Medium}
              color={MessageTextColors.Dark}
              links={[
                {route: AppRoutes.Main, anchor: UI_NAMES.MAIN[languageCode]}
              ]}
            />
          );
        }

      default:
        return <RegisterForm />;
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

export default RegisterPage;
